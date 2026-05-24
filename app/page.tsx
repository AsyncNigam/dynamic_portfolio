"use client";

import React from "react";
import portfolioData from "@/data/portfolio.json";
import InteractiveTerminal from "@/components/terminal/InteractiveTerminal";
import SystemArchitectureCanvas from "@/components/canvas/SystemArchitectureCanvas";
import MobileMockup from "@/components/mockups/MobileMockup";
import { GitHubHeatmap } from "@/components/integrations/Integrations";
import {
  ScrollInversionTrack,
  CinematicZoom,
  FadeInUp,
} from "@/components/animations/GSAPWrappers";

/* ─── Color Map — maps JSON color keys to Tailwind classes ─── */

const COLOR_CLASSES: Record<string, { tag: string; metric: string; border: string; dot: string }> = {
  emerald: {
    tag: "bg-emerald-900/40 text-emerald-300 border-emerald-800",
    metric: "text-emerald-400",
    border: "border-emerald-500/30",
    dot: "bg-emerald-400",
  },
  blue: {
    tag: "bg-blue-900/40 text-blue-300 border-blue-800",
    metric: "text-blue-400",
    border: "border-blue-500/30",
    dot: "bg-blue-400",
  },
  purple: {
    tag: "bg-purple-900/40 text-purple-300 border-purple-800",
    metric: "text-purple-400",
    border: "border-purple-500/30",
    dot: "bg-purple-400",
  },
  red: {
    tag: "bg-red-900/40 text-red-300 border-red-800",
    metric: "text-red-400",
    border: "border-red-500/30",
    dot: "bg-red-400",
  },
  orange: {
    tag: "bg-orange-900/40 text-orange-300 border-orange-800",
    metric: "text-orange-400",
    border: "border-orange-500/30",
    dot: "bg-orange-400",
  },
  amber: {
    tag: "bg-amber-900/40 text-amber-300 border-amber-800",
    metric: "text-amber-400",
    border: "border-amber-500/30",
    dot: "bg-amber-400",
  },
  indigo: {
    tag: "bg-indigo-900/40 text-indigo-300 border-indigo-800",
    metric: "text-indigo-400",
    border: "border-indigo-500/30",
    dot: "bg-indigo-400",
  },
};

/* ─── Typed interfaces for JSON data ─── */

interface Highlight {
  metric: string;
  label: string;
  detail: string;
}

interface ChatBubble {
  sender: string;
  text: string;
}

interface NoteItem {
  title: string;
  preview: string;
  tag: string;
}

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

interface Project {
  id: string;
  title: string;
  type: string;
  tagline: string;
  githubLink?: string;
  youtubeId?: string;
  tech: string[];
  color: string;
  highlights: Highlight[];
  architecture?: {
    nodes: ArchNode[];
    queues: ArchQueue[];
  };
  mockupScreens?: {
    chatBubbles?: ChatBubble[];
    notesList?: NoteItem[];
  };
}

/* ─── Mobile App Screen Renderers ─── */

function ChatScreen({ project, colors }: { project: Project; colors: typeof COLOR_CLASSES.emerald }) {
  const bubbles = project.mockupScreens?.chatBubbles || [];
  const appName = project.id === "coffee-shop-v2" ? "CoffeeShop" : project.title.split(" ")[0];
  return (
    <div className="flex flex-col h-full bg-zinc-900 text-white font-sans text-sm">
      <div className="p-3 bg-zinc-800/80 border-b border-zinc-700/50 flex justify-between items-center">
        <span className="font-bold text-xs">{appName}</span>
        <span className={`${colors.metric} text-[10px] flex items-center gap-1`}>
          <span className={`w-1.5 h-1.5 rounded-full ${colors.dot} animate-pulse`} />
          Active
        </span>
      </div>
      <div className="flex-1 p-3 flex flex-col gap-3 overflow-hidden">
        {bubbles.map((msg, i) => (
          <div
            key={i}
            className={`max-w-[85%] p-2.5 rounded-2xl text-[11px] leading-relaxed ${
              msg.sender === "user"
                ? "self-end bg-emerald-600/80 rounded-tr-sm"
                : "self-start bg-zinc-800 rounded-tl-sm"
            }`}
          >
            {msg.text}
          </div>
        ))}
        <div className="self-start bg-zinc-800 p-2.5 rounded-2xl rounded-tl-sm">
          <div className="flex gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-zinc-500 animate-pulse" />
            <div className="w-1.5 h-1.5 rounded-full bg-zinc-500 animate-pulse [animation-delay:0.2s]" />
            <div className="w-1.5 h-1.5 rounded-full bg-zinc-500 animate-pulse [animation-delay:0.4s]" />
          </div>
        </div>
      </div>
      <div className="p-2 border-t border-zinc-700/50 flex items-center gap-2">
        <div className="flex-1 bg-zinc-800 rounded-full px-3 py-1.5 text-[10px] text-zinc-500">
          Type a message...
        </div>
        <div className={`w-7 h-7 rounded-full ${colors.dot.replace("bg-", "bg-")} flex items-center justify-center text-[10px]`}>
          ▶
        </div>
      </div>
    </div>
  );
}

function NotesScreen({ project, colors }: { project: Project; colors: typeof COLOR_CLASSES.emerald }) {
  const notes = project.mockupScreens?.notesList || [];
  const appName = project.title.split(" ")[0];
  return (
    <div className="flex flex-col h-full bg-zinc-900 text-white font-sans text-sm">
      <div className="p-3 bg-zinc-800/80 border-b border-zinc-700/50">
        <span className="font-bold text-xs">{appName}</span>
        <span className={`${colors.metric} text-[10px] ml-2`}>
          {project.id === "focus-flow" ? "Tracking" : "AI Powered"}
        </span>
      </div>
      <div className="flex-1 p-3 space-y-2 overflow-hidden">
        {notes.map((note, i) => (
          <div key={i} className="p-3 rounded-xl bg-zinc-800/60 border border-zinc-700/30">
            <div className="flex justify-between items-start">
              <span className="font-medium text-[11px]">{note.title}</span>
              <span className={`text-[9px] px-1.5 py-0.5 rounded-full ${colors.tag}`}>
                {note.tag}
              </span>
            </div>
            <p className="text-zinc-500 text-[10px] mt-1">{note.preview}</p>
          </div>
        ))}
        <div className={`p-3 rounded-xl border ${colors.border} bg-zinc-800/20`}>
          <div className={`text-[10px] ${colors.metric} font-mono mb-1`}>
            {project.id === "focus-flow" ? "📊 Focus Analytics" : "✨ AI Summary"}
          </div>
          <div className="text-[10px] text-zinc-400 leading-relaxed">
            {project.id === "focus-flow"
              ? "Monitoring cognitive load patterns across active sessions..."
              : "Processing contextual data from recent entries..."}
          </div>
        </div>
      </div>
      <div className={`absolute bottom-10 right-6 w-10 h-10 rounded-full ${colors.dot.replace("bg-", "bg-")} flex items-center justify-center text-lg shadow-lg`}>
        +
      </div>
    </div>
  );
}

/* ─── Project Visual — picks the right renderer ─── */

function ProjectVisual({ project, colors }: { project: Project; colors: typeof COLOR_CLASSES.emerald }) {
  // Architecture diagram for backend / fullstack
  if (project.architecture) {
    return (
      <SystemArchitectureCanvas
        architecture={project.architecture}
        accentColor={project.color as "blue" | "indigo" | "emerald" | "purple" | "orange" | "amber"}
      />
    );
  }

  // Mobile mockup
  if (project.mockupScreens?.chatBubbles) {
    return (
      <MobileMockup>
        <ChatScreen project={project} colors={colors} />
      </MobileMockup>
    );
  }

  if (project.mockupScreens?.notesList) {
    return (
      <MobileMockup>
        <NotesScreen project={project} colors={colors} />
      </MobileMockup>
    );
  }

  return null;
}

/* ═══════════════════════════════════════════════
 *  MAIN PAGE
 * ═══════════════════════════════════════════════ */

export default function Home() {
  const { profile, skills, projects, experience } = portfolioData;
  const typedProjects = projects as unknown as Project[];

  return (
    <main className="min-h-screen bg-zinc-950 text-white selection:bg-emerald-500/30">
      {/* ═══ HERO ═══ */}
      <section className="h-screen w-full flex flex-col items-center justify-center relative overflow-hidden px-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(52,211,153,0.06),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(96,165,250,0.04),transparent_50%)]" />

        <FadeInUp>
          <div className="z-10 max-w-4xl text-center space-y-6">
            <div className="inline-block px-4 py-1.5 rounded-full border border-zinc-800 bg-zinc-900/50 text-xs font-mono text-zinc-400 mb-4">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 mr-2 animate-pulse" />
              Available for opportunities
            </div>
            <h1 className="text-5xl sm:text-6xl md:text-8xl font-black tracking-tighter leading-[0.9]">
              {profile.name.split(" ").map((word, i) => (
                <span key={i} className={i === 2 ? "text-gradient" : ""}>
                  {word}{" "}
                </span>
              ))}
            </h1>
            <p className="text-lg md:text-2xl text-emerald-400 font-mono tracking-tight">
              {profile.role}
            </p>
            <p className="text-zinc-400 max-w-2xl mx-auto leading-relaxed text-sm md:text-base">
              {profile.summary}
            </p>

            <div className="flex justify-center gap-4 pt-4">
              <a href={profile.socials.github} target="_blank" rel="noopener noreferrer"
                className="px-4 py-2 rounded-lg border border-zinc-800 bg-zinc-900/50 text-zinc-400 text-sm font-mono hover:border-emerald-800 hover:text-emerald-400 transition-colors">
                GitHub
              </a>
              <a href={profile.socials.linkedin} target="_blank" rel="noopener noreferrer"
                className="px-4 py-2 rounded-lg border border-zinc-800 bg-zinc-900/50 text-zinc-400 text-sm font-mono hover:border-blue-800 hover:text-blue-400 transition-colors">
                LinkedIn
              </a>
            </div>

            <div className="pt-10 text-xs font-mono text-zinc-600 animate-pulse">
              Scroll to explore &darr;
            </div>
          </div>
        </FadeInUp>
      </section>

      {/* ═══ SKILLS ═══ */}
      <section className="py-28 px-8 max-w-6xl mx-auto">
        <FadeInUp>
          <div className="flex items-center gap-3 mb-12">
            <span className="w-8 h-px bg-emerald-500/50" />
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">Technical Arsenal</h2>
          </div>
        </FadeInUp>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skills.map((category, i) => {
            const colors = COLOR_CLASSES[category.color] || COLOR_CLASSES.emerald;
            return (
              <FadeInUp key={category.category} delay={i * 0.1}>
                <div className={`glass-card p-6 border ${colors.border}`}>
                  <h3 className={`text-sm font-mono ${colors.metric} mb-4 uppercase tracking-widest`}>
                    {category.category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {category.items.map((item) => (
                      <span key={item} className={`px-3 py-1 text-xs font-mono rounded-full border ${colors.tag}`}>
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </FadeInUp>
            );
          })}
        </div>
      </section>

      {/* ═══ PROJECTS — HORIZONTAL SCROLL ═══ */}
      <ScrollInversionTrack>
        {typedProjects.map((project) => {
          const colors = COLOR_CLASSES[project.color] || COLOR_CLASSES.emerald;

          return (
            <div
              key={project.id}
              className="w-[85vw] max-w-[1200px] shrink-0 h-full flex flex-col lg:flex-row gap-10 items-center justify-center p-6 md:p-10"
            >
              {/* Left: Text */}
              <div className="flex-1 space-y-5 max-w-xl">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${colors.dot}`} />
                  <span className="text-zinc-500 text-xs font-mono uppercase tracking-widest">
                    {project.type}
                  </span>
                </div>
                <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
                  {project.title}
                </h2>
                <p className={`text-sm font-mono ${colors.metric}`}>{project.tagline}</p>

                {/* Tech */}
                <div className="flex gap-2 flex-wrap">
                  {project.tech.map((t) => (
                    <span key={t} className={`px-3 py-1 text-[11px] font-mono rounded-full border ${colors.tag}`}>
                      {t}
                    </span>
                  ))}
                </div>

                {/* Highlights */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  {project.highlights.map((h) => (
                    <div key={h.label} className="p-3 rounded-lg bg-zinc-900/60 border border-zinc-800/60">
                      <div className={`text-xl font-bold ${colors.metric}`}>{h.metric}</div>
                      <div className="text-zinc-400 text-xs font-medium">{h.label}</div>
                      <div className="text-zinc-600 text-[10px] mt-0.5">{h.detail}</div>
                    </div>
                  ))}
                </div>

                {/* Action Links */}
                <div className="flex gap-3 pt-2">
                  {project.githubLink && (
                    <a href={project.githubLink} target="_blank" rel="noopener noreferrer"
                      className={`px-4 py-2 rounded-lg border text-xs font-mono transition-colors ${colors.border} text-zinc-400 hover:${colors.metric}`}>
                      ↗ Source Code
                    </a>
                  )}
                  {project.youtubeId && (
                    <a href={`https://www.youtube.com/watch?v=${project.youtubeId}`} target="_blank" rel="noopener noreferrer"
                      className="px-4 py-2 rounded-lg border border-red-500/30 text-xs font-mono text-zinc-400 hover:text-red-400 transition-colors">
                      ▶ Watch Demo
                    </a>
                  )}
                </div>
              </div>

              {/* Right: Visual */}
              <div className="flex-1 flex justify-center w-full max-w-md">
                <CinematicZoom>
                  <ProjectVisual project={project} colors={colors} />
                </CinematicZoom>
              </div>
            </div>
          );
        })}
      </ScrollInversionTrack>

      {/* ═══ EDUCATION & STATS ═══ */}
      <section className="py-28 px-8 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <FadeInUp>
              <div className="flex items-center gap-3 mb-10">
                <span className="w-8 h-px bg-blue-500/50" />
                <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">Background</h2>
              </div>
            </FadeInUp>

            <FadeInUp delay={0.1}>
              <div className="glass-card p-6 border border-blue-500/20 mb-6">
                <div className="text-blue-400 text-xs font-mono uppercase tracking-widest mb-3">Education</div>
                <h3 className="text-lg font-bold">{profile.education.degree}</h3>
                <p className="text-zinc-400 text-sm">{profile.education.institution}</p>
                <div className="flex gap-4 mt-3">
                  <span className="text-emerald-400 text-sm font-mono font-bold">GPA: {profile.education.gpa}</span>
                  <span className="text-zinc-500 text-sm font-mono">{profile.education.years}</span>
                </div>
              </div>
            </FadeInUp>

            <div className="space-y-3">
              {experience.map((exp, i) => (
                <FadeInUp key={exp.role} delay={0.15 + i * 0.1}>
                  <div className="glass-card p-5 border border-zinc-800/60">
                    <h4 className="text-sm font-bold text-white">{exp.role}</h4>
                    <p className="text-zinc-500 text-xs mt-1">{exp.detail}</p>
                  </div>
                </FadeInUp>
              ))}
            </div>
          </div>

          <div>
            <FadeInUp>
              <div className="flex items-center gap-3 mb-10">
                <span className="w-8 h-px bg-emerald-500/50" />
                <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">Contributions</h2>
              </div>
            </FadeInUp>

            <FadeInUp delay={0.1}>
              <GitHubHeatmap />
            </FadeInUp>

            <FadeInUp delay={0.2}>
              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="glass-card p-4 border border-zinc-800/60 text-center">
                  <div className="text-2xl font-bold text-emerald-400">180+</div>
                  <div className="text-zinc-500 text-[10px] mt-1 font-mono">LeetCode</div>
                </div>
                <div className="glass-card p-4 border border-zinc-800/60 text-center">
                  <div className="text-2xl font-bold text-blue-400">50+</div>
                  <div className="text-zinc-500 text-[10px] mt-1 font-mono">Mentored</div>
                </div>
                <div className="glass-card p-4 border border-zinc-800/60 text-center">
                  <div className="text-2xl font-bold text-purple-400">9.87</div>
                  <div className="text-zinc-500 text-[10px] mt-1 font-mono">GPA</div>
                </div>
              </div>
            </FadeInUp>
          </div>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="border-t border-zinc-800/50 py-12 px-8">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <p className="text-zinc-500 text-sm font-mono">
            {profile.email} &middot; {profile.phone}
          </p>
          <p className="text-zinc-700 text-xs font-mono">
            Built with Next.js, GSAP, Tailwind CSS &middot; Deployed on Firebase
          </p>
        </div>
      </footer>

      <div className="fixed bottom-20 right-4 text-zinc-700 font-mono text-[10px] hidden md:block z-30">
        <kbd className="px-1.5 py-0.5 bg-zinc-900 border border-zinc-800 rounded text-[9px]">Ctrl</kbd>
        {" + "}
        <kbd className="px-1.5 py-0.5 bg-zinc-900 border border-zinc-800 rounded text-[9px]">`</kbd>
        {" terminal"}
      </div>

      <InteractiveTerminal />
    </main>
  );
}
