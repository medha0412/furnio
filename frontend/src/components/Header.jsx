import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useLikes } from '../contexts/LikesContext';

const Header = () => {
  const { toggleCart, getTotalItems } = useCart();
  const { toggleOpen: toggleLikes, getTotalLikes } = useLikes();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white p-3 sm:p-4 lg:px-16 shadow-md">
      <nav className="flex items-center justify-between">
        {/* Logo and Brand Name */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          <img 
            src="/images/Meubel House_Logos-05.png" 
            alt="Meubel House Logo" 
            className="h-8 sm:h-9 md:h-10 w-auto object-contain"
            style={{ maxWidth: '40px' }}
            onError={(e) => {
              console.error('Logo image failed to load:', e.target.src);
              e.target.style.display = 'none';
            }}
            onLoad={() => {
              console.log('Logo image loaded successfully');
            }}
          />
          <span className="text-xl sm:text-2xl font-bold text-gray-900">Furniro</span>
        </div>

        {/* Navigation Links */}
        <div className="hidden lg:flex flex-grow justify-center space-x-8 xl:space-x-12 text-base xl:text-lg">
          <Link to="/" className="font-semibold text-gray-800 hover:text-yellow-600 transition-colors duration-200">
            Home
          </Link>
          <Link to="/shop" className="font-semibold text-gray-800 hover:text-yellow-600 transition-colors duration-200">
            Shop
          </Link>
          <Link to="/about" className="font-semibold text-gray-800 hover:text-yellow-600 transition-colors duration-200">
            About
          </Link>
          <Link to="/contact" className="font-semibold text-gray-800 hover:text-yellow-600 transition-colors duration-200">
            Contact
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="lg:hidden mr-2 text-gray-800 hover:text-yellow-600"
          aria-label="Toggle navigation"
          onClick={() => setMobileOpen(v => !v)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
        </button>

        {/* User Icons */}
        <div className="flex items-center space-x-4 sm:space-x-6">
          <a href="#" className="text-gray-800 hover:text-yellow-600 transition-colors duration-200">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          </a>
          <a href="#" className="text-gray-800 hover:text-yellow-600 transition-colors duration-200">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          </a>
          <button onClick={toggleLikes} className="relative text-gray-800 hover:text-yellow-600 transition-colors duration-200">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
            {getTotalLikes() > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                {getTotalLikes()}
              </span>
            )}
          </button>
          <button 
            onClick={toggleCart}
            className="relative text-gray-800 hover:text-yellow-600 transition-colors duration-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><path d="M3 6h18"/><path d="M16 10a2 2 0 0 1-4 0v-4a2 2 0 0 1 4 0"/></svg>
            {getTotalItems() > 0 && (
              <span className="absolute -top-2 -right-2 bg-yellow-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                {getTotalItems()}
              </span>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="lg:hidden px-3 pb-3">
          <div className="mt-2 grid gap-2">
            <Link onClick={() => setMobileOpen(false)} to="/" className="block rounded-md px-3 py-2 font-semibold text-gray-800 hover:bg-gray-100">Home</Link>
            <Link onClick={() => setMobileOpen(false)} to="/shop" className="block rounded-md px-3 py-2 font-semibold text-gray-800 hover:bg-gray-100">Shop</Link>
            <Link onClick={() => setMobileOpen(false)} to="/about" className="block rounded-md px-3 py-2 font-semibold text-gray-800 hover:bg-gray-100">About</Link>
            <Link onClick={() => setMobileOpen(false)} to="/contact" className="block rounded-md px-3 py-2 font-semibold text-gray-800 hover:bg-gray-100">Contact</Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
