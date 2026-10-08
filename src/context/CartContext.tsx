import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { products } from '@/data/mock-data';
import { toast } from 'sonner';
import { CartItem, Product, BundleSet } from '@/data/types';

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product) => void;
  addBundle: (bundle: BundleSet) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => { try { return JSON.parse(sessionStorage.getItem('satypall-cart') || '[]'); } catch { return []; } });
  useEffect(() => { sessionStorage.setItem('satypall-cart', JSON.stringify(items)); }, [items]);

  const addItem = useCallback((product: Product) => {
    toast.success(`${product.name} себетке қосылды`);
    setItems(prev => {
      const existing = prev.find(i => i.product.id === product.id);
      if (existing) {
        return prev.map(i => i.product.id === product.id ? { ...i, quantity: Math.min(99, i.quantity + 1) } : i);
      }
      return [...prev, { product, quantity: 1 }];
    });
  }, []);

  const addBundle = useCallback((bundle: BundleSet) => {
    const members = bundle.products.flatMap(bp => products.filter(p => p.id === bp.productId));
    addItem({ id: bundle.id, name: bundle.name, price: bundle.price, image: bundle.image, categoryId: 'bundle', unit: '1 жинақ', composition: members.map(p => p.composition).join('; '), allergens: [...new Set(members.flatMap(p => p.allergens))], expiryDays: Math.min(...members.map(p => p.expiryDays)), nutrition: { calories: 0, protein: 0, fat: 0, carbs: 0 }, inStock: true });
  }, [addItem]);

  const removeItem = useCallback((productId: string) => {
    setItems(prev => prev.filter(i => i.product.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      setItems(prev => prev.filter(i => i.product.id !== productId));
    } else {
      setItems(prev => prev.map(i => i.product.id === productId ? { ...i, quantity: Math.min(99, Math.floor(quantity)) } : i));
    }
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addItem, addBundle, removeItem, updateQuantity, clearCart, totalItems, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
};
