const stroke = {
  width: 18,
  height: 18,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
};

export function NavIcon({ id, className = "" }) {
  const cn = `shrink-0 ${className}`.trim();
  switch (id) {
    case "home":
      return (
        <svg className={cn} {...stroke}>
          <path d="M3 11.5 12 4l9 7.5" />
          <path d="M5 10v9a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1v-9" />
        </svg>
      );
    case "about":
      return (
        <svg className={cn} {...stroke}>
          <circle cx="12" cy="8" r="3.5" />
          <path d="M5 20c1.5-3.5 4-5 7-5s5.5 1.5 7 5" />
        </svg>
      );
    case "portfolio":
      return (
        <svg className={cn} {...stroke}>
          <rect x="3.5" y="4.5" width="17" height="15" rx="2" />
          <circle cx="9" cy="10" r="1.5" />
          <path d="M3.5 17 9 12l5 4 3-2 3.5 3" />
        </svg>
      );
    case "commissions":
      return (
        <svg className={cn} {...stroke}>
          <path d="M4 6h12l4 4v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1z" />
          <path d="M16 6v4h4" />
          <path d="M7 14h10M7 17h7" />
        </svg>
      );
    case "contact":
      return (
        <svg className={cn} {...stroke}>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="m4 7 8 6 8-6" />
        </svg>
      );
    case "terms":
      return (
        <svg className={cn} {...stroke}>
          <path d="M7 3h8l4 4v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z" />
          <path d="M14 3v5h5" />
          <path d="M9 13h7M9 16h7M9 10h3" />
        </svg>
      );
    case "privacy":
      return (
        <svg className={cn} {...stroke}>
          <path d="M12 3 5 6v6c0 4.5 3 8 7 9 4-1 7-4.5 7-9V6l-7-3z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      );
    case "instagram":
      return (
        <svg className={cn} {...stroke}>
          <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
          <circle cx="12" cy="12" r="3.75" />
          <circle cx="17" cy="7" r="0.6" fill="currentColor" stroke="none" />
        </svg>
      );
    case "x":
      return (
        <svg className={cn} {...stroke}>
          <path d="M5 5l14 14M19 5 5 19" />
        </svg>
      );
    case "email":
      return (
        <svg className={cn} {...stroke}>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="m4 7 8 6 8-6" />
        </svg>
      );
    default:
      return (
        <span
          className={`inline-block h-1.5 w-1.5 rounded-full bg-current opacity-60 ${className}`}
          aria-hidden
        />
      );
  }
}
