type LogoProps = {
  className?: string;
};

export default function Logo({ className = "" }: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <svg
        viewBox="0 0 48 48"
        className="h-9 w-9 md:h-11 md:w-11 shrink-0"
        fill="none"
        aria-hidden="true"
      >
        {/* ring */}
        <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="3" />
        {/* cardinal ticks */}
        <g stroke="currentColor" strokeWidth="3" strokeLinecap="round">
          <path d="M24 8v4M24 36v4M8 24h4M36 24h4" />
        </g>
        {/* needle, pointing north-east */}
        <g transform="rotate(45 24 24)">
          <polygon points="24,8 30,24 18,24" fill="currentColor" />
          <polygon points="24,40 30,24 18,24" fill="currentColor" opacity="0.45" />
        </g>
      </svg>

      <span className="inline-flex items-center gap-2 text-3xl md:text-4xl font-bold tracking-tight leading-none">
        Kompas
        <span className="rounded-lg bg-white px-2 py-1 text-xl md:text-2xl font-bold leading-none tracking-wider text-indigo-700">
          IP
        </span>
      </span>
    </span>
  );
}
