export class MalformedCallableResponseError extends Error {
  constructor(context: string, missingKeys: string[]) {
    super(`${context}: malformed response, missing field(s): ${missingKeys.join(', ')}`);
    this.name = 'MalformedCallableResponseError';
  }
}

/**
 * Validates that a callable's response payload contains the fields the caller
 * needs before it is mapped into a domain entity, so a malformed response
 * fails clearly at the boundary instead of producing a partially-built entity.
 */
export function assertCallableEntity<T extends object>(
  data: unknown,
  requiredKeys: (keyof T)[],
  context: string,
): T {
  if (!data || typeof data !== 'object') {
    throw new MalformedCallableResponseError(context, requiredKeys.map(String));
  }
  const missing = requiredKeys.filter((key) => {
    const value = (data as Record<string, unknown>)[key as string];
    return value === undefined || value === null;
  });
  if (missing.length > 0) {
    throw new MalformedCallableResponseError(context, missing.map(String));
  }
  return data as T;
}
