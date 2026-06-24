import { Injectable } from '@nestjs/common';
import { readFileSync, readdirSync, existsSync } from 'fs';
import { join } from 'path';
import { marked } from 'marked';
import { Post } from './interfaces/post.interface';
import { generateSlug } from './utils/slug.util';
import { calculateReadingTime } from './utils/reading-time.util';
import { formatDate } from './utils/date.util';

const CATEGORY_MAP: Record<string, { tagClass: string; tagName: string }> = {
  'my-days':   { tagClass: 'tag-mydays',   tagName: 'My Days' },
  'goc-nhin':  { tagClass: 'tag-gocnhin',  tagName: 'Góc nhìn' },
  'kien-thuc': { tagClass: 'tag-kienthuc', tagName: 'Kiến thức' },
  'tam-su':    { tagClass: 'tag-tamsu',    tagName: 'Tâm sự' },
};

@Injectable()
export class ContentService {
  private readonly contentDir = join(process.cwd(), 'content');

  /** Đọc và parse frontmatter + nội dung từ một file .md */
  private parseFile(filePath: string): Post | null {
    if (!existsSync(filePath)) return null;

    const raw = readFileSync(filePath, 'utf-8');

    // Tách frontmatter (---) và nội dung
    const fmMatch = raw.match(/^---\r?\n([\s\S]+?)\r?\n---\r?\n([\s\S]*)$/);
    if (!fmMatch) return null;

    const [, fmRaw, bodyRaw] = fmMatch;

    // Parse frontmatter thủ công (key: value)
    const fm: Record<string, string> = {};
    fmRaw.split('\n').forEach(line => {
      const [key, ...rest] = line.split(':');
      if (key && rest.length) fm[key.trim()] = rest.join(':').trim().replace(/^['"]|['"]$/g, '');
    });

    const category = fm.category as Post['category'];
    const cat = CATEGORY_MAP[category] ?? { tagClass: '', tagName: category };

    return {
      slug:        fm.slug || generateSlug(fm.title || ''),
      title:       fm.title || '',
      category,
      date:        fm.date || '',
      displayDate: formatDate(fm.date, 'short'),
      readingTime: calculateReadingTime(bodyRaw).text,
      excerpt:     fm.excerpt || '',
      tags:        fm.tags ? fm.tags.split(',').map(t => t.trim()) : [],
      featured:    fm.featured === 'true',
      author:      fm.author || 'Triv',
      content:     marked(bodyRaw) as string,
      coverImage:  fm.coverImage || '',
      tagClass:    cat.tagClass,
      tagName:     cat.tagName,
    };
  }

  /** Lấy tất cả bài viết trong một category */
  getPostsByCategory(category: string): Post[] {
    const dir = join(this.contentDir, category);
    if (!existsSync(dir)) return [];

    return readdirSync(dir)
      .filter(f => f.endsWith('.md'))
      .map(f => this.parseFile(join(dir, f)))
      .filter(Boolean)
      .sort((a, b) => new Date(b!.date).getTime() - new Date(a!.date).getTime()) as Post[];
  }

  /** Lấy một bài viết theo slug (tìm trong tất cả categories) */
  getPostBySlug(slug: string): Post | null {
    const categories = ['my-days', 'goc-nhin', 'kien-thuc', 'tam-su'];
    for (const cat of categories) {
      const dir = join(this.contentDir, cat);
      if (!existsSync(dir)) continue;
      for (const file of readdirSync(dir).filter(f => f.endsWith('.md'))) {
        const post = this.parseFile(join(dir, file));
        if (post && post.slug === slug) return post;
      }
    }
    return null;
  }

  /** Lấy tất cả bài viết từ tất cả categories */
  getAllPosts(): Post[] {
    return ['my-days', 'goc-nhin', 'kien-thuc', 'tam-su']
      .flatMap(cat => this.getPostsByCategory(cat))
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  /** Lấy bài viết nổi bật (featured: true) hoặc bài mới nhất */
  getFeaturedPost(): Post | null {
    const all = this.getAllPosts();
    return all.find(p => p.featured) ?? all[0] ?? null;
  }
}
