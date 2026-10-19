export function Logo({ className = 'h-9 w-auto sm:h-10' }: { className?: string }) {
  return (
    <img
      src="/images/bellvix-logo.png"
      alt="Bellvix Technologies"
      width={480}
      height={137}
      className={`block object-contain object-left ${className}`}
      decoding="async"
    />
  )
}
