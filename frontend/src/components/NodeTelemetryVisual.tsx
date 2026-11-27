export function NodeTelemetryVisual({
  label = "PORT: 8080 // PROXY ENGAGED",
}: {
  label?: string;
}) {
  return (
    <div className="relative w-full h-40 rounded-lg overflow-hidden bg-surface-container-lowest border border-secondary-container/20 flex items-center justify-center">
      <svg
        viewBox="0 0 400 160"
        className="w-full h-full opacity-90"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#00eefc" stopOpacity="0.28" />
            <stop offset="60%" stopColor="#c3f400" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#0b0e15" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="400" height="160" fill="#0b0e15" />
        <g stroke="#00eefc" strokeOpacity="0.12" strokeWidth="0.75">
          <line x1="0" y1="32" x2="400" y2="32" />
          <line x1="0" y1="64" x2="400" y2="64" />
          <line x1="0" y1="96" x2="400" y2="96" />
          <line x1="0" y1="128" x2="400" y2="128" />
          <line x1="80" y1="0" x2="80" y2="160" />
          <line x1="160" y1="0" x2="160" y2="160" />
          <line x1="240" y1="0" x2="240" y2="160" />
          <line x1="320" y1="0" x2="320" y2="160" />
        </g>
        <circle cx="200" cy="80" r="64" fill="url(#nodeGlow)" />
        <g
          stroke="#00eefc"
          strokeOpacity="0.45"
          strokeWidth="1"
          fill="none"
        >
          <polygon points="200,26 248,54 248,106 200,134 152,106 152,54" />
          <polygon
            points="200,42 234,62 234,98 200,118 166,98 166,62"
            stroke="#c3f400"
            strokeOpacity="0.55"
          />
          <line x1="80" y1="54" x2="152" y2="54" strokeDasharray="3 3" />
          <line x1="248" y1="106" x2="320" y2="106" strokeDasharray="3 3" />
          <line x1="152" y1="106" x2="96" y2="128" />
          <line x1="248" y1="54" x2="304" y2="32" />
        </g>
        <g fill="#c3f400">
          <circle cx="200" cy="26" r="2.5" />
          <circle cx="248" cy="54" r="2.5" />
          <circle cx="248" cy="106" r="2.5" />
          <circle cx="200" cy="134" r="2.5" />
          <circle cx="152" cy="106" r="2.5" />
          <circle cx="152" cy="54" r="2.5" />
        </g>
        <g fill="#00eefc">
          <circle cx="80" cy="54" r="2.5" />
          <circle cx="320" cy="106" r="2.5" />
          <circle cx="96" cy="128" r="2" />
          <circle cx="304" cy="32" r="2" />
          <circle cx="200" cy="80" r="4" />
        </g>
      </svg>

      <div className="absolute top-2.5 left-3 right-3 flex justify-between font-mono text-[10px] text-on-surface-variant/80">
        <span>NODE: 10.42.0.18</span>
        <span className="text-secondary-container">TLS 1.3 // AES-GCM</span>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-surface-container-low via-surface-container-low/60 to-transparent" />
      <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1.5 px-2.5 py-1 rounded bg-surface-container-lowest/90 border border-white/10 backdrop-blur-sm">
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-tertiary-fixed-dim animate-ping" />
        <span className="font-mono text-[10px] text-primary tracking-wider">
          {label}
        </span>
      </div>
    </div>
  );
}

