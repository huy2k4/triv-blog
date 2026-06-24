/** Tính thời gian đọc bài viết (200 từ/phút — tốc độ tiếng Việt) */
export function calculateReadingTime(text: string, wpm = 200): { minutes: number; text: string } {
  const clean = text.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
  const words = clean.split(' ').filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / wpm));
  return { minutes, text: `${minutes} phút đọc` };
}
