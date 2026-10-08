import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Search, User, Menu, Leaf } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/context/CartContext';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { categories } from '@/data/mock-data';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { totalItems } = useCart();
  const [search, setSearch] = React.useState('');

  return (
    <header className="sticky top-0 z-50 border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="container flex h-16 items-center gap-4">
        {/* Mobile menu */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72">
            <nav className="mt-8 flex flex-col gap-2">
              {categories.map(cat => (
                <Link
                  key={cat.id}
                  to={`/category/${cat.id}`}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-secondary"
                >
                  <span className="text-lg">{cat.icon}</span>
                  {cat.name}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 font-sans">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <Leaf className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-extrabold tracking-tight text-primary">
            Satyp<span className="text-accent">All</span>
          </span>
        </Link>

        {/* Search */}
        <form onSubmit={e=>{e.preventDefault();navigate(`/catalog?q=${encodeURIComponent(search)}`);}} className="relative mx-4 hidden flex-1 md:flex">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Тауар іздеу..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-10"
          />
        </form>

        {/* Actions */}
        <div className="ml-auto flex items-center gap-2">
          <Button aria-label="Тауар іздеу" onClick={()=>navigate('/catalog')} variant="ghost" size="icon" className="md:hidden">
            <Search className="h-5 w-5" />
          </Button>
          <Button asChild variant="ghost" className="hidden sm:inline-flex"><Link to="/orders">Тапсырыстарым</Link></Button>
          <Link to="/cart">
            <Button variant="ghost" size="icon" aria-label="Себет" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <Badge className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full p-0 text-[10px]">
                  {totalItems}
                </Badge>
              )}
            </Button>
          </Link>
          <Link to="/profile">
            <Button variant="ghost" size="icon" aria-label="Жеке кабинет">
              <User className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
