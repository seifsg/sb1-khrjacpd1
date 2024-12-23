export function formatDateRange(start: Date | null, end: Date | null): string {
  if (!start && !end) return 'All time';
  if (!start) return `Until ${end?.toLocaleDateString()}`;
  if (!end) return `From ${start.toLocaleDateString()}`;
  return `${start.toLocaleDateString()} - ${end.toLocaleDateString()}`;
}

export function isWithinDateRange(date: Date, start: Date | null, end: Date | null): boolean {
  if (!start && !end) return true;
  if (!start) return date <= (end as Date);
  if (!end) return date >= start;
  return date >= start && date <= end;
}