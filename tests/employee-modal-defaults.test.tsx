// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { EmployeeModal } from '@/features/employees/components/EmployeeModal';

afterEach(cleanup);

describe('EmployeeModal defaults', () => {
  it('defaults new employees to Male and leaves designation empty', () => {
    render(
      <EmployeeModal
        isOpen
        onClose={vi.fn()}
        onSubmitCreate={vi.fn().mockResolvedValue(undefined)}
        onSubmitUpdate={vi.fn().mockResolvedValue(undefined)}
        employeeToEdit={null}
        availableOutlets={[]}
      />,
    );

    const genderField = screen.getByText('Gender', { exact: true }).parentElement?.querySelector('select');
    const designationField = screen.getByText('Designation', { exact: true }).parentElement?.querySelector('input');

    expect(genderField).toHaveValue('Male');
    expect(designationField).toHaveValue('');
  });
});
