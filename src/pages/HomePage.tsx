import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ChevronRight, ArrowRight } from 'lucide-react';
import { RootState } from '../redux/store';
import ProductCard from '../components/ProductCard';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const HomePage: React.FC = () => {
  const { products, categories } = useSelector((state: RootState) => state.products);
  
  const featuredProducts = products.filter(product => product.featured).slice(0, 4);
  const trendingProducts = products.filter(product => product.trending).slice(0, 8);

 

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Discover Amazing Products
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-100">
              Premium quality items at unbeatable prices
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/products">
                <Button size="lg" className="bg-white !text-black hover:!text-white hover:bg-gray-100 font-semibold">
                  Shop Now
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Button size="lg" className=" bg-white !text-black hover:!text-white hover:bg-gray-100 font-semibol">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Shop by Category
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Explore our wide range of product categories
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link key={category.id} to={`/products?category=${category.slug}`}>
                <Card hover className="text-center p-6 group">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-20 h-20 mx-auto mb-4 rounded-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {category.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    {category.description}
                  </p>
                  <div className="flex items-center justify-center text-primary-600 group-hover:text-primary-700">
                    <span className="text-sm font-medium">
                      {category.productCount} products
                    </span>
                    <ChevronRight className="ml-1 w-4 h-4" />
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Featured Products
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Hand-picked products just for you
              </p>
            </div>
            <Link to="/products?featured=true">
              <Button variant="outline">
                View All
                <ChevronRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Trending Products */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Trending Now
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                What's popular right now
              </p>
            </div>
            <Link to="/products?trending=true">
              <Button variant="outline">
                View All
                <ChevronRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Stay Updated
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Subscribe to our newsletter for the latest deals and updates
          </p>
          <div className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-primary-300"
            />
            <Button variant="secondary" size="lg" className="bg-white text-primary-600 hover:bg-gray-100">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
