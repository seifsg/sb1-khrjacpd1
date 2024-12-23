import type { GBPApiError } from '../types';

export async function handleApiError(response: Response): Promise<Error> {
  try {
    const error = await response.json() as GBPApiError;
    return new Error(error.error.message || 'API request failed');
  } catch {
    return new Error(`API request failed with status ${response.status}`);
  }
}