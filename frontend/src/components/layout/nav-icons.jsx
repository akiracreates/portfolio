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
    case "featured":
      return (
        <svg className={cn} {...stroke}>
          <path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.2 1 5.8L12 17l-5.2 2.7 1-5.8L3.5 9.7l5.9-.9z" />
        </svg>
      );
    case "commissions":
    case "work":
      return (
        <svg className={cn} {...stroke}>
          <path d="M4 6h12l4 4v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1z" />
          <path d="M16 6v4h4" />
          <path d="M7 14h10M7 17h7" />
        </svg>
      );
    case "telegram":
    case "telegram-personal":
    case "telegram-channel":
      return (
        <svg className={cn} {...stroke}>
          <path d="M3 11.5 21 4l-3 16-5.5-4-3 3-1-5z" />
          <path d="m9.5 14 7.5-6" />
        </svg>
      );
    case "vk":
      return (
        <svg className={cn} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <rect x="3.5" y="4.5" width="17" height="15" rx="3" />
          <path d="M7 9.5c.5 3 2.3 5 5 5h.5V12s1.6.4 2.7 2.5h2c-.6-1.6-1.8-2.5-2.7-3 1.4-.4 2.4-1.4 2.7-3h-1.8c-.4 1-1.5 2.4-3 2.4V9.5h-1.6V12c-1.4-.4-2.3-1.6-2.6-2.5H7z" />
        </svg>
      );
    case "cara":
      return (
        <svg className={cn} {...stroke}>
          <circle cx="12" cy="12" r="8.5" />
          <path d="M15.5 9.5c-1-1.2-2.3-1.7-3.6-1.4-1.7.4-3 2-3 4 0 2.4 1.6 4 3.6 4 1.3 0 2.4-.6 3-1.6" />
        </svg>
      );
    case "patreon":
      return (
        <svg className={cn} {...stroke}>
          <circle cx="14.5" cy="9.5" r="5" />
          <path d="M5.5 4v16" strokeWidth="2.5" />
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
