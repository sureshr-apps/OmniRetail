import { describe, expect, it } from 'vitest';
import { removeById, upsertById } from '@/shared/utils/listState';

interface Row {
  id: string;
  name: string;
}

describe('upsertById', () => {
  it('appends a new entity that is not already in the list', () => {
    const list: Row[] = [{ id: '1', name: 'A' }];
    const result = upsertById(list, { id: '2', name: 'B' });
    expect(result).toEqual([{ id: '1', name: 'A' }, { id: '2', name: 'B' }]);
  });

  it('replaces the matching entity in place, preserving position', () => {
    const list: Row[] = [
      { id: '1', name: 'A' },
      { id: '2', name: 'B' },
      { id: '3', name: 'C' },
    ];
    const result = upsertById(list, { id: '2', name: 'B-updated' });
    expect(result).toEqual([
      { id: '1', name: 'A' },
      { id: '2', name: 'B-updated' },
      { id: '3', name: 'C' },
    ]);
  });

  it('is idempotent: applying the same entity twice never duplicates a row', () => {
    const list: Row[] = [{ id: '1', name: 'A' }];
    const once = upsertById(list, { id: '2', name: 'B' });
    const twice = upsertById(once, { id: '2', name: 'B' });
    expect(twice).toHaveLength(2);
    expect(twice).toEqual(once);
  });

  it('does not mutate the input list', () => {
    const list: Row[] = [{ id: '1', name: 'A' }];
    const result = upsertById(list, { id: '1', name: 'A-updated' });
    expect(list).toEqual([{ id: '1', name: 'A' }]);
    expect(result).not.toBe(list);
  });
});

describe('removeById', () => {
  it('removes the matching entity', () => {
    const list: Row[] = [
      { id: '1', name: 'A' },
      { id: '2', name: 'B' },
    ];
    expect(removeById(list, '1')).toEqual([{ id: '2', name: 'B' }]);
  });

  it('is a no-op when the id is not present', () => {
    const list: Row[] = [{ id: '1', name: 'A' }];
    const result = removeById(list, 'missing');
    expect(result).toEqual(list);
    expect(result).not.toBe(list);
  });
});
