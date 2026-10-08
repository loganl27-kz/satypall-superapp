import React from 'react';
import Header from '@/components/Header';
import { bundleSets, products } from '@/data/mock-data';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, ShieldCheck, Package } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { motion } from 'framer-motion';

const BundlesPage: React.FC = () => {
  const { addBundle } = useCart();

  const handleAddBundle = (bundleId: string) => {
    const bundle = bundleSets.find(b => b.id === bundleId);
    if (!bundle) return;
    addBundle(bundle);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container py-6">
        <div className="mb-6 flex items-center gap-3">
          <Package className="h-7 w-7 text-primary" />
          <h1 className="text-3xl font-bold">Дайын жинақтар</h1>
        </div>
        <p className="mb-8 max-w-2xl text-muted-foreground">
          Бюджетке сай дайын азық-түлік жинақтары. Әр жинақтың құрамы, аллерген ақпараты және тағамдық құндылығы көрсетілген.
        </p>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {bundleSets.map((bundle, i) => {
            const bundleProducts = bundle.products.map(bp => ({
              ...bp,
              product: products.find(p => p.id === bp.productId),
            })).filter(bp => bp.product);

            return (
              <motion.div
                key={bundle.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="border-2 border-primary/20">
                  <img src={bundle.image} alt={bundle.name} loading="lazy" width={768} height={768} className="aspect-[4/3] w-full object-contain bg-card" />
              <CardContent className="p-5">
                    <div className="mb-3 flex items-start justify-between">
                      <h3 className="text-lg font-bold">{bundle.name}</h3>
                      {bundle.allergenFree && (
                        <Badge className="gap-1 bg-success text-success-foreground">
                          <ShieldCheck className="h-3 w-3" /> Аллергенсіз
                        </Badge>
                      )}
                    </div>
                    <p className="mb-4 text-sm text-muted-foreground">{bundle.description}</p>
                    
                    <div className="mb-4 space-y-2">
                      <h4 className="text-sm font-semibold">Құрамындағы тауарлар:</h4>
                      {bundleProducts.map(bp => (
                        <div key={bp.productId} className="flex items-center justify-between text-sm">
                          <span>{bp.product?.name}</span>
                          <span className="text-muted-foreground">×{bp.quantity}</span>
                        </div>
                      ))}
                    </div>

                    <div className="mb-4 flex items-baseline gap-2">
                      <span className="text-2xl font-extrabold text-primary">{bundle.price.toLocaleString()} ₸</span>
                      <span className="text-sm text-muted-foreground line-through">{bundle.oldPrice.toLocaleString()} ₸</span>
                      <Badge className="bg-accent text-accent-foreground">
                        -{Math.round((1 - bundle.price / bundle.oldPrice) * 100)}%
                      </Badge>
                    </div>

                    <Button className="w-full gap-2" onClick={() => handleAddBundle(bundle.id)}>
                      <ShoppingCart className="h-4 w-4" /> Себетке қосу
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BundlesPage;
