import { lazy, type ComponentType, type LazyExoticComponent } from 'react';

const CHUNK_RELOAD_TIMESTAMP_KEY = 'omniretail:chunk-reload-at';
const CHUNK_RELOAD_COOLDOWN_MS = 30_000;

/**
 * Vite's dynamic imports reject when a deployed route chunk is no longer
 * available. Firebase Hosting then serves the SPA fallback as HTML, which
 * surfaces in the browser as a module MIME-type error. A short, session-scoped
 * reload gives an already-open tab the current asset manifest without creating
 * a reload loop if the deployment is still unavailable.
 */
export function isChunkLoadError(error: unknown): boolean {
  const message = error instanceof Error ? error.message : String(error);
  return /(?:failed to fetch dynamically imported module|importing a module script failed|expected (?:a )?javascript-or-wasm module script|loading (?:chunk|css chunk) [^ ]+ failed)/i.test(message);
}

export function canReloadAfterChunkFailure(now: number, lastReloadAt: string | null): boolean {
  if (!lastReloadAt) return true;

  const previousReloadAt = Number(lastReloadAt);
  return !Number.isFinite(previousReloadAt) || now - previousReloadAt >= CHUNK_RELOAD_COOLDOWN_MS;
}

function recoverFromChunkFailure(error: unknown): void {
  if (typeof window === 'undefined' || !isChunkLoadError(error)) return;

  try {
    const now = Date.now();
    const lastReloadAt = window.sessionStorage.getItem(CHUNK_RELOAD_TIMESTAMP_KEY);
    if (!canReloadAfterChunkFailure(now, lastReloadAt)) return;

    window.sessionStorage.setItem(CHUNK_RELOAD_TIMESTAMP_KEY, String(now));
    window.location.reload();
  } catch {
    // Storage may be unavailable in privacy-restricted browser contexts.
  }
}

export function lazyWithChunkRecovery<T extends ComponentType<any>>(
  load: () => Promise<{ default: T }>,
): LazyExoticComponent<T> {
  return lazy(async () => {
    try {
      return await load();
    } catch (error) {
      recoverFromChunkFailure(error);
      throw error;
    }
  });
}
