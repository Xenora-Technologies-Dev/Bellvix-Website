import { capabilityStrip } from '../data/services'

export function CapabilityStrip() {
  return (
    <div className="border-y border-white/8 bg-panel">
      <div className="site-wrap flex gap-0 overflow-x-auto py-4 [scrollbar-width:none] sm:grid sm:grid-cols-5 sm:overflow-visible [&::-webkit-scrollbar]:hidden">
        {capabilityStrip.map((item, index) => (
          <div
            key={item}
            className={`flex min-w-[70%] shrink-0 items-center justify-center px-4 py-1 text-center sm:min-w-0 ${
              index < capabilityStrip.length - 1 ? 'sm:border-r sm:border-white/8' : ''
            }`}
          >
            <span className="text-[0.68rem] font-semibold tracking-[0.2em] text-mute uppercase">
              {item}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
