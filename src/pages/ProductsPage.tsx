import React, { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Filter, Grid, List, SlidersHorizontal } from 'lucide-react';
import { RootState } from '../redux/store';
import { setCategory, setPriceRange, setRating, setInStock, setBrands, setSortBy, setViewMode, clearFilters } from '../redux/slices/filtersSlice';
import ProductCard from '../components/ProductCard';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const ProductsPage: React.FC = () => {
  const dispatch = useDispatch();
  const { products, categories } = useSelector((state: RootState) => state.products);
  const filters = useSelector((state: RootState) => state.filters) as {
    category: string[];
    priceRange: [number, number];
    rating: number;
    inStock: boolean;
    brands: string[];
    searchQuery: string;
    sortBy: string;
    viewMode: 'grid' | 'list';
  };

  const sortOptions = [
    { value: 'featured', label: 'Featured' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'newest', label: 'Newest' },
  ];

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products.filter(product => {
      // Search query
      if (filters.searchQuery && !product.name.toLowerCase().includes(filters.searchQuery.toLowerCase()) &&
          !product.description.toLowerCase().includes(filters.searchQuery.toLowerCase())) {
        return false;
      }

      // Category filter
      if (filters.category.length > 0 && !filters.category.includes(product.category)) {
        return false;
      }

      // Price range
      if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) {
        return false;
      }

      // Rating filter
      if (filters.rating > 0 && product.rating < filters.rating) {
        return false;
      }

      // Stock filter
      if (filters.inStock && product.stock === 0) {
        return false;
      }

      // Brand filter
      if (filters.brands.length > 0 && !filters.brands.includes(product.brand)) {
        return false;
      }

      return true;
    });

    // Sort products
    switch (filters.sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filtered.sort((a, b) => b.id.localeCompare(a.id));
        break;
      case 'featured':
      default:
        filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }

    return filtered;
  }, [products, filters]);

  const uniqueBrands = useMemo(() => {
    return Array.from(new Set(products.map(product => product.brand))).sort();
  }, [products]);

  const handleCategoryChange = (categoryId: string) => {
    const newCategories = filters.category.includes(categoryId)
      ? filters.category.filter((id: string) => id !== categoryId)
      : [...filters.category, categoryId];
    dispatch(setCategory(newCategories));
  };

  const handleBrandChange = (brand: string) => {
    const newBrands = filters.brands.includes(brand)
      ? filters.brands.filter((b: string) => b !== brand)
      : [...filters.brands, brand];
    dispatch(setBrands(newBrands));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <Card className="p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                  <SlidersHorizontal className="w-5 h-5 mr-2" />
                  Filters
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => dispatch(clearFilters())}
                  className="text-primary-600"
                >
                  Clear All
                </Button>
              </div>

              {/* Categories */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">Categories</h4>
                <div className="space-y-2">
                  {categories.map(category => (
                    <label key={category.id} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.category.includes(category.id)}
                        onChange={() => handleCategoryChange(category.id)}
                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="ml-2 text-sm text-gray-700 dark:text-gray-300 capitalize">
                        {category.name} ({category.productCount})
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">Price Range</h4>
                <div className="space-y-2">
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    value={filters.priceRange[1]}
                    onChange={(e) => dispatch(setPriceRange([filters.priceRange[0], parseInt(e.target.value)]))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                    <span>${filters.priceRange[0]}</span>
                    <span>${filters.priceRange[1]}</span>
                  </div>
                </div>
              </div>

              {/* Rating */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">Minimum Rating</h4>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="rating"
                      checked={filters.rating === 0}
                      onChange={() => dispatch(setRating(0))}
                      className="text-primary-600 focus:ring-primary-500"
                    />
                    <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                      Any Rating
                    </span>
                  </label>
                  {[4, 3, 2, 1].map(rating => (
                    <label key={rating} className="flex items-center">
                      <input
                        type="radio"
                        name="rating"
                        checked={filters.rating === rating}
                        onChange={() => dispatch(setRating(rating))}
                        className="text-primary-600 focus:ring-primary-500"
                      />
                      <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                        {rating}+ Stars
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Brands */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">Brands</h4>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {uniqueBrands.map(brand => (
                    <label key={brand} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.brands.includes(brand)}
                        onChange={() => handleBrandChange(brand)}
                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                        {brand}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* In Stock */}
              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.inStock}
                    onChange={(e) => dispatch(setInStock(e.target.checked))}
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                    In Stock Only
                  </span>
                </label>
              </div>
            </Card>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Products
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  {filteredAndSortedProducts.length} products found
                </p>
              </div>

              <div className="flex items-center gap-4">
                {/* Sort */}
                <select
                  value={filters.sortBy}
                  onChange={(e) => dispatch(setSortBy(e.target.value))}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                >
                  {sortOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>

                {/* View Mode */}
                <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                  <button
                    onClick={() => dispatch(setViewMode('grid'))}
                    className={`p-2 ${filters.viewMode === 'grid' ? 'bg-primary-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => dispatch(setViewMode('list'))}
                    className={`p-2 ${filters.viewMode === 'list' ? 'bg-primary-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Products */}
            {filteredAndSortedProducts.length > 0 ? (
              <div className={`grid gap-6 ${
                filters.viewMode === 'grid' 
                  ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
                  : 'grid-cols-1'
              }`}>
                {filteredAndSortedProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Filter className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  No products found
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Try adjusting your filters or search terms
                </p>
                <Button onClick={() => dispatch(clearFilters())}>
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
