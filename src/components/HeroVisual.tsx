export function HeroVisual() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[560px] lg:max-w-none" aria-hidden="true">
      <div className="glow-shift absolute left-[12%] top-[18%] h-56 w-56 rounded-full bg-cyan/20 blur-3xl" />
      <div className="glow-shift absolute right-[8%] bottom-[16%] h-48 w-48 rounded-full bg-lime/15 blur-3xl [animation-delay:-3s]" />

      <div className="absolute inset-[8%] grid-bg rounded-[2rem] border border-white/6 bg-panel/40" />

      <svg viewBox="0 0 520 520" className="relative z-10 h-full w-full">
        <defs>
          <linearGradient id="heroLine" x1="0" y1="520" x2="520" y2="0">
            <stop stopColor="#2EE6D6" stopOpacity="0.9" />
            <stop offset="1" stopColor="#D6F26A" stopOpacity="0.9" />
          </linearGradient>
          <radialGradient id="heroCore" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#2EE6D6" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#050505" stopOpacity="0" />
          </radialGradient>
        </defs>

        <circle cx="260" cy="260" r="210" fill="none" stroke="rgba(255,255,255,0.05)" />
        <circle cx="260" cy="260" r="148" fill="none" stroke="rgba(255,255,255,0.06)" />
        <circle cx="260" cy="260" r="86" fill="url(#heroCore)" stroke="rgba(46,230,214,0.18)" />

        <g
          fill="none"
          stroke="url(#heroLine)"
          strokeWidth="1"
          strokeDasharray="6 10"
          className="origin-center"
          style={{ animation: 'dash-flow 18s linear infinite' }}
        >
          <path d="M90 250 C150 120, 250 80, 360 150" />
          <path d="M120 360 C190 300, 300 390, 430 300" />
          <path d="M80 190 C180 210, 240 360, 400 390" />
          <path d="M160 90 C220 180, 340 160, 440 240" />
        </g>

        {[
          [140, 150],
          [250, 92],
          [370, 140],
          [430, 250],
          [380, 370],
          [250, 430],
          [130, 360],
          [92, 250],
          [210, 230],
          [310, 210],
          [300, 310],
          [200, 320],
        ].map(([x, y], index) => (
          <g key={`${x}-${y}`}>
            <circle
              cx={x}
              cy={y}
              r={index % 3 === 0 ? 5.5 : 3.4}
              fill={index % 2 === 0 ? '#2EE6D6' : '#D6F26A'}
              style={{ animation: `pulse-node ${4 + (index % 3)}s ease-in-out ${index * 0.2}s infinite` }}
            />
          </g>
        ))}
      </svg>

      <div className="float-slow absolute left-[14%] top-[12%] h-8 w-14 origin-center skew-x-[-22deg] bg-gradient-to-r from-cyan to-lime/80 opacity-80" />
      <div className="float-slow absolute right-[18%] top-[28%] h-6 w-10 origin-center skew-x-[-22deg] bg-gradient-to-r from-cyan/70 to-lime opacity-50 [animation-delay:-2.4s]" />
      <div className="float-slow absolute bottom-[18%] left-[22%] h-7 w-12 origin-center skew-x-[-22deg] bg-gradient-to-r from-cyan to-lime opacity-60 [animation-delay:-4.2s]" />
    </div>
  )
}
