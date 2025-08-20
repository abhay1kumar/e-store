import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Heart } from 'lucide-react';
import { RootState } from '../redux/store';
import { clearWishlist } from '../redux/slices/wishlistSlice';
import ProductCard from '../components/ProductCard';
import Button from '../components/ui/Button';

const WishlistPage: React.FC = () => {
  const dispatch = useDispatch();
  const { items: wishlistItems } = useSelector((state: RootState) => state.wishlist);
  const { products } = useSelector((state: RootState) => state.products);

  const wishlistProducts = products.filter(product => 
    wishlistItems.some(item => item.productId === product.id)
  );

  const handleClearWishlist = () => {
    dispatch(clearWishlist());
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Heart className="w-24 h-24 text-gray-400 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Your wishlist is empty
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Save items you love to your wishlist and shop them later.
          </p>
          <Link to="/products">
            <Button size="lg">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            My Wishlist ({wishlistItems.length} items)
          </h1>
          <Button
            variant="outline"
            onClick={handleClearWishlist}
            className="text-red-600 border-red-600 hover:bg-red-50"
          >
            Clear Wishlist
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlistProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default WishlistPage;
