export class ScriptLoader {
  private static instance: ScriptLoader;
  private loadPromise: Promise<void> | null = null;

  static getInstance(): ScriptLoader {
    if (!ScriptLoader.instance) {
      ScriptLoader.instance = new ScriptLoader();
    }
    return ScriptLoader.instance;
  }

  async load(): Promise<void> {
    if (this.loadPromise) {
      return this.loadPromise;
    }

    if (window.google?.accounts?.oauth2) {
      return Promise.resolve();
    }

    this.loadPromise = new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('Failed to load Google Identity Services'));
      document.head.appendChild(script);
    });

    return this.loadPromise;
  }
}