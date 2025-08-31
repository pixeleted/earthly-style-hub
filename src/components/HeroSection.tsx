"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

interface HeroSectionProps {
  onPrimaryCTA?: () => void;
  onSecondaryCTA?: () => void;
  className?: string;
}

export default function HeroSection({ 
  onPrimaryCTA, 
  onSecondaryCTA, 
  className = "" 
}: HeroSectionProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section 
      role="banner"
      className={`relative min-h-[420px] h-[56vh] w-full overflow-hidden ${className}`}
      style={{
        backgroundImage: `
          linear-gradient(135deg, rgba(14, 165, 233, 0.1) 0%, rgba(10, 10, 10, 0.8) 100%),
          radial-gradient(circle at 20% 80%, rgba(14, 165, 233, 0.15) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(99, 102, 241, 0.1) 0%, transparent 50%),
          linear-gradient(180deg, #0a0a0a 0%, #111111 100%)
        `,
        backgroundColor: '#0a0a0a'
      }}
    >
      {/* Tech pattern overlay */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%230ea5e9' fill-opacity='0.4'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3Ccircle cx='53' cy='53' r='1'/%3E%3Ccircle cx='23' cy='31' r='1'/%3E%3Ccircle cx='41' cy='13' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      />

      {/* Decorative tech watermark */}
      <div 
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        aria-hidden="true"
      >
        <span 
          className="text-[20vw] font-bold opacity-[0.02] text-white transform rotate-[-12deg] whitespace-nowrap"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          TECH
        </span>
      </div>

      {/* Content container */}
      <div className="relative z-10 h-full flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main headline */}
          <h1 
            className={`mb-6 text-hero font-bold leading-[1.1] tracking-tight transition-all duration-300 ease-out ${
              isVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            }`}
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 'clamp(1.75rem, 8vw, 4.5rem)'
            }}
          >
            Where Technology Meets{' '}
            <span className="text-accent">Lifestyle</span>
          </h1>

          {/* Subheading */}
          <p 
            className={`mb-8 text-lg sm:text-xl text-muted-foreground font-medium max-w-2xl mx-auto leading-relaxed transition-all duration-300 ease-out delay-100 ${
              isVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            }`}
            style={{ letterSpacing: '0.015em' }}
          >
            Discover the latest in tech innovation, digital lifestyle trends, and how modern technology shapes our daily experiences
          </p>

          {/* CTA Buttons */}
          <div 
            className={`flex flex-col sm:flex-row gap-4 items-center justify-center transition-all duration-300 ease-out delay-200 ${
              isVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            }`}
          >
            <Button
              onClick={onPrimaryCTA}
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background transition-all duration-150 ease-out hover:translate-y-[-3px] hover:shadow-lg px-8 py-3 text-base font-medium min-w-[160px]"
            >
              Explore Articles
            </Button>
            
            <Button
              onClick={onSecondaryCTA}
              variant="outline"
              size="lg"
              className="border-border hover:bg-secondary hover:text-foreground focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background transition-all duration-150 ease-out hover:translate-y-[-2px] px-8 py-3 text-base font-medium min-w-[160px]"
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}