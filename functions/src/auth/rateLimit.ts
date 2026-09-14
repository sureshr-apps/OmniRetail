import { createHash } from 'node:crypto';

interface Bucket {
  attempts: number;
  resetAt: number;
}

export class LoginRateLimiter {
  private readonly buckets = new Map<string, Bucket>();
  private nextPruneAt = 0;

  constructor(
    private readonly maximumAttempts = 8,
    private readonly windowMilliseconds = 5 * 60 * 1000,
    private readonly maximumBuckets = 10_000
  ) {}

  consume(ipAddress: string, username: string, now = Date.now()): boolean {
    const key = createHash('sha256')
      .update(`${ipAddress}\u0000${username}`)
      .digest('base64url');
    const existing = this.buckets.get(key);

    if (!existing || existing.resetAt <= now) {
      this.prune(now);
      if (this.buckets.size >= this.maximumBuckets) {
        const oldestKey = this.buckets.keys().next().value as string | undefined;
        if (oldestKey) this.buckets.delete(oldestKey);
      }
      this.buckets.set(key, { attempts: 1, resetAt: now + this.windowMilliseconds });
      return true;
    }

    existing.attempts += 1;
    return existing.attempts <= this.maximumAttempts;
  }

  private prune(now: number): void {
    if (this.buckets.size < 1_000 || now < this.nextPruneAt) return;
    for (const [key, bucket] of this.buckets) {
      if (bucket.resetAt <= now) this.buckets.delete(key);
    }
    this.nextPruneAt = now + this.windowMilliseconds;
  }
}
