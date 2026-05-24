"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ═══════════════════════════════════════════════════════
 *  ScrollInversionTrack
 *  Pins the section and converts vertical scroll → horizontal
 *  movement with snap points and a progress indicator.
 * ═══════════════════════════════════════════════════════ */

export function ScrollInversionTrack({ children }: { children: React.ReactNode }) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [cardCount, setCardCount] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    // Count children for snap points
    const cards = track.children.length;
    setCardCount(cards);

    const totalWidth = track.scrollWidth;
    const windowWidth = window.innerWidth;
    const scrollAmount = totalWidth - windowWidth;

    if (scrollAmount <= 0) return;

    const snapIncrement = cards > 1 ? 1 / (cards - 1) : 1;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          pin: true,
          start: "top top",
          end: `+=${scrollAmount}`,
          scrub: 1,
          invalidateOnRefresh: true,
          snap: {
            snapTo: snapIncrement,
            duration: { min: 0.15, max: 0.4 },
            ease: "power1.inOut",
          },
          onUpdate: (self) => {
            if (progressRef.current) {
              progressRef.current.style.width = `${self.progress * 100}%`;
            }
          },
        },
      });

      tl.to(track, {
        x: -scrollAmount,
        ease: "none",
      });
    }, section);

    return () => ctx.revert();
  }, [children]);

  return (
    <section
      ref={sectionRef}
      className="h-screen w-full overflow-hidden bg-zinc-950 flex items-center relative"
    >
      {/* Header */}
      <div className="absolute top-10 left-10 text-zinc-500 font-mono text-xs tracking-[0.2em] uppercase z-10 pointer-events-none flex items-center gap-3">
        <span className="w-6 h-px bg-zinc-700" />
        Projects · Horizontal Track
      </div>

      {/* Track */}
      <div
        ref={trackRef}
        className="flex gap-12 px-16 w-max h-[80vh] items-center will-change-transform"
      >
        {children}
      </div>

      {/* Progress Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-48 z-20">
        <div className="h-[2px] bg-zinc-800 rounded-full overflow-hidden">
          <div
            ref={progressRef}
            className="h-full bg-emerald-400/70 rounded-full transition-none"
            style={{ width: "0%" }}
          />
        </div>
        {/* Dot indicators */}
        {cardCount > 1 && (
          <div className="flex justify-between mt-2">
            {Array.from({ length: cardCount }).map((_, i) => (
              <div key={i} className="w-1.5 h-1.5 rounded-full bg-zinc-700" />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
 *  CinematicZoom
 *  Scale 0.92 → 1.0, clip-path inset 8% → 0%, opacity 0.7 → 1.0
 *  Uses power3.out easing for a cinematic feel.
 * ═══════════════════════════════════════════════════════ */

export function CinematicZoom({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        containerRef.current,
        {
          scale: 0.92,
          clipPath: "inset(8% 8% 8% 8% round 1.2rem)",
          opacity: 0.7,
        },
        {
          scale: 1,
          clipPath: "inset(0% 0% 0% 0% round 1.2rem)",
          opacity: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            end: "top 35%",
            scrub: 1,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full will-change-transform">
      {children}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
 *  FadeInUp
 *  Fades in from 30px below with opacity 0 → 1.
 *  Triggered on viewport entry. Supports stagger via delay.
 * ═══════════════════════════════════════════════════════ */

interface FadeInUpProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export function FadeInUp({ children, delay = 0, className = "" }: FadeInUpProps) {
  const elRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!elRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        elRef.current,
        {
          y: 30,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay,
          ease: "power2.out",
          scrollTrigger: {
            trigger: elRef.current,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        }
      );
    }, elRef);

    return () => ctx.revert();
  }, [delay]);

  return (
    <div ref={elRef} className={`will-change-transform ${className}`} style={{ opacity: 0 }}>
      {children}
    </div>
  );
}
