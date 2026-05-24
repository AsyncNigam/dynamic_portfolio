"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

/* ────────────────────────────────────────────────────────
 *  Generic Architecture Canvas — renders any project's
 *  architecture nodes + connections as an animated diagram.
 * ──────────────────────────────────────────────────────── */

interface ArchNode {
  id: string;
  label: string;
  sublabel: string;
}

interface ArchQueue {
  from: string;
  to: string;
  label: string;
}

interface ArchitectureData {
  nodes: ArchNode[];
  queues: ArchQueue[];
}

interface Props {
  architecture?: ArchitectureData;
  accentColor?: "emerald" | "blue" | "purple" | "indigo" | "orange" | "amber";
}

const ACCENT = {
  emerald: { border: "border-emerald-500/60", text: "text-emerald-400", glow: "rgba(52,211,153,0.3)", dot: "bg-emerald-400", stroke: "#34d399" },
  blue:    { border: "border-blue-500/60",    text: "text-blue-400",    glow: "rgba(96,165,250,0.3)",  dot: "bg-blue-400",    stroke: "#60a5fa" },
  purple:  { border: "border-purple-500/60",  text: "text-purple-400",  glow: "rgba(192,132,252,0.3)", dot: "bg-purple-400",  stroke: "#c084fc" },
  indigo:  { border: "border-indigo-500/60",  text: "text-indigo-400",  glow: "rgba(129,140,248,0.3)", dot: "bg-indigo-400",  stroke: "#818cf8" },
  orange:  { border: "border-orange-500/60",  text: "text-orange-400",  glow: "rgba(251,146,60,0.3)",  dot: "bg-orange-400",  stroke: "#fb923c" },
  amber:   { border: "border-amber-500/60",   text: "text-amber-400",   glow: "rgba(251,191,36,0.3)",  dot: "bg-amber-400",   stroke: "#fbbf24" },
};

/* Position nodes in a horizontal flow layout */
function layoutNodes(count: number) {
  if (count <= 3) {
    return [
      { x: "6%",  y: "50%" },
      { x: "40%", y: "50%" },
      { x: "74%", y: "50%" },
    ].slice(0, count);
  }
  return [
    { x: "4%",  y: "42%" },
    { x: "34%", y: "18%" },
    { x: "34%", y: "66%" },
    { x: "72%", y: "42%" },
  ].slice(0, count);
}

/* Build SVG path strings between nodes */
function buildPaths(nodes: ArchNode[], queues: ArchQueue[], positions: { x: string; y: string }[]) {
  const idxMap = new Map(nodes.map((n, i) => [n.id, i]));
  return queues.map((q, i) => {
    const fi = idxMap.get(q.from) ?? 0;
    const ti = idxMap.get(q.to) ?? 1;
    const fx = parseInt(positions[fi]?.x || "10") + 7;
    const fy = parseInt(positions[fi]?.y || "50");
    const tx = parseInt(positions[ti]?.x || "50");
    const ty = parseInt(positions[ti]?.y || "50");
    const mx = (fx + tx) / 2;
    const my = (fy + ty) / 2 + (fy === ty ? 0 : (fy < ty ? 8 : -8));
    return {
      id: `conn-${i}`,
      d: `M ${fx},${fy} Q ${mx},${my} ${tx},${ty}`,
      label: q.label,
      delay: i * 0.6,
    };
  });
}

export default function SystemArchitectureCanvas({ architecture, accentColor = "blue" }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const accent = ACCENT[accentColor] || ACCENT.blue;

  const nodes = architecture?.nodes || [];
  const queues = architecture?.queues || [];
  const positions = layoutNodes(nodes.length);
  const paths = buildPaths(nodes, queues, positions);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(".arch-node", {
        scale: 1.04,
        duration: 2,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
        stagger: 0.3,
      });

      paths.forEach((conn) => {
        const packet = containerRef.current?.querySelector(`#packet-${conn.id}`);
        if (!packet) return;
        gsap.fromTo(
          packet,
          { attr: { offset: "0%" } },
          {
            attr: { offset: "100%" },
            duration: 2.2,
            delay: conn.delay,
            repeat: -1,
            repeatDelay: 1.5,
            ease: "power1.inOut",
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, [paths]);

  if (nodes.length === 0) return null;

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-[16/9] min-h-[320px] max-h-[440px] bg-zinc-950/80 border border-zinc-800/60 rounded-2xl overflow-hidden font-mono select-none"
    >
      {/* Header */}
      <div className="absolute top-4 left-5 flex items-center gap-2 z-20">
        <span className={`inline-block w-2 h-2 rounded-full ${accent.dot} animate-pulse`} />
        <span className={`${accent.text} text-[11px] tracking-widest uppercase opacity-70`}>
          architecture &middot; live
        </span>
      </div>

      {/* SVG connections */}
      <svg className="absolute inset-0 w-full h-full z-0" viewBox="0 0 100 100" preserveAspectRatio="none" fill="none">
        <defs>
          {paths.map((c) => (
            <linearGradient key={`grad-${c.id}`} id={`grad-${c.id}`}>
              <stop offset="0%" stopColor={accent.stroke} stopOpacity="0" />
              <stop id={`packet-${c.id}`} offset="0%" stopColor={accent.stroke} stopOpacity="1" />
              <stop offset="100%" stopColor={accent.stroke} stopOpacity="0" />
            </linearGradient>
          ))}
        </defs>
        {paths.map((c) => (
          <g key={c.id}>
            <path d={c.d} stroke={accent.stroke} strokeOpacity="0.15" strokeWidth="0.4" vectorEffect="non-scaling-stroke" />
            <path d={c.d} stroke={`url(#grad-${c.id})`} strokeWidth="0.7" vectorEffect="non-scaling-stroke" />
          </g>
        ))}
      </svg>

      {/* Nodes */}
      {nodes.map((node, i) => {
        const pos = positions[i];
        if (!pos) return null;
        return (
          <div
            key={node.id}
            className={`arch-node absolute z-10 w-[130px] p-3 bg-zinc-900/90 border-2 ${accent.border} rounded-xl text-center backdrop-blur-sm`}
            style={{
              left: pos.x,
              top: pos.y,
              transform: "translate(0, -50%)",
              boxShadow: `0 0 24px ${accent.glow}`,
            }}
          >
            <div className={`${accent.text} font-bold text-[10px] leading-tight`}>{node.label}</div>
            <div className="text-zinc-500 text-[8px] mt-1 tracking-wide">{node.sublabel}</div>
            <span className={`absolute -top-1 -right-1 w-2 h-2 rounded-full ${accent.dot} animate-pulse`} />
          </div>
        );
      })}

      {/* Queue labels */}
      {queues.map((q, i) => {
        const fi = nodes.findIndex((n) => n.id === q.from);
        const ti = nodes.findIndex((n) => n.id === q.to);
        const fx = parseInt(positions[fi]?.x || "10") + 7;
        const fy = parseInt(positions[fi]?.y || "50");
        const tx = parseInt(positions[ti]?.x || "50");
        const ty = parseInt(positions[ti]?.y || "50");
        const mx = (fx + tx) / 2;
        const my = (fy + ty) / 2;
        if (q.label.includes("RabbitMQ") || q.label.includes("AMQP")) {
          return (
            <div
              key={`qlabel-${i}`}
              className="absolute z-10 px-2 py-1 bg-zinc-900/90 border border-purple-500/40 rounded-lg text-center backdrop-blur-sm"
              style={{ left: `${mx}%`, top: `${my}%`, transform: "translate(-50%, -50%)", boxShadow: "0 0 14px rgba(192,132,252,0.2)" }}
            >
              <div className="text-orange-400 font-bold text-[9px]">🐇 {q.label}</div>
            </div>
          );
        }
        return null;
      })}

      {/* Grid */}
      <div
        className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
    </div>
  );
}
