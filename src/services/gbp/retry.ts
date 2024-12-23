interface RetryOptions {
  maxAttempts?: number;
  delayMs?: number;
  backoffFactor?: number;
}

export async function withRetry<T>(
  operation: () => Promise<T>,
  options: RetryOptions = {}
): Promise<T> {
  const {
    maxAttempts = 3,
    delayMs = 1000,
    backoffFactor = 2
  } = options;

  let lastError: Error | null = null;
  let attempt = 1;
  let delay = delayMs;

  while (attempt <= maxAttempts) {
    try {
      return await operation();
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      
      if (attempt === maxAttempts) {
        break;
      }

      await new Promise(resolve => setTimeout(resolve, delay));
      delay *= backoffFactor;
      attempt++;
    }
  }

  throw lastError || new Error('Operation failed after multiple attempts');
}