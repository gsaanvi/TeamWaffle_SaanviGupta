import Link from "next/link"
import Image from "next/image"

const footerLinks = [
  { label: "Features", href: "#" },
  { label: "Pricing", href: "#" },
  { label: "Privacy", href: "#" },
  { label: "Terms", href: "#" },
]

export function FooterSection() {
  return (
    <footer className="border-t border-border/30" style={{ backgroundColor: "#0B0F1A" }}>
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
            <Image
              src="/logo.png"
              alt="Lawffle"
              width={140}
              height={36}
              className="h-9 w-auto"
            />
          </Link>

          {/* Navigation Links */}
          <nav className="flex flex-wrap items-center justify-center gap-6 sm:gap-8">
            {footerLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm transition-colors duration-300 hover:text-primary"
                style={{ color: "#6B7280" }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Divider */}
          <div 
            className="w-full max-w-xs h-px"
            style={{ backgroundColor: "rgba(245, 197, 107, 0.1)" }}
          />

          {/* Copyright */}
          <p 
            className="text-sm"
            style={{ color: "#4B5563" }}
          >
            &copy; {new Date().getFullYear()} Lawffle. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
