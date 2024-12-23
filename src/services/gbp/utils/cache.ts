interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

export class GBPCache {
  private static readonly PREFIX = 'gbp_cache_';
  private static readonly TTL = 5 * 60 * 1000; // 5 minutes

  static set<T>(key: string, data: T): void {
    const entry: CacheEntry<T> = {
      data,
      timestamp: Date.now()
    };
    localStorage.setItem(this.getKey(key), JSON.stringify(entry));
  }

  static get<T>(key: string): T | null {
    const cached = localStorage.getItem(this.getKey(key));
    if (!cached) return null;

    const entry: CacheEntry<T> = JSON.parse(cached);
    if (Date.now() - entry.timestamp > this.TTL) {
      this.remove(key);
      return null;
    }

    return entry.data;
  }

  static remove(key: string): void {
    localStorage.removeItem(this.getKey(key));
  }

  static clear(): void {
    Object.keys(localStorage)
      .filter(key => key.startsWith(this.PREFIX))
      .forEach(key => localStorage.removeItem(key));
  }

  private static getKey(key: string): string {
    return `${this.PREFIX}${key}`;
  }
}