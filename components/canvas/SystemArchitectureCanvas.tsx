"use client";

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function SystemArchitectureCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    // GSAP context for cleanup
    const ctx = gsap.context(() => {
      // Pulse animation for nodes
      gsap.to('.node', {
        scale: 1.05,
        boxShadow: "0 0 20px rgba(52, 211, 153, 0.4)",
        duration: 1.5,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
        stagger: 0.2
      });

      // Data packet animation
      gsap.utils.toArray<HTMLElement>('.packet').forEach((packet, i) => {
        // Simple horizontal/vertical movement along paths
        // In a real app we'd use MotionPathPlugin, but this simulates it using x/y
        const delay = i * 1.5;
        
        gsap.to(packet, {
          x: 200, // Move right
          duration: 1,
          delay: delay,
          repeat: -1,
          repeatDelay: 2,
          ease: "none"
        });
      });
      
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-[400px] bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden font-mono p-8">
      <div className="absolute top-4 left-4 text-emerald-400/50 text-xs">system_architecture.canvas</div>
      
      {/* Node: API Gateway */}
      <div className="node absolute top-1/2 left-[10%] -translate-y-1/2 w-32 p-4 bg-zinc-900 border-2 border-emerald-500/50 rounded-lg text-center z-10">
        <div className="text-emerald-400 font-bold text-sm">API Gateway</div>
        <div className="text-zinc-500 text-[10px] mt-1">Rate Limited</div>
      </div>

      {/* Path Line */}
      <div className="absolute top-1/2 left-[10%] w-[40%] h-[2px] bg-zinc-800 -translate-y-1/2 z-0" />

      {/* Moving Packets */}
      <div className="packet absolute top-1/2 left-[15%] w-3 h-3 bg-emerald-400 rounded-full -translate-y-1/2 z-20 shadow-[0_0_10px_#34d399]" />
      
      {/* Node: Microservice A */}
      <div className="node absolute top-[30%] left-[50%] -translate-y-1/2 w-32 p-4 bg-zinc-900 border-2 border-blue-500/50 rounded-lg text-center z-10">
        <div className="text-blue-400 font-bold text-sm">Flight Svc</div>
        <div className="text-zinc-500 text-[10px] mt-1">Node.js</div>
      </div>
      
      {/* Node: Microservice B */}
      <div className="node absolute top-[70%] left-[50%] -translate-y-1/2 w-32 p-4 bg-zinc-900 border-2 border-purple-500/50 rounded-lg text-center z-10">
        <div className="text-purple-400 font-bold text-sm">Auth Svc</div>
        <div className="text-zinc-500 text-[10px] mt-1">Go</div>
      </div>
      
      {/* DB Path */}
      <div className="absolute top-1/2 left-[50%] w-[30%] h-[2px] bg-zinc-800 -translate-y-1/2 z-0" />
      <div className="absolute top-[30%] left-[50%] w-[2px] h-[40%] bg-zinc-800 z-0" />

      {/* Node: Database */}
      <div className="node absolute top-1/2 left-[80%] -translate-y-1/2 w-24 h-24 bg-zinc-900 border-2 border-yellow-500/50 rounded-full flex flex-col items-center justify-center z-10">
        <div className="text-yellow-400 font-bold text-sm">Postgres</div>
      </div>
    </div>
  );
}
