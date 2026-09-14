import { describe, expect, it } from 'vitest';
import { assertCallableEntity, MalformedCallableResponseError } from '@/shared/utils/callableResponse';

interface Outlet {
  id: string;
  outletCode: number;
  name: string;
}

describe('assertCallableEntity', () => {
  it('returns the data when all required fields are present', () => {
    const data = { id: 'o1', outletCode: 42, name: 'Main Street' };
    expect(assertCallableEntity<Outlet>(data, ['id', 'outletCode', 'name'], 'createOutlet')).toBe(data);
  });

  it('rejects a response missing a required field, naming it in the error', () => {
    const data = { id: 'o1', name: 'Main Street' };
    expect(() => assertCallableEntity<Outlet>(data, ['id', 'outletCode', 'name'], 'createOutlet')).toThrow(
      /createOutlet.*outletCode/,
    );
  });

  it('rejects a null response', () => {
    expect(() => assertCallableEntity<Outlet>(null, ['id'], 'createOutlet')).toThrow(MalformedCallableResponseError);
  });

  it('rejects a non-object response', () => {
    expect(() => assertCallableEntity<Outlet>('not-an-object', ['id'], 'createOutlet')).toThrow(
      MalformedCallableResponseError,
    );
  });

  it('rejects a response with a null field value', () => {
    const data = { id: 'o1', outletCode: null, name: 'Main Street' };
    expect(() => assertCallableEntity<Outlet>(data, ['id', 'outletCode', 'name'], 'createOutlet')).toThrow(
      /outletCode/,
    );
  });
});
