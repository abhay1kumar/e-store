import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { RootState } from '../redux/store';
import { removeFromCart, updateQuantity, clearCart } from '../redux/slices/cartSlice';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const CartPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, total, itemCount } = useSelector((state: RootState) => state.cart);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const handleQuantityChange = (id: string, newQuantity: number) => {
    dispatch(updateQuantity({ id, quantity: newQuantity }));
  };

  const handleRemoveItem = (id: string) => {
    dispatch(removeFromCart(id));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag className="w-24 h-24 text-gray-400 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Your cart is empty
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Looks like you haven't added any items to your cart yet.
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
            Shopping Cart ({itemCount} items)
          </h1>
          <Button
            variant="outline"
            onClick={handleClearCart}
            className="text-red-600 border-red-600 hover:bg-red-50"
          >
            Clear Cart
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <Card key={item.id} className="p-6">
                <div className="flex items-center space-x-4">
                  <Link to={`/product/${item.product.id}`}>
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                  </Link>
                  
                  <div className="flex-1">
                    <Link
                      to={`/product/${item.product.id}`}
                      className="text-lg font-semibold text-gray-900 dark:text-white hover:text-primary-600"
                    >
                      {item.product.name}
                    </Link>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {item.product.brand} • {item.product.category}
                    </p>
                    <div className="flex items-center mt-2">
                      <span className="text-lg font-bold text-gray-900 dark:text-white">
                        {formatPrice(item.product.price)}
                      </span>
                      {item.product.originalPrice && (
                        <span className="ml-2 text-sm text-gray-500 line-through">
                          {formatPrice(item.product.originalPrice)}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    {/* Quantity Controls */}
                    <div className="flex items-center border border-gray-300 rounded-lg">
                      <button
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="px-4 py-2 text-center min-w-[3rem]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                        disabled={item.quantity >= item.product.stock}
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Remove Button */}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveItem(item.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Item Total */}
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Subtotal ({item.quantity} items)
                    </span>
                    <span className="text-lg font-semibold text-gray-900 dark:text-white">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-24">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Order Summary
              </h3>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Subtotal ({itemCount} items)
                  </span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {formatPrice(total)}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Shipping</span>
                  <span className="font-medium text-green-600">Free</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Tax</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {formatPrice(total * 0.08)}
                  </span>
                </div>
                
                <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
                  <div className="flex justify-between">
                    <span className="text-lg font-semibold text-gray-900 dark:text-white">
                      Total
                    </span>
                    <span className="text-lg font-bold text-gray-900 dark:text-white">
                      {formatPrice(total + (total * 0.08))}
                    </span>
                  </div>
                </div>
              </div>

              <Button
                onClick={handleCheckout}
                size="lg"
                className="w-full mb-4"
              >
                Proceed to Checkout
              </Button>

              <Link to="/products">
                <Button variant="outline" size="lg" className="w-full">
                  Continue Shopping
                </Button>
              </Link>

              {/* Security Badge */}
              <div className="mt-6 text-center">
                <div className="flex items-center justify-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                  <span>Secure checkout</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
