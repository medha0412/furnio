import React, { useState } from 'react';
import BackButton from './BackButton';
import { useCart } from '../contexts/CartContext';

const App = () => {
  const { items: cartItems, getTotalPrice } = useCart();
  const [billingDetails, setBillingDetails] = useState({
    firstName: '',
    lastName: '',
    companyName: '',
    country: 'Sri Lanka',
    streetAddress: '',
    town: '',
    province: 'Western Province',
    zipCode: '',
    phone: '',
    email: '',
    additionalInfo: ''
  });
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBillingDetails({ ...billingDetails, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!billingDetails.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    if (!billingDetails.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    if (!billingDetails.country.trim()) {
      newErrors.country = 'Country is required';
    }
    if (!billingDetails.streetAddress.trim()) {
      newErrors.streetAddress = 'Street address is required';
    }
    if (!billingDetails.town.trim()) {
      newErrors.town = 'Town/City is required';
    }
    if (!billingDetails.province.trim()) {
      newErrors.province = 'Province is required';
    }
    if (!billingDetails.zipCode.trim()) {
      newErrors.zipCode = 'ZIP code is required';
    }
    if (!billingDetails.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }
    if (!billingDetails.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(billingDetails.email)) {
      newErrors.email = 'Email address is invalid';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      console.log('Form submitted:', billingDetails);
      // Simulate order processing
      setTimeout(() => {
        setIsOrderPlaced(true);
        // Clear cart on successful order
        try {
          // Use context clearCart if available
          if (typeof clearCart === 'function') {
            clearCart();
          }
        } catch {}
      }, 1000);
    }
  };

  const productData = {
    name: cartItems.length > 0 ? `${cartItems[0].name}${cartItems.length > 1 ? ` and ${cartItems.length - 1} more` : ''}` : 'No items',
    quantity: cartItems.reduce((total, item) => total + item.quantity, 0),
    subtotal: getTotalPrice(),
    shipping: 0,
    total: getTotalPrice()
  };

  const formatPrice = (price) => {
    return `Rs. ${price.toLocaleString('id-ID')}.00`;
  };

  return (
    <div className="font-sans min-h-screen">
      <BackButton />
      {/* Header section */}
      <div className="relative h-[200px] sm:h-[250px] md:h-[300px] flex items-center justify-center text-center bg-cover bg-center" style={{ backgroundImage: "url('/images/Group 78 (3).png')" }}>
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="relative z-10 text-white px-4">
          <div className="flex justify-center mb-4">
            
          </div>
          
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 sm:py-8 md:py-16">
        <form onSubmit={handleFormSubmit} className="grid grid-cols-1 xl:grid-cols-2 gap-8 lg:gap-12 xl:gap-16">
          {/* Billing Details */}
          <div className="order-2 xl:order-1">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">Billing details</h2>
            <div className="space-y-4 sm:space-y-6">
              {/* Name Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-gray-800 font-semibold mb-2 text-sm sm:text-base">
                    First Name *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={billingDetails.firstName}
                    onChange={handleInputChange}
                    className={`w-full p-3 sm:p-4 border rounded-md focus:outline-none focus:ring-2 transition-colors text-sm sm:text-base ${
                      errors.firstName 
                        ? 'border-red-500 focus:ring-red-500 bg-red-50' 
                        : 'border-gray-300 focus:ring-yellow-600 focus:border-yellow-600'
                    }`}
                    required
                  />
                  {errors.firstName && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.firstName}</p>}
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-gray-800 font-semibold mb-2 text-sm sm:text-base">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={billingDetails.lastName}
                    onChange={handleInputChange}
                    className={`w-full p-3 sm:p-4 border rounded-md focus:outline-none focus:ring-2 transition-colors text-sm sm:text-base ${
                      errors.lastName 
                        ? 'border-red-500 focus:ring-red-500 bg-red-50' 
                        : 'border-gray-300 focus:ring-yellow-600 focus:border-yellow-600'
                    }`}
                    required
                  />
                  {errors.lastName && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.lastName}</p>}
                </div>
              </div>

              {/* Company Name */}
              <div>
                <label htmlFor="companyName" className="block text-gray-800 font-semibold mb-2 text-sm sm:text-base">
                  Company Name (Optional)
                </label>
                <input
                  type="text"
                  id="companyName"
                  name="companyName"
                  value={billingDetails.companyName}
                  onChange={handleInputChange}
                  className="w-full p-3 sm:p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-yellow-600 transition-colors text-sm sm:text-base"
                />
              </div>

              {/* Country */}
              <div>
                <label htmlFor="country" className="block text-gray-800 font-semibold mb-2 text-sm sm:text-base">
                  Country / Region *
                </label>
                <select
                  id="country"
                  name="country"
                  value={billingDetails.country}
                  onChange={handleInputChange}
                  className={`w-full p-3 sm:p-4 border rounded-md focus:outline-none focus:ring-2 transition-colors text-sm sm:text-base ${
                    errors.country 
                      ? 'border-red-500 focus:ring-red-500 bg-red-50' 
                      : 'border-gray-300 focus:ring-yellow-600 focus:border-yellow-600'
                  }`}
                  required
                >
                  <option value="Sri Lanka">Sri Lanka</option>
                  <option value="USA">USA</option>
                  <option value="UK">UK</option>
                </select>
                {errors.country && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.country}</p>}
              </div>

              {/* Street Address */}
              <div>
                <label htmlFor="streetAddress" className="block text-gray-800 font-semibold mb-2 text-sm sm:text-base">
                  Street address *
                </label>
                <input
                  type="text"
                  id="streetAddress"
                  name="streetAddress"
                  value={billingDetails.streetAddress}
                  onChange={handleInputChange}
                  className={`w-full p-3 sm:p-4 border rounded-md focus:outline-none focus:ring-2 transition-colors text-sm sm:text-base ${
                    errors.streetAddress 
                      ? 'border-red-500 focus:ring-red-500 bg-red-50' 
                      : 'border-gray-300 focus:ring-yellow-600 focus:border-yellow-600'
                  }`}
                  placeholder="House number and street name"
                  required
                />
                {errors.streetAddress && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.streetAddress}</p>}
              </div>

              {/* Town and Province */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="town" className="block text-gray-800 font-semibold mb-2 text-sm sm:text-base">
                    Town / City *
                  </label>
                  <input
                    type="text"
                    id="town"
                    name="town"
                    value={billingDetails.town}
                    onChange={handleInputChange}
                    className={`w-full p-3 sm:p-4 border rounded-md focus:outline-none focus:ring-2 transition-colors text-sm sm:text-base ${
                      errors.town 
                        ? 'border-red-500 focus:ring-red-500 bg-red-50' 
                        : 'border-gray-300 focus:ring-yellow-600 focus:border-yellow-600'
                    }`}
                    required
                  />
                  {errors.town && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.town}</p>}
                </div>
                <div>
                  <label htmlFor="province" className="block text-gray-800 font-semibold mb-2 text-sm sm:text-base">
                    Province *
                  </label>
                  <select
                    id="province"
                    name="province"
                    value={billingDetails.province}
                    onChange={handleInputChange}
                    className={`w-full p-3 sm:p-4 border rounded-md focus:outline-none focus:ring-2 transition-colors text-sm sm:text-base ${
                      errors.province 
                        ? 'border-red-500 focus:ring-red-500 bg-red-50' 
                        : 'border-gray-300 focus:ring-yellow-600 focus:border-yellow-600'
                    }`}
                    required
                  >
                    <option value="Western Province">Western Province</option>
                    <option value="Central Province">Central Province</option>
                    <option value="Southern Province">Southern Province</option>
                  </select>
                  {errors.province && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.province}</p>}
                </div>
              </div>

              {/* ZIP Code */}
              <div>
                <label htmlFor="zipCode" className="block text-gray-800 font-semibold mb-2 text-sm sm:text-base">
                  ZIP code *
                </label>
                <input
                  type="text"
                  id="zipCode"
                  name="zipCode"
                  value={billingDetails.zipCode}
                  onChange={handleInputChange}
                  className={`w-full p-3 sm:p-4 border rounded-md focus:outline-none focus:ring-2 transition-colors text-sm sm:text-base ${
                    errors.zipCode 
                      ? 'border-red-500 focus:ring-red-500 bg-red-50' 
                      : 'border-gray-300 focus:ring-yellow-600 focus:border-yellow-600'
                  }`}
                  required
                />
                {errors.zipCode && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.zipCode}</p>}
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="phone" className="block text-gray-800 font-semibold mb-2 text-sm sm:text-base">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={billingDetails.phone}
                    onChange={handleInputChange}
                    className={`w-full p-3 sm:p-4 border rounded-md focus:outline-none focus:ring-2 transition-colors text-sm sm:text-base ${
                      errors.phone 
                        ? 'border-red-500 focus:ring-red-500 bg-red-50' 
                        : 'border-gray-300 focus:ring-yellow-600 focus:border-yellow-600'
                    }`}
                    placeholder="+94 XX XXX XXXX"
                    required
                  />
                  {errors.phone && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.phone}</p>}
                </div>
                <div>
                  <label htmlFor="email" className="block text-gray-800 font-semibold mb-2 text-sm sm:text-base">
                    Email address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={billingDetails.email}
                    onChange={handleInputChange}
                    className={`w-full p-3 sm:p-4 border rounded-md focus:outline-none focus:ring-2 transition-colors text-sm sm:text-base ${
                      errors.email 
                        ? 'border-red-500 focus:ring-red-500 bg-red-50' 
                        : 'border-gray-300 focus:ring-yellow-600 focus:border-yellow-600'
                    }`}
                    placeholder="your@email.com"
                    required
                  />
                  {errors.email && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.email}</p>}
                </div>
              </div>

              {/* Additional Information */}
              <div>
                <label htmlFor="additionalInfo" className="block text-gray-800 font-semibold mb-2 text-sm sm:text-base">
                  Additional information
                </label>
                <textarea
                  id="additionalInfo"
                  name="additionalInfo"
                  value={billingDetails.additionalInfo}
                  onChange={handleInputChange}
                  className="w-full p-3 sm:p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-yellow-600 transition-colors text-sm sm:text-base"
                  rows="3"
                  placeholder="Notes about your order, e.g. special notes for delivery."
                ></textarea>
              </div>
            </div>
          </div>

          {/* Product Summary and Payment */}
          <div className="order-1 xl:order-2">
            <div className="bg-[#fcf8f3] p-4 sm:p-6 lg:p-8 rounded-lg sticky top-4">
              <h3 className="text-xl sm:text-2xl font-bold mb-6">Order Summary</h3>
              
              {/* Order Items */}
              <div className="space-y-4 mb-6">
                {cartItems.map((item, index) => (
                  <div key={item.id || index} className="flex justify-between items-start py-2 border-b border-gray-200">
                    <div className="flex-1 pr-4">
                      <span className="text-sm sm:text-base text-gray-800 font-medium line-clamp-2">
                        {item.name}
                      </span>
                      <span className="text-xs sm:text-sm text-gray-600 block">
                        Qty: {item.quantity}
                      </span>
                    </div>
                    <span className="text-sm sm:text-base text-gray-900 font-medium whitespace-nowrap">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Order Totals */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm sm:text-base text-gray-600">Subtotal</span>
                  <span className="text-sm sm:text-base text-gray-900 font-medium">{formatPrice(productData.subtotal)}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm sm:text-base text-gray-600">Shipping</span>
                  <span className="text-sm sm:text-base text-green-600 font-medium">Free</span>
                </div>
                <div className="border-t border-gray-300 pt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-base sm:text-lg font-semibold text-gray-900">Total</span>
                    <span className="text-lg sm:text-2xl font-bold text-yellow-600">{formatPrice(productData.total)}</span>
                  </div>
                </div>
              </div>

              {/* Payment Options */}
              <div className="space-y-4 mb-6">
                <h4 className="font-semibold text-gray-900 text-sm sm:text-base">Payment Method</h4>
                <div className="space-y-3">
                  <div className="bg-white p-3 sm:p-4 rounded-md border border-gray-200">
                    <label className="flex items-start space-x-3">
                      <input 
                        type="radio" 
                        className="mt-1 text-yellow-600 focus:ring-yellow-600" 
                        name="paymentMethod" 
                        value="directBankTransfer" 
                        defaultChecked 
                      />
                      <div className="flex-1">
                        <span className="text-gray-900 font-medium text-sm sm:text-base">Direct Bank Transfer</span>
                        <p className="mt-1 text-gray-600 text-xs sm:text-sm leading-relaxed">
                          Make your payment directly into our bank account. Please use your Order ID as the payment reference.
                        </p>
                      </div>
                    </label>
                  </div>
                  <div className="bg-white p-3 sm:p-4 rounded-md border border-gray-200">
                    <label className="flex items-center space-x-3">
                      <input 
                        type="radio" 
                        className="text-yellow-600 focus:ring-yellow-600" 
                        name="paymentMethod" 
                        value="cashOnDelivery" 
                      />
                      <span className="text-gray-900 font-medium text-sm sm:text-base">Cash On Delivery</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Privacy Policy */}
              <p className="text-gray-600 text-xs sm:text-sm italic mb-6 leading-relaxed">
                Your personal data will be used to support your experience throughout this website, to manage access to your account, and for other purposes described in our{' '}
                <a href="#" className="text-yellow-600 hover:underline">privacy policy</a>.
              </p>

              {/* Submit Button */}
              <div className="text-center">
                <button
                  type="submit"
                  disabled={isOrderPlaced}
                  className={`w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-md font-semibold transition-all duration-200 text-sm sm:text-base ${
                    isOrderPlaced
                      ? 'bg-green-600 text-white cursor-not-allowed'
                      : 'bg-white border-2 border-black text-black hover:bg-black hover:text-white active:scale-95'
                  }`}
                >
                  {isOrderPlaced ? '✓ Order Placed Successfully!' : 'Place Order'}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>

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