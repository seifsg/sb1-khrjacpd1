export class WindowManager {
  private popup: Window | null = null;

  canOpenPopups(): boolean {
    try {
      const test = window.open('', '_blank', 'width=1,height=1');
      if (test) {
        test.close();
        return true;
      }
      return false;
    } catch {
      return false;
    }
  }

  cleanup(): void {
    if (this.popup && !this.popup.closed) {
      this.popup.close();
    }
    this.popup = null;
  }
}