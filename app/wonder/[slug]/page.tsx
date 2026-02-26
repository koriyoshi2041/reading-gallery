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
      <nav className="fixed top-8 left-8 z-50">
        <Link 
          href="/"
          className="group flex items-center space-x-3 px-6 py-3 rounded-full border border-white/5 bg-black/40 backdrop-blur-md transition-all hover:bg-white/10 hover:border-white/20"
        >
          <span className="text-white/40 group-hover:text-white transition-colors">←</span>
          <span className="text-xs uppercase tracking-[0.2em] font-medium text-white/60 group-hover:text-white">Index</span>
        </Link>
      </nav>

      <div className="flex flex-col items-center">
        {/* Cinematic Header Section */}
        <section className="w-full min-h-[60vh] flex flex-col items-center justify-end px-6 pb-24">
           <MotionWrapper
             initial={{ opacity: 0, scale: 0.95 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
             className="w-full max-w-4xl text-center"
           >
              <div className="mb-8 text-sm font-mono text-zinc-500 uppercase tracking-[0.4em]">
                {wonder.date || 'FEB 26, 2026'}
              </div>
              
              <h1 className="text-5xl md:text-8xl font-bold tracking-tighter text-white leading-[1.1]">
                {wonder.title}
              </h1>
              
              {wonder.readingTime && (
                <div className="mt-12 text-zinc-600 text-sm italic tracking-widest">
                  {wonder.readingTime} MINUTE READ
                </div>
              )}
           </MotionWrapper>
        </section>

        {/* Narrative Content */}
        <section className="w-full max-w-2xl px-6 pb-64">
           <MotionWrapper
             initial={{ opacity: 0, y: 40 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 1.2, delay: 0.3 }}
             className="prose prose-xl prose-invert selection:bg-white selection:text-black"
           >
              <article
                className="prose-p:leading-[1.8] prose-p:mb-10 prose-headings:mt-20 prose-headings:mb-10"
                dangerouslySetInnerHTML={{ __html: wonder.contentHtml }}
              />
           </MotionWrapper>
        </section>

        {/* Cinematic Exit Footer */}
        <footer className="w-full h-[50vh] flex flex-col items-center justify-center bg-gradient-to-t from-black to-transparent">
          <Link 
            href="/"
            className="group flex flex-col items-center space-y-6"
          >
            <div className="text-zinc-600 text-xs uppercase tracking-[0.5em]">The End</div>
            <div className="h-24 w-px bg-gradient-to-b from-zinc-800 to-transparent group-hover:h-32 transition-all duration-700" />
            <span className="text-sm uppercase tracking-widest text-zinc-400 group-hover:text-white transition-colors">Return to Reality</span>
          </Link>
        </footer>
      </div>
    </div>
  );
}
