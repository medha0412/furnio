import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { X, Plus, Minus, Trash2 } from 'lucide-react';
import { formatPrice } from '../utils/formatPrice';

const CartSidebar = () => {
  const navigate = useNavigate();
  const { 
    isOpen, 
    items, 
    closeCart, 
    removeFromCart, 
    updateQuantity, 
    clearCart, 
    getTotalPrice 
  } = useCart();

  const handleCartClick = () => {
    closeCart();
    navigate('/cart');
  };

  const handleCheckoutClick = () => {
    closeCart();
    navigate('/checkout');
  };

  const handleComparisonClick = () => {
    closeCart();
    if (items.length === 2) {
      navigate('/comparison');
    } else {
      // Show a message or redirect to shop
      alert('Please add exactly 2 products to your cart to use the comparison feature.');
      navigate('/shop');
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={closeCart}
      />
      
      {/* Cart Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full sm:w-96 md:w-[420px] bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 bg-white">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Shopping Cart</h2>
            <div className="flex items-center space-x-1 sm:space-x-2">
              {items.length > 0 && (
                <button
                  onClick={clearCart}
                  className="p-2 text-gray-500 hover:text-red-600 transition-colors touch-manipulation"
                  title="Clear Cart"
                >
                  <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              )}
              <button
                onClick={closeCart}
                className="p-2 text-gray-500 hover:text-gray-700 transition-colors touch-manipulation"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 pb-2">
            {items.length === 0 ? (
              <div className="text-center text-gray-500 mt-8 sm:mt-12">
                <div className="mb-4">
                  <svg className="mx-auto w-16 h-16 sm:w-20 sm:h-20 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                <p className="text-base sm:text-lg font-medium">Your cart is empty</p>
                <p className="text-sm mt-2 text-gray-400">Add some items to get started</p>
                <button
                  onClick={() => {
                    closeCart();
                    navigate('/shop');
                  }}
                  className="mt-4 bg-yellow-600 text-white py-2 px-6 rounded-md font-medium hover:bg-yellow-700 transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <div className="space-y-3 sm:space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex items-start space-x-3 sm:space-x-4 p-3 sm:p-4 border border-gray-200 rounded-lg bg-gray-50 sm:bg-white">
                    {/* Product Image */}
                    <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                      <img
                        src={item.image || item.images?.[0] || 'https://placehold.co/64x64/F4F4F4/333333?text=Product'}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm sm:text-base font-medium text-gray-900 line-clamp-2 leading-tight">
                        {item.name}
                      </h3>
                      {(item.description || item.category) && (
                        <p className="text-xs sm:text-sm text-gray-500 mt-1 line-clamp-1">
                          {item.description || item.category}
                        </p>
                      )}
                      
                      {/* Price and Quantity Controls */}
                      <div className="flex items-center justify-between mt-2 sm:mt-3">
                        <span className="text-sm sm:text-base font-semibold text-gray-900">
                          {formatPrice(item.price, 'INR')}
                        </span>
                        
                        {/* Quantity Controls */}
                        <div className="flex items-center bg-white border border-gray-300 rounded-md">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1.5 sm:p-2 text-gray-500 hover:text-gray-700 transition-colors touch-manipulation disabled:opacity-50"
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="w-3 h-3 sm:w-4 sm:h-4" />
                          </button>
                          <span className="text-sm sm:text-base font-medium px-2 sm:px-3 py-1 min-w-[2rem] text-center border-l border-r border-gray-300">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1.5 sm:p-2 text-gray-500 hover:text-gray-700 transition-colors touch-manipulation"
                          >
                            <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Subtotal for this item */}
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs sm:text-sm text-gray-500">
                          Subtotal: {formatPrice(item.price * item.quantity, 'INR')}
                        </span>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-1 text-gray-400 hover:text-red-600 transition-colors touch-manipulation"
                          title="Remove item"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t border-gray-200 bg-white">
              {/* Subtotal */}
              <div className="flex justify-between items-center p-4 sm:p-6 pb-4">
                <div>
                  <span className="text-base sm:text-lg font-semibold text-gray-900">Total</span>
                  <div className="text-xs sm:text-sm text-gray-500">{items.length} item{items.length !== 1 ? 's' : ''}</div>
                </div>
                <span className="text-lg sm:text-xl font-bold text-yellow-600">
                  {formatPrice(getTotalPrice(), 'INR')}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="px-4 sm:px-6 pb-4 sm:pb-6">
                <div className="flex flex-col space-y-2 sm:space-y-3">
                  {/* Primary Actions */}
                  <div className="grid grid-cols-2 gap-2 sm:gap-3">
                    <button 
                      onClick={handleCartClick}
                      className="bg-gray-900 text-white py-2.5 sm:py-3 px-3 sm:px-4 rounded-md font-medium hover:bg-gray-800 transition-colors text-sm sm:text-base touch-manipulation"
                    >
                      View Cart
                    </button>
                    <button 
                      onClick={handleCheckoutClick}
                      className="bg-yellow-600 text-white py-2.5 sm:py-3 px-3 sm:px-4 rounded-md font-medium hover:bg-yellow-700 transition-colors text-sm sm:text-base touch-manipulation"
                    >
                      Checkout
                    </button>
                  </div>
                  
                  {/* Comparison Button */}
                  <button 
                    onClick={handleComparisonClick}
                    className={`w-full border border-gray-900 text-gray-900 py-2.5 sm:py-3 px-3 sm:px-4 rounded-md font-medium transition-colors text-sm sm:text-base touch-manipulation ${
                      items.length === 2 
                        ? 'hover:bg-gray-100' 
                        : 'opacity-50 cursor-not-allowed'
                    }`}
                    disabled={items.length !== 2}
                    title={items.length !== 2 ? 'Add exactly 2 products to compare' : 'Compare products'}
                  >
                    <span className="block sm:inline">Compare Products</span>
                    {items.length !== 2 && (
                      <span className="block sm:inline text-xs sm:text-sm mt-1 sm:mt-0 sm:ml-2 text-gray-600">
                        ({items.length}/2 items)
                      </span>
                    )}
                  </button>
                </div>

                {/* Continue Shopping Link */}
                <button
                  onClick={() => {
                    closeCart();
                    navigate('/shop');
                  }}
                  className="w-full mt-3 text-center text-sm text-gray-600 hover:text-gray-800 transition-colors py-2"
                >
                  ← Continue Shopping
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartSidebar;