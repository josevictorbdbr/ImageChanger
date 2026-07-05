interface IconProps {
  className?: string;
}

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function CropIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg {...base} className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M6 2v14a2 2 0 002 2h14M2 6h14a2 2 0 012 2v14" />
    </svg>
  );
}

export function ResizeIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg {...base} className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M4 14v6h6M20 10V4h-6M20 4l-7 7M4 20l7-7" />
    </svg>
  );
}

export function CompressIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg {...base} className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M9 3v5a1 1 0 01-1 1H3M15 3v5a1 1 0 001 1h5M9 21v-5a1 1 0 00-1-1H3M15 21v-5a1 1 0 011-1h5" />
    </svg>
  );
}

export function RotateIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg {...base} className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M21 12a9 9 0 11-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
      <path d="M21 3v5h-5" />
    </svg>
  );
}

export function FlipIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg {...base} className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M12 3v18M7 7l-3 5 3 5M17 7l3 5-3 5" />
    </svg>
  );
}
