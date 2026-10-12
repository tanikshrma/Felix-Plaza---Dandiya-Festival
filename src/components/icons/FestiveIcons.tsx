import React from 'react';

/**
 * Crossed Dandiya Sticks icon - authentic icon for Dandiya Raas festival
 */
export const DandiyaIcon: React.FC<{ className?: string }> = ({
  className = 'w-5 h-5 text-[#F59E0B]',
}) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* Stick 1 */}
    <line
      x1="4"
      y1="20"
      x2="20"
      y2="4"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
    />
    <circle cx="20" cy="4" r="1.5" fill="currentColor" />
    <circle cx="4" cy="20" r="1.5" fill="currentColor" />
    <line
      x1="7"
      y1="17"
      x2="8.5"
      y2="15.5"
      stroke="currentColor"
      strokeWidth="3.2"
      strokeLinecap="round"
    />
    <line
      x1="15.5"
      y1="8.5"
      x2="17"
      y2="7"
      stroke="currentColor"
      strokeWidth="3.2"
      strokeLinecap="round"
    />

    {/* Stick 2 */}
    <line
      x1="4"
      y1="4"
      x2="20"
      y2="20"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
    />
    <circle cx="20" cy="20" r="1.5" fill="currentColor" />
    <circle cx="4" cy="4" r="1.5" fill="currentColor" />
    <line
      x1="7"
      y1="7"
      x2="8.5"
      y2="8.5"
      stroke="currentColor"
      strokeWidth="3.2"
      strokeLinecap="round"
    />
    <line
      x1="15.5"
      y1="15.5"
      x2="17"
      y2="17"
      stroke="currentColor"
      strokeWidth="3.2"
      strokeLinecap="round"
    />
  </svg>
);

/**
 * Traditional Diya (Oil Lamp) icon - authentic icon for festive celebrations
 */
export const DiyaIcon: React.FC<{ className?: string }> = ({
  className = 'w-5 h-5 text-[#F59E0B]',
}) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* Flame */}
    <path
      d="M12 2C11.2 4.5 10 5.8 10 7.5C10 8.9 10.9 9.8 12 9.8C13.1 9.8 14 8.9 14 7.5C14 5.8 12.8 4.5 12 2Z"
      fill="#F59E0B"
    />
    {/* Base bowl */}
    <path
      d="M4.5 12.5C4.5 16.5 7.8 19.5 12 19.5C16.2 19.5 19.5 16.5 19.5 12.5C19.5 11.5 18.5 10.5 17.5 10.5H6.5C5.5 10.5 4.5 11.5 4.5 12.5Z"
      fill="#D97706"
    />
    <line x1="5" y1="21.5" x2="19" y2="21.5" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);
