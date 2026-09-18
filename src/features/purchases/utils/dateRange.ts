export interface PurchaseDateRange {
  start: string;
  end: string;
}

function formatDateInput(date: Date): string {
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${date.getFullYear()}-${month}-${day}`;
}

export function getCurrentMonthDateRange(now = new Date()): PurchaseDateRange {
  return {
    start: formatDateInput(new Date(now.getFullYear(), now.getMonth(), 1)),
    end: formatDateInput(new Date(now.getFullYear(), now.getMonth() + 1, 0)),
  };
}
