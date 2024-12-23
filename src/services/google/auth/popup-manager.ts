import { AuthLogger } from '../../../utils/logging/auth-logger';

export class PopupManager {
  private popup: Window | null = null;
  private readonly POPUP_WIDTH = 500;
  private readonly POPUP_HEIGHT = 600;
  private readonly POPUP_TARGET = 'GoogleAuthPopup';

  canOpenPopups(): boolean {
    try {
      // Test popup with Google's domain to avoid browser security issues
      const testUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
      const testPopup = window.open(
        testUrl,
        'popup_test',
        this.getPopupFeatures()
      );

      if (!testPopup) {
        AuthLogger.logWarning('Popups are blocked by browser settings');
        return false;
      }

      testPopup.close();
      return true;
    } catch (error) {
      AuthLogger.logError('Error checking popup permissions', { error });
      return false;
    }
  }

  openPopup(url: string): Window | null {
    if (!this.canOpenPopups()) {
      AuthLogger.logError('Popup blocked by browser', { url });
      return null;
    }

    try {
      // Close any existing popup
      this.cleanup();

      this.popup = window.open(url, this.POPUP_TARGET, this.getPopupFeatures());

      if (!this.popup || this.popup.closed) {
        AuthLogger.logError('Failed to open popup window', {
          url,
          windowState: this.popup ? 'closed' : 'blocked'
        });
        return null;
      }

      // Focus the popup
      this.popup.focus();

      // Start monitoring the popup
      this.monitorPopup();

      AuthLogger.logInfo('Auth popup opened successfully', { url });
      
      return this.popup;
    } catch (error) {
      AuthLogger.logError('Error opening popup', { error, url });
      return null;
    }
  }

  cleanup(): void {
    if (this.popup) {
      try {
        if (!this.popup.closed) {
          this.popup.close();
          AuthLogger.logInfo('Auth popup closed');
        }
      } catch (error) {
        AuthLogger.logError('Error closing popup', { error });
      }
      this.popup = null;
    }
  }

  isPopupBlocked(): boolean {
    return !this.canOpenPopups();
  }

  getPopup(): Window | null {
    return this.popup;
  }

  private getPopupFeatures(): string {
    const left = Math.max(0, (window.screen.width - this.POPUP_WIDTH) / 2);
    const top = Math.max(0, (window.screen.height - this.POPUP_HEIGHT) / 2);

    return [
      `width=${this.POPUP_WIDTH}`,
      `height=${this.POPUP_HEIGHT}`,
      `left=${left}`,
      `top=${top}`,
      'resizable=yes',
      'scrollbars=yes',
      'status=yes',
      'location=yes'
    ].join(',');
  }

  private monitorPopup() {
    if (!this.popup) return;

    const checkInterval = setInterval(() => {
      if (!this.popup || this.popup.closed) {
        clearInterval(checkInterval);
        AuthLogger.logInfo('Auth popup was closed by user');
        this.cleanup();
      }
    }, 500);
  }
}