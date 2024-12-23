import { z } from 'zod';

// Schema for validating OAuth configuration
export const oAuthConfigSchema = z.object({
  clientId: z.string().min(1),
  clientSecret: z.string().min(1),
  redirectUri: z.string().url()
});

// Schema for validating API configuration
export const apiConfigSchema = z.object({
  baseUrl: z.string().url(),
  version: z.string().min(1),
  endpoints: z.record(z.string(), z.string())
});

// Schema for validating feature flags
export const featureFlagsSchema = z.object({
  mockEnabled: z.boolean(),
  cacheEnabled: z.boolean(),
  retryEnabled: z.boolean()
});

// Validate configurations at runtime
export function validateConfig(config: unknown): void {
  try {
    if (typeof config !== 'object' || !config) {
      throw new Error('Invalid configuration object');
    }

    // Add specific validation as needed
  } catch (error) {
    console.error('Configuration validation failed:', error);
    throw error;
  }
}