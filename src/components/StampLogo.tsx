interface StampLogoProps {
  size?: number;
  spin?: boolean;
  className?: string;
}

/** The rotating postage-stamp mark used in headers and the footer. */
export function StampLogo({ size = 40, spin = true, className = "" }: StampLogoProps) {
  return (
    <span
      className={`bg-gradient-stamp shadow-stamp relative inline-flex items-center justify-center rounded-xl text-primary-foreground ${
        spin ? "animate-stamp-spin" : ""
      } ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <svg
        width={size * 0.62}
        height={size * 0.62}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 2l2.4 4.86 5.37.78-3.88 3.78.92 5.35L12 18.9l-4.81 2.53.92-5.35-3.88-3.78 5.37-.78L12 2z"
          fill="currentColor"
        />
      </svg>
    </span>
  );
}

/** Wordmark + stamp used in the header brand link. */
export function BrandMark({ size = 40 }: { size?: number }) {
  return (
    <span className="flex items-center gap-2.5">
      <StampLogo size={size} />
      <span className="font-display text-lg leading-none font-black tracking-tight">
        NAM<span className="text-gradient-stamp">CRAFT</span>
        <span className="text-muted-foreground block text-[0.6rem] font-semibold tracking-[0.28em] uppercase">
          Graphic Studio
        </span>
      </span>
    </span>
  );
}
