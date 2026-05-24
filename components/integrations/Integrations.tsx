import React from 'react';

// Simplified representation since we didn't install react-github-calendar yet
// We will mock the aesthetic block grid for the heatmap
export function GitHubHeatmap() {
  // Generate random mock contribution data
  const weeks = Array.from({ length: 52 });
  const getLevelColor = (level: number) => {
    switch(level) {
      case 1: return 'bg-emerald-900/40';
      case 2: return 'bg-emerald-800/60';
      case 3: return 'bg-emerald-600/80';
      case 4: return 'bg-emerald-400';
      default: return 'bg-zinc-900';
    }
  };

  return (
    <div className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-6 font-mono">
      <h3 className="text-zinc-400 mb-4 text-sm">github.com/AsyncNigam</h3>
      <div className="flex gap-1 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-zinc-700">
        {weeks.map((_, i) => (
          <div key={i} className="flex flex-col gap-1">
            {Array.from({ length: 7 }).map((_, j) => {
              const level = Math.floor(Math.random() * 5);
              return (
                <div 
                  key={j} 
                  className={`w-3 h-3 rounded-sm ${getLevelColor(level)}`}
                  title={`Contributions on day`}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

export function YouTubeMonitor({ videoId }: { videoId: string }) {
  return (
    <div className="w-full aspect-video bg-black border border-zinc-800 rounded-xl overflow-hidden relative shadow-2xl">
      <div className="absolute inset-0 pointer-events-none border-[8px] border-zinc-900 z-10 rounded-xl rounded-b-none" />
      <div className="absolute bottom-0 inset-x-0 h-4 bg-zinc-800 z-10 flex justify-center">
        <div className="w-16 h-1 bg-zinc-600 mt-1 rounded-full" />
      </div>
      <iframe
        className="w-full h-full"
        src={`https://www.youtube.com/embed/${videoId}?autoplay=0&controls=1&rel=0`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
}
