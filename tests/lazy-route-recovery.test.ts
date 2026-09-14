import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { canReloadAfterChunkFailure, isChunkLoadError } from '@/app/routing/lazyWithChunkRecovery';

describe('lazy route chunk recovery', () => {
  it('recognizes browser errors caused by a stale or missing Vite chunk', () => {
    expect(isChunkLoadError(new TypeError('Failed to fetch dynamically imported module'))).toBe(true);
    expect(isChunkLoadError(new Error('Expected a JavaScript-or-Wasm module script but the server responded with a MIME type of text/html'))).toBe(true);
    expect(isChunkLoadError(new Error('The request was aborted'))).toBe(false);
  });

  it('allows one recovery reload and suppresses an immediate reload loop', () => {
    expect(canReloadAfterChunkFailure(100_000, null)).toBe(true);
    expect(canReloadAfterChunkFailure(100_001, '100000')).toBe(false);
    expect(canReloadAfterChunkFailure(130_000, '100000')).toBe(true);
  });

  it('keeps SPA entry responses fresh while allowing hashed bundles to be cached', () => {
    const firebaseConfig = JSON.parse(readFileSync('firebase.json', 'utf8')) as {
      hosting: Array<{ headers?: Array<{ source: string; headers: Array<{ key: string; value: string }> }> }>;
    };

    for (const site of firebaseConfig.hosting) {
      expect(site.headers).toEqual(expect.arrayContaining([
        expect.objectContaining({ source: '**', headers: expect.arrayContaining([
          expect.objectContaining({ key: 'Cache-Control', value: expect.stringContaining('no-cache') }),
        ]) }),
        expect.objectContaining({ source: '**/*.@(js|css)', headers: expect.arrayContaining([
          expect.objectContaining({ key: 'Cache-Control', value: expect.stringContaining('immutable') }),
        ]) }),
      ]));
    }
  });
});
