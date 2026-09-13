import React, { useState, useEffect, useCallback } from 'react';
import {
  Outlet,
  OutletStatus,
  CreateOutletInput,
  UpdateOutletInput,
} from '../types';
import { outletService } from '../services/outletService';
import { exportOutletsToCsv } from '../utils/exportCsv';

import { OutletHeader } from '../components/OutletHeader';
import { OutletSuccessBanner } from '../components/OutletSuccessBanner';
import { OutletFilterBar } from '../components/OutletFilterBar';
import { OutletTable } from '../components/OutletTable';
import { OutletPagination } from '../components/OutletPagination';
import { OutletDetailDrawer } from '../components/OutletDetailDrawer';
import { OutletModal } from '../components/OutletModal';
import { OutletStatusConfirmDialog } from '../components/OutletStatusConfirmDialog';

export function OutletMasterPage() {
  // Query & Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | OutletStatus>('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Data
  const [outlets, setOutlets] = useState<Outlet[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [activeCount, setActiveCount] = useState(0);
  const [inactiveCount, setInactiveCount] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Success Notification Banner
  const [showSuccessBanner, setShowSuccessBanner] = useState(true);
  const [bannerInfo, setBannerInfo] = useState({
    message: 'Outlet Successfully Configured!',
    outletCode: 'OUT-006',
    outletName: 'Uptown Boutique & Lifestyle',
  });

  // Slide-Over Detail Drawer
  const [selectedOutlet, setSelectedOutlet] = useState<Outlet | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Add / Edit Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [outletToEdit, setOutletToEdit] = useState<Outlet | null>(null);

  // Status Change Confirmation Dialog
  const [outletForStatusChange, setOutletForStatusChange] = useState<Outlet | null>(null);
  const [isStatusDialogOpen, setIsStatusDialogOpen] = useState(false);
  const [isProcessingStatus, setIsProcessingStatus] = useState(false);

  // Load Data
  const loadData = useCallback(async (isSilent = false) => {
    try {
      if (!isSilent) setIsLoading(true);
      setError(null);

      const res = await outletService.getOutlets({
          search: searchQuery,
          status: statusFilter,
          page: currentPage,
          pageSize,
        });

      setOutlets(res.outlets);
      setTotalCount(res.total);
      setActiveCount(res.activeCount);
      setInactiveCount(res.inactiveCount);
      setTotalPages(res.totalPages);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Unable to retrieve outlet directory.';
      setError(msg);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, [searchQuery, statusFilter, currentPage, pageSize]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Refresh handler
  const handleRefresh = async () => {
    setIsRefreshing(true);
    await loadData(true);
  };

  // Filter change handlers (resets page to 1)
  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
    setCurrentPage(1);
  };

  const handleStatusFilterChange = (val: 'All' | OutletStatus) => {
    setStatusFilter(val);
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setStatusFilter('All');
    setCurrentPage(1);
  };

  // CSV Export
  const handleExportCsv = async () => {
    // Export all matching current search and filter
    const res = await outletService.getOutlets({
      search: searchQuery,
      status: statusFilter,
      page: 1,
      pageSize: 1000,
    });
    exportOutletsToCsv(res.outlets);
  };

  // Modal actions
  const handleOpenAddModal = () => {
    setOutletToEdit(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (outlet: Outlet) => {
    setOutletToEdit(outlet);
    setIsModalOpen(true);
  };

  const handleCreateOutlet = async (input: CreateOutletInput) => {
    const created = await outletService.createOutlet(input);
    setBannerInfo({
      message: 'Outlet Successfully Configured!',
      outletCode: created.outletCode,
      outletName: created.name,
    });
    setShowSuccessBanner(true);
    await loadData(true);
  };

  const handleUpdateOutlet = async (id: string, input: UpdateOutletInput) => {
    const updated = await outletService.updateOutlet(id, input);
    setBannerInfo({
      message: 'Outlet Successfully Updated!',
      outletCode: updated.outletCode,
      outletName: updated.name,
    });
    setShowSuccessBanner(true);
    if (selectedOutlet && selectedOutlet.id === updated.id) {
      setSelectedOutlet(updated);
    }
    await loadData(true);
  };

  // View Details (Drawer)
  const handleViewDetails = (outlet: Outlet) => {
    setSelectedOutlet(outlet);
    setIsDrawerOpen(true);
  };

  // Status Change Dialog
  const handleOpenStatusDialog = (outlet: Outlet) => {
    setOutletForStatusChange(outlet);
    setIsStatusDialogOpen(true);
  };

  const handleConfirmStatusChange = async () => {
    if (!outletForStatusChange) return;

    try {
      setIsProcessingStatus(true);
      const newStatus: OutletStatus =
        outletForStatusChange.status === 'Active' ? 'Inactive' : 'Active';

      const updated = await outletService.changeOutletStatus(
        outletForStatusChange.id,
        newStatus
      );

      setBannerInfo({
        message: newStatus === 'Active' ? 'Outlet Restored & Activated!' : 'Outlet Deactivated!',
        outletCode: updated.outletCode,
        outletName: updated.name,
      });
      setShowSuccessBanner(true);

      if (selectedOutlet && selectedOutlet.id === updated.id) {
        setSelectedOutlet(updated);
      }

      setIsStatusDialogOpen(false);
      setOutletForStatusChange(null);
      await loadData(true);
    } catch (err) {
      console.error('Failed to change outlet status:', err);
    } finally {
      setIsProcessingStatus(false);
    }
  };

  const hasActiveFilters = Boolean(searchQuery || statusFilter !== 'All');

  return (
    <div className="h-full flex flex-col min-w-0 bg-[#f8fafc] overflow-y-auto">
      {/* 1. Page Header matching Stitch design */}
      <OutletHeader
        totalCount={activeCount + inactiveCount}
        onExportCsv={handleExportCsv}
        onAddOutlet={handleOpenAddModal}
      />

      {/* 2. Success Banner Notification */}
      {showSuccessBanner && (
        <OutletSuccessBanner
          message={bannerInfo.message}
          outletCode={bannerInfo.outletCode}
          outletName={bannerInfo.outletName}
          onDismiss={() => setShowSuccessBanner(false)}
        />
      )}

      {/* 3. Main Data Container */}
      <div className="p-6 space-y-4 flex-1 flex flex-col">
        {/* Search & Filter Controls Bar */}
        <OutletFilterBar
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          statusFilter={statusFilter}
          onStatusFilterChange={handleStatusFilterChange}
          totalCount={activeCount + inactiveCount}
          activeCount={activeCount}
          inactiveCount={inactiveCount}
          onRefresh={handleRefresh}
          isRefreshing={isRefreshing}
        />

        {/* Data Table Card */}
        <div className="bg-white rounded-lg border border-slate-200 shadow-2xs overflow-hidden flex flex-col flex-1">
          <OutletTable
            outlets={outlets}
            isLoading={isLoading}
            error={error}
            onViewDetails={handleViewDetails}
            onEditOutlet={handleOpenEditModal}
            onToggleStatus={handleOpenStatusDialog}
            onAddOutlet={handleOpenAddModal}
            onRetry={() => loadData()}
            hasActiveFilters={hasActiveFilters}
            onClearFilters={handleClearFilters}
          />

          {/* Table Pagination Footer */}
          {!isLoading && !error && outlets.length > 0 && (
            <OutletPagination
              currentPage={currentPage}
              pageSize={pageSize}
              totalItems={totalCount}
              totalPages={totalPages}
              onPageChange={(page) => setCurrentPage(page)}
              onPageSizeChange={(size) => {
                setPageSize(size);
                setCurrentPage(1);
              }}
            />
          )}
        </div>
      </div>

      {/* 4. Slide-Over Detail Drawer */}
      <OutletDetailDrawer
        outlet={selectedOutlet}
        isOpen={isDrawerOpen}
        onClose={() => {
          setIsDrawerOpen(false);
          setSelectedOutlet(null);
        }}
        onEdit={(outlet) => {
          setIsDrawerOpen(false);
          handleOpenEditModal(outlet);
        }}
        onToggleStatus={(outlet) => {
          setIsDrawerOpen(false);
          handleOpenStatusDialog(outlet);
        }}
      />

      {/* 5. Add / Edit Outlet Modal */}
      <OutletModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setOutletToEdit(null);
        }}
        onSubmitCreate={handleCreateOutlet}
        onSubmitUpdate={handleUpdateOutlet}
        outletToEdit={outletToEdit}
      />

      {/* 6. Activate / Deactivate Confirmation Dialog */}
      <OutletStatusConfirmDialog
        isOpen={isStatusDialogOpen}
        outlet={outletForStatusChange}
        onClose={() => {
          setIsStatusDialogOpen(false);
          setOutletForStatusChange(null);
        }}
        onConfirm={handleConfirmStatusChange}
        isProcessing={isProcessingStatus}
      />
    </div>
  );
}
