import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  Customer,
  CustomerStatus,
  CustomerType,
  CreateCustomerInput,
  UpdateCustomerInput,
} from '../types';
import { customerService, deriveCustomerView } from '../services/customerService';
import { exportCustomersToCsv } from '../utils/calculations';
import { upsertById } from '@/shared/utils/listState';
import { CustomersHeader } from '../components/CustomersHeader';
import { CustomersFilterBar } from '../components/CustomersFilterBar';
import { CustomersTable } from '../components/CustomersTable';
import { CustomersPagination } from '../components/CustomersPagination';
import { CustomerDetailDrawer } from '../components/CustomerDetailDrawer';
import { AddCustomerModal } from '../components/AddCustomerModal';
import { EditCustomerModal } from '../components/EditCustomerModal';
import { CustomerConfirmDialog } from '../components/CustomerConfirmDialog';

export function CustomersPage() {
  // Query state
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<'ALL' | CustomerStatus>('Active'); // Default to Active matching Stitch screenshot
  const [type, setType] = useState<'ALL' | CustomerType>('ALL');
  const [city, setCity] = useState<string>('ALL');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5); // Default to 5 matching Stitch screenshot

  // Data: the full org-scoped set. Mutations upsert into this directly;
  // the visible page, filters, and aggregate counts are all derived from it below.
  const [allCustomers, setAllCustomers] = useState<Customer[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Dialog & Drawer state — selection is an id; the record itself is always
  // derived from allCustomers, so it reflects mutations with no extra sync code.
  const [viewingCustomerId, setViewingCustomerId] = useState<string | null>(null);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [statusDialogCustomer, setStatusDialogCustomer] = useState<Customer | null>(null);

  // Toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const data = useMemo(
    () =>
      deriveCustomerView(allCustomers, {
        search: search.trim() || undefined,
        status,
        type,
        city: city !== 'ALL' ? city : undefined,
        page,
        pageSize,
      }),
    [allCustomers, search, status, type, city, page, pageSize],
  );

  const viewingCustomer = useMemo(
    () => allCustomers.find((c) => c.id === viewingCustomerId) ?? null,
    [allCustomers, viewingCustomerId],
  );

  // Load Data — only for the initial mount or an explicit refresh. Mutations no
  // longer trigger this; they update allCustomers locally instead.
  const loadData = useCallback(async () => {
    setIsLoading(true);
    try {
      setAllCustomers(await customerService.getAllCustomers());
    } catch (err) {
      console.error('Failed to load customers:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Load available cities
  useEffect(() => {
    customerService.getCities().then((cList) => setCities(cList));
  }, []);

  // Reset page to 1 when filters change
  const handleSearchChange = (val: string) => {
    setSearch(val);
    setPage(1);
  };

  const handleStatusChange = (val: 'ALL' | CustomerStatus) => {
    setStatus(val);
    setPage(1);
  };

  const handleTypeChange = (val: 'ALL' | CustomerType) => {
    setType(val);
    setPage(1);
  };

  const handleCityChange = (val: string) => {
    setCity(val);
    setPage(1);
  };

  const handleResetFilters = () => {
    setSearch('');
    setStatus('ALL');
    setType('ALL');
    setCity('ALL');
    setPage(1);
  };

  const isFiltered = search !== '' || status !== 'ALL' || type !== 'ALL' || city !== 'ALL';

  // Export current filtered set — derived locally from the already-loaded full
  // set, matching the current search/status/type/city filter, with no extra
  // network call.
  const handleExport = () => {
    try {
      const result = deriveCustomerView(allCustomers, {
        search: search.trim() || undefined,
        status,
        type,
        city: city !== 'ALL' ? city : undefined,
        page: 1,
        pageSize: Math.max(allCustomers.length, 1),
      });
      exportCustomersToCsv(result.items);
      showToast(`Exported ${result.items.length} customer records to CSV.`);
    } catch (err) {
      console.error('Export failed:', err);
      showToast('Failed to export customer directory.');
    }
  };

  // Refreshes metadata (available cities) derived from the directory. This is
  // distinct from the customer rows themselves, which mutations now patch
  // locally via upsertById instead of triggering a full list reload.
  const refreshCustomerMetadata = async () => {
    setCities(await customerService.getCities());
  };

  // Add customer
  const handleCreateCustomer = async (input: CreateCustomerInput) => {
    const created = await customerService.createCustomer(input);
    showToast(`Customer ${created.customerCode} (${created.name}) created successfully.`);
    setAllCustomers((prev) => upsertById(prev, created));
    await refreshCustomerMetadata();
  };

  // Edit customer
  const handleUpdateCustomer = async (id: string, input: UpdateCustomerInput) => {
    const updated = await customerService.updateCustomer(id, input);
    showToast(`Customer ${updated.customerCode} (${updated.name}) updated successfully.`);
    setAllCustomers((prev) => upsertById(prev, updated));
    await refreshCustomerMetadata();
  };

  // Toggle status with confirmation
  const handleToggleStatusConfirm = async () => {
    if (!statusDialogCustomer) return;
    const newStatus: CustomerStatus =
      statusDialogCustomer.status === 'Active' ? 'Inactive' : 'Active';
    const updated = await customerService.changeCustomerStatus(statusDialogCustomer.id, newStatus);
    showToast(
      `Customer ${updated.customerCode} marked as ${newStatus}.`
    );
    setAllCustomers((prev) => upsertById(prev, updated));
    await refreshCustomerMetadata();
  };

  return (
    <div className="flex-1 flex flex-col min-h-0 overflow-y-auto pb-16 pt-2">
      {/* Toast Feedback */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-inverse-surface text-inverse-on-surface px-4 py-2.5 rounded shadow-lg text-caption flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-150">
          <span className="material-symbols-outlined text-[18px] text-primary-fixed">check_circle</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Header */}
      <CustomersHeader
        onExport={handleExport}
        onAddCustomer={() => setIsAddOpen(true)}
        totalCustomers={data.totalCount || 0}
      />

      {/* Search & Filters Bar */}
      <CustomersFilterBar
        search={search}
        onSearchChange={handleSearchChange}
        status={status}
        onStatusChange={handleStatusChange}
        type={type}
        onTypeChange={handleTypeChange}
        city={city}
        onCityChange={handleCityChange}
        cities={cities}
        isFiltered={isFiltered}
        onResetFilters={handleResetFilters}
      />

      {/* Table & Pagination Container */}
      <div className="relative w-full">
        <CustomersTable
          customers={data.items}
          onSelectCustomer={(c) => setViewingCustomerId(c.id)}
          onEditCustomer={(c) => setEditingCustomer(c)}
          onToggleStatus={(c) => setStatusDialogCustomer(c)}
          isLoading={isLoading}
          onAddFirst={() => setIsAddOpen(true)}
        />

        {/* Pagination Footer */}
        {data.filteredCount > 0 && (
          <CustomersPagination
            page={data.page}
            pageSize={data.pageSize}
            totalCount={data.totalCount}
            filteredCount={data.filteredCount}
            totalPages={data.totalPages}
            onPageChange={(p) => setPage(p)}
            onPageSizeChange={(sz) => {
              setPageSize(sz);
              setPage(1);
            }}
          />
        )}
      </div>

      {/* Add Customer Modal */}
      <AddCustomerModal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onSubmit={handleCreateCustomer}
      />

      {/* Edit Customer Modal */}
      <EditCustomerModal
        customer={editingCustomer}
        isOpen={!!editingCustomer}
        onClose={() => setEditingCustomer(null)}
        onSubmit={handleUpdateCustomer}
      />

      {/* Slide-Over Customer Details Drawer */}
      <CustomerDetailDrawer
        customer={viewingCustomer}
        isOpen={!!viewingCustomer}
        onClose={() => setViewingCustomerId(null)}
        onEdit={(c) => setEditingCustomer(c)}
        onToggleStatus={(c) => setStatusDialogCustomer(c)}
      />

      {/* Confirm Status Change Dialog */}
      <CustomerConfirmDialog
        customer={statusDialogCustomer}
        isOpen={!!statusDialogCustomer}
        onClose={() => setStatusDialogCustomer(null)}
        onConfirm={handleToggleStatusConfirm}
        actionType={statusDialogCustomer?.status === 'Active' ? 'deactivate' : 'activate'}
      />
    </div>
  );
}
