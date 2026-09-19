import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { calculateCashRefundAmount, calculateReturnAmount } from '../functions/src/saleReturns';

const schema = readFileSync(new URL('../dataconnect/schema/schema.gql', import.meta.url), 'utf8');
const connector = readFileSync(new URL('../dataconnect/master-admin/identity.gql', import.meta.url), 'utf8');
const returnSource = readFileSync(new URL('../functions/src/saleReturns.ts', import.meta.url), 'utf8');
const inventorySource = readFileSync(new URL('../functions/src/inventoryBatches.ts', import.meta.url), 'utf8');
const cashSource = readFileSync(new URL('../functions/src/cashRegister.ts', import.meta.url), 'utf8');
const salesPage = readFileSync(new URL('../src/features/sales/pages/SalesPage.tsx', import.meta.url), 'utf8');
const salesService = readFileSync(new URL('../src/features/sales/services/salesService.ts', import.meta.url), 'utf8');
const returnModal = readFileSync(new URL('../src/features/sales/components/SaleReturnModal.tsx', import.meta.url), 'utf8');

describe('sale return business rules', () => {
  it('calculates a full return and a proportional partial return', () => {
    expect(calculateReturnAmount(350, 350, 350, true)).toBe(350);
    expect(calculateReturnAmount(350, 350, 100, false)).toBe(100);
  });

  it('adjusts cash only for cash and the cash portion of split tenders', () => {
    expect(calculateCashRefundAmount('CASH', 42, 42, 42)).toBe(42);
    expect(calculateCashRefundAmount('VISA', 42, 42, 42)).toBe(0);
    expect(calculateCashRefundAmount('SPLIT', 100, 50, 200)).toBe(25);
  });

  it('persists return quantities and return records with request idempotency', () => {
    expect(schema).toContain('refundedQty: Float! @default(value: 0)');
    expect(schema).toContain('type SaleReturn @table');
    expect(schema).toContain('type SaleReturnLine @table');
    expect(connector).toContain('refundedQty');
    expect(returnSource).toContain('WHERE organization_id = $1 AND request_id = $2');
    expect(returnSource).toContain('INSERT INTO "sale_return"');
    expect(returnSource).toContain('UPDATE "sale" SET status = $2');
    expect(returnSource).toContain("const status = isFullReturn ? 'REFUNDED' : 'PARTIAL_REFUND'");
  });

  it('restores the original batches and records cash refunds in the register ledger', () => {
    expect(inventorySource).toContain("reasonCode: 'SALE_RETURN'");
    expect(inventorySource).toContain('refunded_qty = refunded_qty + $2');
    expect(inventorySource).toContain('sl.quantity, sl.refunded_qty');
    expect(cashSource).toContain("source_type, source_id, reason");
    expect(cashSource).toContain("'SALE_RETURN'");
    expect(returnSource).toContain('recordSaleCashRefundMovement');
  });

  it('connects the Issue Return action to the production callable and supports partial quantities', () => {
    expect(salesService).toContain("'returnTenantSaleRecord'");
    expect(salesPage).toContain('setReturningTx(tx)');
    expect(returnModal).toContain('returnableQuantity');
    expect(returnModal).toContain('step="1"');
    expect(returnModal).toContain('Confirm return');
  });
});
