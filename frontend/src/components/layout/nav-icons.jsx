export function NavIcon({ id, className = "" }) {
  const cn = `shrink-0 ${className}`.trim();
  switch (id) {
    case "hero":
      return (
        <svg className={cn} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" strokeLinecap="round" strokeLinejoin="round" />
          <polyline points="9 22 9 12 15 12 15 22" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "about-preview":
    case "about-page":
      return (
        <svg className={cn} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" strokeLinecap="round" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      );
    case "portfolio-preview":
    case "portfolio-page":
      return (
        <svg className={cn} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <polyline points="21 15 16 10 5 21" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "commissions-preview":
    case "commissions-page":
      return (
        <svg className={cn} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
          <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="3" y1="6" x2="21" y2="6" strokeLinecap="round" />
          <path d="M16 10a4 4 0 0 1-8 0" strokeLinecap="round" />
        </svg>
      );
    case "easter-egg":
      return (
        <svg className={cn} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
          <path d="M12 3v3M6.5 8.5l2 2M17.5 8.5l-2 2M12 21a8 8 0 0 0 8-8c0-4.5-4-8-8-8s-8 3.5-8 8a8 8 0 0 0 8 8z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "contact":
      return (
        <svg className={cn} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" strokeLinecap="round" strokeLinejoin="round" />
          <polyline points="22,6 12,13 2,6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "reward-page":
      return (
        <svg className={cn} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
          <path d="M20 12v10H4V12" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M2 7h20v5H2V7z" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 22V7M12 7H8a3 3 0 0 1 0-6c3 0 4 6 4 6zM12 7h4a3 3 0 0 0 0-6c-3 0-4 6-4 6z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    default:
      return (
        <span className={`inline-block h-2 w-2 rounded-full bg-current opacity-70 ${className}`} aria-hidden />
      );
  }
}
