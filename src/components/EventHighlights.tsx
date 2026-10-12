import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  CalendarDays,
  ShoppingBag,
  Utensils,
  PartyPopper,
  Navigation,
  Car,
  Users2,
  ShieldCheck,
  Maximize2,
  X,
  Image as ImageIcon,
} from 'lucide-react';
import { DandiyaIcon } from './icons/FestiveIcons';

interface EventHighlightsProps {
  onOpenMap: () => void;
}

export const EventHighlights: React.FC<EventHighlightsProps> = ({ onOpenMap }) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // The official single Nav Utsav festival banner image
  const bannerSrc = '/Nav Utsav Intro Grid (1).png';
  const bannerAlt = 'Felix Plaza Nav Utsav Dandiya Festival Banner';

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Visual Festival Banner Frame - Clean and Responsive on Mobile & Desktop */}
      <div className="relative rounded-2xl bg-[#2A060E]/90 border border-[#F59E0B]/40 p-2.5 sm:p-3 shadow-[0_12px_40px_rgba(0,0,0,0.35)] overflow-hidden">
        {/* Banner Header Strip */}
        <div className="flex items-center justify-between pb-2 mb-2 px-1 border-b border-[#F59E0B]/20">
          <div className="flex items-center gap-1.5">
            <ImageIcon className="w-3.5 h-3.5 text-[#FCD34D]" />
            <span className="font-serif text-[11px] sm:text-xs font-bold tracking-[0.2em] uppercase text-[#FDE68A]">
              FESTIVAL BANNER &amp; PREVIEW
            </span>
          </div>
        </div>

        {/* Banner Image Container with Hover Zoom & Click Lightbox */}
        <div
          className="relative w-full rounded-xl overflow-hidden bg-[#1D040A] flex items-center justify-center cursor-pointer group shadow-inner border border-[#F59E0B]/20"
          onClick={() => setLightboxOpen(true)}
        >
          <img
            src={bannerSrc}
            alt={bannerAlt}
            referrerPolicy="no-referrer"
            onLoad={() => setImageLoaded(true)}
            className={`w-full h-auto max-h-[480px] sm:max-h-[540px] object-contain transition-all duration-300 group-hover:scale-[1.015] ${
              imageLoaded ? 'opacity-100' : 'opacity-90'
            }`}
          />

          {/* Expand icon overlay on hover */}
          <div className="absolute top-3 right-3 p-2 rounded-xl bg-black/75 text-[#FDE68A] opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm border border-[#F59E0B]/40 shadow-lg">
            <Maximize2 className="w-4 h-4 text-[#FCD34D]" />
          </div>
        </div>
      </div>

      {/* Lightbox Modal for Banner */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={() => setLightboxOpen(false)}
        >
          <div
            className="relative max-w-5xl w-full max-h-[92vh] flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setLightboxOpen(false)}
              className="absolute -top-12 right-0 p-2.5 rounded-full bg-[#2A060E] text-[#FFFDF7] hover:bg-[#F59E0B] hover:text-[#28050C] transition-all border border-[#F59E0B]/50 cursor-pointer shadow-xl"
              aria-label="Close Lightbox"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={bannerSrc}
              alt={bannerAlt}
              className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-[0_20px_60px_rgba(0,0,0,0.8)] border border-[#F59E0B]/40"
            />
          </div>
        </div>
      )}

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

        {/* Schedule & Venue Grid with Consistent Festival Icon Styles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mt-5 relative z-10">
          {/* Confirmed Date Card: 17 OCT '26 */}
          <div className="p-3.5 sm:p-4 rounded-xl bg-black/30 border border-[#F59E0B]/25 hover:border-[#F59E0B]/50 transition-all flex items-start gap-3.5 group">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#F59E0B]/25 to-[#F59E0B]/10 border border-[#F59E0B]/40 text-[#FCD34D] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-sm">
              <Calendar className="w-5 h-5 text-[#FCD34D]" />
            </div>
            <div>
              <span className="text-[10px] font-bold tracking-wider text-[#FCD34D]/80 uppercase block">
                FESTIVAL DATE
              </span>
              <p className="font-sans font-normal text-sm sm:text-base text-[#FFFDF7] mt-0.5">
                17 OCT &apos;26
              </p>
              <p className="text-xs text-[#FDE68A]/80 mt-0.5 font-normal">
                Saturday • Grand Nav Utsav
              </p>
            </div>
          </div>

          {/* Confirmed Timing Card: 6:00 PM – 10:00 PM */}
          <div className="p-3.5 sm:p-4 rounded-xl bg-black/30 border border-[#F59E0B]/25 hover:border-[#F59E0B]/50 transition-all flex items-start gap-3.5 group">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#F59E0B]/25 to-[#F59E0B]/10 border border-[#F59E0B]/40 text-[#FCD34D] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-sm">
              <Clock className="w-5 h-5 text-[#FCD34D]" />
            </div>
            <div>
              <span className="text-[10px] font-bold tracking-wider text-[#FCD34D]/80 uppercase block">
                FESTIVAL TIMINGS
              </span>
              <p className="font-sans font-normal text-sm sm:text-base text-[#FFFDF7] mt-0.5">
                6:00 PM – 10:00 PM
              </p>
              <p className="text-xs text-[#FDE68A]/80 mt-0.5 font-normal">
                Gates Open at 6:00 PM – 10:00 PM
              </p>
            </div>
          </div>

          {/* Full-Width Venue Card: SECTOR 82 A, GURUGRAM (Upgraded Icon Style) */}
          <div className="sm:col-span-2 p-3.5 sm:p-4 rounded-xl bg-black/35 border border-[#F59E0B]/25 hover:border-[#F59E0B]/45 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 group">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#F59E0B]/25 to-[#F59E0B]/10 border border-[#F59E0B]/40 text-[#FCD34D] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-sm">
                <MapPin className="w-5 h-5 text-[#FCD34D]" />
              </div>
              <div>
                <span className="text-[10px] font-bold tracking-wider text-[#FCD34D]/80 uppercase block">
                  VENUE LOCATION
                </span>
                <p className="font-sans font-normal text-sm sm:text-base text-[#FFFDF7] mt-0.5">
                  Felix Plaza, Sector 82 A, Gurugram
                </p>
                <p className="text-xs text-[#FDE68A]/75 mt-0.5">
                  Rampura, Gurugram (NH-48) • Near Hyatt Regency &amp; AapnoGhar
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

        {/* Key Highlights Section (Upgraded Icon Style) */}
        <div className="mt-6 pt-5 border-t border-[#F59E0B]/20 relative z-10">
          <div className="flex items-center justify-between mb-3.5">
            <div className="flex items-center gap-2">
              <span className="h-px w-4 bg-[#F59E0B]" />
              <h4 className="font-serif text-sm sm:text-base font-bold tracking-widest uppercase text-[#FCD34D]">
                KEY HIGHLIGHTS
              </h4>
              <span className="h-px w-4 bg-[#F59E0B]" />
            </div>
            <span className="text-[10px] font-semibold text-[#FFFDF7]/60 uppercase tracking-wider hidden sm:inline">
              Official Offerings
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* 1. DANDIYA */}
            <div className="p-3 sm:p-3.5 rounded-xl bg-black/25 border border-[#F59E0B]/20 hover:border-[#F59E0B]/40 transition-all flex items-start gap-3 group">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#F59E0B]/25 to-[#F59E0B]/10 border border-[#F59E0B]/40 text-[#FCD34D] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-sm mt-0.5">
                <DandiyaIcon className="w-5 h-5 text-[#FCD34D]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-serif font-bold text-xs sm:text-sm text-[#FDE68A] uppercase tracking-wider">
                    DANDIYA
                  </p>
                </div>
                <p className="text-[11px] text-[#FFFDF7]/80 mt-0.5 leading-snug">
                  Traditional Garba &amp; circular Dandiya Raas with live dhol beats and folk energy.
                </p>
              </div>
            </div>

            {/* 2. FLEA MARKET */}
            <div className="p-3 sm:p-3.5 rounded-xl bg-black/25 border border-[#F59E0B]/20 hover:border-[#F59E0B]/40 transition-all flex items-start gap-3 group">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#F59E0B]/25 to-[#F59E0B]/10 border border-[#F59E0B]/40 text-[#FCD34D] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-sm mt-0.5">
                <ShoppingBag className="w-5 h-5 text-[#FCD34D]" />
              </div>
              <div>
                <p className="font-serif font-bold text-xs sm:text-sm text-[#FDE68A] uppercase tracking-wider">
                  FLEA MARKET
                </p>
                <p className="text-[11px] text-[#FFFDF7]/80 mt-0.5 leading-snug">
                  Curated festive shopping with ethnic apparel, traditional jewellery &amp; handicrafts.
                </p>
              </div>
            </div>

            {/* 3. FOOD */}
            <div className="p-3 sm:p-3.5 rounded-xl bg-black/25 border border-[#F59E0B]/20 hover:border-[#F59E0B]/40 transition-all flex items-start gap-3 group">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#F59E0B]/25 to-[#F59E0B]/10 border border-[#F59E0B]/40 text-[#FCD34D] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-sm mt-0.5">
                <Utensils className="w-5 h-5 text-[#FCD34D]" />
              </div>
              <div>
                <p className="font-serif font-bold text-xs sm:text-sm text-[#FDE68A] uppercase tracking-wider">
                  FOOD
                </p>
                <p className="text-[11px] text-[#FFFDF7]/80 mt-0.5 leading-snug">
                  Mouthwatering festive delicacies, street food counters, chaat &amp; refreshing drinks.
                </p>
              </div>
            </div>

            {/* 4. FUN & MORE... */}
            <div className="p-3 sm:p-3.5 rounded-xl bg-black/25 border border-[#F59E0B]/20 hover:border-[#F59E0B]/40 transition-all flex items-start gap-3 group">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#F59E0B]/25 to-[#F59E0B]/10 border border-[#F59E0B]/40 text-[#FCD34D] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-sm mt-0.5">
                <PartyPopper className="w-5 h-5 text-[#FCD34D]" />
              </div>
              <div>
                <p className="font-serif font-bold text-xs sm:text-sm text-[#FDE68A] uppercase tracking-wider">
                  FUN &amp; MORE...
                </p>
                <p className="text-[11px] text-[#FFFDF7]/80 mt-0.5 leading-snug">
                  Exciting festive games, photo booths, best attire prizes &amp; joyful divine celebrations.
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
            <span>Dedicated Security &amp; Helpdesk</span>
          </div>
        </div>
      </div>
    </div>
  );
};
