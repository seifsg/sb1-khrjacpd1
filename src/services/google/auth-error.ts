export class AuthErrorHandler {
  handleAuthError(error: unknown): Error {
    if (error instanceof Error) {
      // Handle specific error types
      if (error.message.includes('popup')) {
        return new Error('Please allow popups for this site to sign in with Google');
      }
      if (error.message.includes('network')) {
        return new Error('Network error occurred. Please check your connection');
      }
      return error;
    }
    return new Error('An unexpected error occurred during authentication');
  }
}