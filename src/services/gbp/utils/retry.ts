interface RetryOptions {
  maxAttempts?: number;
  delayMs?: number;
  backoffFactor?: number;
}

const DEFAULT_OPTIONS: Required<RetryOptions> = {
  maxAttempts: 3,
  delayMs: 1000,
  backoffFactor: 2
};

export async function withRetry<T>(
  operation: () => Promise<T>,
  options: RetryOptions = {}
): Promise<T> {
  const config = { ...DEFAULT_OPTIONS, ...options };
  let attempt = 1;
  let delay = config.delayMs;

  while (attempt <= config.maxAttempts) {
    try {
      return await operation();
    } catch (error) {
      if (attempt === config.maxAttempts) {
        throw error;
      }

      await new Promise(resolve => setTimeout(resolve, delay));
      delay *= config.backoffFactor;
      attempt++;
    }
  }

  throw new Error('Operation failed after maximum retries');
}