"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

// Hero section - no logo needed here as navbar contains it

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-32 pb-24 sm:pt-40 sm:pb-32">
      {/* Animated background gradient effects */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Primary glow - top center */}
        <div 
          className="absolute top-0 left-1/2 -translate-x-1/2 h-[600px] w-[800px] rounded-full opacity-30"
          style={{
            background: "radial-gradient(ellipse at center, rgba(245, 197, 107, 0.15) 0%, rgba(245, 197, 107, 0.05) 40%, transparent 70%)"
          }}
        />
        {/* Secondary glow - left */}
        <div 
          className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle, rgba(245, 197, 107, 0.1) 0%, transparent 60%)"
          }}
        />
        {/* Tertiary glow - right bottom */}
        <div 
          className="absolute top-1/2 -right-40 h-[400px] w-[400px] rounded-full opacity-15"
          style={{
            background: "radial-gradient(circle, rgba(245, 197, 107, 0.08) 0%, transparent 60%)"
          }}
        />
        {/* Subtle grid pattern overlay */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(245, 197, 107, 0.5) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(245, 197, 107, 0.5) 1px, transparent 1px)`,
            backgroundSize: "60px 60px"
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          {/* Headline with fade-in animation */}
          <h1 
            className="text-balance text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl animate-in fade-in slide-in-from-bottom-4 duration-700"
            style={{ color: "#E5E7EB" }}
          >
            Legal Documents,{" "}
            <span className="text-primary">Simplified by AI</span>
          </h1>

          {/* Subheadline */}
          <p 
            className="mt-6 text-pretty text-lg leading-relaxed sm:text-xl animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150"
            style={{ color: "#9CA3AF" }}
          >
            Generate contracts, NDAs, and agreements in seconds. 
            Understand complex legal language instantly.
          </p>

          {/* CTA Button */}
          <div className="mt-10 flex flex-col items-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
            <Link href="/dashboard">
              <Button 
                size="lg" 
                className="group relative overflow-hidden bg-primary text-primary-foreground hover:bg-primary/90 gap-2 px-8 py-6 text-base font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Get Started Free
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Button>
            </Link>
          </div>

          {/* Subtle secondary text */}
          <p 
            className="mt-6 text-sm animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500"
            style={{ color: "#6B7280" }}
          >
            Built for students, freelancers, and startups
          </p>
        </div>
      </div>
    </section>
  )
}
