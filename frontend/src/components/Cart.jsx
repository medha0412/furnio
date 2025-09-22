import React from 'react';
import BackButton from './BackButton';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

const App = () => {
  const navigate = useNavigate();
  const { items: cartItems, updateQuantity, removeFromCart } = useCart();

  const formatPrice = (price) => {
    return `Rs. ${price.toLocaleString('id-ID')}.00`;
  };

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) return;
    updateQuantity(id, newQuantity);
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const removeItem = (id) => {
    removeFromCart(id);
  };

  return (
    <div className="font-sans min-h-screen">
      <BackButton />
      {/* Header section */}
      <div className="relative h-[200px] sm:h-[250px] md:h-[300px] flex items-center justify-center text-center bg-cover bg-center" style={{ backgroundImage: "url('/images/Group 78 (2).png')" }}>
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="relative z-10 text-white px-4">
          <div className="flex justify-center mb-4">
           
          </div>
          
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 sm:py-8 md:py-16 flex flex-col lg:grid lg:grid-cols-3 gap-6 lg:gap-8">
        {/* Cart Table - Desktop */}
        <div className="lg:col-span-2 hidden md:block">
          <div className="bg-[#f9f1e7] rounded-lg overflow-hidden">
            <table className="min-w-full">
              <thead>
                <tr className="text-left text-gray-600">
                  <th className="py-3 px-4 lg:py-4 lg:px-6 font-medium text-sm lg:text-base">Product</th>
                  <th className="py-3 px-4 lg:py-4 lg:px-6 font-medium text-sm lg:text-base">Price</th>
                  <th className="py-3 px-4 lg:py-4 lg:px-6 font-medium text-sm lg:text-base">Quantity</th>
                  <th className="py-3 px-4 lg:py-4 lg:px-6 font-medium text-sm lg:text-base">Subtotal</th>
                  <th className="py-3 px-4 lg:py-4 lg:px-6 font-medium text-sm lg:text-base"></th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map(item => (
                  <tr key={item.id} className="border-t border-gray-300">
                    <td className="py-3 px-4 lg:py-4 lg:px-6">
                      <div className="flex items-center space-x-2 lg:space-x-4">
                        <img 
                          src={item.image || item.images?.[0] || 'https://placehold.co/100x100/F4F4F4/333333?text=Product'} 
                          alt={item.name} 
                          className="w-12 h-12 lg:w-16 lg:h-16 rounded-md object-cover flex-shrink-0" 
                        />
                        <span className="text-gray-800 font-medium text-sm lg:text-base line-clamp-2">{item.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 lg:py-4 lg:px-6 text-gray-600 text-sm lg:text-base">{formatPrice(item.price)}</td>
                    <td className="py-3 px-4 lg:py-4 lg:px-6">
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                        className="w-12 lg:w-16 px-1 lg:px-2 py-1 text-center border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-yellow-600 text-sm lg:text-base"
                        min="1"
                      />
                    </td>
                    <td className="py-3 px-4 lg:py-4 lg:px-6 text-gray-900 font-bold text-sm lg:text-base">{formatPrice(item.price * item.quantity)}</td>
                    <td className="py-3 px-4 lg:py-4 lg:px-6">
                      <button onClick={() => removeItem(item.id)} className="text-red-500 hover:text-red-700 p-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 lg:h-5 lg:w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="3 6 5 6 21 6"></polyline>
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                          <line x1="10" y1="11" x2="10" y2="17"></line>
                          <line x1="14" y1="11" x2="14" y2="17"></line>
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Cart Items - Mobile */}
        <div className="md:hidden space-y-4">
          {cartItems.map(item => (
            <div key={item.id} className="bg-[#f9f1e7] rounded-lg p-4">
              <div className="flex items-start space-x-4">
                <img 
                  src={item.image || item.images?.[0] || 'https://placehold.co/100x100/F4F4F4/333333?text=Product'} 
                  alt={item.name} 
                  className="w-20 h-20 rounded-md object-cover flex-shrink-0" 
                />
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-gray-800 font-medium text-sm leading-tight pr-2">{item.name}</h3>
                    <button onClick={() => removeItem(item.id)} className="text-red-500 hover:text-red-700 p-1 flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        <line x1="10" y1="11" x2="10" y2="17"></line>
                        <line x1="14" y1="11" x2="14" y2="17"></line>
                      </svg>
                    </button>
                  </div>
                  <div className="text-gray-600 text-sm mb-2">{formatPrice(item.price)}</div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600">Qty:</span>
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                        className="w-16 px-2 py-1 text-center border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-yellow-600 text-sm"
                        min="1"
                      />
                    </div>
                    <div className="text-gray-900 font-bold text-sm">
                      {formatPrice(item.price * item.quantity)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Cart Totals */}
        <div className="lg:col-span-1 bg-[#f9f1e7] p-6 lg:p-8 rounded-lg order-first lg:order-last">
          <h2 className="text-2xl lg:text-3xl font-bold text-center mb-6 lg:mb-8">Cart Totals</h2>
          <div className="space-y-4">
            <div className="flex justify-between font-semibold text-sm lg:text-base">
              <span>Subtotal</span>
              <span>{formatPrice(calculateSubtotal())}</span>
            </div>
            <div className="flex justify-between font-bold text-yellow-600 text-lg lg:text-xl">
              <span>Total</span>
              <span>{formatPrice(calculateSubtotal())}</span>
            </div>
          </div>
          <div className="text-center mt-6 lg:mt-8">
            <button 
              onClick={() => navigate('/checkout')}
              className="w-full sm:w-auto bg-yellow-600 text-white font-semibold py-3 px-6 lg:px-8 rounded-md hover:bg-yellow-700 transition-colors text-sm lg:text-base"
            >
              Check Out
            </button>
          </div>
        </div>
      </div>

      {/* Empty Cart Message */}
      {cartItems.length === 0 && (
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="text-gray-500 text-lg mb-4">Your cart is empty</div>
          <button 
            onClick={() => navigate('/shop')}
            className="bg-yellow-600 text-white font-semibold py-3 px-8 rounded-md hover:bg-yellow-700 transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      )}

      {/* Benefits Section */}
      <div className="bg-[#fcf8f3] py-8 sm:py-12 lg:py-16 px-4 mt-8 sm:mt-12 lg:mt-16 rounded-lg">
        <div className="container mx-auto text-center">
          <img 
            src="/images/Feature.png" 
            alt="Features" 
            className="w-full h-auto max-w-4xl mx-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default App;