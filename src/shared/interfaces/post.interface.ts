export interface Post {
  slug: string;
  title: string;
  category: 'my-days' | 'goc-nhin' | 'kien-thuc' | 'tam-su';
  date: string;
  displayDate?: string;
  readingTime?: string;
  excerpt: string;
  tags: string[];
  featured: boolean;
  author: string;
  content?: string; // HTML string sau khi parse Markdown
  coverImage?: string; // Hình ảnh Thumbnail/Cover
  tagClass?: string;
  tagName?: string;
}
