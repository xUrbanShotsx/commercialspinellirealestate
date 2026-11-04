"use client";

const SOCIALS = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/spinellirealestate",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7a7265" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.5" fill="#7a7265" stroke="none" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/spinellirealestate",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7a7265" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/spinelli-real-estate-shellharbour-wollongong/posts/?feedView=all",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7a7265" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
];

export default function FooterSocials() {
  return (
    <div style={{ display: "flex", gap: "12px", marginTop: "8px" }}>
      {SOCIALS.map((s) => (
        <a
          key={s.label}
          href={s.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={s.label}
          style={{ opacity: 1, transition: "opacity 0.2s" }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = "0.5"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}
        >
          {s.icon}
        </a>
      ))}
    </div>
  );
}
