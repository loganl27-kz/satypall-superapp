import React from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import CategoryGrid from '@/components/CategoryGrid';
import BundleSets from '@/components/BundleSets';
import ProductCard from '@/components/ProductCard';
import { products } from '@/data/mock-data';
import { Button } from '@/components/ui/button';
import { Leaf, Truck, ShieldCheck, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Banner */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-secondary to-background">
        <div className="container py-12 md:py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl"
          >
            <div className="mb-4 flex items-center gap-2">
              <Leaf className="h-6 w-6 text-primary" />
              <span className="text-sm font-semibold uppercase tracking-wider text-primary">
                Табиғи таңдау
              </span>
            </div>
            <h1 className="mb-4 text-4xl font-extrabold leading-tight md:text-5xl">
              <span className="text-primary">SatypAll</span> — ақылды
              <br />онлайн супермаркет
            </h1>
            <p className="mb-6 text-lg text-muted-foreground font-body">
              Әр тауардың құрамы, аллерген ескертуі және жарамдылық мерзімі.
              Қаптамадағы құрам мен аллерген ақпаратын әрдайым тексеріңіз.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg" className="gap-2 text-base"><Link to="/catalog?filter=allergy"><ShieldCheck className="h-5 w-5" /> Аллергия сүзгісі</Link></Button>
              <Button asChild size="lg" variant="outline" className="gap-2 text-base"><Link to="/catalog">Каталогты ашу</Link></Button>
            </div>
          </motion.div>
        </div>
        {/* Feature badges */}
        <div className="container pb-8">
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {[
              { icon: ShieldCheck, text: 'Аллерген бақылау', sub: 'Жеке профиль' },
              { icon: Clock, text: 'Жарамдылық мерзімі', sub: 'Әр тауарда' },
              { icon: Truck, text: 'Жеткізу 1-2 сағат', sub: 'Экспресс' },
              { icon: Leaf, text: 'Табиғи өнімдер', sub: 'Құрам ашық' },
            ].map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="flex items-center gap-3 rounded-xl border bg-card p-3"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <f.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-bold leading-tight">{f.text}</p>
                  <p className="text-xs text-muted-foreground">{f.sub}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <main className="container">
        <CategoryGrid />
        <BundleSets />

        {/* Popular Products */}
        <section className="py-8">
          <h2 className="mb-6 text-2xl font-bold">Танымал тауарлар</h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-card">
        <div className="container py-8">
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <div className="mb-3 flex items-center gap-2">
                <Leaf className="h-5 w-5 text-primary" />
                <span className="text-lg font-extrabold text-primary">Satyp<span className="text-accent">All</span></span>
              </div>
              <p className="text-sm text-muted-foreground">Қазақстандағы ақылды онлайн супермаркет. Құрам, аллерген, жарамдылық — барлығы ашық.</p>
            </div>
            <div>
              <h4 className="mb-3 font-bold">Жеткізу</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>🚀 Экспресс — 1-2 сағат</li>
                <li>📦 Стандартты — сол күні</li>
                <li>📍 Өзі алу пункті</li>
              </ul>
            </div>
            <div>
              <h4 className="mb-3 font-bold">Байланыс</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>📞 +7 (777) 123-45-67</li>
                <li>📧 info@satypall.kz</li>
                <li>🏢 Алматы, Абай к-сі 50</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t pt-4 text-center text-xs text-muted-foreground">
            © 2026 SatypAll. Барлық құқықтар қорғалған.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
