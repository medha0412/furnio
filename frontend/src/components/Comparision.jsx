import React, { useEffect } from 'react';
import BackButton from './BackButton';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

const App = () => {
  const { addToCart, items: cartItems } = useCart();
  const navigate = useNavigate();

  // Redirect if cart doesn't have exactly 2 products
  useEffect(() => {
    if (cartItems.length !== 2) {
      navigate('/shop');
    }
  }, [cartItems.length, navigate]);

  // Don't render if cart doesn't have exactly 2 products
  if (cartItems.length !== 2) {
    return null;
  }

  const formatPrice = (price) => {
    return `Rs. ${price.toLocaleString('id-ID')}`;
  };

  // Use cart items as selected products
  const selectedProducts = cartItems;
  
  // Debug log to see what data we have
  console.log('Selected products for comparison:', selectedProducts);
  console.log('First product configuration:', selectedProducts[0]?.configuration);

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4 fill-yellow-500 text-yellow-500" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>);
      } else {
        stars.push(<svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4 text-gray-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>);
      }
    }
    return stars;
  };

  const tableData = [
    {
      title: 'Configuration',
      rows: [
        { label: 'Configuration', key: 'configuration' },
        { label: 'Upholstery Material', key: 'upholsteryMaterial' },
        { label: 'Upholstery Color', key: 'upholsteryColor' }
      ]
    },
    {
      title: 'Product',
      rows: [
        { label: 'Filling Material', key: 'fillingMaterial' },
        { label: 'Finish Type', key: 'finishType' },
        { label: 'Adjustable Headrest', key: 'adjustableHeadrest' },
        { label: 'Maximum Load Capacity', key: 'maximumLoadCapacity' },
        { label: 'Origin of Manufacture', key: 'originOfManufacture' }
      ]
    },
    {
      title: 'Dimensions',
      rows: [
        { label: 'Width', key: 'width' },
        { label: 'Height', key: 'height' },
        { label: 'Depth', key: 'depth' },
        { label: 'Weight', key: 'weight' },
        { label: 'Seat Height', key: 'seatHeight' },
        { label: 'Leg Height', key: 'legHeight' }
      ]
    },
    {
      title: 'Warranty',
      rows: [
        { label: 'Warranty Summary', key: 'summary' },
        { label: 'Warranty Service Type', key: 'serviceType' },
        { label: 'Covered in Warranty', key: 'covered' },
        { label: 'Not Covered in Warranty', key: 'notCovered' },
        { label: 'Domestic Warranty', key: 'domestic' }
      ]
    }
  ];

  return (
    <div className="font-sans min-h-screen">
      <BackButton />
      {/* Header section */}
      <div className="relative h-[200px] sm:h-[250px] md:h-[300px] flex items-center justify-center text-center bg-cover bg-center" style={{ backgroundImage: "url('/images/Group 78 (1).png')" }}>
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="relative z-10 text-white px-4">
          <div className="flex justify-center mb-4">
           
          </div>
          
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 sm:py-8 md:py-16">
        {/* Product Display */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-start mb-8 sm:mb-12">
          <div className="lg:col-span-1 text-center lg:text-left">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Compare Products</h2>
            <p className="text-sm sm:text-base text-gray-600">Products from your cart</p>
          </div>

          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {selectedProducts.map(product => (
              <div key={product.id} className="bg-gray-100 rounded-lg p-4 sm:p-6 text-center">
                <img 
                  src={product.image || product.images?.[0] || 'https://placehold.co/300x200/F4F4F4/333333?text=Product'} 
                  alt={product.name} 
                  className="mx-auto mb-3 sm:mb-4 rounded-md w-full max-w-[200px] sm:max-w-[240px] h-24 sm:h-32 object-cover" 
                />
                <h3 className="text-lg sm:text-xl font-semibold mb-1 line-clamp-2">{product.name}</h3>
                <p className="text-gray-600 mb-2 text-sm sm:text-base">{formatPrice(product.price)}</p>
                <div className="flex items-center justify-center space-x-2">
                  <div className="flex text-yellow-500">
                    {renderStars(product.rating || 4.5)}
                  </div>
                  <span className="text-xs sm:text-sm text-gray-500">({product.reviewCount || 0} Review)</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Comparison View */}
        <div className="block lg:hidden space-y-6">
          {tableData.map((section, sectionIndex) => (
            <div key={sectionIndex} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="bg-gray-100 px-4 py-3">
                <h3 className="text-base font-bold text-gray-900 uppercase">{section.title}</h3>
              </div>
              <div className="divide-y divide-gray-200">
                {section.rows.map((row, rowIndex) => (
                  <div key={rowIndex} className="p-4">
                    <div className="font-medium text-gray-800 mb-3 text-sm">{row.label}</div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {selectedProducts.map((product, productIndex) => (
                        <div key={product.id} className="bg-gray-50 rounded-md p-3">
                          <div className="text-xs text-gray-500 mb-1">Product {productIndex + 1}</div>
                          <div className="text-sm text-gray-600 break-words">
                            {product[section.title.toLowerCase()]?.[row.key] || '-'}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
                <div className="p-4 bg-gray-50">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {selectedProducts.map(product => (
                      <button 
                        key={product.id}
                        onClick={() => addToCart(product)}
                        className="bg-yellow-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-yellow-700 transition-colors text-sm w-full"
                      >
                        Add To Cart
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Comparison Table */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <tbody>
              {tableData.map((section, sectionIndex) => (
                <React.Fragment key={sectionIndex}>
                  <tr className="bg-gray-100">
                    <td colSpan={selectedProducts.length + 1} className="py-3 px-4 xl:py-4 xl:px-6 text-left text-base xl:text-lg font-bold text-gray-900 uppercase">
                      {section.title}
                    </td>
                  </tr>
                  {section.rows.map((row, rowIndex) => (
                    <tr key={rowIndex} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="py-3 px-4 xl:py-4 xl:px-6 text-left text-sm font-medium text-gray-800 w-1/4">
                        {row.label}
                      </td>
                      {selectedProducts.map(product => (
                        <td key={product.id} className="py-3 px-4 xl:py-4 xl:px-6 text-center text-sm text-gray-600 break-words">
                          {product[section.title.toLowerCase()]?.[row.key] || '-'}
                        </td>
                      ))}
                      {/* Placeholder for the "Add a Product" column */}
                      <td className="py-3 px-4 xl:py-4 xl:px-6 text-center text-sm text-gray-400">
                        -
                      </td>
                    </tr>
                  ))}
                  <tr className="border-b border-gray-200">
                    <td className="py-3 px-4 xl:py-4 xl:px-6"></td>
                    {selectedProducts.map(product => (
                      <td key={product.id} className="py-3 px-4 xl:py-4 xl:px-6 text-center">
                        <button 
                          onClick={() => addToCart(product)}
                          className="bg-yellow-600 text-white font-semibold py-2 px-4 xl:px-6 rounded-md hover:bg-yellow-700 transition-colors text-sm"
                        >
                          Add To Cart
                        </button>
                      </td>
                    ))}
                    <td className="py-3 px-4 xl:py-4 xl:px-6"></td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>
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
    </div>
  );
};

export default App;