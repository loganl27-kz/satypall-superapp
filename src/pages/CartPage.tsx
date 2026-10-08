import React from 'react';
import Header from '@/components/Header';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Minus, Plus, Trash2, AlertTriangle, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';

const CartPage: React.FC = () => {
  const { items, updateQuantity, removeItem, clearCart, totalPrice } = useCart();

  const cartAllergens = [...new Set(items.flatMap(i => i.product.allergens))];

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container flex flex-col items-center py-20">
          <ShoppingCart className="mb-4 h-16 w-16 text-muted-foreground" />
          <h1 className="mb-2 text-2xl font-bold">Себет бос</h1>
          <p className="mb-6 text-muted-foreground">Тауарларды каталогтан қосыңыз</p>
          <Link to="/">
            <Button>Каталогқа оралу</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container py-6">
        <h1 className="mb-6 text-3xl font-bold">Себет</h1>

        {cartAllergens.length > 0 && (
          <div className="mb-6 flex items-start gap-3 rounded-lg border-2 border-destructive/30 bg-destructive/5 p-4">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-destructive" />
            <div>
              <p className="font-bold text-destructive">Аллерген ескертуі!</p>
              <p className="text-sm text-muted-foreground">Себетіңізде мына аллергендер бар тауарлар бар:</p>
              <div className="mt-2 flex flex-wrap gap-1">
                {cartAllergens.map(a => <Badge key={a} variant="destructive">{a}</Badge>)}
              </div>
            </div>
          </div>
        )}

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="space-y-3 lg:col-span-2">
            {items.map(item => (
              <div key={item.product.id} className="flex flex-wrap items-center gap-3 rounded-lg border bg-card p-4">
                <img src={item.product.image} alt={item.product.name} className="h-16 w-16 rounded-lg bg-secondary object-cover" />
                <div className="flex-1">
                  <Link to={item.product.categoryId === 'bundle' ? '/bundles' : `/product/${item.product.id}`} className="font-semibold hover:text-primary">
                    {item.product.name}
                  </Link>
                  <p className="text-xs text-muted-foreground">{item.product.unit}</p>
                  {item.product.allergens.length > 0 && (
                    <div className="mt-1 flex gap-1">
                      {item.product.allergens.map(a => <Badge key={a} variant="destructive" className="text-[10px]">{a}</Badge>)}
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.product.id, item.quantity - 1)}>
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="w-8 text-center font-bold">{item.quantity}</span>
                  <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.product.id, item.quantity + 1)}>
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
                <div className="w-24 text-right">
                  <p className="font-bold">{(item.product.price * item.quantity).toLocaleString()} ₸</p>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => removeItem(item.product.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="rounded-xl border bg-card p-6">
            <h2 className="mb-4 text-xl font-bold">Тапсырыс</h2>
            <div className="mb-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Тауарлар</span>
                <span>{items.reduce((s, i) => s + i.quantity, 0)} дана</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Жеткізу</span>
                <span className="text-success font-semibold">Тегін</span>
              </div>
            </div>
            <div className="mb-6 flex justify-between border-t pt-4 text-lg font-bold">
              <span>Барлығы</span>
              <span className="text-primary">{totalPrice.toLocaleString()} ₸</span>
            </div>
            <Button asChild className="w-full gap-2 text-base" size="lg"><Link to="/checkout">Тапсырыс беру</Link></Button>
            <Button variant="ghost" className="mt-2 w-full text-sm text-destructive" onClick={clearCart}>
              Себетті тазалау
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
