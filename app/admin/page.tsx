'use client';

import { useState, useRef, useCallback, type DragEvent, type ChangeEvent } from 'react';

const isDev = process.env.NODE_ENV === 'development';

const COLLECTIONS = ['profile', 'skills', 'projects', 'experience'] as const;
type Collection = (typeof COLLECTIONS)[number];

const PLACEHOLDER_JSON: Record<Collection, string> = {
  profile: JSON.stringify(
    {
      name: 'Your Name',
      title: 'Full-Stack Developer',
      bio: 'Describe yourself here...',
      email: 'you@example.com',
      github: 'https://github.com/you',
      linkedin: 'https://linkedin.com/in/you',
    },
    null,
    2
  ),
  skills: JSON.stringify(
    {
      categories: [
        {
          name: 'Frontend',
          items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
        },
        {
          name: 'Backend',
          items: ['Node.js', 'Python', 'PostgreSQL'],
        },
      ],
    },
    null,
    2
  ),
  projects: JSON.stringify(
    {
      items: [
        {
          title: 'Project Name',
          description: 'What it does...',
          tech: ['React', 'Node.js'],
          url: 'https://project.example.com',
          github: 'https://github.com/you/project',
        },
      ],
    },
    null,
    2
  ),
  experience: JSON.stringify(
    {
      items: [
        {
          company: 'Company Name',
          role: 'Software Engineer',
          period: '2023 - Present',
          description: 'What you did...',
        },
      ],
    },
    null,
    2
  ),
};

interface LogEntry {
  id: number;
  timestamp: string;
  type: 'info' | 'success' | 'error' | 'warn';
  message: string;
}

/* ─────────────────── ACCESS DENIED ─────────────────── */

function AccessDenied() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black font-mono select-none">
      <div className="text-center space-y-6">
        <div className="text-red-500/20 text-[10rem] leading-none font-bold">403</div>
        <div className="relative -mt-20">
          <p className="text-red-500 text-2xl tracking-widest font-bold animate-pulse">
            ACCESS DENIED
          </p>
          <p className="text-zinc-600 text-sm mt-3">
            This panel is restricted to local development environments.
          </p>
          <p className="text-zinc-700 text-xs mt-1">
            NODE_ENV !== &apos;development&apos;
          </p>
        </div>
        <div className="flex items-center justify-center gap-2 text-zinc-800 text-xs mt-8">
          <span className="inline-block w-2 h-2 rounded-full bg-red-900" />
          Connection rejected
        </div>
      </div>
    </div>
  );
}

/* ─────────────────── ADMIN PANEL ─────────────────── */

export default function AdminPage() {
  if (!isDev) return <AccessDenied />;

  return <AdminPanel />;
}

function AdminPanel() {
  const [activeTab, setActiveTab] = useState<Collection>('profile');
  const [jsonValues, setJsonValues] = useState<Record<Collection, string>>(
    () => ({ ...PLACEHOLDER_JSON })
  );
  const [logs, setLogs] = useState<LogEntry[]>([
    {
      id: 0,
      timestamp: new Date().toISOString().slice(11, 19),
      type: 'info',
      message: 'Admin panel initialized. Ready for operations.',
    },
  ]);
  const [isPushing, setIsPushing] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const logEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const logIdRef = useRef(1);

  const addLog = useCallback((type: LogEntry['type'], message: string) => {
    const entry: LogEntry = {
      id: logIdRef.current++,
      timestamp: new Date().toISOString().slice(11, 19),
      type,
      message,
    };
    setLogs((prev) => [...prev, entry]);
    setTimeout(() => logEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 50);
  }, []);

  /* ── JSON Editor handlers ── */

  const handleJsonChange = (value: string) => {
    setJsonValues((prev) => ({ ...prev, [activeTab]: value }));
  };

  const handleFormat = () => {
    try {
      const parsed = JSON.parse(jsonValues[activeTab]);
      const formatted = JSON.stringify(parsed, null, 2);
      setJsonValues((prev) => ({ ...prev, [activeTab]: formatted }));
      addLog('info', `Formatted JSON for "${activeTab}".`);
    } catch {
      addLog('error', `Invalid JSON in "${activeTab}" — cannot format.`);
    }
  };

  const handlePush = async () => {
    const raw = jsonValues[activeTab];

    let parsed: Record<string, unknown>;
    try {
      parsed = JSON.parse(raw);
    } catch {
      addLog('error', `Parse error: invalid JSON in "${activeTab}".`);
      return;
    }

    setIsPushing(true);
    addLog('info', `Pushing "${activeTab}" to Firestore…`);

    try {
      // Dynamic import to avoid bundling Firebase in production
      const { db } = await import('@/lib/firebase/client');
      const { doc, setDoc, collection: firestoreCollection } = await import('firebase/firestore');

      if (activeTab === 'projects') {
        // Projects are stored as individual docs
        const items = Array.isArray(parsed) ? parsed : (parsed.items || [parsed]);
        for (const project of items as Array<Record<string, unknown>>) {
          const projectId = (project.id as string) || (project.title as string || 'untitled').toLowerCase().replace(/\s+/g, '-');
          await setDoc(doc(firestoreCollection(db, 'projects'), projectId), project);
          addLog('success', `✓ Project: ${project.title || projectId}`);
        }
      } else {
        await setDoc(doc(firestoreCollection(db, 'portfolio'), activeTab), parsed);
        addLog('success', `✓ Pushed "${activeTab}" to portfolio/${activeTab}`);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Unknown error';
      addLog('error', `Firestore write failed: ${msg}`);
    } finally {
      setIsPushing(false);
    }
  };

  /* ── File Upload handlers ── */

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type === 'application/pdf') {
      setSelectedFile(file);
      addLog('info', `File selected: ${file.name} (${(file.size / 1024).toFixed(1)} KB)`);
    } else {
      addLog('error', 'Invalid file type. Only .pdf files are accepted.');
    }
  };

  const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      addLog('info', `File selected: ${file.name} (${(file.size / 1024).toFixed(1)} KB)`);
    }
  };

  const handleUpload = () => {
    if (!selectedFile) {
      addLog('warn', 'No file selected for upload.');
      return;
    }
    // TODO: Implement actual Firebase Storage upload
    addLog('warn', `Upload not yet implemented. File "${selectedFile.name}" queued.`);
    addLog('info', 'Configure Firebase Storage and add upload logic to /api/admin/upload.');
  };

  /* ── Log color helpers ── */

  const logColor = (type: LogEntry['type']) => {
    switch (type) {
      case 'success':
        return 'text-emerald-400';
      case 'error':
        return 'text-red-400';
      case 'warn':
        return 'text-amber-400';
      default:
        return 'text-zinc-400';
    }
  };

  const logPrefix = (type: LogEntry['type']) => {
    switch (type) {
      case 'success':
        return '✓';
      case 'error':
        return '✗';
      case 'warn':
        return '⚠';
      default:
        return '›';
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-300 font-mono selection:bg-emerald-900/50 selection:text-emerald-300">
      {/* ── Header ── */}
      <header className="sticky top-0 z-50 bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <span className="w-3 h-3 rounded-full bg-red-500/80" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
            </div>
            <h1 className="text-lg text-white font-bold tracking-tight">
              /admin{' '}
              <span className="text-zinc-600 font-normal">· local-only</span>
            </h1>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-emerald-500">DEV</span>
            </span>
            <span className="text-zinc-700">|</span>
            <span className="text-zinc-600">
              {new Date().toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* ── JSON Editor Section ── */}
        <section className="bg-zinc-900/50 border border-zinc-800 rounded-xl overflow-hidden">
          <div className="border-b border-zinc-800 px-6 py-4 flex items-center justify-between">
            <div>
              <h2 className="text-white font-semibold text-base">Firestore JSON Editor</h2>
              <p className="text-zinc-600 text-xs mt-0.5">
                Edit collection data and push to Firestore
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleFormat}
                className="px-3 py-1.5 text-xs bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-md border border-zinc-700 transition-colors"
              >
                Format
              </button>
              <button
                onClick={handlePush}
                disabled={isPushing}
                className="px-4 py-1.5 text-xs bg-emerald-900/40 hover:bg-emerald-900/60 text-emerald-400 rounded-md border border-emerald-800/50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {isPushing ? 'Pushing…' : 'Push to Firestore'}
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-zinc-800">
            {COLLECTIONS.map((col) => (
              <button
                key={col}
                onClick={() => setActiveTab(col)}
                className={`px-5 py-3 text-xs transition-colors relative ${
                  activeTab === col
                    ? 'text-emerald-400 bg-zinc-900'
                    : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900/30'
                }`}
              >
                {col}
                {activeTab === col && (
                  <span className="absolute bottom-0 left-0 right-0 h-px bg-emerald-500" />
                )}
              </button>
            ))}
          </div>

          {/* Editor */}
          <div className="p-4">
            <textarea
              value={jsonValues[activeTab]}
              onChange={(e) => handleJsonChange(e.target.value)}
              spellCheck={false}
              className="w-full h-80 bg-black/60 text-emerald-300/90 text-sm leading-relaxed p-4 rounded-lg border border-zinc-800 focus:border-emerald-800 focus:outline-none focus:ring-1 focus:ring-emerald-900/50 resize-y font-mono placeholder:text-zinc-700"
              placeholder="Paste your JSON here…"
            />
            <div className="flex items-center justify-between mt-2 text-xs text-zinc-600">
              <span>Collection: {activeTab}</span>
              <span>{jsonValues[activeTab].length} chars</span>
            </div>
          </div>
        </section>

        {/* ── Resume Upload Section ── */}
        <section className="bg-zinc-900/50 border border-zinc-800 rounded-xl overflow-hidden">
          <div className="border-b border-zinc-800 px-6 py-4">
            <h2 className="text-white font-semibold text-base">Resume PDF Upload</h2>
            <p className="text-zinc-600 text-xs mt-0.5">
              Drag &amp; drop or select a PDF to upload to Firebase Storage
            </p>
          </div>

          <div className="p-6 space-y-4">
            {/* Drop Zone */}
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`relative border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-all duration-200 ${
                isDragging
                  ? 'border-emerald-500 bg-emerald-950/20'
                  : 'border-zinc-700 bg-black/30 hover:border-zinc-600 hover:bg-black/50'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf"
                onChange={handleFileInput}
                className="hidden"
              />

              <div className="space-y-3">
                <div className="text-3xl text-zinc-600">
                  {isDragging ? '⬇' : '📄'}
                </div>
                <p className="text-zinc-400 text-sm">
                  {isDragging
                    ? 'Drop your PDF here…'
                    : 'Drag & drop your resume PDF, or click to browse'}
                </p>
                <p className="text-zinc-700 text-xs">.pdf files only</p>
              </div>
            </div>

            {/* Selected File Info */}
            {selectedFile && (
              <div className="flex items-center justify-between bg-black/40 border border-zinc-800 rounded-lg px-4 py-3">
                <div className="flex items-center gap-3">
                  <span className="text-emerald-500 text-lg">📎</span>
                  <div>
                    <p className="text-zinc-300 text-sm">{selectedFile.name}</p>
                    <p className="text-zinc-600 text-xs">
                      {(selectedFile.size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleUpload}
                  className="px-4 py-2 text-xs bg-emerald-900/40 hover:bg-emerald-900/60 text-emerald-400 rounded-md border border-emerald-800/50 transition-colors"
                >
                  Upload to Firebase Storage
                </button>
              </div>
            )}
          </div>
        </section>

        {/* ── Status Log ── */}
        <section className="bg-zinc-900/50 border border-zinc-800 rounded-xl overflow-hidden">
          <div className="border-b border-zinc-800 px-6 py-4 flex items-center justify-between">
            <div>
              <h2 className="text-white font-semibold text-base">Status Log</h2>
              <p className="text-zinc-600 text-xs mt-0.5">Operation output stream</p>
            </div>
            <button
              onClick={() => {
                setLogs([]);
                logIdRef.current = 0;
              }}
              className="px-3 py-1.5 text-xs bg-zinc-800 hover:bg-zinc-700 text-zinc-400 rounded-md border border-zinc-700 transition-colors"
            >
              Clear
            </button>
          </div>

          <div className="h-52 overflow-y-auto bg-black/60 p-4 text-xs leading-relaxed scrollbar-thin">
            {logs.length === 0 && (
              <p className="text-zinc-700 italic">No log entries yet.</p>
            )}
            {logs.map((log) => (
              <div key={log.id} className="flex gap-2">
                <span className="text-zinc-700 shrink-0">[{log.timestamp}]</span>
                <span className={`shrink-0 ${logColor(log.type)}`}>
                  {logPrefix(log.type)}
                </span>
                <span className={logColor(log.type)}>{log.message}</span>
              </div>
            ))}
            <div ref={logEndRef} />
          </div>
        </section>
      </main>

      {/* ── Footer ── */}
      <footer className="border-t border-zinc-800/50 mt-8">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between text-xs text-zinc-700">
          <span>dynamic-portfolio-ecosystem</span>
          <span>local admin · dev only</span>
        </div>
      </footer>
    </div>
  );
}
