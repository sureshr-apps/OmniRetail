import React, { useState, useEffect, useCallback } from 'react';
import { useBillingCart } from '../hooks/useBillingCart';
import { OrderHeader } from '../components/OrderHeader';
import { ProductSearchArea } from '../components/ProductSearchArea';
import { OrderItemsTable } from '../components/OrderItemsTable';
import { TotalsPanel } from '../components/TotalsPanel';
import { PaymentControls } from '../components/PaymentControls';
import { CustomerModal } from '../components/CustomerModal';
import { DiscountModal } from '../components/DiscountModal';
import { PriceCheckModal } from '../components/PriceCheckModal';
import { PaymentModal } from '../components/PaymentModal';
import { HeldOrdersModal } from '../components/HeldOrdersModal';
import { CustomItemModal } from '../components/CustomItemModal';
import { PaymentMethod } from '../types';
import { completeTenantCheckout } from '../services/checkoutService';

export function BillingPage() {
  const {
    orderNumber,
    cartItems,
    selectedItemId,
    setSelectedItemId,
    selectedCustomer,
    setSelectedCustomer,
    promoDiscount,
    setPromoDiscount,
    selectedPaymentMode,
    setSelectedPaymentMode,
    heldOrders,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    totals,
    filteredProducts,
    categories,
    addToCart,
    incrementQuantity,
    decrementQuantity,
    voidSelectedItem,
    clearOrder,
    holdCurrentOrder,
    resumeHeldOrder,
    startNewOrder,
    addCustomItem,
    updateItemPrice,
    updateItemDiscount,
    updateItemDiscPct,
  } = useBillingCart();

  // Modal States
  const [isCustomerModalOpen, setIsCustomerModalOpen] = useState(false);
  const [isDiscountModalOpen, setIsDiscountModalOpen] = useState(false);
  const [isPriceCheckModalOpen, setIsPriceCheckModalOpen] = useState(false);
  const [isHeldOrdersModalOpen, setIsHeldOrdersModalOpen] = useState(false);
  const [isCustomItemModalOpen, setIsCustomItemModalOpen] = useState(false);
  const [paymentModalState, setPaymentModalState] = useState<{
    isOpen: boolean;
    method: PaymentMethod;
    fastCashAmount?: number;
  }>({
    isOpen: false,
    method: 'card',
  });

  // Drawer alert notification
  const [drawerAlert, setDrawerAlert] = useState<string | null>(null);

  const showDrawerAlert = (msg: string) => {
    setDrawerAlert(msg);
    setTimeout(() => {
      setDrawerAlert(null);
    }, 2500);
  };

  // Global POS Keyboard shortcuts
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      const activeTag = document.activeElement?.tagName.toLowerCase();
      const isInputActive = activeTag === 'input' || activeTag === 'textarea';

      // Barcode slash trigger
      if (e.key === '/' && !isInputActive) {
        e.preventDefault();
        const barcodeInput = document.getElementById('barcodeInput') as HTMLInputElement | null;
        if (barcodeInput) {
          barcodeInput.focus();
          barcodeInput.select();
        }
        return;
      }

      // F1: Customer
      if (e.key === 'F1') {
        e.preventDefault();
        setIsCustomerModalOpen(true);
        return;
      }

      // F2: Discount
      if (e.key === 'F2') {
        e.preventDefault();
        setIsDiscountModalOpen(true);
        return;
      }

      // F3: Hold
      if (e.key === 'F3') {
        e.preventDefault();
        if (cartItems.length > 0) {
          void holdCurrentOrder().then((held) => {
            if (held) showDrawerAlert('Order placed on hold (F3)');
          }).catch((error: unknown) => showDrawerAlert(error instanceof Error ? error.message : 'Unable to hold order.'));
        } else if (heldOrders.length > 0) {
          setIsHeldOrdersModalOpen(true);
        }
        return;
      }

      // F4: Price Check
      if (e.key === 'F4') {
        e.preventDefault();
        setIsPriceCheckModalOpen(true);
        return;
      }

      // F5: Mode Card
      if (e.key === 'F5') {
        e.preventDefault();
        setSelectedPaymentMode('card');
        return;
      }

      // F6: Mode Cash
      if (e.key === 'F6') {
        e.preventDefault();
        setSelectedPaymentMode('cash');
        return;
      }

      // F7: Mode Digital
      if (e.key === 'F7') {
        e.preventDefault();
        setSelectedPaymentMode('digital');
        return;
      }

      // F8: Mode Split
      if (e.key === 'F8') {
        e.preventDefault();
        setSelectedPaymentMode('split');
        return;
      }

      // F9: Void Item
      if (e.key === 'F9') {
        e.preventDefault();
        if (voidSelectedItem()) {
          showDrawerAlert('Item voided from order');
        } else {
          showDrawerAlert('No item selected to void');
        }
        return;
      }

      // F10: Custom Item
      if (e.key === 'F10') {
        e.preventDefault();
        setIsCustomItemModalOpen(true);
        return;
      }

      // Esc: Cancel Order or close modals
      if (e.key === 'Escape') {
        if (
          isCustomerModalOpen ||
          isDiscountModalOpen ||
          isPriceCheckModalOpen ||
          isHeldOrdersModalOpen ||
          isCustomItemModalOpen ||
          paymentModalState.isOpen
        ) {
          setIsCustomerModalOpen(false);
          setIsDiscountModalOpen(false);
          setIsPriceCheckModalOpen(false);
          setIsHeldOrdersModalOpen(false);
          setIsCustomItemModalOpen(false);
          setPaymentModalState(prev => ({ ...prev, isOpen: false }));
        } else if (cartItems.length > 0) {
          if (window.confirm('Cancel current order and clear all items? (Esc)')) {
            clearOrder();
          }
        }
        return;
      }

      // Enter for completing sale with selected payment mode
      if (e.key === 'Enter' && !isInputActive && !paymentModalState.isOpen && totals.totalPayable > 0) {
        setPaymentModalState({ isOpen: true, method: selectedPaymentMode });
      }
    },
    [
      cartItems.length,
      heldOrders.length,
      holdCurrentOrder,
      voidSelectedItem,
      clearOrder,
      isCustomerModalOpen,
      isDiscountModalOpen,
      isPriceCheckModalOpen,
      isHeldOrdersModalOpen,
      isCustomItemModalOpen,
      paymentModalState.isOpen,
      totals.totalPayable,
      selectedPaymentMode,
      setSelectedPaymentMode,
    ]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const selectedItemObj = cartItems.find(i => i.id === selectedItemId) || null;

  const handleOpenDiscountModal = useCallback(() => setIsDiscountModalOpen(true), []);

  return (
    <div className="flex flex-col h-full min-h-0 w-full relative pt-space-base pb-space-base gap-space-base">
      {/* Toast Notification for Drawer/Actions */}
      {drawerAlert && (
        <div className="absolute top-2 left-1/2 -translate-x-1/2 z-50 bg-primary-container text-on-primary-container px-4 py-2 rounded shadow-lg border border-primary-fixed-dim/40 font-body-medium text-body-medium flex items-center gap-2 animate-in fade-in slide-in-from-top-2 duration-150">
          <span className="material-symbols-outlined text-[18px]">info</span>
          <span>{drawerAlert}</span>
        </div>
      )}

      {/* FIXED TOP SECTION 1: Order Header */}
      <div className="shrink-0">
        <OrderHeader
          orderNumber={orderNumber}
          customer={selectedCustomer}
          onChangeCustomer={() => setIsCustomerModalOpen(true)}
          onPrintDraft={() => window.print()}
          onClearOrder={() => {
            if (window.confirm('Clear all items from current order?')) {
              clearOrder();
            }
          }}
        />
      </div>

      {/* FIXED TOP SECTION 2: Search Box & Barcode Area with F4 Price Check */}
      <div className="shrink-0">
        <ProductSearchArea
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCategory={selectedCategory}
          onCategorySelect={setSelectedCategory}
          categories={categories}
          filteredProducts={filteredProducts}
          onAddProduct={addToCart}
          onOpenPriceCheck={() => setIsPriceCheckModalOpen(true)}
        />
      </div>

      {/* ONLY SCROLLABLE REGION: Order Items Table */}
      <div className="flex-1 min-h-0 flex flex-col">
        <OrderItemsTable
          items={cartItems}
          selectedItemId={selectedItemId}
          onSelectItem={setSelectedItemId}
          onIncrement={incrementQuantity}
          onDecrement={decrementQuantity}
          onUpdateSalePrice={updateItemPrice}
          onUpdateDiscount={updateItemDiscount}
          onUpdateDiscPct={updateItemDiscPct}
        />
      </div>

      {/* FIXED BOTTOM SECTION: Financial breakdown on left, Payment mode & actions on right */}
      <div className="shrink-0 border-t border-outline-variant/30 pt-space-base">
        <div className="w-full bg-surface-container-lowest rounded shadow-sm border border-outline-variant/30 overflow-hidden grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-outline-variant/25">
          {/* Left Column: Totals Panel */}
          <TotalsPanel
            totals={totals}
            promoDiscount={promoDiscount}
            onUpdatePromoDiscount={setPromoDiscount}
            onOpenDiscountModal={handleOpenDiscountModal}
          />

          {/* Right Column: Payment Mode Selector (F5-F8), Cancel Order, Save Order */}
          <PaymentControls
            selectedMode={selectedPaymentMode}
            onSelectMode={setSelectedPaymentMode}
            totalPayable={totals.totalPayable}
            onCancelOrder={() => {
              if (cartItems.length > 0 && window.confirm('Cancel current order and clear all items? (Esc)')) {
                clearOrder();
              }
            }}
            onCompleteSale={() => {
              if (totals.totalPayable > 0) {
                setPaymentModalState({ isOpen: true, method: selectedPaymentMode });
              }
            }}
          />
        </div>
      </div>

      {/* Modals */}
      <CustomerModal
        isOpen={isCustomerModalOpen}
        onClose={() => setIsCustomerModalOpen(false)}
        currentCustomer={selectedCustomer}
        onSelectCustomer={setSelectedCustomer}
      />

      <DiscountModal
        isOpen={isDiscountModalOpen}
        onClose={() => setIsDiscountModalOpen(false)}
        currentDiscount={promoDiscount}
        subtotal={totals.subtotal}
        onApplyDiscount={setPromoDiscount}
      />

      <PriceCheckModal
        isOpen={isPriceCheckModalOpen}
        onClose={() => setIsPriceCheckModalOpen(false)}
        selectedItem={selectedItemObj}
        onUpdateRate={updateItemPrice}
      />

      <HeldOrdersModal
        isOpen={isHeldOrdersModalOpen}
        onClose={() => setIsHeldOrdersModalOpen(false)}
        heldOrders={heldOrders}
        onResumeOrder={resumeHeldOrder}
      />

      <CustomItemModal
        isOpen={isCustomItemModalOpen}
        onClose={() => setIsCustomItemModalOpen(false)}
        onAddCustomItem={addCustomItem}
      />

      <PaymentModal
        isOpen={paymentModalState.isOpen}
        onClose={() => setPaymentModalState(prev => ({ ...prev, isOpen: false }))}
        method={paymentModalState.method}
        fastCashAmount={paymentModalState.fastCashAmount}
        totals={totals}
        customer={selectedCustomer}
        orderNumber={orderNumber}
        onCompleteSale={async ({ cashAmount }) => {
          try {
            await completeTenantCheckout({ orderNumber, items: cartItems, customer: selectedCustomer, totals, paymentMethod: paymentModalState.method, cashAmount });
            startNewOrder();
          } catch (error: unknown) {
            showDrawerAlert(error instanceof Error ? error.message : 'Unable to complete the sale.');
            throw error;
          }
        }}
      />
    </div>
  );
}
