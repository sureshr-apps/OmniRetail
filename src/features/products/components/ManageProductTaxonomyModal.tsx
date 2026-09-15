import React, { useEffect, useState } from 'react';
import { ProductCategoryOption, ProductSubcategoryOption } from '../types';

interface ManageProductTaxonomyModalProps {
  isOpen: boolean;
  categories: ProductCategoryOption[];
  onClose: () => void;
  onCreateCategory: (value: string) => Promise<void>;
  onUpdateCategory: (id: string, value: string) => Promise<void>;
  onDeleteCategory: (category: ProductCategoryOption) => void;
  onCreateSubcategory: (categoryId: string, value: string) => Promise<void>;
  onUpdateSubcategory: (id: string, value: string) => Promise<void>;
  onDeleteSubcategory: (category: ProductCategoryOption, subcategory: ProductSubcategoryOption) => void;
}

export function ManageProductTaxonomyModal({
  isOpen,
  categories,
  onClose,
  onCreateCategory,
  onUpdateCategory,
  onDeleteCategory,
  onCreateSubcategory,
  onUpdateSubcategory,
  onDeleteSubcategory,
}: ManageProductTaxonomyModalProps) {
  const [newCategory, setNewCategory] = useState('');
  const [newSubcategory, setNewSubcategory] = useState<Record<string, string>>({});
  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(null);
  const [editingCategoryValue, setEditingCategoryValue] = useState('');
  const [editingSubcategoryId, setEditingSubcategoryId] = useState<string | null>(null);
  const [editingSubcategoryValue, setEditingSubcategoryValue] = useState('');
  const [busyKey, setBusyKey] = useState<string | null>(null);
  const [error, setError] = useState('');

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

  const run = async (key: string, action: () => Promise<void>, onSuccess?: () => void) => {
    setError('');
    setBusyKey(key);
    try {
      await action();
      onSuccess?.();
    } catch (cause) {
      console.error('Failed to update product taxonomy:', cause);
      setError('Could not save this taxonomy change. Please try again.');
    } finally {
      setBusyKey(null);
    }
  };

  const addCategory = () => {
    const value = newCategory.trim();
    if (!value) return setError('Category name is required.');
    void run('new-category', () => onCreateCategory(value), () => setNewCategory(''));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-inverse-surface/40 p-space-base backdrop-blur-xs">
      <div className="flex max-h-[85vh] w-full max-w-2xl flex-col overflow-hidden rounded-xl border border-outline-variant/30 bg-surface-container-lowest shadow-2xl">
        <div className="flex items-start justify-between border-b border-outline-variant/20 bg-surface-container-low px-space-xl py-space-lg">
          <div>
            <h2 className="font-headline-sm text-headline-sm font-semibold text-on-surface">Manage Categories</h2>
            <p className="mt-0.5 font-caption text-caption text-on-surface-variant">Add, rename, or remove categories and subcategories.</p>
          </div>
          <button type="button" onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-full text-on-surface-variant transition-colors hover:bg-surface-container" aria-label="Close category management">
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-space-lg">
          <div className="mb-space-lg flex gap-space-sm">
            <input
              type="text"
              value={newCategory}
              onChange={(event) => setNewCategory(event.target.value)}
              onKeyDown={(event) => { if (event.key === 'Enter') addCategory(); }}
              placeholder="New category name"
              className="h-9 min-w-0 flex-1 rounded border border-outline-variant/40 bg-surface-container px-3 text-body-default text-on-surface outline-none focus:ring-1 focus:ring-primary"
            />
            <button type="button" onClick={addCategory} disabled={busyKey === 'new-category'} className="h-9 rounded bg-primary px-space-base font-body-medium text-body-medium text-on-primary disabled:opacity-50">Add Category</button>
          </div>

          {error && <p className="mb-space-sm rounded border border-error/30 bg-error-container/30 px-3 py-2 font-caption text-caption text-error">{error}</p>}

          {categories.length === 0 ? (
            <div className="rounded-lg border border-dashed border-outline-variant/50 p-space-xl text-center font-body-default text-body-default text-on-surface-variant">No categories have been created yet.</div>
          ) : (
            <div className="space-y-space-sm">
              {categories.map((category) => (
                <div key={category.id} className="rounded-lg border border-outline-variant/30 bg-surface-container-low p-space-sm">
                  <div className="flex items-center gap-space-sm">
                    {editingCategoryId === category.id ? (
                      <>
                        <input autoFocus type="text" value={editingCategoryValue} onChange={(event) => setEditingCategoryValue(event.target.value)} className="h-8 min-w-0 flex-1 rounded border border-outline-variant/40 bg-surface-container-lowest px-2 text-body-default text-on-surface outline-none focus:ring-1 focus:ring-primary" />
                        <button type="button" disabled={busyKey === `category-${category.id}`} onClick={() => {
                          const value = editingCategoryValue.trim();
                          if (!value) return setError('Category name is required.');
                          void run(`category-${category.id}`, () => onUpdateCategory(category.id, value), () => setEditingCategoryId(null));
                        }} className="rounded px-2 py-1 font-caption text-caption font-semibold text-primary hover:bg-primary/10 disabled:opacity-50">Save</button>
                        <button type="button" onClick={() => setEditingCategoryId(null)} className="rounded px-2 py-1 font-caption text-caption text-on-surface-variant hover:bg-surface-container">Cancel</button>
                      </>
                    ) : (
                      <>
                        <span className="flex-1 font-body-medium text-body-medium font-semibold text-on-surface">{category.value}</span>
                        <button type="button" onClick={() => { setEditingCategoryId(category.id); setEditingCategoryValue(category.value); setError(''); }} className="rounded px-2 py-1 font-caption text-caption font-semibold text-primary hover:bg-primary/10">Edit</button>
                        <button type="button" onClick={() => onDeleteCategory(category)} className="rounded px-2 py-1 font-caption text-caption font-semibold text-error hover:bg-error-container/50">Delete</button>
                      </>
                    )}
                  </div>

                  <div className="mt-space-sm border-l-2 border-outline-variant/30 pl-space-sm">
                    {category.subcategories.map((subcategory) => (
                      <div key={subcategory.id} className="flex items-center gap-space-sm py-1">
                        {editingSubcategoryId === subcategory.id ? (
                          <>
                            <input autoFocus type="text" value={editingSubcategoryValue} onChange={(event) => setEditingSubcategoryValue(event.target.value)} className="h-8 min-w-0 flex-1 rounded border border-outline-variant/40 bg-surface-container-lowest px-2 font-caption text-caption text-on-surface outline-none focus:ring-1 focus:ring-primary" />
                            <button type="button" disabled={busyKey === `subcategory-${subcategory.id}`} onClick={() => {
                              const value = editingSubcategoryValue.trim();
                              if (!value) return setError('Subcategory name is required.');
                              void run(`subcategory-${subcategory.id}`, () => onUpdateSubcategory(subcategory.id, value), () => setEditingSubcategoryId(null));
                            }} className="rounded px-2 py-1 font-caption text-caption font-semibold text-primary hover:bg-primary/10 disabled:opacity-50">Save</button>
                            <button type="button" onClick={() => setEditingSubcategoryId(null)} className="rounded px-2 py-1 font-caption text-caption text-on-surface-variant hover:bg-surface-container">Cancel</button>
                          </>
                        ) : (
                          <>
                            <span className="flex-1 font-caption text-caption text-on-surface-variant">{subcategory.value}</span>
                            <button type="button" onClick={() => { setEditingSubcategoryId(subcategory.id); setEditingSubcategoryValue(subcategory.value); setError(''); }} className="rounded px-2 py-0.5 font-caption text-caption font-semibold text-primary hover:bg-primary/10">Edit</button>
                            <button type="button" onClick={() => onDeleteSubcategory(category, subcategory)} className="rounded px-2 py-0.5 font-caption text-caption font-semibold text-error hover:bg-error-container/50">Delete</button>
                          </>
                        )}
                      </div>
                    ))}
                    <div className="mt-1 flex gap-1.5">
                      <input
                        type="text"
                        value={newSubcategory[category.id] ?? ''}
                        onChange={(event) => setNewSubcategory((previous) => ({ ...previous, [category.id]: event.target.value }))}
                        onKeyDown={(event) => {
                          if (event.key !== 'Enter') return;
                          const value = (newSubcategory[category.id] ?? '').trim();
                          if (!value) return setError('Subcategory name is required.');
                          void run(`new-subcategory-${category.id}`, () => onCreateSubcategory(category.id, value), () => setNewSubcategory((previous) => ({ ...previous, [category.id]: '' })));
                        }}
                        placeholder="New subcategory"
                        className="h-8 min-w-0 flex-1 rounded border border-outline-variant/40 bg-surface-container-lowest px-2 font-caption text-caption text-on-surface outline-none focus:ring-1 focus:ring-primary"
                      />
                      <button type="button" disabled={busyKey === `new-subcategory-${category.id}`} onClick={() => {
                        const value = (newSubcategory[category.id] ?? '').trim();
                        if (!value) return setError('Subcategory name is required.');
                        void run(`new-subcategory-${category.id}`, () => onCreateSubcategory(category.id, value), () => setNewSubcategory((previous) => ({ ...previous, [category.id]: '' })));
                      }} className="rounded px-2 py-1 font-caption text-caption font-semibold text-primary hover:bg-primary/10 disabled:opacity-50">Add</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-end border-t border-outline-variant/20 bg-surface-container-low p-space-lg">
          <button type="button" onClick={onClose} className="h-9 rounded border border-outline-variant/40 bg-surface-container-lowest px-space-base font-body-medium text-body-medium text-on-surface transition-colors hover:bg-surface-container">Done</button>
        </div>
      </div>
    </div>
  );
}
