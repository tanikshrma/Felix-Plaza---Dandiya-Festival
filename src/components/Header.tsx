import React, { useState } from 'react';
import { MapPin } from 'lucide-react';

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
        <div className="flex items-center gap-3 mt-2 sm:mt-2.5 mb-1.5 w-full justify-center">
          <span className="h-px w-10 sm:w-16 bg-gradient-to-r from-transparent to-[#F59E0B]" />
          <span className="text-[10px] sm:text-[11px] font-semibold tracking-[0.35em] uppercase text-[#FCD34D]">
            PRESENTS
          </span>
          <span className="h-px w-10 sm:w-16 bg-gradient-to-l from-transparent to-[#F59E0B]" />
        </div>

        {/* Official Nav Utsav Logo (Replacing plain text) */}
        <div className="my-1 flex flex-col items-center justify-center">
          {!utsavLogoError ? (
            <img
              src="/nav-utsav-logo.png"
              alt="Nav Utsav"
              referrerPolicy="no-referrer"
              onLoad={() => setUtsavLogoLoaded(true)}
              onError={() => setUtsavLogoError(true)}
              className={`w-60 sm:w-72 md:w-84 lg:w-96 max-w-full h-auto object-contain drop-shadow-[0_6px_24px_rgba(0,0,0,0.55)] transition-opacity duration-300 ${
                utsavLogoLoaded ? 'opacity-100' : 'opacity-90'
              }`}
            />
          ) : (
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-wider text-[#FFFDF7] drop-shadow-sm uppercase">
              NAV UTSAV
            </h1>
          )}

          <p className="text-[11px] sm:text-xs font-semibold tracking-[0.22em] uppercase text-[#FDE68A] mt-1">
            GURUGRAM&apos;S BIGGEST DANDIYA FESTIVAL
          </p>
        </div>

        {/* Location pill */}
        <div className="mt-2.5">
          <button
            type="button"
            onClick={onOpenMap}
            className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#163A63]/85 hover:bg-[#1E4578] active:scale-95 text-[#FFFDF7] text-[11px] sm:text-xs font-semibold tracking-wider uppercase border border-[#F59E0B]/50 hover:border-[#F59E0B] transition-all cursor-pointer shadow-sm"
          >
            <MapPin className="w-3.5 h-3.5 text-[#F59E0B] shrink-0" />
            <span>SECTOR 82A, GURUGRAM</span>
          </button>
        </div>
      </div>
    </header>
  );
};
