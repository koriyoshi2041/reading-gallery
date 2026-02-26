import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

// 使用项目内的 content 目录
const storiesDirectory = path.join(process.cwd(), 'content/stories');

export interface Wonder {
  slug: string;
  date: string;
  title?: string;
  contentHtml: string;
  [key: string]: any;
}

// 获取所有故事
export async function getAllWonders(): Promise<Wonder[]> {
  try {
    const fileNames = fs.readdirSync(storiesDirectory).filter(file => file.endsWith('.md') && file !== 'README.md');
    const allData = await Promise.all(
      fileNames.map(async (fileName) => {
        const slug = fileName.replace(/\.md$/, '');
        return getWonderBySlug(slug);
      })
    );

    // 按日期倒序排序
    return allData.sort((a, b) => {
      if (a.date && b.date) {
        return b.date.localeCompare(a.date);
      }
      return (a.title || a.slug).localeCompare(b.title || b.slug);
    });
  } catch (error) {
    console.error("Could not read stories directory:", storiesDirectory, error);
    return [];
  }
}

// 根据 slug 获取单个故事
export async function getWonderBySlug(slug: string): Promise<Wonder> {
  const fullPath = path.join(storiesDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  const matterResult = matter(fileContents);
  const processedContent = await remark().use(html).process(matterResult.content);
  const contentHtml = processedContent.toString();

  // 从内容第一行提取标题
  const titleMatch = matterResult.content.match(/^#\s+(.+)/m);
  const title = matterResult.data.title || (titleMatch ? titleMatch[1] : slug);

  // 统计字数
  const wordCount = matterResult.content.length;
  const readingTime = Math.ceil(wordCount / 500); // 假设阅读速度 500字/分钟

  // 提取摘要 (去除标题后的前 150 个字符)
  const cleanExcerpt = matterResult.data.excerpt || 
    matterResult.content
      .replace(/^#\s+.+/m, '') // 去除标题
      .replace(/#+\s+.+/g, '') // 去除副标题
      .replace(/\[(.+?)\]\(.+?\)/g, '$1') // 去除链接
      .replace(/\s+/g, ' ') // 合并空格
      .trim()
      .substring(0, 150) + '...';

  return {
    slug,
    date: matterResult.data.date || '',
    title,
    excerpt: cleanExcerpt,
    contentHtml,
    wordCount,
    readingTime,
    ...matterResult.data,
  };
}
