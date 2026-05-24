import React from "react";

interface MobileMockupProps {
  children: React.ReactNode;
  className?: string;
}

export default function MobileMockup({ children, className = "" }: MobileMockupProps) {
  return (
    <div
      className={`relative mx-auto w-[290px] h-[600px] select-none ${className}`}
    >
      {/* ── Outer Frame — metallic gradient border ── */}
      <div
        className="absolute inset-0 rounded-[2.8rem] p-[3px]"
        style={{
          background:
            "linear-gradient(160deg, rgba(113,113,122,0.7) 0%, rgba(39,39,42,0.9) 30%, rgba(63,63,70,0.5) 60%, rgba(24,24,27,1) 100%)",
        }}
      >
        {/* Inner bezel */}
        <div className="relative w-full h-full rounded-[2.6rem] bg-zinc-950 overflow-hidden">
          {/* ── Top Notch / Camera Pill ── */}
          <div className="absolute top-0 inset-x-0 h-7 bg-black z-30 flex items-center justify-center">
            {/* Centered pill camera cutout */}
            <div className="w-[72px] h-[22px] bg-black rounded-b-2xl flex items-center justify-center gap-1.5 relative">
              {/* Camera lens */}
              <div className="w-[10px] h-[10px] rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center">
                <div className="w-[4px] h-[4px] rounded-full bg-zinc-600" />
              </div>
            </div>
          </div>

          {/* ── Status Bar ── */}
          <div className="absolute top-0 inset-x-0 h-7 z-40 flex items-center justify-between px-6 text-[10px] text-white/70 font-medium">
            <span>9:41</span>
            <div className="flex items-center gap-1.5">
              {/* WiFi icon (text symbol) */}
              <svg width="12" height="10" viewBox="0 0 16 12" fill="currentColor" className="opacity-70">
                <path d="M8 10.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zm-3.54-2.46a5 5 0 017.08 0l-1.06 1.06a3.5 3.5 0 00-4.96 0l-1.06-1.06zm-2.83-2.83a8.5 8.5 0 0112.74 0l-1.06 1.06a7 7 0 00-10.62 0L1.63 5.21z" />
              </svg>
              {/* Signal bars */}
              <div className="flex items-end gap-[1.5px] h-[10px]">
                <div className="w-[2px] h-[4px] bg-white/70 rounded-sm" />
                <div className="w-[2px] h-[6px] bg-white/70 rounded-sm" />
                <div className="w-[2px] h-[8px] bg-white/70 rounded-sm" />
                <div className="w-[2px] h-[10px] bg-white/70 rounded-sm" />
              </div>
              {/* Battery */}
              <div className="flex items-center gap-[1px]">
                <div className="w-[18px] h-[9px] rounded-[2px] border border-white/40 flex items-center p-[1.5px]">
                  <div className="w-[70%] h-full bg-emerald-400 rounded-[1px]" />
                </div>
                <div className="w-[1.5px] h-[4px] bg-white/40 rounded-r-sm" />
              </div>
            </div>
          </div>

          {/* ── Screen Content Area ── */}
          <div className="relative w-full h-full pt-7 pb-6 overflow-hidden">
            {children}
          </div>

          {/* ── Reflection / Glare Overlay ── */}
          <div
            className="absolute inset-0 z-50 pointer-events-none rounded-[2.6rem]"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 40%, transparent 60%, rgba(255,255,255,0.02) 100%)",
            }}
          />

          {/* ── Home Indicator ── */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[100px] h-[4px] bg-white/20 rounded-full z-40" />
        </div>
      </div>

      {/* ── Side Buttons (subtle) ── */}
      {/* Volume up */}
      <div className="absolute left-[-2px] top-[120px] w-[3px] h-[28px] bg-zinc-700 rounded-l-sm" />
      {/* Volume down */}
      <div className="absolute left-[-2px] top-[160px] w-[3px] h-[28px] bg-zinc-700 rounded-l-sm" />
      {/* Power */}
      <div className="absolute right-[-2px] top-[140px] w-[3px] h-[40px] bg-zinc-700 rounded-r-sm" />
    </div>
  );
}
