import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { bundleSets, products } from '@/data/mock-data';
import { ShoppingCart, ShieldCheck, Package } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { motion } from 'framer-motion';

const BundleSets: React.FC = () => {
  const { addItem } = useCart();

  const handleAddBundle = (bundleId: string) => {
    const bundle = bundleSets.find(b => b.id === bundleId);
    if (!bundle) return;
    bundle.products.forEach(bp => {
      const prod = products.find(p => p.id === bp.productId);
      if (prod) {
        for (let i = 0; i < bp.quantity; i++) addItem(prod);
      }
    });
  };

  return (
    <section className="py-8">
      <div className="mb-6 flex items-center gap-3">
        <Package className="h-6 w-6 text-primary" />
        <h2 className="text-2xl font-bold">Дайын жинақтар</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {bundleSets.map((bundle, i) => (
          <motion.div
            key={bundle.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.4 }}
          >
            <Card className="relative overflow-hidden border-2 border-primary/20 transition-shadow hover:shadow-lg">
              {bundle.allergenFree && (
                <Badge className="absolute right-3 top-3 gap-1 bg-success text-success-foreground">
                  <ShieldCheck className="h-3 w-3" /> Аллергенсіз
                </Badge>
              )}
              <CardContent className="p-5">
                <h3 className="mb-2 text-lg font-bold">{bundle.name}</h3>
                <p className="mb-4 text-sm text-muted-foreground">{bundle.description}</p>
                <div className="mb-4 flex items-baseline gap-2">
                  <span className="text-2xl font-extrabold text-primary">{bundle.price.toLocaleString()} ₸</span>
                  <span className="text-sm text-muted-foreground line-through">{bundle.oldPrice.toLocaleString()} ₸</span>
                </div>
                <div className="mb-4 text-xs text-muted-foreground">
                  {bundle.products.length} түрлі тауар жинағы
                </div>
                <div className="flex gap-2">
                  <Button className="flex-1 gap-2" onClick={() => handleAddBundle(bundle.id)}>
                    <ShoppingCart className="h-4 w-4" /> Себетке қосу
                  </Button>
                  <Link to={`/bundles`}>
                    <Button variant="outline">Толығырақ</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default BundleSets;
