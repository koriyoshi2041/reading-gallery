import Link from 'next/link';
import { getAllWonders } from '@/lib/wonders';
import MotionWrapper from '@/components/MotionWrapper';

export default async function HomePage() {
  const allWonders = await getAllWonders();
  
  if (!allWonders || allWonders.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center p-6">
        <div className="glass p-12 rounded-3xl text-center max-w-md">
          <h1 className="text-3xl font-bold text-white mb-4">No wonders found.</h1>
          <p className="text-zinc-400 mb-8 leading-relaxed">
            The narrative space is currently empty. Please populate the repository with stories.
          </p>
          <div className="h-px w-full bg-zinc-800 my-6" />
          <p className="text-xs text-zinc-500 font-mono uppercase tracking-widest">
            Waiting for data...
          </p>
        </div>
      </div>
    );
  }

  const latestWonder = allWonders[0];

  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full min-h-[80vh] flex flex-col items-center justify-center px-6 py-24">
        <MotionWrapper
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-4xl text-center"
        >
          <div className="mb-12 inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-zinc-400">
              Latest Narrative
            </span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-white mb-8">
            {latestWonder.title || '无题'}
          </h1>
          
          <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto mb-16 leading-relaxed">
            {latestWonder.excerpt || "Dive into a world of curated stories and immersive experiences."}
          </p>
          
          {latestWonder.slug && (
            <Link 
              href={`/wonder/${latestWonder.slug}`}
              className="group relative inline-flex items-center px-12 py-4 overflow-hidden rounded-full bg-white text-black font-semibold transition-transform hover:scale-105"
            >
              <span className="relative z-10 uppercase tracking-widest text-sm">Start Reading</span>
              <div className="absolute inset-0 bg-blue-400 opacity-0 group-hover:opacity-10 transition-opacity" />
            </Link>
          )}
        </MotionWrapper>
      </section>

      {/* Narrative Content Section */}
      <section className="w-full max-w-4xl px-6 pb-48">
        <MotionWrapper
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative"
        >
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 h-24 w-px bg-gradient-to-b from-transparent via-zinc-700 to-transparent" />
          
          <div className="glass rounded-[3rem] p-10 md:p-20 shadow-2xl">
            <header className="mb-16 border-b border-zinc-800 pb-12">
               <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                 <div className="text-sm font-mono text-zinc-500 uppercase tracking-widest">
                   {latestWonder.date || 'FEB 26, 2026'}
                 </div>
                 {latestWonder.readingTime && (
                   <div className="text-sm text-zinc-500 italic">
                     Estimated {latestWonder.readingTime} min read
                   </div>
                 )}
               </div>
            </header>

            <div className="prose lg:prose-xl prose-invert selection:bg-white selection:text-black">
              <article
                dangerouslySetInnerHTML={{ __html: latestWonder.contentHtml }}
              />
            </div>
            
            <footer className="mt-20 pt-12 border-t border-zinc-800">
              <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="text-zinc-500 text-xs tracking-wider uppercase font-medium">
                  Ref: {latestWonder.slug || 'root'}
                </div>
                {allWonders.length > 1 && (
                  <nav className="flex items-center space-x-6">
                    <span className="text-zinc-600 text-sm">Explore More</span>
                    <div className="h-px w-8 bg-zinc-800" />
                    {/* Placeholder for more navigation if needed */}
                  </nav>
                )}
              </div>
            </footer>
          </div>
        </MotionWrapper>
      </section>

      {/* Archive Section */}
      {allWonders.length > 1 && (
        <section className="w-full max-w-4xl px-6 pb-48">
          <div className="mb-12 flex items-center space-x-4">
            <h2 className="text-2xl font-bold tracking-tight text-white">The Archive</h2>
            <div className="h-px flex-1 bg-zinc-800" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {allWonders.slice(1).map((wonder, index) => (
              <MotionWrapper
                key={wonder.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <Link 
                  href={`/wonder/${wonder.slug}`}
                  className="group block glass p-8 rounded-3xl transition-all hover:bg-white/5 hover:border-white/20"
                >
                  <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-4">
                    {wonder.date || 'FEB 2026'}
                  </div>
                  <h3 className="text-xl font-semibold text-white group-hover:text-blue-400 transition-colors mb-4">
                    {wonder.title}
                  </h3>
                  <div className="flex items-center text-xs text-zinc-500 space-x-4">
                    <span>{wonder.readingTime} min read</span>
                    <span>→</span>
                  </div>
                </Link>
              </MotionWrapper>
            ))}
          </div>
        </section>
      )}

      {/* Global Navigation Component */}
      <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 glass px-6 py-3 rounded-full flex items-center space-x-8 shadow-2xl border border-white/5">
        <Link href="/" className="text-xs uppercase tracking-widest text-white/60 hover:text-white transition-colors">Home</Link>
        <div className="w-px h-3 bg-zinc-800" />
        <Link href="/" className="text-xs uppercase tracking-widest text-white/60 hover:text-white transition-colors">Archive</Link>
        <div className="w-px h-3 bg-zinc-800" />
        <Link href="/" className="text-xs uppercase tracking-widest text-white/60 hover:text-white transition-colors">About</Link>
      </nav>
    </div>
  );
}
