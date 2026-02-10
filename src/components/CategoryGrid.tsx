import React from 'react';
import { Link } from 'react-router-dom';
import { categories } from '@/data/mock-data';

const CategoryGrid: React.FC = () => (
  <section className="py-8">
    <h2 className="mb-6 text-2xl font-bold">Категориялар</h2>
    <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-6">
      {categories.map(cat => (
        <Link
          key={cat.id}
          to={`/category/${cat.id}`}
          className="group flex flex-col items-center gap-2 rounded-xl border bg-card p-4 text-center transition-all hover:border-primary hover:shadow-md"
        >
          <span className="text-3xl transition-transform group-hover:scale-110">{cat.icon}</span>
          <span className="text-xs font-semibold leading-tight">{cat.name}</span>
          <span className="text-[10px] text-muted-foreground">{cat.productCount} тауар</span>
        </Link>
      ))}
    </div>
  </section>
);

export default CategoryGrid;
