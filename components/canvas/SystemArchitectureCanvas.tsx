"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

/* ────────────────────────────────────────────────────────
 *  Node data for the Flight Booking Backend architecture
 * ──────────────────────────────────────────────────────── */

interface ArchNode {
  id: string;
  label: string;
  sub: string;
  x: string; // CSS left
  y: string; // CSS top
  color: "emerald" | "blue" | "purple" | "yellow" | "orange";
  shape?: "circle";
}

const NODES: ArchNode[] = [
  { id: "gateway",      label: "API Gateway",          sub: "Rate Limited · JWT",     x: "4%",  y: "42%", color: "emerald" },
  { id: "flights",      label: "Flights Service",      sub: "Node.js · REST",         x: "34%", y: "18%", color: "blue" },
  { id: "booking",      label: "Booking Service",      sub: "Spring Boot · gRPC",     x: "34%", y: "66%", color: "blue" },
  { id: "notification", label: "Notification Engine",   sub: "Go · SMTP / Push",       x: "72%", y: "66%", color: "purple" },
];

const COLOR_MAP = {
  emerald: { border: "border-emerald-500/60", text: "text-emerald-400", glow: "rgba(52,211,153,0.35)", dot: "bg-emerald-400" },
  blue:    { border: "border-blue-500/60",    text: "text-blue-400",    glow: "rgba(96,165,250,0.35)", dot: "bg-blue-400" },
  purple:  { border: "border-purple-500/60",  text: "text-purple-400",  glow: "rgba(192,132,252,0.35)", dot: "bg-purple-400" },
  yellow:  { border: "border-yellow-500/60",  text: "text-yellow-400",  glow: "rgba(250,204,21,0.35)",  dot: "bg-yellow-400" },
  orange:  { border: "border-orange-500/60",  text: "text-orange-400",  glow: "rgba(251,146,60,0.35)",  dot: "bg-orange-400" },
};

/* ─── SVG Connection Lines ─── */

interface Connection {
  id: string;
  d: string;           // SVG path
  color: string;       // stroke color
  packetColor: string; // moving-dot fill
  delay: number;
}

const CONNECTIONS: Connection[] = [
  // Gateway → Flights
  { id: "gw-fl", d: "M 16,50 Q 28,20 38,25",   color: "#34d399", packetColor: "#34d399", delay: 0 },
  // Gateway → Booking
  { id: "gw-bk", d: "M 16,50 Q 28,80 38,72",   color: "#34d399", packetColor: "#34d399", delay: 0.6 },
  // Flights → DB
  { id: "fl-db", d: "M 52,25 Q 70,18 80,28",    color: "#60a5fa", packetColor: "#60a5fa", delay: 1.2 },
  // Booking → DB
  { id: "bk-db", d: "M 52,72 Q 70,55 80,40",    color: "#60a5fa", packetColor: "#60a5fa", delay: 1.8 },
  // Booking → RabbitMQ → Notification
  { id: "bk-nt", d: "M 52,72 L 75,72",          color: "#c084fc", packetColor: "#c084fc", delay: 2.4 },
];

export default function SystemArchitectureCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      /* ── Node pulse ── */
      gsap.to(".arch-node", {
        scale: 1.04,
        duration: 2,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
        stagger: 0.3,
      });

      /* ── Packet motion along SVG paths ── */
      CONNECTIONS.forEach((conn) => {
        const packet = containerRef.current?.querySelector(`#packet-${conn.id}`);
        if (!packet) return;

        // Animate offset along the SVG stroke
        gsap.fromTo(
          packet,
          { attr: { "offset": "0%" } },
          {
            attr: { "offset": "100%" },
            duration: 2.2,
            delay: conn.delay,
            repeat: -1,
            repeatDelay: 1.5,
            ease: "power1.inOut",
          }
        );
      });

      /* ── RabbitMQ badge bounce ── */
      gsap.to(".rabbit-badge", {
        y: -4,
        duration: 1.2,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-[16/9] min-h-[360px] max-h-[500px] bg-zinc-950/80 border border-zinc-800/60 rounded-2xl overflow-hidden font-mono select-none"
    >
      {/* ── Header label ── */}
      <div className="absolute top-4 left-5 flex items-center gap-2 z-20">
        <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span className="text-emerald-400/70 text-[11px] tracking-widest uppercase">
          system_architecture · live
        </span>
      </div>

      {/* ── SVG connection layer ── */}
      <svg
        className="absolute inset-0 w-full h-full z-0"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        fill="none"
      >
        <defs>
          {CONNECTIONS.map((c) => (
            <linearGradient key={`grad-${c.id}`} id={`grad-${c.id}`}>
              <stop offset="0%" stopColor={c.packetColor} stopOpacity="0" />
              <stop id={`packet-${c.id}`} offset="0%" stopColor={c.packetColor} stopOpacity="1" />
              <stop offset="100%" stopColor={c.packetColor} stopOpacity="0" />
            </linearGradient>
          ))}
        </defs>

        {CONNECTIONS.map((c) => (
          <g key={c.id}>
            {/* Static path */}
            <path
              d={c.d}
              stroke={c.color}
              strokeOpacity="0.15"
              strokeWidth="0.4"
              vectorEffect="non-scaling-stroke"
            />
            {/* Animated glow overlay */}
            <path
              d={c.d}
              stroke={`url(#grad-${c.id})`}
              strokeWidth="0.7"
              vectorEffect="non-scaling-stroke"
            />
          </g>
        ))}
      </svg>

      {/* ── Nodes ── */}
      {NODES.map((node) => {
        const c = COLOR_MAP[node.color];
        return (
          <div
            key={node.id}
            className={`arch-node absolute z-10 w-[140px] p-3 bg-zinc-900/90 border-2 ${c.border} rounded-xl text-center backdrop-blur-sm`}
            style={{
              left: node.x,
              top: node.y,
              transform: "translate(0, -50%)",
              boxShadow: `0 0 24px ${c.glow}`,
            }}
          >
            <div className={`${c.text} font-bold text-xs leading-tight`}>{node.label}</div>
            <div className="text-zinc-500 text-[9px] mt-1 tracking-wide">{node.sub}</div>
            {/* Status dot */}
            <span className={`absolute -top-1 -right-1 w-2 h-2 rounded-full ${c.dot} animate-pulse`} />
          </div>
        );
      })}

      {/* ── RabbitMQ Queue Badge ── */}
      <div
        className="rabbit-badge absolute z-10 px-3 py-1.5 bg-zinc-900/90 border border-purple-500/40 rounded-lg text-center backdrop-blur-sm"
        style={{
          left: "58%",
          top: "72%",
          transform: "translate(-50%, -50%)",
          boxShadow: "0 0 18px rgba(192,132,252,0.2)",
        }}
      >
        <div className="text-orange-400 font-bold text-[10px]">🐇 RabbitMQ</div>
        <div className="text-zinc-500 text-[8px] mt-0.5">AMQP Queue</div>
      </div>

      {/* ── PostgreSQL Database Node ── */}
      <div
        className="arch-node absolute z-10 w-[100px] h-[100px] bg-zinc-900/90 border-2 border-yellow-500/50 rounded-full flex flex-col items-center justify-center backdrop-blur-sm"
        style={{
          left: "80%",
          top: "34%",
          transform: "translate(-50%, -50%)",
          boxShadow: "0 0 30px rgba(250,204,21,0.2)",
        }}
      >
        <div className="text-yellow-400 font-bold text-[11px]">PostgreSQL</div>
        <div className="text-zinc-500 text-[8px] mt-0.5">Primary DB</div>
        <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
      </div>

      {/* ── Ambient grid ── */}
      <div
        className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
    </div>
  );
}
