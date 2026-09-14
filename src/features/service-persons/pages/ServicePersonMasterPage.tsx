import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  ServicePerson,
  ServicePersonStatus,
  ServicePersonScope,
  CreateServicePersonInput,
  UpdateServicePersonInput,
} from '../types';
import { servicePersonService, deriveServicePersonView } from '../services/servicePersonService';
import { outletService } from '../../outlets/services/outletService';
import { upsertById, removeById } from '@/shared/utils/listState';
import { useDeleteConfirmation } from '@/shared/hooks/useDeleteConfirmation';
import { MasterDeleteConfirmDialog } from '@/shared/components/MasterDeleteConfirmDialog';
import { ServicePersonHeader } from '../components/ServicePersonHeader';
import { ServicePersonFilterBar } from '../components/ServicePersonFilterBar';
import { ServicePersonTable } from '../components/ServicePersonTable';
import { ServicePersonPagination } from '../components/ServicePersonPagination';
import { ServicePersonDetailDrawer } from '../components/ServicePersonDetailDrawer';
import { ServicePersonModal } from '../components/ServicePersonModal';
import { ServicePersonStatusConfirmDialog } from '../components/ServicePersonStatusConfirmDialog';

export function ServicePersonMasterPage() {
  // Query States
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | ServicePersonStatus>('All');
  const [assignmentFilter, setAssignmentFilter] = useState<'All' | ServicePersonScope>('All');
  const [specializationFilter, setSpecializationFilter] = useState('All');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Data: the full org-scoped set. Mutations upsert into this directly; the
  // visible page, filters, and aggregate counts are all derived from it below.
  const [allServicePersons, setAllServicePersons] = useState<ServicePerson[]>([]);
  const [specializations, setSpecializations] = useState<string[]>([]);
  const [availableOutlets, setAvailableOutlets] = useState<{ id: string; name: string }[]>([]);

  // Loading & Error states
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Drawer & Modal States — selection is an id; the record itself is always
  // derived from allServicePersons, so it reflects mutations with no extra sync code.
  const [selectedPersonId, setSelectedPersonId] = useState<string | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [personToEdit, setPersonToEdit] = useState<ServicePerson | null>(null);

  const [isStatusDialogOpen, setIsStatusDialogOpen] = useState(false);
  const [personForStatusChange, setPersonForStatusChange] = useState<ServicePerson | null>(null);
  const [isProcessingStatus, setIsProcessingStatus] = useState(false);

  const view = useMemo(
    () => deriveServicePersonView(allServicePersons, {
      search: searchQuery,
      status: statusFilter,
      assignmentScope: assignmentFilter,
      specialization: specializationFilter,
      page,
      pageSize,
    }),
    [allServicePersons, searchQuery, statusFilter, assignmentFilter, specializationFilter, page, pageSize],
  );
  const selectedPerson = useMemo(
    () => allServicePersons.find((p) => p.id === selectedPersonId) ?? null,
    [allServicePersons, selectedPersonId],
  );

  const deleteConfirmation = useDeleteConfirmation<ServicePerson>({
    deleteRecord: (person) => servicePersonService.deleteServicePerson(person.id),
    onDeleted: (person) => {
      setAllServicePersons((prev) => removeById(prev, person.id));
      handleCloseDrawer();
    },
  });

  // Load Outlets & Specializations metadata once on mount
  useEffect(() => {
    async function loadMetadata() {
      try {
        const [activeOutlets, specs] = await Promise.all([
          outletService.getAllActiveOutlets(),
          servicePersonService.getSpecializations(),
        ]);
        setAvailableOutlets(activeOutlets.map((o) => ({ id: o.id, name: o.name })));
        setSpecializations(specs);
      } catch (err) {
        console.error('Error loading metadata in ServicePersonMasterPage:', err);
      }
    }
    loadMetadata();
  }, []);

  // Load Data — only for the initial mount, an explicit refresh, or error retry.
  // Mutations no longer trigger this; they update allServicePersons locally instead.
  const loadData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      setAllServicePersons(await servicePersonService.getAllServicePersons());
    } catch (err) {
      console.error(err);
      setError('A network timeout occurred while communicating with the OmniRetail enterprise server cluster.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // If a mutation removes the last item(s) from the current page (e.g.
  // deactivating the only "Active" row on the last page while that filter is
  // selected), fall back to the previous page instead of showing an empty page.
  useEffect(() => {
    if (view.total > 0 && view.servicePersons.length === 0 && page > 1) {
      setPage(view.totalPages);
    }
  }, [view, page]);

  // Handlers for Filters
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setPage(1);
  };

  const handleStatusChange = (status: 'All' | ServicePersonStatus) => {
    setStatusFilter(status);
    setPage(1);
  };

  const handleAssignmentChange = (scope: 'All' | ServicePersonScope) => {
    setAssignmentFilter(scope);
    setPage(1);
  };

  const handleSpecializationChange = (spec: string) => {
    setSpecializationFilter(spec);
    setPage(1);
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setStatusFilter('All');
    setAssignmentFilter('All');
    setSpecializationFilter('All');
    setPage(1);
  };

  const hasActiveFilters =
    searchQuery.trim() !== '' ||
    statusFilter !== 'All' ||
    assignmentFilter !== 'All' ||
    specializationFilter !== 'All';

  // Handlers for Add / Edit
  const handleOpenAddModal = () => {
    setPersonToEdit(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (person: ServicePerson) => {
    setPersonToEdit(person);
    setIsModalOpen(true);
  };

  const handleModalSubmit = async (
    input: CreateServicePersonInput | UpdateServicePersonInput
  ) => {
    if (personToEdit) {
      const updated = await servicePersonService.updateServicePerson(
        personToEdit.id,
        input as UpdateServicePersonInput
      );
      setAllServicePersons((prev) => upsertById(prev, updated));
    } else {
      const created = await servicePersonService.createServicePerson(input as CreateServicePersonInput);
      setAllServicePersons((prev) => upsertById(prev, created));
    }
  };

  // Handlers for Details Drawer
  const handleViewPerson = (person: ServicePerson) => {
    setSelectedPersonId(person.id);
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setSelectedPersonId(null);
  };

  const handlePromptDelete = (person: ServicePerson) => {
    handleCloseDrawer();
    deleteConfirmation.open(person);
  };

  // Handlers for Status Toggle
  const handleInitiateToggleStatus = (person: ServicePerson) => {
    setPersonForStatusChange(person);
    setIsStatusDialogOpen(true);
  };

  const handleConfirmToggleStatus = async () => {
    if (!personForStatusChange) return;
    setIsProcessingStatus(true);
    try {
      const newStatus = personForStatusChange.status === 'Active' ? 'Inactive' : 'Active';
      const updated = await servicePersonService.changeServicePersonStatus(
        personForStatusChange.id,
        newStatus
      );

      setAllServicePersons((prev) => upsertById(prev, updated));

      setIsStatusDialogOpen(false);
      setPersonForStatusChange(null);
    } catch (err) {
      console.error('Failed to change status:', err);
    } finally {
      setIsProcessingStatus(false);
    }
  };

  return (
    <div className="w-full">
      {/* Top Header Bar */}
      <ServicePersonHeader
        activeCount={view.activeCount}
        onAddClick={handleOpenAddModal}
      />

      {/* Filters & Search Toolbar */}
      <ServicePersonFilterBar
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        statusFilter={statusFilter}
        onStatusChange={handleStatusChange}
        assignmentFilter={assignmentFilter}
        onAssignmentChange={handleAssignmentChange}
        specializationFilter={specializationFilter}
        onSpecializationChange={handleSpecializationChange}
        specializations={specializations}
        onResetFilters={handleResetFilters}
        hasActiveFilters={hasActiveFilters}
      />

      {/* Main View Container */}
      <div className="w-full">
        {/* Loading State */}
        {isLoading && (
          <div className="bg-surface-container-lowest rounded-xl shadow-sm p-space-2xl border border-outline-variant/20">
            <div className="space-y-4 animate-pulse">
              <div className="h-8 bg-surface-container-high rounded w-1/4" />
              <div className="h-12 bg-surface-container-low rounded w-full" />
              <div className="space-y-3">
                <div className="h-10 bg-surface-container-low rounded w-full" />
                <div className="h-10 bg-surface-container-low rounded w-full" />
                <div className="h-10 bg-surface-container-low rounded w-full" />
                <div className="h-10 bg-surface-container-low rounded w-full" />
              </div>
            </div>
          </div>
        )}

        {/* Error State */}
        {!isLoading && error && (
          <div className="bg-surface-container-lowest rounded-xl shadow-sm p-16 text-center flex flex-col items-center justify-center border border-outline-variant/20">
            <div className="w-16 h-16 rounded-full bg-error-container text-on-error-container flex items-center justify-center mb-space-base">
              <span className="material-symbols-outlined text-[32px]">error</span>
            </div>
            <h3 className="font-headline-md text-headline-md text-on-surface mb-1">
              Failed to load service personnel
            </h3>
            <p className="font-body-default text-body-default text-on-surface-variant max-w-md mb-space-lg">
              {error}
            </p>
            <button
              onClick={() => loadData()}
              className="h-9 px-space-lg bg-primary text-on-primary rounded-xl font-body-medium text-body-medium flex items-center gap-space-xs shadow-sm hover:bg-primary-container transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">refresh</span>
              <span>Retry Request</span>
            </button>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && view.servicePersons.length === 0 && (
          <div className="bg-surface-container-lowest rounded-xl shadow-sm p-16 text-center flex flex-col items-center justify-center border border-outline-variant/20">
            <div className="w-16 h-16 rounded-full bg-surface-container-high flex items-center justify-center mb-space-base text-primary">
              <span className="material-symbols-outlined text-[32px]">group_off</span>
            </div>
            <h3 className="font-headline-md text-headline-md text-on-surface mb-1">
              No service personnel found
            </h3>
            <p className="font-body-default text-body-default text-on-surface-variant max-w-md mb-space-lg">
              {hasActiveFilters
                ? 'No records match your current filter or search criteria. Try adjusting your search query or reset your filters.'
                : 'No service personnel records currently registered in the database. Add a new service person to begin.'}
            </p>
            {hasActiveFilters ? (
              <button
                onClick={handleResetFilters}
                className="h-9 px-space-lg bg-surface-container-high hover:bg-surface-container border border-outline-variant/50 text-on-surface rounded-xl font-body-medium text-body-medium flex items-center gap-space-xs transition-colors shadow-xs"
              >
                <span className="material-symbols-outlined text-[18px]">filter_alt_off</span>
                <span>Reset All Filters</span>
              </button>
            ) : (
              <button
                onClick={handleOpenAddModal}
                className="h-9 px-space-lg bg-primary text-on-primary rounded-xl font-body-medium text-body-medium flex items-center gap-space-xs shadow-sm hover:bg-primary-container transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">add</span>
                <span>Add Service Person</span>
              </button>
            )}
          </div>
        )}

        {/* Directory State (Table & Pagination) */}
        {!isLoading && !error && view.servicePersons.length > 0 && (
          <div className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden border border-outline-variant/20">
            <ServicePersonTable
              servicePersons={view.servicePersons}
              onView={handleViewPerson}
            />

            <ServicePersonPagination
              currentPage={page}
              totalPages={view.totalPages}
              totalItems={view.total}
              pageSize={pageSize}
              onPageChange={(p) => setPage(p)}
              onPageSizeChange={(sz) => {
                setPageSize(sz);
                setPage(1);
              }}
            />
          </div>
        )}
      </div>

      {/* Slide-over Profile Details Drawer */}
      <ServicePersonDetailDrawer
        person={selectedPerson}
        isOpen={isDrawerOpen}
        onClose={handleCloseDrawer}
        onEdit={(person) => {
          setIsDrawerOpen(false);
          handleOpenEditModal(person);
        }}
        onToggleStatus={(person) => {
          setIsDrawerOpen(false);
          handleInitiateToggleStatus(person);
        }}
        onDelete={handlePromptDelete}
      />

      {/* Add / Edit Service Person Modal */}
      <ServicePersonModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleModalSubmit}
        personToEdit={personToEdit}
        availableOutlets={availableOutlets}
        specializations={specializations}
      />

      {/* Status Activation/Deactivation Confirmation Dialog */}
      <ServicePersonStatusConfirmDialog
        person={personForStatusChange}
        isOpen={isStatusDialogOpen}
        onClose={() => setIsStatusDialogOpen(false)}
        onConfirm={handleConfirmToggleStatus}
        isProcessing={isProcessingStatus}
      />

      <MasterDeleteConfirmDialog
        entityLabel="Service Person"
        recordName={deleteConfirmation.record?.displayName ?? ''}
        isOpen={deleteConfirmation.isOpen}
        isProcessing={deleteConfirmation.isProcessing}
        error={deleteConfirmation.error}
        onClose={deleteConfirmation.close}
        onConfirm={deleteConfirmation.confirm}
      />
    </div>
  );
}
