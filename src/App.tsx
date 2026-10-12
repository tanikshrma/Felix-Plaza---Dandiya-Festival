/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, useEffect } from 'react';
import { Header } from './components/Header';
import { RegistrationForm } from './components/RegistrationForm';
import { PassTicket } from './components/PassTicket';
import { EventHighlights } from './components/EventHighlights';
import { VenueModal } from './components/VenueModal';
import { Footer } from './components/Footer';
import { RegistrationData } from './types';
import { MapPin } from 'lucide-react';

export default function App() {
  const [registeredData, setRegisteredData] = useState<RegistrationData | null>(null);
  const [isMapOpen, setIsMapOpen] = useState(false);

  const formSectionRef = useRef<HTMLDivElement>(null);

  // Check if registration was previously done in session
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem('felix_current_registration');
      if (saved) {
        setRegisteredData(JSON.parse(saved));
      }
    } catch {
      // ignore
    }
  }, []);

  const handleRegistrationSuccess = (data: RegistrationData) => {
    setRegisteredData(data);
    try {
      sessionStorage.setItem('felix_current_registration', JSON.stringify(data));
    } catch {
      // ignore
    }
    // Scroll smoothly to top of card
    if (formSectionRef.current) {
      formSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleRegisterAnother = () => {
    setRegisteredData(null);
    try {
      sessionStorage.removeItem('felix_current_registration');
    } catch {
      // ignore
    }
    if (formSectionRef.current) {
      formSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div className="min-h-screen relative flex flex-col justify-between overflow-x-hidden text-[#FFF6E5] festive-pattern selection:bg-[#F59E0B] selection:text-[#380812]">
      {/* Decorative festive top glow */}
      <div className="pointer-events-none absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-[#F59E0B]/15 to-transparent z-0" />

      {/* Main Content Area */}
      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pt-2 sm:pt-4 pb-2 flex-1 flex flex-col justify-between">
        {/* Header with Felix Plaza & Nav Utsav branding */}
        <Header onOpenMap={() => setIsMapOpen(true)} />

        {/* Content Layout */}
        <main className="w-full my-auto py-3 sm:py-6">
          {/* Mobile Layout (Stacked: Form 1st, Festival Details 2nd) */}
          <div className="flex flex-col gap-6 lg:hidden">
            {/* Registration Card (or Ticket) 1st on mobile */}
            <div
              ref={formSectionRef}
              id="registration-mobile"
              className="relative rounded-2xl bg-[#FFFDF7] text-[#29050C] p-5 sm:p-8 shadow-[0_16px_50px_rgba(0,0,0,0.35)] border border-[#F59E0B]/40 overflow-hidden"
            >
              {registeredData ? (
                <PassTicket
                  registration={registeredData}
                  onRegisterAnother={handleRegisterAnother}
                  onOpenMap={() => setIsMapOpen(true)}
                />
              ) : (
                <RegistrationForm onSuccess={handleRegistrationSuccess} />
              )}
            </div>

            {/* Festival Details & Poster 2nd on mobile */}
            <EventHighlights onOpenMap={() => setIsMapOpen(true)} />
          </div>

          {/* Desktop Layout (Split 2-Column: Form on Left, Poster/Details on Right) */}
          <div className="hidden lg:grid lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Sticky Registration Form Card */}
            <div
              ref={formSectionRef}
              id="registration-desktop"
              className="lg:col-span-6 flex flex-col lg:sticky lg:top-6 self-start z-20"
            >
              <div className="relative rounded-2xl bg-[#FFFDF7] text-[#29050C] p-7 sm:p-9 shadow-[0_16px_50px_rgba(0,0,0,0.35)] border border-[#F59E0B]/40 overflow-hidden">
                {registeredData ? (
                  <PassTicket
                    registration={registeredData}
                    onRegisterAnother={handleRegisterAnother}
                    onOpenMap={() => setIsMapOpen(true)}
                  />
                ) : (
                  <RegistrationForm onSuccess={handleRegistrationSuccess} />
                )}
              </div>
            </div>

            {/* Right Column: Event Poster & Festival Details */}
            <div className="lg:col-span-6 flex flex-col">
              <EventHighlights onOpenMap={() => setIsMapOpen(true)} />
            </div>
          </div>

          {/* Location button */}
          <div className="flex justify-center mt-6">
            <button
              type="button"
              onClick={() => setIsMapOpen(true)}
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 min-h-[42px] rounded-full bg-[#163A63] hover:bg-[#1E4578] text-[#FFFDF7] text-xs font-bold tracking-[0.12em] uppercase transition-all duration-200 cursor-pointer shadow-[0_4px_14px_rgba(22,58,99,0.4)] border border-[#F59E0B]/50 hover:border-[#F59E0B] active:scale-95"
            >
              <MapPin className="w-3.5 h-3.5 text-[#F59E0B] shrink-0" />
              <span>SECTOR 82A, GURUGRAM • VIEW LOCATION MAP</span>
            </button>
          </div>
        </main>
      </div>

      {/* Footer */}
      <Footer />

      {/* Google Maps Modal */}
      <VenueModal isOpen={isMapOpen} onClose={() => setIsMapOpen(false)} />
    </div>
  );
}
