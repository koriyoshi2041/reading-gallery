import Link from 'next/link';
import { getAllWonders } from '@/lib/wonders';
import MotionWrapper from '@/components/MotionWrapper';

export default async function HomePage() {
  const allWonders = await getAllWonders();
  
  if (!allWonders || allWonders.length === 0) {
    return (
      <div className="text-center bg-zinc-900/50 backdrop-blur-md p-8 rounded-lg border border-zinc-800">
        <h1 className="text-2xl font-semibold text-white">No wonders found.</h1>
        <p className="mt-2 text-zinc-400">Please check the directory `~/clawd/memory/daily-wonders/`.</p>
      </div>
    );
  }

  const latestWonder = allWonders[0];

  return (
    <MotionWrapper
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-3xl"
    >
      <div className="bg-zinc-900/50 backdrop-blur-2xl rounded-2xl border border-zinc-800 shadow-2xl shadow-purple-900/10">
        <div className="p-8 md:p-12">
          <header className="mb-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mt-2">
              {latestWonder.title || '阅读'}
            </h1>
            {latestWonder.readingTime && (
              <p className="text-sm text-zinc-400 mt-3">
                约 {latestWonder.readingTime} 分钟
              </p>
            )}
          </header>
          
          <article
            className="prose prose-invert max-w-none text-left prose-p:text-zinc-300 prose-headings:text-white prose-a:text-purple-400 prose-strong:text-white"
            dangerouslySetInnerHTML={{ __html: latestWonder.contentHtml }}
          />
        </div>

        {(allWonders.length > 1 || latestWonder.slug) && (
          <footer className="mt-4 px-8 md:px-12 py-6 border-t border-zinc-800">
            <div className="flex justify-between items-center">
              <p className="text-xs text-zinc-500">
                {allWonders.length > 1 ? `全部 ${allWonders.length} 章节` : '最新章节'}
              </p>
              {latestWonder.slug && (
                 <Link href={`/wonder/${latestWonder.slug}`}
                   className="text-sm text-purple-400 hover:text-purple-300 transition-colors duration-300">
                    继续阅读 →
                </Link>
              )}
            </div>
          </footer>
        )}
      </div>
    </MotionWrapper>
  );
}
