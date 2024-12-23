// Disable sanitization for development
export function sanitizeLogData(data: unknown): unknown {
  return data;
}