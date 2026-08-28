export function AIVisual() {
  const nodes = [
    [80, 90],
    [180, 50],
    [300, 80],
    [400, 140],
    [70, 210],
    [160, 180],
    [250, 200],
    [340, 230],
    [430, 260],
    [110, 310],
    [220, 300],
    [320, 340],
    [190, 390],
    [280, 410],
  ]

  return (
    <div className="relative min-h-[320px] overflow-hidden lg:min-h-full" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(46,230,214,0.16),transparent_42%),radial-gradient(circle_at_80%_70%,rgba(214,242,106,0.12),transparent_40%)]" />
      <div className="absolute inset-0 grid-bg opacity-40" />
      <svg viewBox="0 0 480 460" className="relative h-full w-full">
        <defs>
          <linearGradient id="aiStroke" x1="0" y1="1" x2="1" y2="0">
            <stop stopColor="#2EE6D6" />
            <stop offset="1" stopColor="#D6F26A" />
          </linearGradient>
        </defs>
        <g
          fill="none"
          stroke="url(#aiStroke)"
          strokeOpacity="0.45"
          strokeWidth="1"
          strokeDasharray="4 8"
          style={{ animation: 'dash-flow 22s linear infinite' }}
        >
          <path d="M80 90 L160 180 L250 200 L340 230 L430 260" />
          <path d="M180 50 L160 180 L110 310 L190 390" />
          <path d="M300 80 L250 200 L220 300 L280 410" />
          <path d="M70 210 L160 180 L320 340" />
          <path d="M400 140 L340 230 L220 300" />
        </g>
        {nodes.map(([x, y], index) => (
          <circle
            key={`${x}-${y}`}
            cx={x}
            cy={y}
            r={index === 6 ? 6 : 3.2}
            fill={index % 2 === 0 ? '#2EE6D6' : '#D6F26A'}
            style={{ animation: `pulse-node ${3.5 + (index % 4)}s ease-in-out ${index * 0.15}s infinite` }}
          />
        ))}
      </svg>
      <div className="absolute right-[12%] top-[18%] h-8 w-14 skew-x-[-22deg] bg-gradient-to-r from-cyan to-lime opacity-70" />
      <div className="absolute bottom-[16%] left-[10%] h-6 w-10 skew-x-[-22deg] bg-gradient-to-r from-cyan/80 to-lime/80 opacity-50" />
    </div>
  )
}
