import React from 'react';
import InteractiveTerminal from '@/components/terminal/InteractiveTerminal';
import SystemArchitectureCanvas from '@/components/canvas/SystemArchitectureCanvas';
import MobileMockup from '@/components/mockups/MobileMockup';
import { GitHubHeatmap, YouTubeMonitor } from '@/components/integrations/Integrations';
import { ScrollInversionTrack, CinematicZoom } from '@/components/animations/GSAPWrappers';

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white selection:bg-emerald-500/30">
      
      {/* Hero Section */}
      <section className="h-screen w-full flex flex-col items-center justify-center relative overflow-hidden px-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(52,211,153,0.05),transparent_60%)]" />
        <div className="z-10 max-w-4xl text-center space-y-6">
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter">
            Nigam Prasad Sahoo
          </h1>
          <p className="text-xl md:text-2xl text-emerald-400 font-mono tracking-tight">
            Android Developer & Backend Engineer
          </p>
          <p className="text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Building production-grade apps featuring post-quantum cryptography, offline-first architecture, and high-concurrency microservices.
          </p>
          <div className="pt-8 text-sm font-mono text-zinc-600 animate-pulse">
            Scroll to explore &darr;
          </div>
        </div>
      </section>

      {/* Projects - Scroll Inversion */}
      <ScrollInversionTrack>
        {/* Project 1: Quantum Safe Messenger */}
        <div className="w-[80vw] max-w-[1200px] shrink-0 h-full flex flex-col md:flex-row gap-12 items-center justify-center p-8">
          <div className="flex-1 space-y-6">
            <h2 className="text-5xl font-bold text-white">Quantum Safe Messenger</h2>
            <div className="flex gap-2 flex-wrap">
              <span className="px-3 py-1 bg-emerald-900/40 text-emerald-300 text-xs font-mono rounded-full border border-emerald-800">Kotlin</span>
              <span className="px-3 py-1 bg-emerald-900/40 text-emerald-300 text-xs font-mono rounded-full border border-emerald-800">C++ JNI</span>
              <span className="px-3 py-1 bg-emerald-900/40 text-emerald-300 text-xs font-mono rounded-full border border-emerald-800">Node.js</span>
            </div>
            <p className="text-zinc-400 text-lg leading-relaxed">
              Implemented a PQXDH hybrid key-exchange engine running ~10x faster than a JVM equivalent. Architected a stateless zero-knowledge relay server.
            </p>
          </div>
          <div className="flex-1 flex justify-center w-full">
            <CinematicZoom>
              <MobileMockup>
                <div className="flex flex-col h-full bg-zinc-900 text-white font-sans">
                  <div className="p-4 bg-zinc-800 border-b border-zinc-700 flex justify-between items-center">
                    <span className="font-bold">Quantum Chat</span>
                    <span className="text-emerald-400 text-xs">🔒 Secured</span>
                  </div>
                  <div className="flex-1 p-4 flex flex-col gap-4">
                    <div className="self-end bg-emerald-600 p-3 rounded-2xl rounded-tr-sm max-w-[80%]">
                      Hello, is this channel secure?
                    </div>
                    <div className="self-start bg-zinc-800 p-3 rounded-2xl rounded-tl-sm max-w-[80%]">
                      Yes. Post-quantum encryption active. ML-KEM-768 negotiated.
                    </div>
                  </div>
                </div>
              </MobileMockup>
            </CinematicZoom>
          </div>
        </div>

        {/* Project 2: Flight Booking Backend */}
        <div className="w-[80vw] max-w-[1200px] shrink-0 h-full flex flex-col md:flex-row gap-12 items-center justify-center p-8">
          <div className="flex-1 space-y-6">
            <h2 className="text-5xl font-bold text-white">Flight Management System</h2>
            <div className="flex gap-2 flex-wrap">
              <span className="px-3 py-1 bg-blue-900/40 text-blue-300 text-xs font-mono rounded-full border border-blue-800">Microservices</span>
              <span className="px-3 py-1 bg-blue-900/40 text-blue-300 text-xs font-mono rounded-full border border-blue-800">RabbitMQ</span>
              <span className="px-3 py-1 bg-blue-900/40 text-blue-300 text-xs font-mono rounded-full border border-blue-800">PostgreSQL</span>
            </div>
            <p className="text-zinc-400 text-lg leading-relaxed">
              High-Concurrency Microservices Backend. Designed an API Gateway with custom request-throttling middleware, sustaining 1,000+ RPS.
            </p>
          </div>
          <div className="flex-1 flex justify-center w-full">
            <CinematicZoom>
              <SystemArchitectureCanvas />
            </CinematicZoom>
          </div>
        </div>
        
        {/* Project 3: Nexus AI App */}
        <div className="w-[80vw] max-w-[1200px] shrink-0 h-full flex flex-col md:flex-row gap-12 items-center justify-center p-8">
          <div className="flex-1 space-y-6">
            <h2 className="text-5xl font-bold text-white">Nexus Productivity</h2>
            <div className="flex gap-2 flex-wrap">
              <span className="px-3 py-1 bg-purple-900/40 text-purple-300 text-xs font-mono rounded-full border border-purple-800">Jetpack Compose</span>
              <span className="px-3 py-1 bg-purple-900/40 text-purple-300 text-xs font-mono rounded-full border border-purple-800">Gemini AI</span>
              <span className="px-3 py-1 bg-purple-900/40 text-purple-300 text-xs font-mono rounded-full border border-purple-800">Firebase</span>
            </div>
            <p className="text-zinc-400 text-lg leading-relaxed">
              AI-powered Android app. Integrated Gemini 2.0 Flash for context-aware summarization. Shipped offline-first architecture with Room DB caching.
            </p>
          </div>
          <div className="flex-1 flex justify-center w-full">
            <CinematicZoom>
              <YouTubeMonitor videoId="dQw4w9WgXcQ" /> {/* Placeholder ID */}
            </CinematicZoom>
          </div>
        </div>
      </ScrollInversionTrack>

      {/* Stats Section */}
      <section className="py-32 px-8 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-8 tracking-tighter">Contributions</h2>
            <p className="text-zinc-400 mb-8 leading-relaxed">
              Regularly building open-source tools, practicing competitive programming, and engaging with the developer community.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 border border-zinc-800 rounded-lg bg-zinc-900">
                <div className="text-3xl font-bold text-emerald-400">180+</div>
                <div className="text-zinc-500 text-sm mt-1">LeetCode / GFG</div>
              </div>
              <div className="p-4 border border-zinc-800 rounded-lg bg-zinc-900">
                <div className="text-3xl font-bold text-emerald-400">GDG</div>
                <div className="text-zinc-500 text-sm mt-1">Core Member</div>
              </div>
            </div>
          </div>
          <div>
            <GitHubHeatmap />
          </div>
        </div>
      </section>

      {/* Terminal Invocation Hint */}
      <div className="fixed bottom-20 right-4 text-zinc-600 font-mono text-xs hidden md:block">
        Press <kbd className="px-2 py-1 bg-zinc-800 rounded">Ctrl</kbd> + <kbd className="px-2 py-1 bg-zinc-800 rounded">`</kbd> to open terminal
      </div>
      
      <InteractiveTerminal />
    </main>
  );
}
