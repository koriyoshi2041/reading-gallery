import { getAllWonders, getWonderBySlug } from '@/lib/wonders';
import Link from 'next/link';
import ParticlesBackground from '@/components/ParticlesBackground';
import ReadingProgressBar from '@/components/ReadingProgressBar';

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
    <>
      <ParticlesBackground />
      <ReadingProgressBar />
      
      <div className="w-full animate-fade-in p-4 sm:p-6 md:p-8">
        <header className="fixed top-0 left-0 w-full p-4 flex justify-start z-10">
          <Link href="/"
             className="text-sm text-zinc-400 hover:text-white transition-colors duration-300 backdrop-blur-sm p-2 rounded-md">
              ← 返回
          </Link>
        </header>

        <div className="flex flex-col items-center justify-center min-h-screen pt-24 pb-12">
            <header className="text-center mb-16 max-w-4xl mx-auto">
              <p className="text-base text-zinc-400 font-sans">{wonder.date}</p>
              {wonder.title && (
                <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mt-2 font-serif">
                  {wonder.title}
                </h1>
              )}
            </header>

            <article
              className="prose prose-lg lg:prose-xl prose-invert max-w-2xl mx-auto"
              dangerouslySetInnerHTML={{ __html: wonder.contentHtml }}
            />
        </div>
      </div>
    </>
  );
}
