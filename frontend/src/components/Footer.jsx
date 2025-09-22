import React, { useState } from 'react';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    // Clear error when user starts typing
    if (error) {
      setError('');
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setError('Email is required');
      return;
    }
    
    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    // If validation passes, submit the email
    setIsSubmitted(true);
    setError('');
  };

  return (
    <footer className="bg-white border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          <div>
            <div className="flex items-center mb-4">
              <img 
                src="/images/Meubel House_Logos-05.png" 
                alt="Meubel House Logo" 
                className="h-6 sm:h-8 w-auto object-contain mr-2"
                style={{ maxWidth: '32px' }}
                onError={(e) => { e.target.style.display = 'none'; }}
              />
              <span className="text-xl sm:text-2xl font-bold">Furniro</span>
            </div>
            <address className="text-gray-600 text-xs sm:text-sm not-italic">
              400 University Drive Suite 200 Coral<br />
              Gables,<br />
              FL 33134 USA
            </address>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 mb-3 sm:mb-4 text-sm sm:text-base">Links</h3>
            <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
              <li><a href="/" className="text-gray-600 hover:text-yellow-600 transition-colors">Home</a></li>
              <li><a href="/shop" className="text-gray-600 hover:text-yellow-600 transition-colors">Shop</a></li>
              <li><a href="/products" className="text-gray-600 hover:text-yellow-600 transition-colors">Products</a></li>
              <li><a href="/about" className="text-gray-600 hover:text-yellow-600 transition-colors">About</a></li>
              <li><a href="/contact" className="text-gray-600 hover:text-yellow-600 transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 mb-3 sm:mb-4 text-sm sm:text-base">Help</h3>
            <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
              <li><a href="#" className="text-gray-600 hover:text-yellow-600 transition-colors">Payment Options</a></li>
              <li><a href="#" className="text-gray-600 hover:text-yellow-600 transition-colors">Returns</a></li>
              <li><a href="#" className="text-gray-600 hover:text-yellow-600 transition-colors">Privacy Policies</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 mb-3 sm:mb-4 text-sm sm:text-base">Newsletter</h3>
            <div className="space-y-2">
              <div className="flex flex-col sm:flex-row">
                <input 
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="Enter Your Email Address"
                  disabled={isSubmitted}
                  className={`flex-1 px-3 py-2 border text-xs sm:text-sm focus:outline-none transition-colors ${
                    error 
                      ? 'border-red-500 focus:border-red-500' 
                      : isSubmitted
                      ? 'border-gray-200 bg-gray-50'
                      : 'border-gray-300 focus:border-yellow-600'
                  } ${isSubmitted ? 'rounded' : 'rounded-l sm:rounded-l'}`}
                />
                <button 
                  onClick={handleSubmit}
                  disabled={isSubmitted}
                  className={`px-3 sm:px-4 py-2 text-xs sm:text-sm transition-colors ${
                    isSubmitted
                      ? 'bg-green-600 text-white cursor-not-allowed'
                      : 'bg-black text-white hover:bg-gray-800'
                  } ${isSubmitted ? 'rounded' : 'rounded-r sm:rounded-r'} mt-2 sm:mt-0`}
                >
                  {isSubmitted ? 'EMAIL SUBMITTED' : 'SUBSCRIBE'}
                </button>
              </div>
              {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
            </div>
          </div>
        </div>
        
        <div className="border-t mt-6 sm:mt-8 pt-6 sm:pt-8">
          <p className="text-gray-600 text-xs sm:text-sm text-center sm:text-left">2023 Furniro. All rights reserved</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;