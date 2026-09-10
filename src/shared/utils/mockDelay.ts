/**
 * Simulates network latency for mock services.
 */
export function mockDelay(ms: number = 600): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
