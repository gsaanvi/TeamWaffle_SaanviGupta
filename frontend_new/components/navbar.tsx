"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Menu, X, Plus } from "lucide-react"
// Scale icon removed - using logo image instead
import { useState } from "react"
import { Button } from "@/components/ui/button"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/generate", label: "Generate" },
  { href: "/simplify", label: "Simplify" },
]

export function Navbar() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const isLanding = pathname === "/"

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="Lawffle"
            width={140}
            height={36}
            className="h-9 w-auto"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-lg px-4 py-2 text-sm font-medium transition-colors",
                pathname === link.href
                  ? "bg-secondary text-foreground"
                  : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* CTA Button */}
        <div className="hidden items-center gap-3 md:flex">
          {isLanding ? (
            <Link href="/dashboard">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                Get Started
              </Button>
            </Link>
          ) : (
            <Link href="/generate">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2">
                <Plus className="h-4 w-4" />
                New Document
              </Button>
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="flex h-10 w-10 items-center justify-center rounded-lg text-muted-foreground hover:bg-secondary md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="border-t border-border/50 bg-background md:hidden">
          <div className="space-y-1 px-4 py-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "block rounded-lg px-4 py-3 text-sm font-medium transition-colors",
                  pathname === link.href
                    ? "bg-secondary text-foreground"
                    : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                )}
              >
                {link.label}
              </Link>
            ))}
            <div className="border-t border-border/50 pt-3 mt-3">
              <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
