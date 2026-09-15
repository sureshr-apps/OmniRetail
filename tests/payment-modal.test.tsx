// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { PaymentModal } from '@/features/billing/components/PaymentModal';

afterEach(cleanup);

describe('PaymentModal checkout lifecycle', () => {
  it('persists once during authorization and does not resubmit when starting a new sale', async () => {
    const completeSale = vi.fn().mockResolvedValue(undefined);
    const close = vi.fn();

    render(
      <PaymentModal
        isOpen
        onClose={close}
        method="card"
        totals={{ itemCount: 1, unitCount: 1, subtotal: 100, memberDiscount: 0, tax: 18, totalPayable: 118 }}
        customer={{ id: '', name: 'Walk-in Customer', tier: 'Standard', points: 0, memberDiscount: 0 }}
        orderNumber="#ORD-TEST"
        onCompleteSale={completeSale}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: /Authorize & Complete/i }));
    await waitFor(() => expect(completeSale).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(screen.getByRole('button', { name: /New Sale/i })).toBeTruthy());

    fireEvent.click(screen.getByRole('button', { name: /New Sale/i }));
    expect(completeSale).toHaveBeenCalledTimes(1);
    expect(close).toHaveBeenCalledTimes(1);
  });
});
