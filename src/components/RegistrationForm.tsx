import React, { useState, useRef } from 'react';
import { User, Phone, Mail, Users, MapPin, MessageSquare, Ticket, Loader2 } from 'lucide-react';
import { FormValues, FormErrors, RegistrationData } from '../types';
import { CustomSelect } from './CustomSelect';

interface RegistrationFormProps {
  onSuccess: (data: RegistrationData) => void;
}

const GUEST_OPTIONS = [
  { value: '', label: 'Select number of attendees' },
  { value: '1', label: '1 Guest (Self)' },
  { value: '2', label: '2 Guests' },
  { value: '3', label: '3 Guests' },
  { value: '4', label: '4 Guests' },
  { value: '5+', label: '5+ Guests (Family / Group)' },
];

export const RegistrationForm: React.FC<RegistrationFormProps> = ({ onSuccess }) => {
  const [form, setForm] = useState<FormValues>({
    fullName: '',
    mobile: '',
    email: '',
    guests: '',
    city: '',
    whatsapp: '',
    isSameAsMobile: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const fullNameRef = useRef<HTMLInputElement>(null);
  const mobileRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const whatsappRef = useRef<HTMLInputElement>(null);

  // Sanitize phone digits
  const cleanPhone = (val: string) => {
    let digits = val.replace(/\D/g, '');
    if (digits.length === 12 && digits.startsWith('91')) {
      digits = digits.slice(2);
    } else if (digits.length === 11 && digits.startsWith('0')) {
      digits = digits.slice(1);
    }
    return digits;
  };

  const validate = (): { isValid: boolean; newErrors: FormErrors; firstField: string | null } => {
    const errs: FormErrors = {};
    let first: string | null = null;

    // Full name
    if (!form.fullName.trim() || form.fullName.trim().length < 2) {
      errs.fullName = 'Please enter your full name (minimum 2 characters).';
      if (!first) first = 'fullName';
    }

    // Mobile number
    const mobileDigits = cleanPhone(form.mobile);
    if (!form.mobile.trim() || mobileDigits.length !== 10) {
      errs.mobile = 'Please enter a valid 10-digit mobile number.';
      if (!first) first = 'mobile';
    }

    // Email (optional, but validate if entered)
    if (form.email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(form.email.trim())) {
        errs.email = 'Please enter a valid email address.';
        if (!first) first = 'email';
      }
    }

    // Guests
    if (!form.guests) {
      errs.guests = 'Please select the number of attendees.';
      if (!first) first = 'guests';
    }

    // WhatsApp (optional, validate digits if entered)
    if (form.whatsapp.trim()) {
      const waDigits = cleanPhone(form.whatsapp);
      if (waDigits.length !== 10) {
        errs.whatsapp = 'Please enter a valid 10-digit WhatsApp number.';
        if (!first) first = 'whatsapp';
      }
    }

    return {
      isValid: Object.keys(errs).length === 0,
      newErrors: errs,
      firstField: first,
    };
  };

  const handleChange = (field: keyof FormValues, val: any) => {
    setForm((prev) => {
      const updated = { ...prev, [field]: val };
      if (field === 'mobile' && prev.isSameAsMobile) {
        updated.whatsapp = val;
      }
      return updated;
    });

    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleMobileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    handleChange('mobile', val);
    if (form.isSameAsMobile) {
      handleChange('whatsapp', val);
    }
  };

  const handleSameAsMobileToggle = (checked: boolean) => {
    handleChange('isSameAsMobile', checked);
    if (checked) {
      handleChange('whatsapp', form.mobile);
    }
  };

  const focusFirstError = (field: string | null) => {
    if (!field) return;
    if (field === 'fullName' && fullNameRef.current) fullNameRef.current.focus();
    else if (field === 'mobile' && mobileRef.current) mobileRef.current.focus();
    else if (field === 'email' && emailRef.current) emailRef.current.focus();
    else if (field === 'guests') document.getElementById('guests')?.focus();
    else if (field === 'whatsapp' && whatsappRef.current) whatsappRef.current.focus();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setApiError(null);
    const { isValid, newErrors, firstField } = validate();

    if (!isValid) {
      setErrors(newErrors);
      focusFirstError(firstField);
      return;
    }

    setIsSubmitting(true);

    const payload = {
      fullName: form.fullName.trim(),
      mobile: cleanPhone(form.mobile),
      email: form.email.trim(),
      guests: form.guests,
      city: form.city.trim() || 'Gurugram, Delhi NCR',
      whatsapp: cleanPhone(form.whatsapp),
    };

    try {
      // Attempt backend API call
      let backendSuccessful = false;
      let registeredItem: RegistrationData | null = null;

      try {
        const res = await fetch('/api/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        if (res.ok) {
          const data = await res.json();
          if (data.registration) {
            registeredItem = {
              ...data.registration,
              storage: 'backend',
            };
            backendSuccessful = true;
          }
        }
      } catch (networkErr) {
        console.warn('Backend API request failed, falling back to local storage:', networkErr);
      }

      // If backend was not connected or failed, store in localStorage with Demo Mode indicator
      if (!backendSuccessful || !registeredItem) {
        const passCode = `NU-${Math.floor(100000 + Math.random() * 900000)}`;
        registeredItem = {
          id: `demo_reg_${Date.now()}`,
          fullName: payload.fullName,
          mobile: payload.mobile,
          email: payload.email,
          guests: payload.guests,
          city: payload.city,
          whatsapp: payload.whatsapp,
          passCode,
          seatCategory: 'Reserved Nav Utsav Pass',
          registeredAt: new Date().toISOString(),
          storage: 'demo',
        };

        try {
          const existing = JSON.parse(localStorage.getItem('felix_nav_utsav_registrations') || '[]');
          existing.push(registeredItem);
          localStorage.setItem('felix_nav_utsav_registrations', JSON.stringify(existing));
        } catch (e) {
          console.debug('Storage error:', e);
        }
      }

      onSuccess(registeredItem);
    } catch (err: any) {
      console.error('Registration processing error:', err);
      setApiError('Unable to process registration at this time. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative w-full">
      {/* Registration Card Header */}
      <div className="text-center mb-6 pb-4 border-b border-[#380812]/15">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#163A63]/10 text-[#163A63] text-[11px] font-bold tracking-[0.2em] uppercase mb-2 border border-[#163A63]/20">
          <Ticket className="w-3.5 h-3.5 text-[#163A63]" />
          <span>COMPLIMENTARY ENTRY PASS</span>
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl font-extrabold tracking-wide text-[#380812] uppercase">
          RESERVE YOUR PLACE
        </h2>
        <p className="text-xs sm:text-[13px] text-[#4A1521] mt-1 max-w-md mx-auto leading-relaxed">
          Join us for an unforgettable festive celebration of Dandiya Raas, flea market, delicious food & music at Felix Plaza.
        </p>
      </div>

      {/* API Error Alert */}
      {apiError && (
        <div className="mb-5 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs text-center">
          {apiError}
        </div>
      )}

      {/* Form Fields */}
      <form onSubmit={handleSubmit} noValidate className="space-y-4 sm:space-y-5">
        {/* Full Name & Mobile Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Full Name */}
          <div>
            <label
              htmlFor="fullName"
              className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#380812] mb-1.5"
            >
              <User className="w-3.5 h-3.5 text-[#380812]" />
              <span>FULL NAME</span>
              <span className="text-red-600 font-bold">*</span>
            </label>
            <input
              ref={fullNameRef}
              id="fullName"
              name="fullName"
              type="text"
              autoComplete="name"
              value={form.fullName}
              onChange={(e) => handleChange('fullName', e.target.value)}
              placeholder="Enter your full name"
              disabled={isSubmitting}
              className={`w-full h-12 px-3.5 rounded-xl bg-white text-sm text-[#20050B] placeholder-stone-400 outline-none transition-all ${
                errors.fullName
                  ? 'border-2 border-red-500 focus:ring-2 focus:ring-red-200'
                  : 'border border-stone-300 hover:border-stone-400 focus:border-[#163A63] focus:ring-2 focus:ring-[#163A63]/15'
              }`}
            />
            {errors.fullName && (
              <p className="text-xs text-red-600 font-medium mt-1">
                • {errors.fullName}
              </p>
            )}
          </div>

          {/* Mobile Number */}
          <div>
            <label
              htmlFor="mobile"
              className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#380812] mb-1.5"
            >
              <Phone className="w-3.5 h-3.5 text-[#380812]" />
              <span>MOBILE NUMBER</span>
              <span className="text-red-600 font-bold">*</span>
            </label>
            <input
              ref={mobileRef}
              id="mobile"
              name="mobile"
              type="tel"
              autoComplete="tel"
              value={form.mobile}
              onChange={handleMobileChange}
              placeholder="10-digit mobile number"
              disabled={isSubmitting}
              className={`w-full h-12 px-3.5 rounded-xl bg-white text-sm text-[#20050B] placeholder-stone-400 outline-none transition-all ${
                errors.mobile
                  ? 'border-2 border-red-500 focus:ring-2 focus:ring-red-200'
                  : 'border border-stone-300 hover:border-stone-400 focus:border-[#163A63] focus:ring-2 focus:ring-[#163A63]/15'
              }`}
            />
            {errors.mobile && (
              <p className="text-xs text-red-600 font-medium mt-1">
                • {errors.mobile}
              </p>
            )}
          </div>
        </div>

        {/* Email & Number of Guests Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#380812] mb-1.5"
            >
              <Mail className="w-3.5 h-3.5 text-[#380812]" />
              <span>EMAIL ADDRESS</span>
              <span className="text-[11px] font-normal text-stone-500 lowercase">
                (optional)
              </span>
            </label>
            <input
              ref={emailRef}
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={form.email}
              onChange={(e) => handleChange('email', e.target.value)}
              placeholder="you@example.com"
              disabled={isSubmitting}
              className={`w-full h-12 px-3.5 rounded-xl bg-white text-sm text-[#20050B] placeholder-stone-400 outline-none transition-all ${
                errors.email
                  ? 'border-2 border-red-500 focus:ring-2 focus:ring-red-200'
                  : 'border border-stone-300 hover:border-stone-400 focus:border-[#163A63] focus:ring-2 focus:ring-[#163A63]/15'
              }`}
            />
            {errors.email && (
              <p className="text-xs text-red-600 font-medium mt-1">
                • {errors.email}
              </p>
            )}
          </div>

          {/* Number of Guests */}
          <div>
            <label
              htmlFor="guests"
              className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#380812] mb-1.5"
            >
              <Users className="w-3.5 h-3.5 text-[#380812]" />
              <span>ATTENDEES</span>
              <span className="text-red-600 font-bold">*</span>
            </label>
            <CustomSelect
              id="guests"
              name="guests"
              options={GUEST_OPTIONS}
              value={form.guests}
              onChange={(val) => handleChange('guests', val)}
              disabled={isSubmitting}
              error={errors.guests}
              placeholder="Select number of attendees"
            />
            {errors.guests && (
              <p className="text-xs text-red-600 font-medium mt-1">
                • {errors.guests}
              </p>
            )}
          </div>
        </div>

        {/* City & WhatsApp Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* City */}
          <div>
            <label
              htmlFor="city"
              className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#380812] mb-1.5"
            >
              <MapPin className="w-3.5 h-3.5 text-[#380812]" />
              <span>CITY / LOCATION</span>
              <span className="text-[11px] font-normal text-stone-500 lowercase">
                (optional)
              </span>
            </label>
            <input
              id="city"
              name="city"
              type="text"
              autoComplete="address-level2"
              value={form.city}
              onChange={(e) => handleChange('city', e.target.value)}
              placeholder="e.g. Gurugram, Delhi NCR"
              disabled={isSubmitting}
              className="w-full h-12 px-3.5 rounded-xl bg-white text-sm text-[#20050B] placeholder-stone-400 border border-stone-300 hover:border-stone-400 focus:border-[#163A63] focus:ring-2 focus:ring-[#163A63]/15 outline-none transition-all"
            />
          </div>

          {/* WhatsApp */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label
                htmlFor="whatsapp"
                className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#380812]"
              >
                <MessageSquare className="w-3.5 h-3.5 text-[#380812]" />
                <span>WHATSAPP</span>
              </label>
              <label className="inline-flex items-center gap-1.5 text-xs text-[#380812] font-semibold cursor-pointer select-none bg-[#380812]/5 px-2 py-0.5 rounded hover:bg-[#380812]/10 transition-colors">
                <input
                  type="checkbox"
                  checked={form.isSameAsMobile}
                  onChange={(e) => handleSameAsMobileToggle(e.target.checked)}
                  className="rounded border-stone-300 text-[#380812] focus:ring-[#380812] w-3.5 h-3.5 cursor-pointer accent-[#380812]"
                />
                <span>Same as mobile</span>
              </label>
            </div>
            <input
              ref={whatsappRef}
              id="whatsapp"
              name="whatsapp"
              type="tel"
              value={form.whatsapp}
              onChange={(e) => {
                handleChange('whatsapp', e.target.value);
                if (form.isSameAsMobile) {
                  handleChange('isSameAsMobile', false);
                }
              }}
              placeholder="WhatsApp number for updates"
              disabled={isSubmitting}
              className={`w-full h-12 px-3.5 rounded-xl bg-white text-sm text-[#20050B] placeholder-stone-400 outline-none transition-all ${
                errors.whatsapp
                  ? 'border-2 border-red-500 focus:ring-2 focus:ring-red-200'
                  : 'border border-stone-300 hover:border-stone-400 focus:border-[#163A63] focus:ring-2 focus:ring-[#163A63]/15'
              }`}
            />
            {errors.whatsapp && (
              <p className="text-xs text-red-600 font-medium mt-1">
                • {errors.whatsapp}
              </p>
            )}
          </div>
        </div>

        {/* Prominent REGISTER NOW Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full min-h-[52px] sm:min-h-[56px] py-3.5 px-6 rounded-xl font-serif text-base sm:text-lg font-extrabold tracking-wider text-[#FFFDF7] bg-gradient-to-r from-[#163A63] via-[#1E4578] to-[#163A63] hover:from-[#1E4578] hover:to-[#22508A] active:scale-[0.99] transition-all shadow-[0_4px_18px_rgba(22,58,99,0.35)] hover:shadow-[0_6px_24px_rgba(22,58,99,0.45)] border border-[#F59E0B]/50 hover:border-[#F59E0B] flex items-center justify-center gap-2 cursor-pointer uppercase disabled:opacity-75 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin text-[#FCD34D]" />
                <span>CONFIRMING REGISTRATION...</span>
              </>
            ) : (
              <span>REGISTER NOW</span>
            )}
          </button>
        </div>

        <p className="text-[11px] text-center text-stone-500 pt-1">
          Instant digital entry pass will be issued upon registration. No payment required.
        </p>
      </form>
    </div>
  );
};
