/**
 * Cache Service used to store post and comments once it is fetched dont need to fetch again and again
 */

export class CacheService<T> {
  private cache = new Map<string, T>(); //post-id:data  or comment-id:data

  set(key: string, value: T) {
    this.cache.set(key, value);
  }

  get(key: string) {
    return this.cache.get(key);
  }

  delete(key: string) {
    return this.cache.delete(key);
  }
  clear() {
    return this.cache.clear();
  }
}
