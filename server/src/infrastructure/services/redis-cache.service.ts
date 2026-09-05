import type { Redis } from "ioredis";
import type { ICacheService } from "../../domain/services/cache.service.ts";

export class RedisCacheService implements ICacheService {
  constructor(private _redis: Redis) {}

  async get<T>(key: string): Promise<T | null> {
    const data = await this._redis.get(key);
    return data ? JSON.parse(data) : null;
  }

  async set<T>(key: string, value: T, ttlSeconds = 3600): Promise<void> {
    await this._redis.set(key, JSON.stringify(value), "EX", ttlSeconds);
  }

  async delete(key: string): Promise<void> {
    await this._redis.del(key);
  }

  async exists(key: string): Promise<boolean> {
    return (await this._redis.exists(key)) === 1;
  }
}
