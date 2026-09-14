// @vitest-environment jsdom
import React from 'react';
import '@testing-library/jest-dom/vitest';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { useDeleteConfirmation } from '@/shared/hooks/useDeleteConfirmation';

afterEach(cleanup);

interface RecordItem {
  id: string;
  name: string;
}

function Harness({ deleteRecord, onDeleted }: { deleteRecord: (record: RecordItem) => Promise<void>; onDeleted?: (record: RecordItem) => void }) {
  const confirmation = useDeleteConfirmation({ deleteRecord, onDeleted });

  return (
    <>
      <button type="button" onClick={() => confirmation.open({ id: '1', name: 'Demo' })}>Open</button>
      <button type="button" onClick={() => void confirmation.confirm()}>Confirm</button>
      <button type="button" onClick={confirmation.close}>Close</button>
      <output data-testid="open">{String(confirmation.isOpen)}</output>
      <output data-testid="processing">{String(confirmation.isProcessing)}</output>
      <output data-testid="error">{confirmation.error ?? ''}</output>
    </>
  );
}

describe('useDeleteConfirmation', () => {
  it('coordinates open, confirm, and post-delete cleanup for a shared confirmation flow', async () => {
    const deleteRecord = vi.fn(async () => undefined);
    const onDeleted = vi.fn();
    render(<Harness deleteRecord={deleteRecord} onDeleted={onDeleted} />);

    fireEvent.click(screen.getByRole('button', { name: 'Open' }));
    expect(screen.getByTestId('open')).toHaveTextContent('true');

    fireEvent.click(screen.getByRole('button', { name: 'Confirm' }));
    await waitFor(() => expect(deleteRecord).toHaveBeenCalledWith({ id: '1', name: 'Demo' }));
    expect(onDeleted).toHaveBeenCalledWith({ id: '1', name: 'Demo' });
    expect(screen.getByTestId('open')).toHaveTextContent('false');
    expect(screen.getByTestId('error')).toHaveTextContent('');
  });

  it('keeps the record open with a retryable error when deletion fails', async () => {
    const deleteRecord = vi.fn().mockRejectedValueOnce(new Error('Linked records exist.')).mockResolvedValueOnce(undefined);
    render(<Harness deleteRecord={deleteRecord} />);

    fireEvent.click(screen.getByRole('button', { name: 'Open' }));
    fireEvent.click(screen.getByRole('button', { name: 'Confirm' }));
    await waitFor(() => expect(screen.getByTestId('error')).toHaveTextContent('Linked records exist.'));
    expect(screen.getByTestId('open')).toHaveTextContent('true');

    fireEvent.click(screen.getByRole('button', { name: 'Confirm' }));
    await waitFor(() => expect(screen.getByTestId('open')).toHaveTextContent('false'));
    expect(deleteRecord).toHaveBeenCalledTimes(2);
  });
});
