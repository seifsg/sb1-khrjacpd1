export class AuthStateManager {
  private static authInProgress = false;

  isAuthInProgress(): boolean {
    return AuthStateManager.authInProgress;
  }

  setAuthInProgress(value: boolean): void {
    AuthStateManager.authInProgress = value;
  }
}