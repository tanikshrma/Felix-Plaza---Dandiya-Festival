import React, { useState } from 'react';
import { CheckCircle2, Copy, Check, Calendar, MapPin, Users, User, ArrowLeft, Printer, AlertTriangle, Ticket, Hash } from 'lucide-react';
import { RegistrationData } from '../types';
import { DandiyaIcon } from './icons/FestiveIcons';

interface PassTicketProps {
  registration: RegistrationData;
  onRegisterAnother: () => void;
  onOpenMap: () => void;
}

export const PassTicket: React.FC<PassTicketProps> = ({
  registration,
  onRegisterAnother,
  onOpenMap
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(registration.passCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const calendarUrl = (() => {
    const title = encodeURIComponent("Felix Plaza Nav Utsav 2026 - Dandiya Festival");
    const details = encodeURIComponent(
      `Felix Plaza Nav Utsav Dandiya Festival.\nPass Code: ${registration.passCode}\nGuest: ${registration.fullName}\nAttendees: ${registration.guests}\nVenue: Felix Plaza, Sector 82A, Rampura, Gurugram (NH-48)`
    );
    const location = encodeURIComponent("Felix Plaza, Sector 82A, Gurugram");
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}`;
  })();

  const formatGuests = (val: string) => {
    if (val === '1') return '1 Guest (Self)';
    if (val === '5+') return '5+ Guests (Family / Group)';
    return `${val} Guests`;
  };

  return (
    <div className="w-full text-center py-2 space-y-6 animate-fade-in">
      {/* Success Badge */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#163A63] text-[#FDE68A] text-xs font-bold tracking-[0.2em] uppercase border border-[#F59E0B]/50">
          <CheckCircle2 className="w-3.5 h-3.5 text-[#F59E0B]" />
          <span>RESERVATION CONFIRMED</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl font-extrabold uppercase tracking-wide text-[#380812] leading-tight">
          YOU&apos;RE REGISTERED!
        </h2>
        <p className="text-xs sm:text-sm text-[#4A1521] max-w-md mx-auto leading-relaxed">
          Your complimentary entry pass for <strong className="font-bold text-[#380812]">Felix Plaza Nav Utsav</strong> has been issued.
        </p>

        {/* Demo Mode / Backend Notice */}
        {registration.storage === 'demo' ? (
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-100/90 text-amber-900 text-[11px] font-medium border border-amber-300 mt-1">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-700 shrink-0" />
            <span>Demo Mode: Saved in local browser storage (No active backend connected)</span>
          </div>
        ) : (
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-100/90 text-emerald-900 text-[11px] font-medium border border-emerald-300 mt-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
            <span>Confirmed & Saved to Event Guestlist</span>
          </div>
        )}
      </div>

      {/* Ticket Pass Container */}
      <div className="relative bg-[#FFFDF7] rounded-2xl border-2 border-[#D97706]/60 shadow-[0_12px_40px_rgba(56,8,18,0.18)] text-left max-w-xl mx-auto overflow-hidden print:border-black print:shadow-none">
        {/* Top Header Ribbon */}
        <div className="h-2.5 w-full bg-gradient-to-r from-[#380812] via-[#F59E0B] to-[#163A63]" />

        <div className="p-5 sm:p-6 pb-4">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3 border-b border-[#F59E0B]/30">
            <div className="flex items-center gap-2">
              <img
                src="/nav-utsav-logo.png"
                alt="Nav Utsav"
                className="h-6 sm:h-7 w-auto object-contain"
              />
              <span className="font-serif text-[11px] sm:text-xs font-bold tracking-[0.12em] uppercase text-[#380812]">
                FELIX PLAZA
              </span>
            </div>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#163A63]/10 text-[#163A63] text-[10px] sm:text-[11px] font-bold tracking-wider uppercase border border-[#163A63]/20">
              <Ticket className="w-3 h-3 text-[#163A63]" />
              <span>COMPLIMENTARY ACCESS</span>
            </span>
          </div>

          {/* Pass Code Box */}
          <div className="bg-[#FFF8E7] rounded-xl p-4 border border-[#F59E0B]/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.2em] text-[#78350F] uppercase flex items-center gap-1">
                <Hash className="w-3.5 h-3.5 text-[#78350F]" />
                <span>ENTRY PASS CODE</span>
              </span>
              <span className="font-mono text-2xl sm:text-3xl font-extrabold tracking-wider text-[#380812] block mt-0.5">
                {registration.passCode}
              </span>
            </div>

            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2 min-h-[40px] rounded-lg bg-[#380812] hover:bg-[#4A0D1B] active:scale-95 text-[#FFFDF7] text-xs font-bold tracking-wider uppercase transition-all duration-150 shadow-sm cursor-pointer self-stretch sm:self-auto border border-[#F59E0B]/50"
              title="Copy Entry Pass Code"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-[#FCD34D] shrink-0" />
                  <span className="text-[#FCD34D]">COPIED!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-[#FCD34D] shrink-0" />
                  <span>COPY CODE</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Perforated Divider with Circular Notches */}
        <div className="relative flex items-center my-1">
          <div className="w-4 h-8 bg-[#FBF6EA] rounded-r-full border-r-2 border-y-2 border-[#D97706]/60 -ml-[2px]" />
          <div className="flex-1 border-b-2 border-dashed border-[#F59E0B]/50 mx-2" />
          <div className="w-4 h-8 bg-[#FBF6EA] rounded-l-full border-l-2 border-y-2 border-[#D97706]/60 -mr-[2px]" />
        </div>

        {/* Ticket Details */}
        <div className="p-5 sm:p-6 pt-3 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div className="bg-[#FFF8E7]/60 rounded-xl p-3 border border-[#380812]/10">
              <span className="text-[#78350F] text-[11px] uppercase tracking-wider font-bold flex items-center gap-1.5 mb-1">
                <User className="w-3.5 h-3.5 text-[#380812]" />
                <span>Guest Name</span>
              </span>
              <span className="font-bold text-[#380812] text-sm sm:text-base block truncate">
                {registration.fullName}
              </span>
            </div>

            <div className="bg-[#FFF8E7]/60 rounded-xl p-3 border border-[#380812]/10">
              <span className="text-[#78350F] text-[11px] uppercase tracking-wider font-bold flex items-center gap-1.5 mb-1">
                <Users className="w-3.5 h-3.5 text-[#380812]" />
                <span>Attendees</span>
              </span>
              <span className="font-bold text-[#380812] text-sm sm:text-base block">
                {formatGuests(registration.guests)}
              </span>
            </div>
          </div>

          {/* Event Details Inside Pass */}
          <div className="rounded-xl p-3.5 bg-[#163A63]/5 border border-[#163A63]/15 space-y-2 text-xs">
            <div className="flex items-start gap-2.5">
              <Calendar className="w-4 h-4 text-[#380812] mt-0.5 shrink-0" />
              <div>
                <span className="font-bold text-[#380812] text-sm block">
                  Saturday, 17 Oct &apos;26 • 6:00 PM – 10:00 PM
                </span>
                <span className="text-[#4A1521] text-[11px] block mt-0.5">
                  Gates open at 5:30 PM • Dandiya, Flea Market, Food, Fun &amp; More
                </span>
              </div>
            </div>

            <div className="flex items-start justify-between gap-2 pt-2 border-t border-[#380812]/10">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#380812] mt-0.5 shrink-0" />
                <div>
                  <span className="font-bold text-[#380812] text-xs sm:text-sm block">
                    Felix Plaza, Sector 82A, Gurugram
                  </span>
                  <span className="text-[#4A1521] text-[11px] block">
                    Rampura, Gurugram (NH-48)
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={onOpenMap}
                className="text-[11px] font-bold text-[#163A63] hover:underline uppercase shrink-0 pt-0.5 cursor-pointer"
              >
                View Map
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="pt-2 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-xl mx-auto w-full print:hidden">
        <a
          href={calendarUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 w-full min-h-[46px] px-4 py-2.5 rounded-xl bg-[#163A63] hover:bg-[#1C4677] active:scale-[0.98] text-[#FFFDF7] text-xs font-bold tracking-wider uppercase transition-all shadow-sm border border-[#F59E0B]/40"
        >
          <Calendar className="w-4 h-4 text-[#FCD34D] shrink-0" />
          <span>Calendar</span>
        </a>

        <button
          type="button"
          onClick={handlePrint}
          className="inline-flex items-center justify-center gap-2 w-full min-h-[46px] px-4 py-2.5 rounded-xl bg-[#380812] hover:bg-[#4A0D1B] active:scale-[0.98] text-[#FFFDF7] text-xs font-bold tracking-wider uppercase transition-all shadow-sm border border-[#F59E0B]/40 cursor-pointer"
        >
          <Printer className="w-4 h-4 text-[#FCD34D] shrink-0" />
          <span>Print / Save</span>
        </button>

        <button
          type="button"
          onClick={onRegisterAnother}
          className="inline-flex items-center justify-center gap-2 w-full min-h-[46px] px-4 py-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 active:scale-[0.98] text-[#380812] text-xs font-bold tracking-wider uppercase transition-all border border-[#380812]/20 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-[#380812] shrink-0" />
          <span>Register More</span>
        </button>
      </div>
    </div>
  );
};
