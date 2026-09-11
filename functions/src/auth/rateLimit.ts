import { createHash } from 'node:crypto';

interface Bucket {
  attempts: number;
  resetAt: number;
}

export class LoginRateLimiter {
  private readonly buckets = new Map<string, Bucket>();

  constructor(
    private readonly maximumAttempts = 8,
    private readonly windowMilliseconds = 5 * 60 * 1000
  ) {}

  consume(ipAddress: string, username: string, now = Date.now()): boolean {
    const key = createHash('sha256')
      .update(`${ipAddress}\u0000${username}`)
      .digest('base64url');
    const existing = this.buckets.get(key);

    if (!existing || existing.resetAt <= now) {
      this.buckets.set(key, { attempts: 1, resetAt: now + this.windowMilliseconds });
      this.prune(now);
      return true;
    }

    existing.attempts += 1;
    return existing.attempts <= this.maximumAttempts;
  }

  private prune(now: number): void {
    if (this.buckets.size < 1_000) return;
    for (const [key, bucket] of this.buckets) {
      if (bucket.resetAt <= now) this.buckets.delete(key);
    }
  }
}
