type Props = {
  className?: string
}

export function Mark({ className = '' }: Props) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      aria-hidden="true"
      fill="none"
    >
      <defs>
        <linearGradient id="bellvixMark" x1="8" y1="52" x2="56" y2="12">
          <stop stopColor="#2EE6D6" />
          <stop offset="1" stopColor="#D6F26A" />
        </linearGradient>
      </defs>
      <g fill="url(#bellvixMark)">
        <polygon points="24,8 40,8 48,18 32,18" />
        <polygon points="10,22 26,22 34,32 18,32" />
        <polygon points="30,22 46,22 54,32 38,32" />
        <polygon points="18,36 34,36 42,46 26,46" />
      </g>
    </svg>
  )
}
