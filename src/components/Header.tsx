import React, { useState } from 'react';
import { MapPin, Calendar, Clock } from 'lucide-react';

interface HeaderProps {
  onOpenMap: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenMap }) => {
  const [felixLogoLoaded, setFelixLogoLoaded] = useState(false);
  const [felixLogoError, setFelixLogoError] = useState(false);
  const [utsavLogoLoaded, setUtsavLogoLoaded] = useState(false);
  const [utsavLogoError, setUtsavLogoError] = useState(false);

  return (
    <header className="relative z-10 w-full pt-4 sm:pt-6 pb-2 px-4 flex flex-col items-center justify-center text-center">
      {/* Felix Plaza Logo & Branding */}
      <div className="inline-flex flex-col items-center">
        <div className="h-11 sm:h-13 flex items-center justify-center">
          {!felixLogoError ? (
            <img
              src="/felix-plaza-logo.png"
              alt="Felix Plaza"
              referrerPolicy="no-referrer"
              onLoad={() => setFelixLogoLoaded(true)}
              onError={() => setFelixLogoError(true)}
              className={`h-full w-auto object-contain drop-shadow-[0_2px_10px_rgba(0,0,0,0.4)] transition-opacity duration-300 ${
                felixLogoLoaded ? 'opacity-100' : 'opacity-80'
              }`}
            />
          ) : (
            <span className="font-serif text-2xl sm:text-3xl font-extrabold tracking-[0.2em] text-[#FEF3C7] uppercase">
              FELIX PLAZA
            </span>
          )}
        </div>

        {/* PRESENTS Line */}
        <div className="flex items-center gap-3 mt-2 sm:mt-2.5 mb-1 w-full justify-center">
          <span className="h-px w-10 sm:w-16 bg-gradient-to-r from-transparent to-[#F59E0B]" />
          <span className="text-[10px] sm:text-[11px] font-semibold tracking-[0.35em] uppercase text-[#FCD34D]">
            PRESENTS
          </span>
          <span className="h-px w-10 sm:w-16 bg-gradient-to-l from-transparent to-[#F59E0B]" />
        </div>

        {/* Official Nav Utsav Logo & Hero Lockup */}
        <div className="my-1.5 flex flex-col items-center justify-center">
          {!utsavLogoError ? (
            <img
              src="/nav-utsav-logo.png"
              alt="Nav Utsav"
              referrerPolicy="no-referrer"
              onLoad={() => setUtsavLogoLoaded(true)}
              onError={() => setUtsavLogoError(true)}
              className={`w-64 sm:w-80 md:w-96 max-w-full h-auto object-contain drop-shadow-[0_8px_30px_rgba(0,0,0,0.6)] transition-opacity duration-300 ${
                utsavLogoLoaded ? 'opacity-100' : 'opacity-90'
              }`}
            />
          ) : (
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-wider text-[#FFFDF7] drop-shadow-sm uppercase">
              NAV UTSAV
            </h1>
          )}

          {/* GURUGRAM'S BIGGEST DANDIYA FESTIVAL */}
          <h2 className="font-serif text-xs sm:text-sm md:text-base font-extrabold tracking-[0.26em] uppercase text-transparent bg-clip-text bg-gradient-to-r from-[#FDE68A] via-[#FFFDF7] to-[#FDE68A] drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)] mt-2">
            GURUGRAM&apos;S BIGGEST DANDIYA FESTIVAL
          </h2>
        </div>

        {/* Date, Timing & Venue Lockup */}
        <div className="mt-3.5 flex flex-col items-center justify-center gap-2.5">
          {/* 17 OCT '26 • 6-10PM - Glowing Marquee Badge */}
          <div className="relative group">
            <div className="absolute -inset-1 rounded-full bg-[#F59E0B]/30 blur-sm pointer-events-none" />
            <div className="relative inline-flex items-center gap-2.5 px-5 sm:px-6 py-2 rounded-full bg-gradient-to-r from-[#D97706] via-[#F59E0B] to-[#D97706] text-[#28050C] font-sans font-normal text-xs sm:text-sm md:text-[15px] tracking-normal uppercase shadow-[0_4px_20px_rgba(245,158,11,0.5)] border-2 border-[#FEF3C7] ring-1 ring-[#78350F]/20 select-none">
              <Calendar className="w-4 h-4 text-[#28050C] shrink-0" />
              <span>17 OCT &apos;26</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#28050C]/60" />
              <Clock className="w-4 h-4 text-[#28050C] shrink-0" />
              <span>6-10PM</span>
            </div>
          </div>

          {/* SECTOR 82 A, GURUGRAM */}
          <div className="flex items-center gap-2.5 mt-0.5">
            <span className="h-px w-6 sm:w-10 bg-[#F59E0B]/40" />
            <button
              type="button"
              onClick={onOpenMap}
              className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#163A63]/80 hover:bg-[#1E4578] active:scale-95 text-[#FFFDF7] text-[11px] sm:text-xs font-bold tracking-[0.22em] uppercase border border-[#F59E0B]/40 hover:border-[#F59E0B] transition-all cursor-pointer shadow-sm group"
            >
              <MapPin className="w-3.5 h-3.5 text-[#F59E0B] shrink-0 group-hover:scale-110 transition-transform" />
              <span>SECTOR 82 A, GURUGRAM</span>
            </button>
            <span className="h-px w-6 sm:w-10 bg-[#F59E0B]/40" />
          </div>
        </div>
      </div>
    </header>
  );
};
