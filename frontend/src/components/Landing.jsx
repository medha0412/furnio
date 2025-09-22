import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, User, Heart, ShoppingCart, Share2, RotateCcw, Eye, ChevronLeft, ChevronRight, Star, Minus, Plus, Facebook, Linkedin, Twitter } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { fetchProducts, createProduct, updateProduct, deleteProduct, seedProducts } from '../api/products';
import ProductFormModal from './ProductFormModal';
import ConfirmDeleteModal from './ConfirmDeleteModal';

// Array of product images
const productImages = [
  '/images/Image 5.png',
  '/images/image 7.png',
  '/images/Images (2).png',
  '/images/Image 5 (1).png',
  '/images/Images (1).png',
  '/images/image 4.png'
];

// Function to get random image
const getRandomImage = () => {
  return productImages[Math.floor(Math.random() * productImages.length)];
};

// Function to assign stable random images to products
const assignStableImages = (products) => {
  return products.map(product => ({
    ...product,
    image: getRandomImage(),
    images: [getRandomImage(), getRandomImage(), getRandomImage(), getRandomImage()]
  }));
};

// Sample products data with stable random images - assigned once outside component
const products = assignStableImages([
    {
      id: 1,
      name: 'Syltherine',
      description: 'Stylish cafe chair',
      price: 2500000,
      originalPrice: 3500000,
      discount: 30,
      // Images will be assigned by assignStableImages function
      isNew: false,
      rating: 4.5,
      reviews: 5,
      sku: 'SS001',
      category: 'Sofas',
      tags: ['Sofa', 'Chair', 'Home', 'Shop'],
      sizes: ['L', 'XL', 'XS'],
      colors: ['purple', 'black', 'gold'],
      longDescription: `Setting the bar as one of the loudest speakers in its class, the Kilburn is a compact, stout-hearted hero with a well-balanced audio which boasts a clear midrange and extended highs for a sound.

Weighing in under 7 pounds, the Kilburn is a lightweight piece of vintage styled engineering. Setting the bar as one of the loudest speakers in its class, the Kilburn is a compact, stout-hearted hero with a well-balanced audio which boasts a clear midrange and extended highs for a sound that is both articulate and pronounced. The analogue knobs allow you to fine tune the controls to your personal preferences while the guitar-influenced leather strap enables easy and stylish travel.`,
      // Detailed specifications for comparison
      configuration: {
        configuration: 'L-shaped',
        upholsteryMaterial: 'Fabric + Cotton',
        upholsteryColor: 'Bright Grey & Lion'
      },
      product: {
        fillingMaterial: 'Foam',
        finishType: 'Bright Grey & Lion',
        adjustableHeadrest: 'No',
        maximumLoadCapacity: '280 KG',
        originOfManufacture: 'India'
      },
      dimensions: {
        width: '265.32 cm',
        height: '76 cm',
        depth: '167.76 cm',
        weight: '45 KG',
        seatHeight: '41.52 cm',
        legHeight: '5.46 cm'
      },
      warranty: {
        summary: '1 Year Manufacturing Warranty',
        serviceType: 'For Warranty Claims or Any Product Related Issues Please Email at operations@trevilfurniture.com',
        covered: 'Warranty against Manufacturing Defect',
        notCovered: 'The Warranty Does Not Cover Damages Due To Usage Of The Product Beyond Its Intended Use And Wear & Tear In The Natural Course Of Product Usage.',
        domestic: '1 Year'
      }
    },
    {
      id: 2,
      name: 'Leviosa',
      description: 'Stylish cafe chair',
      price: 2500000,
      originalPrice: null,
      discount: null,
      // Images will be assigned by assignStableImages function
      isNew: false,
      rating: 4.0,
      reviews: 3,
      sku: 'LV001',
      category: 'Chairs',
      tags: ['Chair', 'Cafe', 'Home'],
      sizes: ['L', 'XL', 'XS'],
      colors: ['purple', 'black', 'gold'],
      longDescription: `A minimalist chair with a comfortable design, perfect for any modern home or cafe. Its sleek lines and ergonomic shape make it both a stylish and practical choice.`,
      // Detailed specifications for comparison
      configuration: {
        configuration: 'L-shaped',
        upholsteryMaterial: 'Fabric + Cotton',
        upholsteryColor: 'Bright Grey & Lion'
      },
      product: {
        fillingMaterial: 'Matte',
        finishType: 'Bright Grey & Lion',
        adjustableHeadrest: 'Yes',
        maximumLoadCapacity: '300 KG',
        originOfManufacture: 'India'
      },
      dimensions: {
        width: '265.32 cm',
        height: '76 cm',
        depth: '167.76 cm',
        weight: '65 KG',
        seatHeight: '41.52 cm',
        legHeight: '5.46 cm'
      },
      warranty: {
        summary: '1.2 Year Manufacturing Warranty',
        serviceType: 'For Warranty Claims or Any Product Related Issues Please Email at support@xyz.com',
        covered: 'Warranty of the product is limited to manufacturing defects only.',
        notCovered: 'The Warranty Does Not Cover Damages Due To Usage Of The Product Beyond Its Intended Use And Wear & Tear In The Natural Course Of Product Usage.',
        domestic: '3 Months'
      }
    },
    {
      id: 3,
      name: 'Lolito',
      description: 'Luxury big sofa',
      price: 7000000,
      originalPrice: 14000000,
      discount: 50,
      // Images will be assigned by assignStableImages function
      isNew: false,
      rating: 4.8,
      reviews: 12,
      sku: 'LO001',
      category: 'Sofas',
      tags: ['Sofa', 'Luxury', 'Living Room'],
      sizes: ['L', 'XL', 'XS'],
      colors: ['purple', 'black', 'gold'],
      longDescription: `This luxury sofa is designed for ultimate comfort and style. Its plush cushions and elegant design will make it the centerpiece of any living room.`,
      // Detailed specifications for comparison
      configuration: {
        configuration: 'L-shaped',
        upholsteryMaterial: 'Fabric + Cotton',
        upholsteryColor: 'Bright Grey & Lion'
      },
      product: {
        fillingMaterial: 'Foam',
        finishType: 'Bright Grey & Lion',
        adjustableHeadrest: 'No',
        maximumLoadCapacity: '280 KG',
        originOfManufacture: 'India'
      },
      dimensions: {
        width: '265.32 cm',
        height: '76 cm',
        depth: '167.76 cm',
        weight: '45 KG',
        seatHeight: '41.52 cm',
        legHeight: '5.46 cm'
      },
      warranty: {
        summary: '1 Year Manufacturing Warranty',
        serviceType: 'For Warranty Claims or Any Product Related Issues Please Email at operations@trevilfurniture.com',
        covered: 'Warranty against Manufacturing Defect',
        notCovered: 'The Warranty Does Not Cover Damages Due To Usage Of The Product Beyond Its Intended Use And Wear & Tear In The Natural Course Of Product Usage.',
        domestic: '1 Year'
      }
    },
    {
      id: 4,
      name: 'Respira',
      description: 'Outdoor bar table and stool',
      price: 500000,
      originalPrice: null,
      discount: null,
      // Images will be assigned by assignStableImages function
      isNew: true,
      rating: 4.2,
      reviews: 8,
      sku: 'RS001',
      category: 'Tables',
      tags: ['Table', 'Outdoor', 'Bar'],
      sizes: ['L', 'XL', 'XS'],
      colors: ['purple', 'black', 'gold'],
      longDescription: `Perfect for your patio or balcony, this outdoor bar set is durable and stylish. It's built to withstand the elements while providing a great place to relax.`,
      // Detailed specifications for comparison
      configuration: {
        configuration: 'L-shaped',
        upholsteryMaterial: 'Fabric + Cotton',
        upholsteryColor: 'Bright Grey & Lion'
      },
      product: {
        fillingMaterial: 'Matte',
        finishType: 'Bright Grey & Lion',
        adjustableHeadrest: 'Yes',
        maximumLoadCapacity: '300 KG',
        originOfManufacture: 'India'
      },
      dimensions: {
        width: '265.32 cm',
        height: '76 cm',
        depth: '167.76 cm',
        weight: '65 KG',
        seatHeight: '41.52 cm',
        legHeight: '5.46 cm'
      },
      warranty: {
        summary: '1.2 Year Manufacturing Warranty',
        serviceType: 'For Warranty Claims or Any Product Related Issues Please Email at support@xyz.com',
        covered: 'Warranty of the product is limited to manufacturing defects only.',
        notCovered: 'The Warranty Does Not Cover Damages Due To Usage Of The Product Beyond Its Intended Use And Wear & Tear In The Natural Course Of Product Usage.',
        domestic: '3 Months'
      }
    },
    {
      id: 5,
      name: 'Grifo',
      description: 'Night lamp',
      price: 1500000,
      originalPrice: null,
      discount: null,
      // Images will be assigned by assignStableImages function
      isNew: false,
      rating: 3.8,
      reviews: 6,
      sku: 'GR001',
      category: 'Lighting',
      tags: ['Lamp', 'Night', 'Bedroom'],
      sizes: ['L', 'XL', 'XS'],
      colors: ['purple', 'black', 'gold'],
      longDescription: `This elegant night lamp provides a soft, warm glow, creating a cozy atmosphere in any bedroom.`
    },
    {
      id: 6,
      name: 'Muggo',
      description: 'Small mug',
      price: 150000,
      originalPrice: null,
      discount: null,
      // Images will be assigned by assignStableImages function
      isNew: true,
      rating: 4.3,
      reviews: 4,
      sku: 'MG001',
      category: 'Accessories',
      tags: ['Mug', 'Kitchen', 'Small'],
      sizes: ['L', 'XL', 'XS'],
      colors: ['purple', 'black', 'gold'],
      longDescription: `A cute and practical mug for your morning coffee or tea. Its compact size makes it perfect for travel.`
    },
    {
      id: 7,
      name: 'Pingky',
      description: 'Cute bed set',
      price: 7000000,
      originalPrice: 14000000,
      discount: 50,
      // Images will be assigned by assignStableImages function
      isNew: false,
      rating: 4.6,
      reviews: 15,
      sku: 'PK001',
      category: 'Bedroom',
      tags: ['Bed', 'Set', 'Bedroom'],
      sizes: ['L', 'XL', 'XS'],
      colors: ['purple', 'black', 'gold'],
      longDescription: `This charming bed set includes everything you need for a cozy and stylish bedroom. The soft fabric and cute design will make you never want to leave your bed.`
    },
    {
      id: 8,
      name: 'Potty',
      description: 'Minimalist flower pot',
      price: 500000,
      originalPrice: null,
      discount: null,
      // Images will be assigned by assignStableImages function
      isNew: true,
      rating: 4.1,
      reviews: 7,
      sku: 'PT001',
      category: 'Accessories',
      tags: ['Pot', 'Flower', 'Minimalist'],
      sizes: ['L', 'XL', 'XS'],
      colors: ['purple', 'black', 'gold'],
      longDescription: `A simple yet elegant flower pot, perfect for adding a touch of nature to your living space.`
    }
]);

  const categories = [
  { name: 'Dining', image: getRandomImage() },
  { name: 'Living', image: getRandomImage() },
  { name: 'Bedroom', image: getRandomImage() }
  ];

  const roomImages = [
  '/images/Rectangle 24.png',
  '/images/Rectangle 25.png'
  ];

  const formatPrice = (price) => {
    return `Rp ${price.toLocaleString('id-ID')}`;
  };

const FurniroEcommerce = () => {
  const { addToCart } = useCart();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('L');
  const [selectedColor, setSelectedColor] = useState('purple');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deletingProduct, setDeletingProduct] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedMaterial, setSelectedMaterial] = useState('All');
  const [brandFilter, setBrandFilter] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sortBy, setSortBy] = useState('brand');
  const [sortOrder, setSortOrder] = useState('asc');

  const staticImagePool = [
    '/images/Image 5.png',
    '/images/image 7.png',
    '/images/Images (2).png',
    '/images/Image 5 (1).png',
    '/images/Images (1).png',
    '/images/image 4.png'
  ];
  const getRandomStatic = () => staticImagePool[Math.floor(Math.random()*staticImagePool.length)];

  const loadProducts = async () => {
    try {
      setIsLoading(true);
      setError('');
      const params = { page: 1, limit: 8, sortBy, sortOrder };
      if (selectedCategory && selectedCategory !== 'All') params.category = selectedCategory;
      if (selectedMaterial && selectedMaterial !== 'All') params.material = selectedMaterial;
      if (brandFilter) params.brand = brandFilter;
      if (minPrice) params.minPrice = minPrice;
      if (maxPrice) params.maxPrice = maxPrice;
      const data = await fetchProducts(params);
      const docs = Array.isArray(data?.products) ? data.products : (Array.isArray(data) ? data : []);
      if ((data?.pagination?.totalCount === 0) || docs.length === 0) {
        await seedProducts();
        const seeded = await fetchProducts(params);
        const seededDocs = Array.isArray(seeded?.products) ? seeded.products : (Array.isArray(seeded) ? seeded : []);
        const withImagesSeeded = seededDocs.map((p) => ({ ...p, image: p.image || getRandomStatic() }));
        setItems(withImagesSeeded);
      } else {
        const withImages = docs.map((p) => ({ ...p, image: p.image || getRandomStatic() }));
        setItems(withImages);
      }
    } catch (e) {
      setError('Failed to load products');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, [selectedCategory, selectedMaterial, brandFilter, minPrice, maxPrice, sortBy, sortOrder]);

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" style={{ clipPath: 'polygon(0 0, 50% 0, 50% 100%, 0 100%)' }} />);
      } else {
        stars.push(<Star key={i} className="w-4 h-4 text-gray-300" />);
      }
    }
    return stars;
  };

  const getRelatedProducts = (currentProductId) => {
    return products.filter(p => p.id !== currentProductId).slice(0, 4);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % roomImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + roomImages.length) % roomImages.length);
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setSelectedImageIndex(0);
    setQuantity(1);
    if (product.sizes && product.sizes.length) setSelectedSize(product.sizes[0]);
    if (product.colors && product.colors.length) setSelectedColor(product.colors[0]);
    // Scroll to top when product is selected
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleColorChange = (color) => {
    setSelectedColor(color);
  };

  const handleSizeChange = (size) => {
    setSelectedSize(size);
  };

  const increaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decreaseQuantity = () => {
    setQuantity(prev => prev > 1 ? prev - 1 : 1);
  };

  const getColorClass = (color) => {
    const colorClasses = {
      purple: 'bg-purple-500',
      black: 'bg-black',
      gold: 'bg-yellow-600'
    };
    return colorClasses[color] || 'bg-gray-500';
  };

  if (selectedProduct) {
    const relatedProducts = getRelatedProducts(selectedProduct.id);
    
    return (
      <div className="min-h-screen bg-white">
        {/* Breadcrumb */}
        <div className="bg-gray-50 py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex items-center space-x-2 text-sm text-gray-600">
              <button onClick={() => {
                setSelectedProduct(null);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }} className="hover:text-gray-900">Home</button>
              <ChevronRight className="w-4 h-4" />
              <button onClick={() => {
                setSelectedProduct(null);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }} className="hover:text-gray-900">Shop</button>
              <ChevronRight className="w-4 h-4" />
              <span className="text-gray-900">{selectedProduct.name}</span>
            </nav>
          </div>
        </div>

        {/* Product Detail */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <div className="space-y-4">
                <div className="flex gap-4">
                {/* Thumbnails */}
                <div className="flex flex-col space-y-2">
                  {(selectedProduct.images && selectedProduct.images.length ? selectedProduct.images : [selectedProduct.image]).map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                        className={`w-14 h-14 sm:w-16 sm:h-16 border-2 rounded overflow-hidden ${selectedImageIndex === index ? 'border-yellow-600' : 'border-gray-200'}`}
                    >
                      <img src={img} alt={`${selectedProduct.name} ${index + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
                
                {/* Main Image */}
                <div className="flex-1 bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src={(selectedProduct.images && selectedProduct.images.length ? selectedProduct.images[selectedImageIndex] : selectedProduct.image)}
                    alt={selectedProduct.name}
                      className="w-full h-64 sm:h-80 md:h-96 object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{selectedProduct.name}</h1>
                <div className="text-2xl font-semibold text-gray-900 mb-4">
                  {formatPrice(selectedProduct.price)}
                </div>
                
                {/* Rating */}
                <div className="flex items-center space-x-2 mb-4">
                  <div className="flex">{renderStars(selectedProduct.rating)}</div>
                  <span className="text-sm text-gray-600">|</span>
                  <span className="text-sm text-gray-600">{selectedProduct.reviews} Customer Reviews</span>
                </div>

                <p className="text-gray-600 mb-6">{selectedProduct.description}</p>
              </div>

              {/* Size Selection */}
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">Size</h3>
                {selectedProduct.sizes && (
                  <div className="flex space-x-2">
                    {selectedProduct.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => handleSizeChange(size)}
                        className={`px-3 py-2 text-sm font-medium rounded ${
                          selectedSize === size
                            ? 'bg-yellow-600 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Color Selection */}
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">Color</h3>
                {selectedProduct.colors && (
                  <div className="flex space-x-2">
                    {selectedProduct.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => handleColorChange(color)}
                        className={`w-8 h-8 rounded-full border-2 ${
                          selectedColor === color ? 'border-gray-900' : 'border-gray-300'
                        } ${getColorClass(color)}`}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Quantity and Add to Cart */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:space-x-4">
                <div className="flex items-center border border-gray-300 rounded">
                  <button onClick={decreaseQuantity} className="px-3 py-2 hover:bg-gray-100">
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 py-2 font-medium">{quantity}</span>
                  <button onClick={increaseQuantity} className="px-3 py-2 hover:bg-gray-100">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                
                <button 
                  onClick={() => addToCart(selectedProduct)}
                  className="w-full sm:flex-1 bg-white border-2 border-black text-black px-6 py-3 rounded hover:bg-black hover:text-white transition-colors"
                >
                  Add To Cart
                </button>
                
                <button className="w-full sm:w-auto border-2 border-black text-black px-6 py-3 rounded hover:bg-black hover:text-white transition-colors">
                  + Compare
                </button>
              </div>

              {/* Product Meta */}
              <div className="border-t pt-6 space-y-2 text-sm">
                <div className="flex">
                  <span className="w-20 text-gray-600">SKU</span>
                  <span className="text-gray-600">:</span>
                  <span className="ml-2 text-gray-900">{selectedProduct.sku}</span>
                </div>
                <div className="flex">
                  <span className="w-20 text-gray-600">Category</span>
                  <span className="text-gray-600">:</span>
                  <span className="ml-2 text-gray-900">{selectedProduct.category}</span>
                </div>
                <div className="flex">
                  <span className="w-20 text-gray-600">Tags</span>
                  <span className="text-gray-600">:</span>
                  <span className="ml-2 text-gray-900">{Array.isArray(selectedProduct.tags) ? selectedProduct.tags.join(', ') : 'N/A'}</span>
                </div>
                <div className="flex items-center">
                  <span className="w-20 text-gray-600">Share</span>
                  <span className="text-gray-600">:</span>
                  <div className="ml-2 flex space-x-2">
                    <button className="p-1 hover:text-blue-600"><Facebook className="w-4 h-4" /></button>
                    <button className="p-1 hover:text-blue-700"><Linkedin className="w-4 h-4" /></button>
                    <button className="p-1 hover:text-blue-400"><Twitter className="w-4 h-4" /></button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product Details Tabs */}
          <div className="mt-16">
            <div className="border-b border-gray-200">
              <nav className="flex justify-center space-x-8">
                <button
                  onClick={() => setActiveTab('description')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'description'
                      ? 'border-black text-black'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Description
                </button>
                <button
                  onClick={() => setActiveTab('additional')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'additional'
                      ? 'border-black text-black'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Additional Information
                </button>
                <button
                  onClick={() => setActiveTab('reviews')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'reviews'
                      ? 'border-black text-black'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Reviews [{selectedProduct.reviews}]
                </button>
              </nav>
            </div>

            <div className="py-8">
              {activeTab === 'description' && (
                <div className="max-w-4xl mx-auto">
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {selectedProduct.longDescription || selectedProduct.description}
                  </p>
                </div>
              )}
              
              {activeTab === 'additional' && (
                <div className="max-w-2xl mx-auto">
                  <div className="space-y-4">
                    <div className="flex border-b pb-2">
                      <span className="w-32 text-gray-600">Weight:</span>
                      <span className="text-gray-900">25kg</span>
                    </div>
                    <div className="flex border-b pb-2">
                      <span className="w-32 text-gray-600">Dimensions:</span>
                      <span className="text-gray-900">100 x 200 x 50 cm</span>
                    </div>
                    <div className="flex border-b pb-2">
                      <span className="w-32 text-gray-600">Materials:</span>
                      <span className="text-gray-900">Wood, Fabric</span>
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'reviews' && (
                <div className="max-w-4xl mx-auto">
                  <p className="text-gray-600">No reviews yet. Be the first to review this product!</p>
                </div>
              )}
            </div>
          </div>

          {/* Related Products */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((product) => (
                <div
                  key={product.id}
                  className="group relative bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                  onClick={() => handleProductClick(product)}
                >
                  <div className="relative">
                    <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                    {product.discount && (
                      <span className="absolute top-4 right-4 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                        -{product.discount}%
                      </span>
                    )}
                    {product.isNew && (
                      <span className="absolute top-4 right-4 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                        New
                      </span>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg text-gray-900">{product.name}</h3>
                    <p className="text-gray-500 text-sm mb-2">{product.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold text-gray-900">{formatPrice(product.price)}</span>
                        {product.originalPrice && (
                          <span className="text-gray-500 line-through text-sm">{formatPrice(product.originalPrice)}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-8">
              <button className="border-2 border-yellow-600 text-yellow-600 px-8 py-3 rounded hover:bg-yellow-600 hover:text-white transition-colors">
                Show More
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] lg:min-h-screen bg-white overflow-hidden pt-14 sm:pt-16">
        {/* Background Image */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img 
            src="/images/Mask Group.jpg" 
            alt="Hero Background" 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black bg-opacity-20 z-0 pointer-events-none"></div>

        {/* Content Overlay */}
        <div className="relative z-10 min-h-[70vh] lg:h-screen flex items-center py-8 sm:py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              
              {/* Left Side - Empty for image focus */}
              <div className="hidden lg:block relative h-[700px]">
                {/* This space is intentionally left empty to let the background image show through */}
              </div>

              {/* Right Side - Promotional Banner */}
              <div className="relative z-30">
                <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-12 shadow-2xl border border-amber-100 max-w-md sm:max-w-lg lg:max-w-xl mx-auto">
                  <div className="space-y-6">
                    <div className="text-xs sm:text-sm font-semibold text-gray-700 tracking-wider uppercase">
                  New Arrival
                </div>
                    
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-amber-800 leading-tight">
                      <span className="block">Discover Our</span>
                      <span className="block">New Collection</span>
                </h1>
                    
                    <p className="text-gray-600 text-sm sm:text-base lg:text-lg leading-relaxed max-w-md">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis.
                </p>
                    
                    <div className="pt-4">
                    <button 
  onClick={() => window.location.href = '/shop'}
  className="bg-amber-700 hover:bg-amber-800 text-white font-bold py-3 px-6 sm:py-4 sm:px-8 rounded-lg text-base sm:text-lg transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
>
  BUY NOW
                  </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Browse The Range */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Browse The Range</h2>
            <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-lg bg-gray-200 h-80">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="mt-4 text-xl font-semibold text-gray-900 text-center">{category.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Products */}
      <section className="py-16 bg-[#fcf8f3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Our Products</h2>
          </div>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
            <div className="flex gap-2 flex-wrap items-center">
              <span className="text-gray-800 mr-1">Category:</span>
              {['All','Chairs','Sofas','Tables','Bedroom','Accessories','Lighting'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 rounded-full border ${selectedCategory===cat ? 'bg-yellow-600 text-white border-yellow-600' : 'bg-white text-gray-800 border-gray-300 hover:bg-gray-100'}`}
                >{cat}</button>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full md:w-auto">
              <span className="text-gray-800 mr-1">Sort by</span>
              <select value={sortBy} onChange={(e)=>setSortBy(e.target.value)} className="p-2 border rounded-md w-full sm:w-auto">
                <option value="brand">Brand</option>
                <option value="price">Price</option>
                <option value="name">Name</option>
              </select>
              <select value={sortOrder} onChange={(e)=>setSortOrder(e.target.value)} className="p-2 border rounded-md w-full sm:w-auto">
                <option value="asc">Asc</option>
                <option value="desc">Desc</option>
              </select>
              <input value={brandFilter} onChange={(e)=>setBrandFilter(e.target.value)} placeholder="Filter brand" className="p-2 border rounded-md w-full sm:w-48" />
              <input value={minPrice} onChange={(e)=>setMinPrice(e.target.value)} placeholder="Min price" className="p-2 border rounded-md w-full sm:w-28" />
              <input value={maxPrice} onChange={(e)=>setMaxPrice(e.target.value)} placeholder="Max price" className="p-2 border rounded-md w-full sm:w-28" />
              <button onClick={() => { setEditingProduct(null); setIsFormOpen(true); }} className="bg-yellow-600 text-white font-semibold px-4 py-2 rounded hover:bg-yellow-700 w-full sm:w-auto">Add Product</button>
            </div>
          </div>

          <div className="flex gap-2 flex-wrap items-center mb-6">
            <span className="text-gray-800 mr-1">Material:</span>
            {['All','Fabric','Wood','Plastic','Leather','MDF','Ceramic','Clay','Metal'].map(mat => (
              <button
                key={mat}
                onClick={() => setSelectedMaterial(mat)}
                className={`px-3 py-1 rounded-full border ${selectedMaterial===mat ? 'bg-yellow-600 text-white border-yellow-600' : 'bg-white text-gray-800 border-gray-300 hover:bg-gray-100'}`}
              >{mat}</button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {(items.length ? items : products).map((product) => (
              <div
                key={product._id || product.id}
                className="group relative bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                onMouseEnter={() => setHoveredProduct(product._id || product.id)}
                onMouseLeave={() => setHoveredProduct(null)}
                onClick={() => handleProductClick(product)}
              >
                {/* Product Image */}
                <div className="relative">
                  <img
                    src={product.image || getRandomStatic()}
                    alt={product.name}
                    className="w-full h-48 sm:h-56 md:h-64 object-cover"
                  />

                  {/* Badges */}
                  <div className="absolute top-4 right-4">
                    {product.discount && (
                      <span className="inline-block bg-red-500 text-white text-xs px-2 py-1 rounded-full mb-2">
                        -{product.discount}%
                      </span>
                    )}
                    {product.isNew && (
                      <span className="inline-block bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                        New
                      </span>
                    )}
                  </div>

                  {/* Hover Actions */}
                  <div className={`absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-300 ${hoveredProduct === (product._id || product.id) ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="text-center">
                      <button 
                        onClick={(e) => { e.stopPropagation(); addToCart(product); }}
                        className="bg-white text-yellow-600 px-6 py-2 rounded mb-4 hover:bg-gray-100 transition-colors"
                      >
                        Add to cart
                      </button>
                      <div className="flex items-center justify-center space-x-6 text-white mb-4">
                        <span className="flex items-center space-x-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><path d="M15 3h6v6"/><path d="M10 14 21 3"/></svg>
                          <span className="text-sm">Share</span>
                        </span>
                        <span className="flex items-center space-x-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12h18"/><path d="M8 8l-4 4 4 4"/><path d="M16 16l4-4-4-4"/></svg>
                          <span className="text-sm">Compare</span>
                        </span>
                        <span className="flex items-center space-x-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z"/></svg>
                          <span className="text-sm">Like</span>
                        </span>
                      </div>
                      <div className="absolute top-3 right-3 flex space-x-3 text-white text-sm">
                        <button onClick={(e) => { e.stopPropagation(); setEditingProduct(product); setIsFormOpen(true); }} title="Edit" className="bg-black/50 rounded p-1 hover:text-yellow-300">✏️</button>
                        <button onClick={(e) => { e.stopPropagation(); setDeletingProduct(product); setIsDeleteOpen(true); }} title="Delete" className="bg-black/50 rounded p-1 hover:text-red-300">🗑️</button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-white">
                  <h3 className="font-semibold text-lg text-gray-900">{product.name}</h3>
                  <p className="text-gray-500 text-sm mb-2">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-gray-900">{formatPrice(Number(product.price || 0))}</span>
                      {product.originalPrice && (
                        <span className="text-gray-500 line-through text-sm">{formatPrice(product.originalPrice)}</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <button className="border-2 border-yellow-600 text-yellow-600 px-8 py-3 rounded hover:bg-yellow-600 hover:text-white transition-colors">
              Show More
            </button>
          </div>

          <ProductFormModal
            open={isFormOpen}
            initialData={editingProduct}
            onClose={() => { setIsFormOpen(false); setEditingProduct(null); }}
            onSubmit={async (form) => {
              try {
                if (editingProduct?._id) {
                  await updateProduct(editingProduct._id, form);
                } else {
                  await createProduct(form);
                }
                setIsFormOpen(false);
                setEditingProduct(null);
                await loadProducts();
              } catch (e) {
                alert('Failed to save product');
              }
            }}
          />

          <ConfirmDeleteModal
            open={isDeleteOpen}
            product={deletingProduct}
            onCancel={() => { setIsDeleteOpen(false); setDeletingProduct(null); }}
            onConfirm={async () => {
              try {
                if (deletingProduct?._id) {
                  await deleteProduct(deletingProduct._id);
                }
                setIsDeleteOpen(false);
                setDeletingProduct(null);
                await loadProducts();
              } catch (e) {
                alert('Failed to delete product');
              }
            }}
          />
        </div>
      </section>

      {/* Funiro Furniture section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
            <div className="mb-8 lg:mb-0">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                50+ Beautiful rooms inspiration
              </h2>
              <p className="text-gray-600 mb-6">
                Our designer already made a lot of beautiful prototipe rooms that inspire you
              </p>
              <button
  onClick={() => window.location.href = '/shop'}
  className="bg-yellow-600 text-white font-semibold px-8 py-3 rounded hover:bg-yellow-700 transition-colors"
>
                Explore More
              </button>
            </div>
            
            <div className="relative">
              <div className="relative overflow-hidden rounded-lg">
                <img
                  src={roomImages[currentSlide]}
                  alt="Room inspiration"
                  className="w-full h-auto object-cover rounded-lg"
                />
              </div>

              <button
                onClick={prevSlide}
                className="absolute top-1/2 left-4 -translate-y-1/2 bg-white bg-opacity-75 p-2 rounded-full shadow-lg hover:bg-opacity-100 transition-colors"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute top-1/2 right-4 -translate-y-1/2 bg-white bg-opacity-75 p-2 rounded-full shadow-lg hover:bg-opacity-100 transition-colors"
                aria-label="Next slide"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
          
          </div>
          <div className="w-full">
            <img 
              src="/images/Share.png" 
              alt="Share your setup" 
              className="w-full h-auto object-cover rounded-md" 
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default FurniroEcommerce;