// Handles popup window management and detection
export class PopupManager {
  private popup: Window | null = null;
  private readonly POPUP_WIDTH = 500;
  private readonly POPUP_HEIGHT = 600;

  openPopup(url: string): Window | null {
    const left = window.screen.width / 2 - this.POPUP_WIDTH / 2;
    const top = window.screen.height / 2 - this.POPUP_HEIGHT / 2;

    try {
      this.popup = window.open(
        url,
        'GoogleAuth',
        `width=${this.POPUP_WIDTH},height=${this.POPUP_HEIGHT},left=${left},top=${top}`
      );

      if (!this.popup || this.popup.closed) {
        throw new Error('Popup blocked by browser');
      }

      return this.popup;
    } catch (error) {
      console.error('Failed to open popup:', error);
      return null;
    }
  }

  isPopupBlocked(): boolean {
    return !this.popup || this.popup.closed;
  }

  closePopup(): void {
    if (this.popup && !this.popup.closed) {
      this.popup.close();
    }
    this.popup = null;
  }
}