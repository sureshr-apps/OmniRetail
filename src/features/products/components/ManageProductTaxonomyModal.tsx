import React, { useEffect } from 'react';
import { ProductCategoryOption, ProductSubcategoryOption } from '../types';

interface ManageProductTaxonomyModalProps {
  isOpen: boolean;
  categories: ProductCategoryOption[];
  onClose: () => void;
  onDeleteCategory: (category: ProductCategoryOption) => void;
  onDeleteSubcategory: (category: ProductCategoryOption, subcategory: ProductSubcategoryOption) => void;
}

export function ManageProductTaxonomyModal({
  isOpen,
  categories,
  onClose,
  onDeleteCategory,
  onDeleteSubcategory,
}: ManageProductTaxonomyModalProps) {
  useEffect(() => {
    if (!isOpen) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-inverse-surface/40 p-space-base backdrop-blur-xs">
      <div className="flex max-h-[80vh] w-full max-w-xl flex-col overflow-hidden rounded-xl border border-outline-variant/30 bg-surface-container-lowest shadow-2xl">
        <div className="flex items-start justify-between border-b border-outline-variant/20 bg-surface-container-low px-space-xl py-space-lg">
          <div>
            <h2 className="font-headline-sm text-headline-sm font-semibold text-on-surface">Manage Categories</h2>
            <p className="mt-0.5 font-caption text-caption text-on-surface-variant">
              Remove unused categories and subcategories from this organization.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full text-on-surface-variant transition-colors hover:bg-surface-container"
            aria-label="Close category management"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-space-lg">
          {categories.length === 0 ? (
            <div className="rounded-lg border border-dashed border-outline-variant/50 p-space-xl text-center font-body-default text-body-default text-on-surface-variant">
              No categories have been created yet.
            </div>
          ) : (
            <div className="space-y-space-sm">
              {categories.map((category) => (
                <div key={category.id} className="rounded-lg border border-outline-variant/30 bg-surface-container-low p-space-sm">
                  <div className="flex items-center justify-between gap-space-sm">
                    <span className="font-body-medium text-body-medium font-semibold text-on-surface">{category.value}</span>
                    <button
                      type="button"
                      onClick={() => onDeleteCategory(category)}
                      className="rounded px-2 py-1 font-caption text-caption font-semibold text-error transition-colors hover:bg-error-container/50"
                      aria-label={`Delete category ${category.value}`}
                    >
                      Delete
                    </button>
                  </div>
                  {category.subcategories.length > 0 && (
                    <div className="mt-space-xs space-y-1 border-l-2 border-outline-variant/30 pl-space-sm">
                      {category.subcategories.map((subcategory) => (
                        <div key={subcategory.id} className="flex items-center justify-between gap-space-sm">
                          <span className="font-caption text-caption text-on-surface-variant">{subcategory.value}</span>
                          <button
                            type="button"
                            onClick={() => onDeleteSubcategory(category, subcategory)}
                            className="rounded px-2 py-0.5 font-caption text-caption font-semibold text-error transition-colors hover:bg-error-container/50"
                            aria-label={`Delete subcategory ${subcategory.value}`}
                          >
                            Delete
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-end border-t border-outline-variant/20 bg-surface-container-low p-space-lg">
          <button
            type="button"
            onClick={onClose}
            className="h-9 rounded border border-outline-variant/40 bg-surface-container-lowest px-space-base font-body-medium text-body-medium text-on-surface transition-colors hover:bg-surface-container"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
