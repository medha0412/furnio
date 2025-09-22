import React from 'react';
import { useCart } from '../contexts/CartContext';

const ProductCard = ({ product, onEdit, onDelete }) => {
  const { addToCart } = useCart();

  // Handle different image structures
  const productImage = product.images ? product.images[0] : product.image;
  
  // Format price for display
  const formatPrice = (price) => {
    return `Rs. ${price.toLocaleString('en-IN')}.00`;
  };

  return (
    <div className="border rounded p-3 sm:p-4 shadow hover:shadow-lg transition-shadow group relative">
      <div className="relative">
        <img src={productImage} alt={product.name} className="w-full h-40 sm:h-48 md:h-56 object-cover mb-3 sm:mb-4 rounded" />
        {product.discount && (
          <div className="absolute top-2 right-2 bg-red-500 text-white text-[10px] sm:text-xs font-bold rounded-full px-2 py-1">
            -{product.discount}%
          </div>
        )}
        {product.new && (
          <div className="absolute top-2 right-2 bg-green-500 text-white text-[10px] sm:text-xs font-bold rounded-full px-2 py-1">
            New
          </div>
        )}
        {/* Hover action icons */}
        <div className="absolute top-2 left-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity flex gap-2">
          {onEdit && (
            <button
              type="button"
              aria-label="Edit product"
              onClick={(e) => { e.stopPropagation(); onEdit(product); }}
              className="bg-white/90 hover:bg-white text-gray-800 border rounded p-1.5 sm:p-1 shadow"
            >
              ✏️
            </button>
          )}
          {onDelete && (
            <button
              type="button"
              aria-label="Delete product"
              onClick={(e) => { e.stopPropagation(); onDelete(product); }}
              className="bg-white/90 hover:bg-white text-red-600 border rounded p-1.5 sm:p-1 shadow"
            >
              🗑️
            </button>
          )}
        </div>
      </div>
      <h3 className="text-base sm:text-lg font-semibold line-clamp-2">{product.name}</h3>
      <p className="text-gray-600 text-sm sm:text-base line-clamp-2">{product.description}</p>
      <div className="mt-2 flex items-center gap-2">
        <p className="font-bold text-base sm:text-lg">{formatPrice(product.price)}</p>
        {product.oldPrice && (
          <p className="text-gray-500 line-through text-xs sm:text-sm">{formatPrice(product.oldPrice)}</p>
        )}
      </div>
      
      {/* Add to Cart Button */}
      <div className="mt-3 sm:mt-4 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300">
        <button
          onClick={() => addToCart(product)}
          className="w-full bg-yellow-600 text-white py-2 px-4 rounded-md font-medium hover:bg-yellow-700 transition-colors"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
