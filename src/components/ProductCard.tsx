import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { Product } from '../types';
import { addToCart } from '../redux/slices/cartSlice';
import { addToWishlist, removeFromWishlist } from '../redux/slices/wishlistSlice';
import { updateProductStock } from '../redux/slices/productsSlice';
import { RootState } from '../redux/store';
import Card from './ui/Card';
import Button from './ui/Button';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);
  const isInWishlist = wishlistItems.some(item => item.productId === product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(addToCart({ product }));
    dispatch(updateProductStock({ productId: product.id, quantity: 1 }));
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isInWishlist) {
      dispatch(removeFromWishlist(product.id));
    } else {
      dispatch(addToWishlist(product.id));
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  return (
    <Card hover className="group overflow-hidden">
      <Link to={`/product/${product.id}`}>
        <div className="relative">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {product.originalPrice && (
            <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-medium">
              {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
            </div>
          )}
          <button
            onClick={handleWishlistToggle}
            className={`absolute top-2 right-2 p-2 rounded-full transition-colors ${
              isInWishlist
                ? 'bg-red-500 text-white'
                : 'bg-white text-gray-600 hover:bg-red-50 hover:text-red-500'
            }`}
          >
            <Heart className={`w-4 h-4 ${isInWishlist ? 'fill-current' : ''}`} />
          </button>
        </div>

        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-500 capitalize">{product.category}</span>
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-sm text-gray-600">{product.rating}</span>
              <span className="text-sm text-gray-400">({product.reviewCount})</span>
            </div>
          </div>

          <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
            {product.name}
          </h3>

          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
            {product.description}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-lg font-bold text-gray-900 dark:text-white">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-gray-500 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>
            <span className={`text-xs px-2 py-1 rounded ${
              product.stock > 0
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            }`}>
              {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
            </span>
          </div>

          <Button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="w-full mt-3"
            size="sm"
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Add to Cart
          </Button>
        </div>
      </Link>
    </Card>
  );
};

export default ProductCard;
