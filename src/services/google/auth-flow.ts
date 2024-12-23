import { GoogleAuthResponse } from '../../types/google-auth';
import { AuthStateManager } from './auth-state';
import { AuthUIManager } from './auth-ui';
import { AuthErrorHandler } from './auth-error';

export class AuthFlow {
  private readonly stateManager = new AuthStateManager();
  private readonly uiManager = new AuthUIManager();
  private readonly errorHandler = new AuthErrorHandler();

  async start(): Promise<GoogleAuthResponse> {
    if (this.stateManager.isAuthInProgress()) {
      throw new Error('Authentication already in progress');
    }

    this.stateManager.setAuthInProgress(true);

    try {
      // First try silent sign in
      const silentResponse = await this.uiManager.attemptSilentSignIn();
      if (silentResponse) {
        return silentResponse;
      }

      // If silent sign in fails, try interactive sign in
      return await this.uiManager.startInteractiveSignIn();
    } catch (error) {
      throw this.errorHandler.handleAuthError(error);
    } finally {
      this.stateManager.setAuthInProgress(false);
      this.uiManager.cleanup();
    }
  }
}