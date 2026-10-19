import { useId } from 'react'

/**
 * Bellvixy: the Bellvix assistant mascot. Original design: a rounded speech-bubble bot in the logo
 * gradient (#25C0D2 -> #EADA69) with a dark visor face, blinking eyes and a lime antenna light.
 * Idle float / blink / glow animations live in index.css and switch off with prefers-reduced-motion.
 */
export function Bellvixy({ size = 56, animated = true, className = '' }: { size?: number; animated?: boolean; className?: string }) {
  const id = useId().replace(/:/g, '')
  return (
    <svg
      viewBox="0 0 64 64"
      width={size}
      height={size}
      className={`bellvixy ${animated ? 'is-animated' : ''} ${className}`}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={`${id}-g`} x1="8" y1="10" x2="58" y2="58" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#25C0D2" />
          <stop offset="1" stopColor="#EADA69" />
        </linearGradient>
        <radialGradient id={`${id}-glow`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#D6F26A" stopOpacity="0.9" />
          <stop offset="1" stopColor="#D6F26A" stopOpacity="0" />
        </radialGradient>
      </defs>
      <g className="bxy-body">
        {/* antenna */}
        <path d="M32 13.5V7.5" stroke={`url(#${id}-g)`} strokeWidth="2.6" strokeLinecap="round" />
        <circle className="bxy-glow" cx="32" cy="6" r="5.5" fill={`url(#${id}-glow)`} />
        <circle cx="32" cy="6" r="2.6" fill="#D6F26A" />
        {/* ears */}
        <rect x="5" y="27" width="6" height="12" rx="3" fill="#25C0D2" />
        <rect x="53" y="27" width="6" height="12" rx="3" fill="#EADA69" />
        {/* head = speech bubble with a small tail */}
        <path
          d="M22 13h20c7.7 0 12 4.3 12 12v14c0 7.7-4.3 12-12 12H27.5l-7.2 6.3c-1 .9-2.6.2-2.5-1.2l.4-5.3C13.1 49.9 10 45.6 10 39V25c0-7.7 4.3-12 12-12Z"
          fill={`url(#${id}-g)`}
        />
        {/* visor face */}
        <rect x="15.5" y="19" width="33" height="25" rx="10" fill="#0B0B0D" />
        <rect x="15.5" y="19" width="33" height="25" rx="10" fill="none" stroke="#ffffff" strokeOpacity="0.08" />
        {/* eyes */}
        <g className="bxy-eyes">
          <rect x="22.5" y="25" width="5.5" height="8" rx="2.75" fill="#2EE6D6" />
          <rect x="36" y="25" width="5.5" height="8" rx="2.75" fill="#2EE6D6" />
          <circle cx="26.4" cy="26.8" r="1.1" fill="#ffffff" fillOpacity="0.85" />
          <circle cx="39.9" cy="26.8" r="1.1" fill="#ffffff" fillOpacity="0.85" />
        </g>
        {/* cheeks + smile */}
        <circle cx="20.5" cy="36.5" r="2" fill="#EADA69" fillOpacity="0.35" />
        <circle cx="43.5" cy="36.5" r="2" fill="#25C0D2" fillOpacity="0.4" />
        <path d="M27.5 36.5c2.6 2.6 6.4 2.6 9 0" stroke="#D6F26A" strokeWidth="2.2" strokeLinecap="round" fill="none" />
      </g>
    </svg>
  )
}
