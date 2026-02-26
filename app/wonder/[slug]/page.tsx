import { getAllWonders, getWonderBySlug } from '@/lib/wonders';
import Link from 'next/link';
import ReadingProgressBar from '@/components/ReadingProgressBar';
import MotionWrapper from '@/components/MotionWrapper';

export async function generateStaticParams() {
  const wonders = await getAllWonders();
  return wonders.map((wonder) => ({
    slug: wonder.slug,
  }));
}

interface PageProps {
  params: {
    slug: string;
  };
}

export default async function WonderPage({ params }: PageProps) {
  const wonder = await getWonderBySlug(params.slug);

  return (
    <div className="relative">
      <ReadingProgressBar />
      
      {/* Cinematic Navigation */}
      <nav className="fixed top-12 left-12 z-50">
        <Link 
          href="/"
          className="group flex items-center space-x-4 px-8 py-4 rounded-full border border-white/5 bg-black/40 backdrop-blur-xl transition-all hover:bg-white/10 hover:border-white/20 hover:scale-105"
        >
          <span className="text-white/40 group-hover:text-white transition-colors text-lg">←</span>
          <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-white/40 group-hover:text-white">Index</span>
        </Link>
      </nav>

      <div className="flex flex-col items-center">
        {/* Cinematic Header Section */}
        <section className="w-full min-h-[85vh] flex flex-col items-center justify-end px-6 pb-40 relative">
           <MotionWrapper
             initial={{ opacity: 0, y: 50 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
             className="w-full max-w-5xl text-center z-10"
           >
              <div className="mb-12 text-[10px] font-mono text-zinc-600 uppercase tracking-[0.6em]">
                {wonder.date || 'FEB 26, 2026'}
              </div>
              
              <h1 className="text-7xl md:text-[10rem] font-bold tracking-tighter text-white leading-[0.85] text-mask mb-16">
                {wonder.title}
              </h1>
              
              <div className="flex items-center justify-center space-x-8">
                {wonder.readingTime && (
                  <div className="text-zinc-600 text-[10px] font-bold uppercase tracking-[0.4em]">
                    Duration: {wonder.readingTime} MINS
                  </div>
                )}
                <div className="h-px w-12 bg-white/10" />
                <div className="text-zinc-600 text-[10px] font-bold uppercase tracking-[0.4em]">
                  Status: Immersive
                </div>
              </div>
           </MotionWrapper>

           {/* Decorative Elements */}
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-10 pointer-events-none">
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-white/10 blur-[200px] rounded-full" />
           </div>
        </section>

        {/* Narrative Content */}
        <section className="w-full max-w-3xl px-6 pb-96">
           <MotionWrapper
             initial={{ opacity: 0, y: 40 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 1.5, delay: 0.5 }}
             className="prose prose-zinc prose-invert selection:bg-white selection:text-black"
           >
              <div className="relative mb-32 flex justify-center">
                 <div className="h-32 w-px bg-gradient-to-b from-white/20 to-transparent" />
              </div>
              
              <article
                className="prose-p:font-light prose-p:text-zinc-200 prose-p:leading-[2] prose-p:mb-12 prose-headings:tracking-tighter prose-headings:text-white/90 prose-h2:text-4xl prose-h2:mt-32"
                dangerouslySetInnerHTML={{ __html: wonder.contentHtml }}
              />
              
              <div className="mt-48 flex flex-col items-center space-y-12">
                 <div className="h-px w-24 bg-white/10" />
                 <div className="text-[10px] font-mono text-zinc-600 uppercase tracking-[0.6em]">End of Resonance</div>
              </div>
           </MotionWrapper>
        </section>

        {/* Cinematic Exit Footer */}
        <footer className="w-full h-screen flex flex-col items-center justify-center relative overflow-hidden">
          <Link 
            href="/"
            className="group flex flex-col items-center space-y-12 z-10"
          >
            <div className="text-zinc-700 text-[10px] font-bold uppercase tracking-[0.6em] group-hover:text-zinc-400 transition-colors">Return to Index</div>
            <div className="h-48 w-px bg-gradient-to-b from-zinc-800 to-transparent group-hover:h-64 transition-all duration-1000 ease-[0.16,1,0.3,1]" />
            <span className="text-3xl font-light tracking-[0.3em] text-zinc-500 group-hover:text-white transition-all duration-1000 lowercase">reality awaits</span>
          </Link>
          
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
        </footer>
      </div>
    </div>
  );
}
