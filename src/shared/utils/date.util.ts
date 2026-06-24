const MONTHS = [
  'Tháng Một','Tháng Hai','Tháng Ba','Tháng Tư','Tháng Năm','Tháng Sáu',
  'Tháng Bảy','Tháng Tám','Tháng Chín','Tháng Mười','Tháng Mười Một','Tháng Mười Hai',
];

/** Format ngày tháng sang tiếng Việt */
export function formatDate(dateStr: string, style: 'long' | 'short' | 'relative' = 'long'): string {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;

  if (style === 'short') {
    const dd = String(d.getDate()).padStart(2, '0');
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    return `${dd}.${mm}.${d.getFullYear()}`;
  }

  if (style === 'relative') {
    const diff = Math.floor((Date.now() - d.getTime()) / 86400000);
    if (diff === 0) return 'hôm nay';
    if (diff === 1) return 'hôm qua';
    if (diff < 7)  return `${diff} ngày trước`;
    if (diff < 30) return `${Math.floor(diff / 7)} tuần trước`;
    if (diff < 365) return `${Math.floor(diff / 30)} tháng trước`;
    return `${Math.floor(diff / 365)} năm trước`;
  }

  // long
  return `${d.getDate()} ${MONTHS[d.getMonth()]}, ${d.getFullYear()}`;
}
