import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  ShoppingBag,
  User,
  Menu,
  X,
  Search
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  cartCount: number;
}

const Layout: React.FC<LayoutProps> = ({ children, cartCount }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const isHomePage = location.pathname === '/';
  // If not homepage, always show "scrolled" style (solid background)
  const showSolidNav = !isHomePage || isScrolled;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Shop', path: '/shop' },
    { name: 'Try-On', path: '/try-on' },
    { name: 'Planner', path: '/planner' },
    { name: 'Dashboard', path: '/dashboard' },
  ];

  const headerClass = `fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${showSolidNav
    ? 'bg-white/90 backdrop-blur-md text-black py-4 border-gray-100 shadow-sm'
    : 'bg-transparent text-white py-6 border-transparent'
    }`;

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Navigation */}
      <nav className={headerClass}>
        <div className="max-w-[1400px] mx-auto px-6 sm:px-12">
          <div className="flex justify-between items-center">

            {/* Desktop Nav - Left */}
            <div className="hidden md:flex space-x-8 items-center flex-1">
              {navLinks.slice(0, 2).map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-xs font-medium uppercase tracking-[0.2em] hover:text-brand transition-colors relative group"
                >
                  {link.name}
                  <span className={`absolute -bottom-2 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${showSolidNav ? 'bg-black' : 'bg-white'}`}></span>
                </Link>
              ))}
            </div>

            {/* Logo - Center */}
            <div className="flex-shrink-0 flex items-center justify-center">
              <Link to="/" className="flex items-center gap-2 group">
                <span className={`font-serif text-3xl tracking-tighter transition-colors ${showSolidNav ? 'text-black' : 'text-white'}`}>
                  DreamUp
                </span>
              </Link>
            </div>

            {/* Desktop Nav - Right & Icons */}
            <div className="hidden md:flex items-center justify-end flex-1 gap-8">
              {navLinks.slice(2).map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-xs font-medium uppercase tracking-[0.2em] hover:text-brand transition-colors relative group"
                >
                  {link.name}
                  <span className={`absolute -bottom-2 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${showSolidNav ? 'bg-black' : 'bg-white'}`}></span>
                </Link>
              ))}

              <div className="flex items-center gap-6 border-l border-gray-300/30 pl-6">
                <button className="hover:text-brand transition-colors">
                  <Search className="w-5 h-5" />
                </button>
                <Link to="/cart" className="relative hover:text-brand transition-colors group">
                  <ShoppingBag className="w-5 h-5" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 flex items-center justify-center w-4 h-4 text-[10px] font-bold text-white bg-black rounded-full">
                      {cartCount}
                    </span>
                  )}
                </Link>
                <Link to="/profile" className="hover:text-brand transition-colors">
                  <User className="w-5 h-5" />
                </Link>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center md:hidden">
              <Link to="/cart" className="relative p-2 mr-2">
                <ShoppingBag className="w-6 h-6" />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 flex items-center justify-center w-4 h-4 text-[10px] font-bold text-white bg-black rounded-full">
                    {cartCount}
                  </span>
                )}
              </Link>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 focus:outline-none"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <div className={`fixed inset-0 bg-white z-40 transform transition-transform duration-500 ease-in-out md:hidden ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex flex-col h-full pt-24 px-8 space-y-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-3xl font-serif text-gray-900"
              >
                {link.name}
              </Link>
            ))}
            <div className="border-t pt-8 space-y-4">
              <Link to="/profile" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-4 text-lg text-gray-600">
                <User className="w-5 h-5" /> Profile
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-black text-white pt-24 pb-12 mt-auto">
        <div className="w-full px-6 md:px-12 lg:px-24">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-2">
              <h3 className="font-serif text-3xl mb-6">DreamUp.</h3>
              <p className="text-gray-400 max-w-sm font-light">
                Redefining the digital wardrobe experience. Where technology meets couture.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-bold uppercase tracking-widest mb-6">Explore</h4>
              <ul className="space-y-4 text-gray-400 text-sm">
                <li><Link to="/shop" className="hover:text-white transition-colors">Collection</Link></li>
                <li><Link to="/try-on" className="hover:text-white transition-colors">Virtual Try-On</Link></li>
                <li><Link to="/planner" className="hover:text-white transition-colors">Outfit Planner</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-bold uppercase tracking-widest mb-6">Support</h4>
              <ul className="space-y-4 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Shipping</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Returns</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 uppercase tracking-wider">
            <span>© 2025 DreamUp Closet</span>
            <div className="space-x-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-white">Privacy</a>
              <a href="#" className="hover:text-white">Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
