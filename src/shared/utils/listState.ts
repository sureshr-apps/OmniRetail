interface Identifiable {
  id: string;
}

/**
 * Replaces the record with the same id, or appends it if not present.
 * Idempotent: applying the same entity twice never duplicates a row.
 */
export function upsertById<T extends Identifiable>(list: T[], entity: T): T[] {
  const index = list.findIndex((item) => item.id === entity.id);
  if (index === -1) return [...list, entity];
  const next = list.slice();
  next[index] = entity;
  return next;
}

export function removeById<T extends Identifiable>(list: T[], id: string): T[] {
  return list.filter((item) => item.id !== id);
}
