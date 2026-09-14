interface MasterDeleteConfirmDialogProps {
  entityLabel: string;
  recordName: string;
  isOpen: boolean;
  isProcessing: boolean;
  error: string | null;
  onClose: () => void;
  onConfirm: () => void;
}

export function MasterDeleteConfirmDialog({
  entityLabel,
  recordName,
  isOpen,
  isProcessing,
  error,
  onClose,
  onConfirm,
}: MasterDeleteConfirmDialogProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-xs">
      <div className="w-full max-w-md rounded-xl border border-outline-variant/30 bg-surface-container-lowest shadow-2xl">
        <div className="border-b border-outline-variant/20 p-space-lg">
          <div className="flex items-start gap-space-sm">
            <span className="material-symbols-outlined rounded-full bg-error-container p-2 text-error">delete</span>
            <div>
              <h2 className="font-headline-sm text-headline-sm font-semibold text-on-surface">Delete {entityLabel}?</h2>
              <p className="mt-1 font-caption text-caption text-on-surface-variant">
                This permanently removes <span className="font-semibold text-on-surface">{recordName}</span> from the organization.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-space-sm p-space-lg">
          <p className="font-caption text-caption text-on-surface-variant">
            Deletion is available only when this record has no linked operational or historical records. If it is referenced elsewhere, deactivate it instead.
          </p>
          {error && (
            <div role="alert" className="rounded border border-error/30 bg-error-container/30 p-3 font-caption text-caption text-error">
              {error}
            </div>
          )}
        </div>

        <div className="flex justify-end gap-space-sm border-t border-outline-variant/20 bg-surface-container-low p-space-lg">
          <button
            type="button"
            onClick={onClose}
            disabled={isProcessing}
            className="h-9 rounded border border-outline-variant/40 bg-surface-container-lowest px-space-base font-body-medium text-body-medium text-on-surface transition-colors hover:bg-surface-container disabled:cursor-not-allowed disabled:opacity-60"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isProcessing}
            className="h-9 rounded bg-error px-space-base font-body-medium text-body-medium font-semibold text-on-error transition-colors hover:bg-error/90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isProcessing ? 'Deleting…' : `Delete ${entityLabel}`}
          </button>
        </div>
      </div>
    </div>
  );
}
