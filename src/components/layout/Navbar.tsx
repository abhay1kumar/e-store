import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Search, ShoppingCart, Heart, Moon, Sun } from 'lucide-react';
import { RootState } from '../../redux/store';
import { toggleTheme } from '../../redux/slices/themeSlice';
import { setSearchQuery } from '../../redux/slices/filtersSlice';
import Button from '../ui/Button';

const Navbar: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { theme } = useSelector((state: RootState) => state.theme);
  const { itemCount } = useSelector((state: RootState) => state.cart);
  const { items: wishlistItems } = useSelector((state: RootState) => state.wishlist);
  const { searchQuery } = useSelector((state: RootState) => state.filters);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate('/products');
    }
  };

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">E</span>
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              EStore
            </span>
          </Link>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex-1 max-w-lg mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => dispatch(setSearchQuery(e.target.value))}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-white"
              />
            </div>
          </form>

          {/* Navigation Links */}
          <div className="flex items-center space-x-4">
            <Link
              to="/products"
              className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium"
            >
              Products
            </Link>

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => dispatch(toggleTheme())}
              className="p-2"
            >
              {theme === 'light' ? (
                <Moon className="w-5 h-5" />
              ) : (
                <Sun className="w-5 h-5" />
              )}
            </Button>

            {/* Wishlist */}
            <Link to="/wishlist" className="relative p-2">
              <Heart className="w-6 h-6 text-gray-700 dark:text-gray-300 hover:text-primary-600" />
              {wishlistItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {wishlistItems.length}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link to="/cart" className="relative p-2">
              <ShoppingCart className="w-6 h-6 text-gray-700 dark:text-gray-300 hover:text-primary-600" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
