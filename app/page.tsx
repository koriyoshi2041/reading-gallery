import Link from 'next/link';
import { getAllWonders } from '@/lib/wonders';
import MotionWrapper from '@/components/MotionWrapper';

export default async function HomePage() {
  const allWonders = await getAllWonders();
  
  if (!allWonders || allWonders.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center p-6 bg-black">
        <div className="glass-premium p-12 rounded-[2.5rem] text-center max-w-md">
          <h1 className="text-3xl font-bold text-white mb-4 tracking-tighter">Void Detected.</h1>
          <p className="text-zinc-500 mb-8 leading-relaxed font-light">
            The narrative space is awaiting its first resonance.
          </p>
          <div className="h-px w-full bg-white/10 my-6" />
          <p className="text-[10px] text-zinc-600 font-mono uppercase tracking-[0.3em]">
            STATUS: INITIALIZING
          </p>
        </div>
      </div>
    );
  }

  const latestWonder = allWonders[0];

  return (
    <div className="flex flex-col items-center">
      {/* Cinematic Hero */}
      <section className="w-full min-h-[90vh] flex flex-col items-center justify-center px-6 py-24 relative overflow-hidden">
        <MotionWrapper
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-5xl text-center z-10"
        >
          <div className="mb-16 inline-flex items-center space-x-3 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-blue-500"></span>
            </span>
            <span className="text-[10px] uppercase tracking-[0.4em] font-semibold text-zinc-400">
              Active Resonance
            </span>
          </div>
          
          <h1 className="text-7xl md:text-[10rem] font-bold tracking-tighter leading-[0.9] mb-12 text-mask">
            {latestWonder.title}
          </h1>
          
          <p className="text-zinc-400 text-xl md:text-2xl max-w-3xl mx-auto mb-20 leading-relaxed font-light">
            {latestWonder.excerpt || "A cinematic journey through the intricate layers of human connection and quiet moments of resonance."}
          </p>
          
          <Link 
            href={`/wonder/${latestWonder.slug}`}
            className="group relative inline-flex items-center px-16 py-5 overflow-hidden rounded-full bg-white text-black font-bold transition-all hover:scale-105 active:scale-95"
          >
            <span className="relative z-10 uppercase tracking-[0.3em] text-[10px]">Enter Narrative</span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-500 opacity-0 group-hover:opacity-10 transition-opacity" />
          </Link>
        </MotionWrapper>

        {/* Dynamic Background Element */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-30 pointer-events-none">
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/20 blur-[150px] rounded-full" />
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/10 blur-[120px] rounded-full" />
        </div>
      </section>

      {/* Narrative Archive */}
      <section className="w-full max-w-6xl px-6 pb-64">
        <MotionWrapper
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
          className="relative"
        >
          <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/10 pb-12">
            <div>
              <h2 className="text-4xl font-bold tracking-tighter text-white mb-4">Archives</h2>
              <p className="text-zinc-500 font-light text-lg">Stored resonances and past echoes.</p>
            </div>
            <div className="text-[10px] font-mono text-zinc-600 uppercase tracking-[0.3em]">
              Count: {allWonders.length}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allWonders.slice(1).map((wonder, index) => (
              <MotionWrapper
                key={wonder.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <Link 
                  href={`/wonder/${wonder.slug}`}
                  className="group block glass-premium p-10 rounded-[2.5rem] transition-all duration-500 hover:bg-white/10 hover:-translate-y-2 border-white/5 hover:border-white/20"
                >
                  <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.4em] mb-8">
                    {wonder.date || 'FEB 2026'}
                  </div>
                  <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors mb-6 leading-tight tracking-tight">
                    {wonder.title}
                  </h3>
                  <div className="flex items-center text-[10px] font-bold text-zinc-600 group-hover:text-zinc-400 transition-colors uppercase tracking-[0.3em] space-x-4">
                    <span>{wonder.readingTime} MINS</span>
                    <span className="h-px w-8 bg-zinc-800 group-hover:w-12 transition-all" />
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity">Read</span>
                  </div>
                </Link>
              </MotionWrapper>
            ))}
          </div>
        </MotionWrapper>
      </section>

      {/* Global Bottom Navigation */}
      <nav className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 glass px-10 py-4 rounded-full flex items-center space-x-12 shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10">
        <Link href="/" className="text-[10px] uppercase tracking-[0.3em] text-white/40 hover:text-white transition-all font-bold">Index</Link>
        <div className="w-px h-3 bg-white/10" />
        <Link href="/" className="text-[10px] uppercase tracking-[0.3em] text-white/40 hover:text-white transition-all font-bold">Library</Link>
        <div className="w-px h-3 bg-white/10" />
        <Link href="/" className="text-[10px] uppercase tracking-[0.3em] text-white/40 hover:text-white transition-all font-bold">About</Link>
      </nav>
    </div>
  );
}
