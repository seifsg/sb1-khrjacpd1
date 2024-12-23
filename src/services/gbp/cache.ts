import { GBPAccount, GBPLocation } from '../../types/gbp-fields';

const CACHE_PREFIX = 'gbp_cache_';
const CACHE_EXPIRY = 5 * 60 * 1000; // 5 minutes

interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

export class GBPCache {
  static setAccounts(accountId: string, accounts: GBPAccount[]): void {
    const entry: CacheEntry<GBPAccount[]> = {
      data: accounts,
      timestamp: Date.now()
    };
    localStorage.setItem(`${CACHE_PREFIX}accounts_${accountId}`, JSON.stringify(entry));
  }

  static getAccounts(accountId: string): GBPAccount[] | null {
    const cached = localStorage.getItem(`${CACHE_PREFIX}accounts_${accountId}`);
    if (!cached) return null;

    const entry: CacheEntry<GBPAccount[]> = JSON.parse(cached);
    if (Date.now() - entry.timestamp > CACHE_EXPIRY) {
      localStorage.removeItem(`${CACHE_PREFIX}accounts_${accountId}`);
      return null;
    }

    return entry.data;
  }

  static setLocations(accountId: string, locations: GBPLocation[]): void {
    const entry: CacheEntry<GBPLocation[]> = {
      data: locations,
      timestamp: Date.now()
    };
    localStorage.setItem(`${CACHE_PREFIX}locations_${accountId}`, JSON.stringify(entry));
  }

  static getLocations(accountId: string): GBPLocation[] | null {
    const cached = localStorage.getItem(`${CACHE_PREFIX}locations_${accountId}`);
    if (!cached) return null;

    const entry: CacheEntry<GBPLocation[]> = JSON.parse(cached);
    if (Date.now() - entry.timestamp > CACHE_EXPIRY) {
      localStorage.removeItem(`${CACHE_PREFIX}locations_${accountId}`);
      return null;
    }

    return entry.data;
  }

  static clearCache(): void {
    Object.keys(localStorage)
      .filter(key => key.startsWith(CACHE_PREFIX))
      .forEach(key => localStorage.removeItem(key));
  }
}