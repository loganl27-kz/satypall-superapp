import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, AlertTriangle, Clock } from 'lucide-react';
import { Product } from '@/data/types';
import { useCart } from '@/context/CartContext';
import { motion } from 'framer-motion';

interface Props {
  product: Product;
}

const ProductCard: React.FC<Props> = ({ product }) => {
  const { addItem } = useCart();

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="group overflow-hidden transition-shadow hover:shadow-lg">
        <div className="relative aspect-square overflow-hidden bg-secondary">
          <img loading="lazy" width={768} height={768} src={product.image} alt={product.name} className="h-full w-full object-cover transition-transform group-hover:scale-105" />
          {product.allergens.length > 0 && (
            <Badge variant="destructive" className="absolute left-2 top-2 gap-1 text-[10px]">
              <AlertTriangle className="h-3 w-3" /> Аллерген
            </Badge>
          )}
          {product.oldPrice && (
            <Badge className="absolute right-2 top-2 bg-accent text-accent-foreground text-[10px]">
              -{Math.round((1 - product.price / product.oldPrice) * 100)}%
            </Badge>
          )}
        </div>
        <CardContent className="p-3">
          <Link to={`/product/${product.id}`}>
            <h3 className="mb-1 line-clamp-2 text-sm font-semibold leading-tight hover:text-primary">
              {product.name}
            </h3>
          </Link>
          <p className="mb-2 text-xs text-muted-foreground">{product.unit}</p>
          <div className="mb-1 flex items-center gap-1 text-[10px] text-muted-foreground">
            <Clock className="h-3 w-3" />
            <span>Жарамдылық: {product.expiryDays} күн</span>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <span className="text-lg font-bold text-primary">{product.price.toLocaleString()} ₸</span>
              {product.oldPrice && (
                <span className="ml-2 text-xs text-muted-foreground line-through">
                  {product.oldPrice.toLocaleString()} ₸
                </span>
              )}
            </div>
            <Button size="icon" className="h-8 w-8" aria-label={`${product.name} себетке қосу`} onClick={() => addItem(product)}>
              <ShoppingCart className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ProductCard;
