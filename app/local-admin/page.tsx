import React from 'react';

export default function LocalAdminPage() {
  if (process.env.NODE_ENV !== 'development') {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-red-500 font-mono text-xl">
        [ACCESS DENIED: LOCAL ADMIN ONLY]
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-emerald-400 font-mono p-8">
      <header className="mb-12 border-b border-emerald-900 pb-4">
        <h1 className="text-3xl font-bold tracking-tighter">/local-admin</h1>
        <p className="text-zinc-500 mt-2">Secure Local Control Panel. Bypassing production auth via environment variables.</p>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <section className="bg-zinc-900 border border-zinc-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-white">Firestore Mutations</h2>
          <div className="space-y-4">
            <button className="w-full bg-emerald-900/30 border border-emerald-800 hover:bg-emerald-900/50 text-emerald-300 py-3 rounded transition-colors">
              [Execute Seed Script]
            </button>
            <button className="w-full bg-blue-900/30 border border-blue-800 hover:bg-blue-900/50 text-blue-300 py-3 rounded transition-colors">
              [Sync Project Arrays]
            </button>
          </div>
        </section>
        
        <section className="bg-zinc-900 border border-zinc-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-white">Storage Overwrites</h2>
          <div className="space-y-4">
            <div className="border border-dashed border-zinc-700 p-8 text-center rounded bg-black/50">
              <p className="text-zinc-500 mb-2">Drop Master Resume PDF here</p>
              <button className="bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2 rounded text-sm transition-colors">
                Select File
              </button>
            </div>
            <button className="w-full bg-red-900/30 border border-red-800 hover:bg-red-900/50 text-red-300 py-3 rounded transition-colors">
              [FORCE OVERWRITE]
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
