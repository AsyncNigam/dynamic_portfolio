"use client";

import React, { useState, useRef, useEffect } from 'react';

export default function InteractiveTerminal() {
  const [isOpen, setIsOpen] = useState(false);
  const [history, setHistory] = useState<{ command: string; output: React.ReactNode }[]>([]);
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === '`') {
        setIsOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const command = input.trim();
    let output: React.ReactNode = '';

    switch (command.toLowerCase()) {
      case 'help':
        output = (
          <div className="text-emerald-400">
            Available commands:<br />
            - help: Show this message<br />
            - projects --filter=[type]: List projects (e.g. android, backend)<br />
            - download-resume: Download master resume PDF<br />
            - clear: Clear terminal
          </div>
        );
        break;
      case 'clear':
        setHistory([]);
        setInput('');
        return;
      case 'download-resume':
        output = <div className="text-blue-400">Initiating download... (Simulated)</div>;
        break;
      default:
        if (command.startsWith('projects')) {
          output = <div className="text-zinc-300">Fetching projects...</div>;
        } else {
          output = <div className="text-red-400">Command not found: {command}</div>;
        }
    }

    setHistory((prev) => [...prev, { command, output }]);
    setInput('');
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 bg-zinc-900 border border-zinc-700 p-3 rounded-full text-zinc-400 hover:text-white hover:border-zinc-500 transition-colors z-50 shadow-lg group"
      >
        <span className="font-mono text-sm group-hover:hidden">Terminal</span>
        <span className="font-mono text-sm hidden group-hover:inline">Ctrl + `</span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 w-[500px] h-[350px] bg-zinc-950/95 backdrop-blur border border-zinc-800 rounded-lg shadow-2xl flex flex-col overflow-hidden z-50 font-mono text-sm">
      <div className="bg-zinc-900 px-4 py-2 border-b border-zinc-800 flex justify-between items-center cursor-move">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80 cursor-pointer" onClick={() => setIsOpen(false)} />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
        </div>
        <span className="text-zinc-500 text-xs">developer@nexus: ~</span>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        <div className="text-emerald-500 mb-4">
          Welcome to the interactive console.<br/>
          Type &apos;help&apos; to see available commands.
        </div>
        
        {history.map((item, i) => (
          <div key={i}>
            <div className="flex gap-2">
              <span className="text-blue-400">➜</span>
              <span className="text-emerald-400">~</span>
              <span className="text-white">{item.command}</span>
            </div>
            <div className="ml-4 mt-1">{item.output}</div>
          </div>
        ))}
        
        <form onSubmit={handleCommand} className="flex gap-2 mt-2">
          <span className="text-blue-400">➜</span>
          <span className="text-emerald-400">~</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-transparent outline-none text-white placeholder-zinc-700"
            spellCheck="false"
            autoComplete="off"
            autoFocus
          />
        </form>
      </div>
    </div>
  );
}
