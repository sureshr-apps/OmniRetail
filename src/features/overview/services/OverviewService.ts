import { getFirebaseClientServices } from '@/infrastructure/firebase/client';
import { httpsCallable } from 'firebase/functions';
import { OverviewData } from '../types';

export function formatCalendarDate(dateStr: string): string {
  if (!dateStr) return '—';
  const parts = dateStr.split('-');
  if (parts.length < 3) return dateStr;
  const [year, month, day] = parts.map(Number);
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  });
}

export function formatRelativeCreatedDate(dateStr: string, referenceDate: Date = new Date()): string {
  if (!dateStr) return 'Recently';
  const cleanDate = dateStr.split('T')[0];
  const parts = cleanDate.split('-');
  if (parts.length < 3) return dateStr;
  const [year, month, day] = parts.map(Number);
  const created = new Date(year, month - 1, day);
  const today = new Date(referenceDate.getFullYear(), referenceDate.getMonth(), referenceDate.getDate());
  const diffTime = today.getTime() - created.getTime();
  const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays <= 0) return 'Added today';
  if (diffDays === 1) return 'Added 1 day ago';
  if (diffDays < 7) return `Added ${diffDays} days ago`;
  if (diffDays < 14) return 'Added 1 week ago';
  return `Added ${formatCalendarDate(cleanDate)}`;
}

export interface IOverviewService {
  getOverviewData(): Promise<OverviewData>;
}

class OverviewServiceImpl implements IOverviewService {
  async getOverviewData(): Promise<OverviewData> {
    const result = await httpsCallable(getFirebaseClientServices().functions, 'getMasterAdminOverview')({});
    return result.data as OverviewData;
  }
}

export const overviewService: IOverviewService = new OverviewServiceImpl();
