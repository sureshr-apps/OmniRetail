import { useCallback, useState } from 'react';

interface UseDeleteConfirmationOptions<T> {
  deleteRecord: (record: T) => Promise<void>;
  onDeleted?: (record: T) => void | Promise<void>;
}

export function useDeleteConfirmation<T>({
  deleteRecord,
  onDeleted,
}: UseDeleteConfirmationOptions<T>) {
  const [record, setRecord] = useState<T | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const open = useCallback((nextRecord: T) => {
    setRecord(nextRecord);
    setError(null);
  }, []);

  const close = useCallback(() => {
    if (isProcessing) return;
    setRecord(null);
    setError(null);
  }, [isProcessing]);

  const confirm = useCallback(async () => {
    if (!record) return;
    setIsProcessing(true);
    setError(null);
    try {
      await deleteRecord(record);
      await onDeleted?.(record);
      setRecord(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to delete this record.');
    } finally {
      setIsProcessing(false);
    }
  }, [deleteRecord, onDeleted, record]);

  return {
    record,
    isOpen: Boolean(record),
    isProcessing,
    error,
    open,
    close,
    confirm,
  };
}
