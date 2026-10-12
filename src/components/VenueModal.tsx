import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { MapPin, X, Navigation, ExternalLink, Loader2 } from 'lucide-react';

interface VenueModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VenueModal: React.FC<VenueModalProps> = ({ isOpen, onClose }) => {
  const [mapLoading, setMapLoading] = useState(true);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const mapUrl = "https://www.google.com/maps/search/?api=1&query=Felix+Plaza+Sector+82A+Gurugram";
  const embedMapUrl = "https://maps.google.com/maps?q=Felix+Plaza+Sector+82A+Gurugram&t=&z=15&ie=UTF8&iwloc=&output=embed";

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl h-[85vh] max-h-[640px] bg-[#2A060E] rounded-2xl overflow-hidden shadow-2xl border border-[#F59E0B]/50 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 bg-[#1D040A] border-b border-[#F59E0B]/30 text-[#FFFDF7] shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#F59E0B] text-[#380812] flex items-center justify-center font-bold shrink-0">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif text-base sm:text-lg font-bold uppercase tracking-wider text-[#FFFDF7] leading-tight">
                Felix Plaza • Venue Location
              </h3>
              <p className="text-[11px] text-[#FCD34D]">
                Sector 82A, Rampura, Gurugram (NH-48)
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 text-[#FFFDF7] flex items-center justify-center transition-all cursor-pointer"
            aria-label="Close Map"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Map iframe Container */}
        <div className="relative flex-1 w-full min-h-[220px] bg-[#e5e3df] overflow-hidden">
          {mapLoading && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#f4f2ee]">
              <Loader2 className="w-8 h-8 text-[#380812] animate-spin mb-2" />
              <span className="text-xs text-[#380812] font-semibold tracking-wider uppercase">
                Loading Location Map...
              </span>
            </div>
          )}
          <iframe
            title="Felix Plaza Location Map"
            src={embedMapUrl}
            className="w-full h-full border-0"
            loading="lazy"
            allowFullScreen
            onLoad={() => setMapLoading(false)}
          />

          {/* Floating Address Card */}
          <div className="absolute top-3 left-3 right-3 sm:right-auto sm:max-w-xs bg-white/95 backdrop-blur-md text-[#20050B] p-3.5 rounded-xl shadow-lg border border-[#F59E0B]/50 text-xs">
            <h4 className="font-serif font-bold text-sm text-[#380812] uppercase">
              Felix Plaza
            </h4>
            <p className="text-stone-600 mt-0.5 leading-snug text-[11px]">
              Sector 82A, Rampura, Gurugram, Haryana 122004
            </p>
            <p className="text-[#163A63] font-semibold text-[10px] mt-0.5">
              Near AapnoGhar & Hyatt Regency (NH-48)
            </p>

            <div className="mt-2.5 pt-2 border-t border-stone-200 flex items-center gap-2">
              <a
                href={mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg bg-[#380812] hover:bg-[#4A0D1B] active:scale-95 text-white text-[11px] font-bold tracking-wider uppercase transition-all shadow-sm"
              >
                <Navigation className="w-3 h-3 shrink-0" />
                <span>Directions</span>
              </a>
              <a
                href={mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center p-1.5 rounded-lg border border-stone-300 hover:bg-stone-100 text-[#380812] transition-all"
                title="Open in Google Maps"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-4 sm:px-6 py-3 bg-[#1D040A] border-t border-[#F59E0B]/30 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[#FFFDF7]/90 shrink-0">
          <div className="flex items-center gap-2 text-[11px]">
            <span className="text-[#FCD34D] font-semibold">Felix Plaza, Sector 82A, Gurugram</span>
            <span>•</span>
            <span>Easy access via NH-48 Expressway</span>
          </div>

          <a
            href={mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#F59E0B] hover:bg-[#FBBF24] active:scale-95 text-[#380812] font-bold text-xs uppercase transition-all shadow-sm shrink-0"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Open in Google Maps</span>
          </a>
        </div>
      </div>
    </div>,
    document.body
  );
};
