import Link from "next/link";

const links = [
  { href: "/", label: "home" },
  { href: "/about", label: "about" },
  { href: "/portfolio", label: "portfolio" },
  { href: "/commissions", label: "commissions" },
  { href: "/contact", label: "contact" },
  { href: "/reward", label: "reward" },
];

export function PageNav() {
  return (
    <nav className="content-column mb-4 grid grid-cols-3 gap-2 sm:grid-cols-6" aria-label="global pages">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="inner-card px-2 py-1.5 text-center text-[0.68rem] text-text-muted transition hover:text-text-primary"
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
