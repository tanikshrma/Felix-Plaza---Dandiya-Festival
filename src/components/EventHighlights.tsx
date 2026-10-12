import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  CalendarDays,
  ShoppingBag,
  Utensils,
  Award,
  Maximize2,
  X,
  Navigation,
  Car,
  Users2,
  ShieldCheck,
} from 'lucide-react';
import { DandiyaIcon } from './icons/FestiveIcons';

interface EventHighlightsProps {
  onOpenMap: () => void;
}

export const EventHighlights: React.FC<EventHighlightsProps> = ({ onOpenMap }) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // The official single Nav Utsav festival image
  const posterSrc = '/nav-utsav-intro-grid.png';
  const posterAlt = 'Felix Plaza Nav Utsav Dandiya Festival';

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Visual Poster Frame - Clean Single Image */}
      <div className="relative rounded-2xl bg-[#2A060E]/90 border border-[#F59E0B]/40 p-2.5 sm:p-3 shadow-[0_12px_40px_rgba(0,0,0,0.35)] overflow-hidden">
        <div
          className="relative w-full rounded-xl overflow-hidden bg-[#1D040A] flex items-center justify-center cursor-pointer group shadow-inner border border-[#F59E0B]/20"
          onClick={() => setLightboxOpen(true)}
        >
          <img
            src={posterSrc}
            alt={posterAlt}
            referrerPolicy="no-referrer"
            onLoad={() => setImageLoaded(true)}
            className={`w-full h-auto max-h-[380px] sm:max-h-[420px] object-contain transition-all duration-300 group-hover:scale-[1.01] ${
              imageLoaded ? 'opacity-100' : 'opacity-90'
            }`}
          />

          {/* Subtle click hint icon on hover */}
          <div className="absolute top-2.5 right-2.5 p-1.5 rounded-lg bg-black/60 text-[#FDE68A] opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm border border-[#F59E0B]/40">
            <Maximize2 className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Premium Event Details & Highlights Card */}
      <div className="relative rounded-2xl bg-gradient-to-b from-[#2E0710]/95 via-[#25050D]/95 to-[#1B0309]/95 border border-[#F59E0B]/40 p-5 sm:p-7 shadow-[0_16px_50px_rgba(0,0,0,0.4)] text-[#FFFDF7] overflow-hidden">
        {/* Subtle decorative golden glow in corner */}
        <div className="pointer-events-none absolute -top-12 -right-12 w-48 h-48 bg-[#F59E0B]/10 rounded-full blur-3xl" />

        {/* Header Ribbon */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#F59E0B]/25 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <CalendarDays className="w-4 h-4 text-[#F59E0B]" />
              <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.25em] text-[#FCD34D] uppercase">
                EVENT INFORMATION
              </span>
            </div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold tracking-wide text-[#FFFDF7] uppercase">
              Festival Details
            </h3>
          </div>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#163A63]/80 border border-[#F59E0B]/40 text-[#FDE68A] text-[11px] sm:text-xs font-bold tracking-wider uppercase shadow-sm">
            <span>OPEN FOR ALL</span>
            <span className="text-white/40">•</span>
            <span className="text-white">FREE ENTRY</span>
          </span>
        </div>

        {/* Schedule & Venue Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mt-5 relative z-10">
          {/* Date Card */}
          <div className="p-3.5 sm:p-4 rounded-xl bg-black/30 border border-[#F59E0B]/20 hover:border-[#F59E0B]/40 transition-all flex items-start gap-3.5 group">
            <div className="w-10 h-10 rounded-lg bg-[#F59E0B]/15 border border-[#F59E0B]/30 text-[#F59E0B] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <Calendar className="w-5 h-5 text-[#FCD34D]" />
            </div>
            <div>
              <span className="text-[10px] font-bold tracking-wider text-[#FCD34D]/80 uppercase block">
                DATES & SCHEDULE
              </span>
              <p className="font-semibold text-sm sm:text-[15px] text-[#FFFDF7] mt-0.5">
                Festive Navratri Season
              </p>
              <p className="text-xs text-[#FDE68A]/75 mt-0.5">
                Dates to be announced soon
              </p>
            </div>
          </div>

          {/* Timing Card */}
          <div className="p-3.5 sm:p-4 rounded-xl bg-black/30 border border-[#F59E0B]/20 hover:border-[#F59E0B]/40 transition-all flex items-start gap-3.5 group">
            <div className="w-10 h-10 rounded-lg bg-[#F59E0B]/15 border border-[#F59E0B]/30 text-[#F59E0B] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <Clock className="w-5 h-5 text-[#FCD34D]" />
            </div>
            <div>
              <span className="text-[10px] font-bold tracking-wider text-[#FCD34D]/80 uppercase block">
                EVENING TIMINGS
              </span>
              <p className="font-semibold text-sm sm:text-[15px] text-[#FFFDF7] mt-0.5">
                7:00 PM Onwards
              </p>
              <p className="text-xs text-[#FDE68A]/75 mt-0.5">
                Entry starts 6:30 PM
              </p>
            </div>
          </div>

          {/* Full-Width Venue Card */}
          <div className="sm:col-span-2 p-3.5 sm:p-4 rounded-xl bg-black/35 border border-[#F59E0B]/25 hover:border-[#F59E0B]/45 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3.5">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-lg bg-[#163A63]/80 border border-[#F59E0B]/30 text-[#FCD34D] flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-[#FCD34D]" />
              </div>
              <div>
                <span className="text-[10px] font-bold tracking-wider text-[#FCD34D]/80 uppercase block">
                  VENUE LOCATION
                </span>
                <p className="font-semibold text-sm sm:text-base text-[#FFFDF7] mt-0.5">
                  Felix Plaza, Sector 82A
                </p>
                <p className="text-xs text-[#FDE68A]/75 mt-0.5">
                  Rampura, Gurugram (NH-48) • Near Hyatt Regency & AapnoGhar
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onOpenMap}
              className="inline-flex items-center justify-center gap-2 py-2 px-4 rounded-lg bg-gradient-to-r from-[#163A63] to-[#1E4578] hover:from-[#1E4578] hover:to-[#235391] active:scale-95 text-[#FFFDF7] text-xs font-bold tracking-wider uppercase border border-[#F59E0B]/40 hover:border-[#F59E0B] transition-all shadow-sm cursor-pointer self-stretch sm:self-auto shrink-0"
            >
              <Navigation className="w-3.5 h-3.5 text-[#FCD34D] shrink-0" />
              <span>Directions</span>
            </button>
          </div>
        </div>

        {/* Festival Highlights Section */}
        <div className="mt-6 pt-5 border-t border-[#F59E0B]/20 relative z-10">
          <div className="flex items-center justify-between mb-3.5">
            <div className="flex items-center gap-2">
              <span className="h-px w-4 bg-[#F59E0B]" />
              <h4 className="font-serif text-sm sm:text-base font-bold tracking-widest uppercase text-[#FCD34D]">
                FESTIVAL HIGHLIGHTS
              </h4>
              <span className="h-px w-4 bg-[#F59E0B]" />
            </div>
            <span className="text-[10px] font-semibold text-[#FFFDF7]/60 uppercase tracking-wider hidden sm:inline">
              Included with entry
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Highlight 1: Dandiya & Garba Raas */}
            <div className="p-3 sm:p-3.5 rounded-xl bg-black/25 border border-white/5 hover:border-[#F59E0B]/30 transition-all flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#F59E0B]/15 border border-[#F59E0B]/30 flex items-center justify-center shrink-0 mt-0.5">
                <DandiyaIcon className="w-4 h-4 text-[#F59E0B]" />
              </div>
              <div>
                <p className="font-bold text-xs sm:text-sm text-[#FFFDF7]">
                  Dandiya &amp; Garba Raas
                </p>
                <p className="text-[11px] text-[#FDE68A]/70 mt-0.5 leading-snug">
                  Traditional circular Garba, live beats and celebratory Dandiya dancing for everyone.
                </p>
              </div>
            </div>

            {/* Highlight 2: Festive Flea Market */}
            <div className="p-3 sm:p-3.5 rounded-xl bg-black/25 border border-white/5 hover:border-[#F59E0B]/30 transition-all flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#F59E0B]/15 border border-[#F59E0B]/30 flex items-center justify-center shrink-0 mt-0.5">
                <ShoppingBag className="w-4 h-4 text-[#F59E0B]" />
              </div>
              <div>
                <p className="font-bold text-xs sm:text-sm text-[#FFFDF7]">
                  Festive Flea Market
                </p>
                <p className="text-[11px] text-[#FDE68A]/70 mt-0.5 leading-snug">
                  Curated shopping stalls with ethnic apparel, festive jewelry and accessories.
                </p>
              </div>
            </div>

            {/* Highlight 3: Delicious Food Stalls */}
            <div className="p-3 sm:p-3.5 rounded-xl bg-black/25 border border-white/5 hover:border-[#F59E0B]/30 transition-all flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#F59E0B]/15 border border-[#F59E0B]/30 flex items-center justify-center shrink-0 mt-0.5">
                <Utensils className="w-4 h-4 text-[#F59E0B]" />
              </div>
              <div>
                <p className="font-bold text-xs sm:text-sm text-[#FFFDF7]">
                  Delicious Food Stalls
                </p>
                <p className="text-[11px] text-[#FDE68A]/70 mt-0.5 leading-snug">
                  Authentic festive delicacies, Indian street food, live chaat counters and drinks.
                </p>
              </div>
            </div>

            {/* Highlight 4: Prizes for Best Attire */}
            <div className="p-3 sm:p-3.5 rounded-xl bg-black/25 border border-white/5 hover:border-[#F59E0B]/30 transition-all flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#F59E0B]/15 border border-[#F59E0B]/30 flex items-center justify-center shrink-0 mt-0.5">
                <Award className="w-4 h-4 text-[#F59E0B]" />
              </div>
              <div>
                <p className="font-bold text-xs sm:text-sm text-[#FFFDF7]">
                  Prizes for Best Attire
                </p>
                <p className="text-[11px] text-[#FDE68A]/70 mt-0.5 leading-snug">
                  Special recognition and daily gift hampers for best traditional festive dressed dancers.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Attendee Conveniences Strip */}
        <div className="mt-5 pt-4 border-t border-[#F59E0B]/15 flex flex-wrap items-center justify-between gap-2.5 text-[11px] text-[#FDE68A]/80">
          <div className="flex items-center gap-1.5">
            <Car className="w-3.5 h-3.5 text-[#F59E0B]" />
            <span>Free On-Site Parking</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Users2 className="w-3.5 h-3.5 text-[#F59E0B]" />
            <span>Family &amp; Kids Friendly</span>
          </div>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#F59E0B]" />
            <span>Dedicated Security &amp; First Aid</span>
          </div>
        </div>
      </div>

      {/* Lightbox Modal for High-Resolution Poster View */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
          onClick={() => setLightboxOpen(false)}
        >
          <div
            className="relative max-w-5xl max-h-[92vh] flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setLightboxOpen(false)}
              className="absolute -top-10 right-0 sm:right-0 p-2 text-white/80 hover:text-white transition-colors cursor-pointer"
              aria-label="Close Lightbox"
            >
              <X className="w-6 h-6" />
            </button>
            <img
              src={posterSrc}
              alt={posterAlt}
              className="max-h-[85vh] max-w-full rounded-xl object-contain shadow-2xl border border-[#F59E0B]/50"
            />
            <p className="text-center text-xs text-[#FDE68A] mt-2 font-semibold">
              {posterAlt} • Sector 82A, Gurugram
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
