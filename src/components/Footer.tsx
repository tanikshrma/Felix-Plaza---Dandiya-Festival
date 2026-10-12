import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="relative z-20 w-full py-4 sm:py-5 px-4 sm:px-6 text-center border-t border-[#F59E0B]/25 mt-8 bg-[#1D040A]/85 backdrop-blur-md shadow-[0_-4px_20px_rgba(0,0,0,0.3)]">
      <div className="w-full max-w-7xl mx-auto text-xs sm:text-[13px] text-[#FFF6E5]/80 leading-relaxed tracking-wide">
        <p>
          &copy; 2026 Felix Plaza. All rights reserved. | Designed and Marketed by{' '}
          <span className="text-[#FCD34D] font-semibold">Creative Monk</span>.
        </p>
      </div>
    </footer>
  );
};
