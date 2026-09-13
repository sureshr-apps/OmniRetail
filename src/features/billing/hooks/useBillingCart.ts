import { useState, useMemo, useCallback, useEffect } from 'react';
import { CartItem, Customer, HeldOrder, OrderTotals, PaymentMethod, Product } from '../types';
import { productService } from '@/features/products/services/productService';
import { createHeldOrder, deleteHeldOrder, listHeldOrders } from '../services/heldOrderService';

const TAX_RATE = 0.0825; // 8.25% State Tax

export function useBillingCart() {
  const [orderNumber, setOrderNumber] = useState<string>('#ORD-9843');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer>({ id: '', name: 'Walk-in Customer', tier: 'Standard', points: 0, memberDiscount: 0 });
  const [promoDiscount, setPromoDiscount] = useState<number>(5.00);
  const [selectedPaymentMode, setSelectedPaymentMode] = useState<PaymentMethod>('card');
  const [heldOrders, setHeldOrders] = useState<HeldOrder[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [catalogProducts, setCatalogProducts] = useState<Product[]>([]);

  useEffect(() => {
    let active = true;
    productService.getProducts({ page: 1, pageSize: 1000 }).then(({ items }) => {
      if (!active) return;
      setCatalogProducts(items.map((p) => ({ id: p.id, sku: p.sku, name: p.name, category: 'all', categoryLabel: p.categoryName, stock: p.stockSummary?.onHandTotal ?? 0, mrp: p.mrp ?? p.sellingPrice, discount: 0, rate: p.sellingPrice, barcode: p.barcode ?? '' })));
      setCartItems([]);
      setSelectedItemId(null);
    }).catch(() => undefined);
    return () => { active = false; };
  }, []);

  useEffect(() => {
    let active = true;
    listHeldOrders().then((orders) => {
      if (active) setHeldOrders(orders);
    }).catch(() => undefined);
    return () => { active = false; };
  }, []);

  // Cart Calculations
  const totals: OrderTotals = useMemo(() => {
    const itemCount = cartItems.length;
    const unitCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    
    // Subtotal: sum of each item's total (quantity * effectiveRate)
    const subtotal = cartItems.reduce((sum, item) => {
      return sum + (item.quantity * item.effectiveRate);
    }, 0);

    const discountAmount = Math.max(0, promoDiscount);
    const discountedBase = Math.max(0, subtotal - discountAmount);
    const tax = Math.round(discountedBase * TAX_RATE * 100) / 100;
    const totalPayable = Math.round((discountedBase + tax) * 100) / 100;

    return {
      itemCount,
      unitCount,
      subtotal: Math.round(subtotal * 100) / 100,
      memberDiscount: Math.round(discountAmount * 100) / 100,
      tax,
      totalPayable,
    };
  }, [cartItems, promoDiscount]);

  // Fast cash amounts calculation
  const fastCashOptions = useMemo(() => {
    const total = totals.totalPayable;
    if (total <= 0) return [];
    
    const exact = total;
    // Calculate rounded tiers
    const nextFive = Math.ceil(total / 5) * 5;
    const tier1 = nextFive === total ? total + 5 : nextFive;
    const tier2 = tier1 + 5;
    const tier3 = Math.ceil((tier2 + 5) / 10) * 10;

    return [
      { label: `$${exact.toFixed(2)} Exact`, amount: exact },
      { label: `$${tier1.toFixed(2)}`, amount: tier1 },
      { label: `$${tier2.toFixed(2)}`, amount: tier2 },
      { label: `$${tier3.toFixed(2)}`, amount: tier3 },
    ];
  }, [totals.totalPayable]);

  // Item modifications
  const incrementQuantity = useCallback((itemId: string) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === itemId) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    }));
  }, []);

  const decrementQuantity = useCallback((itemId: string) => {
    setCartItems(prev => {
      const target = prev.find(item => item.id === itemId);
      if (!target) return prev;
      if (target.quantity <= 1) {
        return prev.filter(item => item.id !== itemId);
      }
      return prev.map(item => {
        if (item.id === itemId) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      });
    });
  }, []);

  const removeItem = useCallback((itemId: string) => {
    setCartItems(prev => prev.filter(item => item.id !== itemId));
    setSelectedItemId(prev => prev === itemId ? null : prev);
  }, []);

  const voidSelectedItem = useCallback(() => {
    if (!selectedItemId) {
      if (cartItems.length > 0) {
        const firstId = cartItems[0].id;
        removeItem(firstId);
        return true;
      }
      return false;
    }
    removeItem(selectedItemId);
    return true;
  }, [selectedItemId, cartItems, removeItem]);

  const addToCart = useCallback((product: Product, quantity = 1) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        setSelectedItemId(existing.id);
        return prev.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      const newItem: CartItem = {
        id: `cart-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
        product,
        quantity,
        unitDiscount: product.discount,
        effectiveRate: product.rate,
      };
      setSelectedItemId(newItem.id);
      return [...prev, newItem];
    });
  }, []);

  const addCustomItem = useCallback((name: string, rate: number, quantity = 1) => {
    const customProd: Product = {
      id: `custom-${Date.now()}`,
      sku: `CUST-${Math.floor(1000 + Math.random() * 9000)}`,
      name: name || 'Custom Item',
      category: 'specialty',
      stock: 99,
      mrp: rate,
      discount: 0,
      rate,
      barcode: `${Date.now()}`,
    };
    addToCart(customProd, quantity);
  }, [addToCart]);

  const updateItemPrice = useCallback((itemId: string, newRate: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === itemId) {
        const retail = item.customRetail ?? item.product.mrp;
        const discount = Math.max(0, retail - newRate);
        return {
          ...item,
          effectiveRate: newRate,
          unitDiscount: discount,
          customSalePrice: newRate,
          customDiscount: discount,
        };
      }
      return item;
    }));
  }, []);

  const updateItemDiscount = useCallback((itemId: string, newDiscount: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === itemId) {
        const retail = item.customRetail ?? item.product.mrp;
        const salePrice = Math.max(0, retail - newDiscount);
        return {
          ...item,
          effectiveRate: salePrice,
          unitDiscount: newDiscount,
          customSalePrice: salePrice,
          customDiscount: newDiscount,
        };
      }
      return item;
    }));
  }, []);

  const updateItemDiscPct = useCallback((itemId: string, newPct: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === itemId) {
        const retail = item.customRetail ?? item.product.mrp;
        const discount = Math.round((retail * (newPct / 100)) * 100) / 100;
        const salePrice = Math.max(0, retail - discount);
        return {
          ...item,
          effectiveRate: salePrice,
          unitDiscount: discount,
          customSalePrice: salePrice,
          customDiscount: discount,
        };
      }
      return item;
    }));
  }, []);

  const clearOrder = useCallback(() => {
    setCartItems([]);
    setSelectedItemId(null);
    setPromoDiscount(0);
  }, []);

  const holdCurrentOrder = useCallback(async () => {
    if (cartItems.length === 0) return false;

    const newHeld = await createHeldOrder({
      orderNumber,
      items: [...cartItems],
      customer: selectedCustomer,
      itemCount: totals.itemCount,
      unitCount: totals.unitCount,
      totalPayable: totals.totalPayable,
    });

    setHeldOrders(prev => [newHeld, ...prev]);
    // Generate new order number
    const nextNum = `#ORD-${Math.floor(1000 + Math.random() * 9000)}`;
    setOrderNumber(nextNum);
    setCartItems([]);
    setSelectedItemId(null);
    setPromoDiscount(0);
    return true;
  }, [cartItems, orderNumber, selectedCustomer, totals]);

  const resumeHeldOrder = useCallback(async (held: HeldOrder) => {
    // If current cart is not empty, hold it first or replace
    await deleteHeldOrder(held.id);
    setCartItems(held.items);
    setOrderNumber(held.orderNumber);
    setSelectedCustomer(held.customer);
    setSelectedItemId(held.items[0]?.id || null);
    setHeldOrders(prev => prev.filter(h => h.id !== held.id));
  }, []);

  const startNewOrder = useCallback(() => {
    const nextNum = `#ORD-${Math.floor(1000 + Math.random() * 9000)}`;
    setOrderNumber(nextNum);
    setCartItems([]);
    setSelectedItemId(null);
    setPromoDiscount(0);
  }, []);

  // Filtered products for search and category tabs
  const filteredProducts = useMemo(() => {
    let list = catalogProducts;
    if (selectedCategory === 'promos') {
      list = list.filter(p => p.isPromo);
    } else if (selectedCategory !== 'all') {
      list = list.filter(p => p.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(p => 
        p.name.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        p.barcode.toLowerCase().includes(q)
      );
    }
    return list;
  }, [catalogProducts, selectedCategory, searchQuery]);

  return {
    orderNumber,
    cartItems,
    selectedItemId,
    setSelectedItemId,
    selectedCustomer,
    setSelectedCustomer,
    promoDiscount,
    setPromoDiscount,
    additionalDiscount: promoDiscount,
    setAdditionalDiscount: setPromoDiscount,
    selectedPaymentMode,
    setSelectedPaymentMode,
    heldOrders,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    totals,
    fastCashOptions,
    filteredProducts,
    // Actions
    addToCart,
    incrementQuantity,
    decrementQuantity,
    removeItem,
    voidSelectedItem,
    clearOrder,
    holdCurrentOrder,
    resumeHeldOrder,
    startNewOrder,
    addCustomItem,
    updateItemPrice,
    updateItemDiscount,
    updateItemDiscPct,
  };
}
