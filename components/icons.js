// Lightweight inline lucide-style SVG icons. No external font/icon dependency.
// Each icon accepts standard SVG props (className, etc.).

function Svg({ children, className = "h-6 w-6", ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

export const Weight = (p) => (
  <Svg {...p}>
    <circle cx="12" cy="5" r="3" />
    <path d="M6.5 8h11l2.5 12H4z" />
  </Svg>
);

export const Compress = (p) => (
  <Svg {...p}>
    <path d="M3 12h7m0 0L7 9m3 3-3 3" />
    <path d="M21 12h-7m0 0 3-3m-3 3 3 3" />
  </Svg>
);

export const Leaf = (p) => (
  <Svg {...p}>
    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
    <path d="M2 21c0-3 1.85-5.36 5.08-6" />
  </Svg>
);

export const Zap = (p) => (
  <Svg {...p}>
    <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8Z" />
  </Svg>
);

export const Coins = (p) => (
  <Svg {...p}>
    <circle cx="8" cy="8" r="6" />
    <path d="M18.09 10.37A6 6 0 1 1 10.34 18" />
    <path d="M7 6h1v4M16.71 13.88l.7.71-2.82 2.82" />
  </Svg>
);

export const Layers = (p) => (
  <Svg {...p}>
    <path d="m12 2 9 5-9 5-9-5 9-5Z" />
    <path d="m3 12 9 5 9-5M3 17l9 5 9-5" />
  </Svg>
);

export const Plug = (p) => (
  <Svg {...p}>
    <path d="M12 22v-5M9 8V2M15 8V2M5 8h14v3a6 6 0 0 1-12 0V8Z" />
  </Svg>
);

export const Feather = (p) => (
  <Svg {...p}>
    <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z" />
    <path d="M16 8 2 22M17.5 15H9" />
  </Svg>
);

export const Battery = (p) => (
  <Svg {...p}>
    <rect x="2" y="7" width="16" height="10" rx="2" />
    <path d="M22 11v2M6 11v2M10 11v2M14 11v2" />
  </Svg>
);

export const Users = (p) => (
  <Svg {...p}>
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
  </Svg>
);

export const Route = (p) => (
  <Svg {...p}>
    <circle cx="6" cy="19" r="3" />
    <circle cx="18" cy="5" r="3" />
    <path d="M9 19h6a3 3 0 0 0 3-3V8M6 16V9a3 3 0 0 1 3-3h0" />
  </Svg>
);

export const Clock = (p) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </Svg>
);

export const Camera = (p) => (
  <Svg {...p}>
    <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3Z" />
    <circle cx="12" cy="13" r="3.5" />
  </Svg>
);

export const Shield = (p) => (
  <Svg {...p}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
    <path d="m9 12 2 2 4-4" />
  </Svg>
);

export const Mountain = (p) => (
  <Svg {...p}>
    <path d="m8 3 4 8 5-5 5 15H2L8 3Z" />
  </Svg>
);

export const Hook = (p) => (
  <Svg {...p}>
    <path d="M12 3v9a3 3 0 0 1-6 0" />
    <circle cx="12" cy="3" r="1.2" />
    <path d="M18 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
  </Svg>
);

export const Box = (p) => (
  <Svg {...p}>
    <path d="M21 8 12 3 3 8v8l9 5 9-5V8Z" />
    <path d="m3 8 9 5 9-5M12 13v8" />
  </Svg>
);

export const Steering = (p) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="2.5" />
    <path d="M12 14.5V21M9.8 11 4 8.5M14.2 11 20 8.5" />
  </Svg>
);

export const TrendingDown = (p) => (
  <Svg {...p}>
    <path d="m3 7 7 7 4-4 7 7" />
    <path d="M21 17v-4h-4" />
  </Svg>
);

export const Brake = (p) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="3" />
    <path d="M12 3v3M12 18v3M3 12h3M18 12h3" />
  </Svg>
);

export const Wrench = (p) => (
  <Svg {...p}>
    <path d="M14.7 6.3a4 4 0 0 0-5.2 5.2L3 18l3 3 6.5-6.5a4 4 0 0 0 5.2-5.2l-2.6 2.6-2.4-2.4 2.6-2.6Z" />
  </Svg>
);

export const Phone = (p) => (
  <Svg {...p}>
    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.1-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z" />
  </Svg>
);

export const Mail = (p) => (
  <Svg {...p}>
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m2 7 10 6 10-6" />
  </Svg>
);

export const Check = (p) => (
  <Svg {...p}>
    <path d="m20 6-11 11-5-5" />
  </Svg>
);

export const ArrowLeft = (p) => (
  <Svg {...p}>
    <path d="M19 12H5M12 19l-7-7 7-7" />
  </Svg>
);
