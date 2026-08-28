type Props = {
  className?: string
}

export function Logo({ className = 'h-9 w-auto sm:h-10' }: Props) {
  return (
    <img
      src="/bellvix-logo.png"
      alt="BELLVIX TECHNOLOGIES"
      width={621}
      height={184}
      className={`block object-contain object-left ${className}`}
      decoding="async"
      fetchPriority="high"
    />
  )
}
