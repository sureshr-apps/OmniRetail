import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const source = readFileSync(new URL('../src/features/plans/pages/PlansPage.tsx', import.meta.url), 'utf8');

function section(start: string, end: string): string {
  const startIndex = source.indexOf(start);
  const endIndex = source.indexOf(end, startIndex + start.length);
  expect(startIndex, `Missing section start: ${start}`).toBeGreaterThanOrEqual(0);
  expect(endIndex, `Missing section end: ${end}`).toBeGreaterThan(startIndex);
  return source.slice(startIndex, endIndex);
}

describe('PlansPage applies mutation responses to local state directly', () => {
  it('holds the full unfiltered set and derives the visible list, instead of storing an already-filtered list', () => {
    expect(source).toContain('derivePlansView(allPlans');
    expect(source).toContain('getAllPlans()');
  });

  it.each([
    ['activate', 'const handleActivatePlan', 'const handleDeletePlan'],
    ['delete', 'const handleDeletePlan', 'const handleLoadDefaults'],
  ])('%s applies the result to local state with upsertById/removeById, not a fetchPlans() reload', (_name, start, end) => {
    const handler = section(start, end);
    expect(handler).toMatch(/upsertById\(prev,|removeById\(prev,/);
    expect(handler).not.toContain('await fetchPlans()');
  });

  it('Add/Edit/Deactivate modal onSuccess callbacks upsert locally with no redundant fetchPlans() reload', () => {
    const addSection = section('<AddPlanModal', '<EditPlanModal');
    const editSection = section('<EditPlanModal', '<DeactivatePlanModal');
    const deactivateStart = source.indexOf('<DeactivatePlanModal');
    expect(deactivateStart).toBeGreaterThanOrEqual(0);
    const deactivateSection = source.slice(deactivateStart);
    for (const modalSection of [addSection, editSection, deactivateSection]) {
      expect(modalSection).toContain('upsertById(prev, ');
      expect(modalSection).not.toContain('fetchPlans()');
    }
  });
});
