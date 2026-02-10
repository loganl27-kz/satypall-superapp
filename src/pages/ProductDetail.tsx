import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '@/components/Header';
import { products } from '@/data/mock-data';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/context/CartContext';
import { ShoppingCart, AlertTriangle, Clock, ChevronRight, ShieldCheck } from 'lucide-react';
import { categories } from '@/data/mock-data';
import { motion } from 'framer-motion';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const product = products.find(p => p.id === id);
  const { addItem } = useCart();

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container py-20 text-center">
          <h1 className="text-2xl font-bold">Тауар табылмады</h1>
        </div>
      </div>
    );
  }

  const category = categories.find(c => c.id === product.categoryId);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container py-6">
        <div className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-primary">Басты бет</Link>
          <ChevronRight className="h-4 w-4" />
          {category && (
            <>
              <Link to={`/category/${category.id}`} className="hover:text-primary">{category.name}</Link>
              <ChevronRight className="h-4 w-4" />
            </>
          )}
          <span className="font-medium text-foreground">{product.name}</span>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid gap-8 md:grid-cols-2"
        >
          {/* Image */}
          <div className="aspect-square overflow-hidden rounded-xl border bg-secondary">
            <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
          </div>

          {/* Info */}
          <div>
            <h1 className="mb-2 text-3xl font-extrabold">{product.name}</h1>
            <p className="mb-4 text-sm text-muted-foreground">{product.unit}</p>

            <div className="mb-4 flex items-baseline gap-3">
              <span className="text-3xl font-extrabold text-primary">{product.price.toLocaleString()} ₸</span>
              {product.oldPrice && (
                <span className="text-lg text-muted-foreground line-through">{product.oldPrice.toLocaleString()} ₸</span>
              )}
            </div>

            <Button size="lg" className="mb-6 gap-2" onClick={() => addItem(product)}>
              <ShoppingCart className="h-5 w-5" /> Себетке қосу
            </Button>

            {/* Allergens */}
            <div className="mb-4 rounded-lg border p-4">
              <h3 className="mb-2 flex items-center gap-2 font-bold">
                {product.allergens.length > 0 ? (
                  <><AlertTriangle className="h-5 w-5 text-destructive" /> Аллергендер</>
                ) : (
                  <><ShieldCheck className="h-5 w-5 text-success" /> Аллергенсіз</>
                )}
              </h3>
              {product.allergens.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {product.allergens.map(a => (
                    <Badge key={a} variant="destructive">{a}</Badge>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">Бұл тауарда белгілі аллергендер жоқ.</p>
              )}
            </div>

            {/* Composition */}
            <div className="mb-4 rounded-lg border p-4">
              <h3 className="mb-2 font-bold">Құрамы</h3>
              <p className="text-sm text-muted-foreground">{product.composition}</p>
            </div>

            {/* Nutrition */}
            <div className="mb-4 rounded-lg border p-4">
              <h3 className="mb-2 font-bold">Тағамдық құндылығы (100г)</h3>
              <div className="grid grid-cols-4 gap-3 text-center">
                {[
                  { label: 'Калория', value: `${product.nutrition.calories} ккал` },
                  { label: 'Ақуыз', value: `${product.nutrition.protein} г` },
                  { label: 'Май', value: `${product.nutrition.fat} г` },
                  { label: 'Көмірсу', value: `${product.nutrition.carbs} г` },
                ].map(n => (
                  <div key={n.label} className="rounded-lg bg-secondary p-2">
                    <p className="text-xs text-muted-foreground">{n.label}</p>
                    <p className="text-sm font-bold">{n.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Expiry */}
            <div className="flex items-center gap-2 rounded-lg border p-4">
              <Clock className="h-5 w-5 text-warning" />
              <div>
                <h3 className="font-bold">Жарамдылық мерзімі</h3>
                <p className="text-sm text-muted-foreground">{product.expiryDays} күн</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductDetail;
