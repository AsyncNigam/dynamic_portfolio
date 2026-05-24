"use client";

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function ScrollInversionTrack({ children }: { children: React.ReactNode }) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !trackRef.current) return;
    
    // We get the total width of the horizontal track
    const totalWidth = trackRef.current.scrollWidth;
    const windowWidth = window.innerWidth;
    const scrollAmount = totalWidth - windowWidth;
    
    const ctx = gsap.context(() => {
      // Pin the section and scroll the track horizontally
      gsap.to(trackRef.current, {
        x: -scrollAmount,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          start: "top top",
          end: `+=${scrollAmount}`,
          scrub: 1,
          invalidateOnRefresh: true,
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [children]);

  return (
    <section ref={sectionRef} className="h-screen w-full overflow-hidden bg-zinc-950 flex items-center relative">
      <div className="absolute top-12 left-12 text-zinc-500 font-mono text-sm tracking-widest uppercase z-10 pointer-events-none">
        Projects &middot; Horizontal Track
      </div>
      <div ref={trackRef} className="flex gap-16 px-16 w-max h-[80vh] items-center">
        {children}
      </div>
    </section>
  );
}

export function CinematicZoom({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(containerRef.current, 
        { 
          scale: 0.95,
          clipPath: 'inset(10% 10% 10% 10% round 1rem)'
        },
        {
          scale: 1,
          clipPath: 'inset(0% 0% 0% 0% round 1rem)',
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            end: "top 40%",
            scrub: 1,
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [children]);

  return (
    <div ref={containerRef} className="w-full h-full will-change-transform">
      {children}
    </div>
  );
}
