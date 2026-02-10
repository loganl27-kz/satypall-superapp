import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '@/components/Header';
import ProductCard from '@/components/ProductCard';
import { categories, products } from '@/data/mock-data';
import { ChevronRight } from 'lucide-react';

const CategoryPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const category = categories.find(c => c.id === id);
  const categoryProducts = products.filter(p => p.categoryId === id);

  if (!category) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container py-20 text-center">
          <h1 className="text-2xl font-bold">Категория табылмады</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container py-6">
        <div className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-primary">Басты бет</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="font-medium text-foreground">{category.name}</span>
        </div>
        <h1 className="mb-6 flex items-center gap-3 text-3xl font-bold">
          <span className="text-3xl">{category.icon}</span> {category.name}
        </h1>
        {categoryProducts.length === 0 ? (
          <p className="text-muted-foreground">Бұл категорияда тауарлар жоқ.</p>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {categoryProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
