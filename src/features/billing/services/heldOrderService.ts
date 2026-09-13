import { httpsCallable } from 'firebase/functions';
import { getFirebaseClientServices } from '@/infrastructure/firebase/client';
import { HeldOrder } from '../types';

interface HeldOrderResponse {
  heldOrder: HeldOrder;
}

interface HeldOrdersResponse {
  heldOrders: HeldOrder[];
}

export async function listHeldOrders(): Promise<HeldOrder[]> {
  const callable = httpsCallable<void, HeldOrdersResponse>(
    getFirebaseClientServices().functions,
    'listTenantHeldOrders'
  );
  const result = await callable();
  return result.data.heldOrders;
}

export async function createHeldOrder(heldOrder: Omit<HeldOrder, 'id' | 'heldAt'>): Promise<HeldOrder> {
  const callable = httpsCallable<{ heldOrder: Omit<HeldOrder, 'id' | 'heldAt'> }, HeldOrderResponse>(
    getFirebaseClientServices().functions,
    'createTenantHeldOrder'
  );
  const result = await callable({ heldOrder });
  return result.data.heldOrder;
}

export async function deleteHeldOrder(id: string): Promise<void> {
  const callable = httpsCallable<{ id: string }, { success: true }>(
    getFirebaseClientServices().functions,
    'deleteTenantHeldOrder'
  );
  await callable({ id });
}
