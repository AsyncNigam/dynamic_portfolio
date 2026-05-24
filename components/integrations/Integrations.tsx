"use client";

import React, { useMemo } from "react";

// Deterministic pseudo-random based on index for consistent SSR/CSR hydration
function seededRandom(seed: number): number {
  const x = Math.sin(seed * 127.1 + seed * 311.7) * 43758.5453;
  return x - Math.floor(x);
}

export function GitHubHeatmap() {
  const weeks = 52;
  const days = 7;

  const grid = useMemo(() => {
    return Array.from({ length: weeks }, (_, w) =>
      Array.from({ length: days }, (_, d) => {
        const val = seededRandom(w * 7 + d + 42);
        if (val < 0.35) return 0;
        if (val < 0.55) return 1;
        if (val < 0.75) return 2;
        if (val < 0.9) return 3;
        return 4;
      })
    );
  }, []);

  const levelColor = (level: number) => {
    switch (level) {
      case 1: return "bg-emerald-900/40";
      case 2: return "bg-emerald-800/60";
      case 3: return "bg-emerald-600/80";
      case 4: return "bg-emerald-400";
      default: return "bg-zinc-900";
    }
  };

  return (
    <div className="w-full glass-card p-6 font-mono border border-zinc-800/60">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-zinc-400 text-sm">github.com/AsyncNigam</h3>
        <span className="text-emerald-400/60 text-xs">contributions</span>
      </div>
      <div className="flex gap-[3px] overflow-x-auto pb-2">
        {grid.map((week, i) => (
          <div key={i} className="flex flex-col gap-[3px]">
            {week.map((level, j) => (
              <div
                key={j}
                className={`w-[10px] h-[10px] rounded-[2px] ${levelColor(level)} transition-colors`}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
