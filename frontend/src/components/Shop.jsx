import React, { useEffect, useMemo, useState } from 'react';
import BackButton from './BackButton';
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

// Backend-driven products state

const App = () => {
  const { addToCart } = useCart();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [mainImage, setMainImage] = useState(null);
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
      const params = { page: 1, limit: 16, sortBy, sortOrder };
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
        return;
      }
      // Attach a static image if none
      const withImages = docs.map((p) => ({ ...p, image: p.image || getRandomStatic() }));
      setItems(withImages);
    } catch (e) {
      setError('Failed to load products');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, [selectedCategory, selectedMaterial, brandFilter, minPrice, maxPrice, sortBy, sortOrder]);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setMainImage(product.images ? product.images[0] : product.image);
    // Scroll to top when product is selected
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleQuantityChange = (delta) => {
    setQuantity(prev => Math.max(1, prev + delta));
  };

  const renderProductCard = (product) => (
    <div
      key={product._id || product.id}
      className="bg-gray-100 rounded-lg overflow-hidden relative cursor-pointer group"
      onClick={() => handleProductClick(product)}
    >
      <div className="relative">
        <img
          src={product.image || getRandomStatic()}
          alt={product.name}
          className="w-full h-48 sm:h-56 md:h-64 object-cover"
        />
        {product.discount && (
          <div className="absolute top-4 right-4 bg-red-500 text-white text-sm font-bold rounded-full p-2">
            -{product.discount}%
          </div>
        )}
        {product.new && (
          <div className="absolute top-4 right-4 bg-green-500 text-white text-sm font-bold rounded-full p-2">
            New
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-bold text-xl">{product.name}</h3>
        <p className="text-gray-500">{product.description}</p>
        <div className="flex items-center mt-2 space-x-2">
          <span className="font-bold text-lg">Rp {Number(product.price || 0).toLocaleString()}</span>
        </div>
      </div>
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center space-y-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button 
          onClick={(e) => { e.stopPropagation(); addToCart(product); }}
          className="bg-white text-yellow-600 font-semibold py-2 px-6 rounded-md"
        >
          Add to cart
        </button>
        <div className="flex items-center justify-center space-x-6 text-white">
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
  );

  return (
    <div className="font-sans min-h-screen">
      <BackButton />
      {/* Hero Section */}
      {!selectedProduct && (
        <>
          <div className="relative h-[220px] sm:h-[260px] md:h-[300px] flex items-center justify-center text-center bg-cover bg-center" style={{ backgroundImage: "url('/images/Group 78.png')" }}>
            <div className="absolute inset-0 bg-black opacity-30" />
            <div className="relative z-10 text-white">
              <div className="flex justify-center mb-4">
                
              </div>
            </div>
          </div>

          {/* Filter/Sort Section */}
           <div className="bg-[#f9f1e7] py-6">
             <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
              {/* Left side */}
               <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 4h20M2 12h20M2 20h20"/><path d="M6 10v4M12 8v8M18 6v12"/></svg>
                  <span className="text-gray-800">Filter</span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12H3"/><path d="m15 18 6-6-6-6"/></svg>
                  <span className="text-gray-800">Grid</span>
                </div>
                <div className="text-gray-600">{isLoading ? 'Loading…' : `Showing ${items.length} results`}</div>
              </div>
              {/* Right side */}
               <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:space-x-4 mt-4 md:mt-0 w-full md:w-auto">
                <button onClick={() => { setEditingProduct(null); setIsFormOpen(true); }} className="bg-yellow-600 text-white font-semibold px-4 py-2 rounded hover:bg-yellow-700 w-full sm:w-auto">Add Product</button>
                <div className="flex items-center sm:space-x-2">
                  <span className="text-gray-800 mr-1">Sort by</span>
                  <select value={sortBy} onChange={(e)=>setSortBy(e.target.value)} className="p-2 border rounded-md w-full sm:w-auto">
                    <option value="brand">Brand</option>
                    <option value="price">Price</option>
                    <option value="name">Name</option>
                  </select>
                </div>
                <select value={sortOrder} onChange={(e)=>setSortOrder(e.target.value)} className="p-2 border rounded-md w-full sm:w-auto">
                  <option value="asc">Asc</option>
                  <option value="desc">Desc</option>
                </select>
                <input value={brandFilter} onChange={(e)=>setBrandFilter(e.target.value)} placeholder="Filter brand" className="p-2 border rounded-md w-full sm:w-48" />
                <input value={minPrice} onChange={(e)=>setMinPrice(e.target.value)} placeholder="Min price" className="p-2 border rounded-md w-full sm:w-28" />
                <input value={maxPrice} onChange={(e)=>setMaxPrice(e.target.value)} placeholder="Max price" className="p-2 border rounded-md w-full sm:w-28" />
              </div>
            </div>
            <div className="container mx-auto px-4 mt-4 space-y-3">
              <div className="flex flex-wrap gap-2 items-center">
                <span className="text-gray-800 mr-1">Category:</span>
                {['All','Chairs','Sofas','Tables','Bedroom','Accessories','Lighting'].map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1 rounded-full border ${selectedCategory===cat ? 'bg-yellow-600 text-white border-yellow-600' : 'bg-white text-gray-800 border-gray-300 hover:bg-gray-100'}`}
                  >{cat}</button>
                ))}
              </div>
              <div className="flex flex-wrap gap-2 items-center">
                <span className="text-gray-800 mr-1">Material:</span>
                {['All','Fabric','Wood','Plastic','Leather','MDF','Ceramic','Clay','Metal'].map(mat => (
                  <button
                    key={mat}
                    onClick={() => setSelectedMaterial(mat)}
                    className={`px-3 py-1 rounded-full border ${selectedMaterial===mat ? 'bg-yellow-600 text-white border-yellow-600' : 'bg-white text-gray-800 border-gray-300 hover:bg-gray-100'}`}
                  >{mat}</button>
                ))}
                <input value={brandFilter} onChange={(e)=>setBrandFilter(e.target.value)} placeholder="Brand" className="p-2 border rounded-md w-full sm:w-60 sm:ml-2" />
                <input value={minPrice} onChange={(e)=>setMinPrice(e.target.value)} placeholder="Min" className="p-2 border rounded-md w-full sm:w-24" />
                <input value={maxPrice} onChange={(e)=>setMaxPrice(e.target.value)} placeholder="Max" className="p-2 border rounded-md w-full sm:w-24" />
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="container mx-auto py-12 px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {items.map(product => renderProductCard(product))}
            </div>
            {error && <div className="text-red-600 mt-4">{error}</div>}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center space-x-4 my-8">
            <button className="bg-yellow-600 text-white font-bold rounded-md px-4 py-2">1</button>
            <button className="bg-gray-200 text-gray-800 font-bold rounded-md px-4 py-2">2</button>
            <button className="bg-gray-200 text-gray-800 font-bold rounded-md px-4 py-2">3</button>
            <button className="bg-gray-200 text-gray-800 font-bold rounded-md px-4 py-2">Next</button>
          </div>

          {/* Benefits Section */}
          <div className="bg-[#fcf8f3] py-16 px-4 mt-16 rounded-lg">
            <div className="container mx-auto text-center">
              <img 
                src="/images/Feature.png" 
                alt="Features" 
                className="w-full h-auto max-w-4xl mx-auto"
              />
            </div>
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
                  const payload = { ...form, image: getRandomStatic() };
                  await createProduct(payload);
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
        </>
      )}

      {/* Product Detail View */}
      {selectedProduct && (
        <div className="container mx-auto py-16 px-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
            <span onClick={() => {
              setSelectedProduct(null);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }} className="cursor-pointer hover:text-yellow-600">Home</span>
            <span>{'>'}</span>
            <span onClick={() => {
              setSelectedProduct(null);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }} className="cursor-pointer hover:text-yellow-600">Shop</span>
            <span>{'>'}</span>
            <span className="font-semibold text-gray-900">{selectedProduct.name}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            {/* Product Images */}
            <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
              <div className="flex lg:flex-col space-x-4 lg:space-x-0 lg:space-y-4">
                {selectedProduct.images ? selectedProduct.images.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={selectedProduct.name}
                    className="w-24 h-24 object-cover rounded-md border-2 border-transparent hover:border-yellow-600 transition-colors duration-200 cursor-pointer"
                    onClick={() => setMainImage(img)}
                  />
                )) : (
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    className="w-24 h-24 object-cover rounded-md border-2 border-transparent hover:border-yellow-600 transition-colors duration-200 cursor-pointer"
                    onClick={() => setMainImage(selectedProduct.image)}
                  />
                )}
              </div>
              <div className="flex-grow">
                <img
                  src={mainImage}
                  alt={selectedProduct.name}
                  className="w-full h-auto object-cover rounded-md"
                />
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              <h1 className="text-5xl font-bold">{selectedProduct.name}</h1>
              <span className="text-3xl text-gray-600">Rp {selectedProduct.price.toLocaleString()}</span>
              <div className="flex items-center space-x-2">
                <div className="text-yellow-500 flex">
                  {[...Array(selectedProduct.rating)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 fill-current" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                  ))}
                </div>
                <span className="text-gray-500 text-sm">| 5 Customer Review</span>
              </div>
              <p className="text-gray-600 text-sm">{selectedProduct.description}</p>

              {/* Size */}
              <div className="flex items-center space-x-4">
                <span className="text-gray-900">Size</span>
                <div className="flex space-x-4">
                  {selectedProduct.sizes && selectedProduct.sizes.map(size => (
                    <span key={size} className="bg-yellow-600 text-white rounded-md w-8 h-8 flex items-center justify-center text-sm cursor-pointer hover:bg-yellow-700 transition-colors duration-200">
                      {size}
                    </span>
                  ))}
                </div>
              </div>

              {/* Color */}
              <div className="flex items-center space-x-4">
                <span className="text-gray-900">Color</span>
                <div className="flex space-x-4">
                  {selectedProduct.colors && selectedProduct.colors.map(color => (
                    <div key={color} className={`w-6 h-6 rounded-full cursor-pointer border border-transparent hover:border-gray-500 transition-colors duration-200 ${color}`}></div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:space-x-4">
                <div className="flex items-center border border-gray-400 rounded-md">
                  <button onClick={() => handleQuantityChange(-1)} className="p-2 w-10 text-center">-</button>
                  <span className="p-2 w-10 text-center border-l border-r border-gray-400">{quantity}</span>
                  <button onClick={() => handleQuantityChange(1)} className="p-2 w-10 text-center">+</button>
                </div>
                <button 
                  onClick={() => addToCart(selectedProduct)}
                  className="w-full sm:w-auto border border-gray-900 text-gray-900 font-semibold py-3 px-8 rounded-md hover:bg-gray-100 transition-colors duration-200"
                >
                  Add To Cart
                </button>
                <button className="w-full sm:w-auto border border-gray-900 text-gray-900 font-semibold py-3 px-8 rounded-md hover:bg-gray-100 transition-colors duration-200">
                  + Compare
                </button>
              </div>

              {/* Meta info */}
              <hr className="my-6" />
              <div className="space-y-2 text-gray-600 text-sm">
                <p><strong>SKU:</strong> SS001</p>
                <p><strong>Category:</strong> {selectedProduct.category}</p>
                <p><strong>Tags:</strong> {selectedProduct.tags ? selectedProduct.tags.join(', ') : 'N/A'}</p>
                <p className="flex items-center space-x-2">
                  <strong>Share:</strong>
                  {/* Placeholder for social media icons */}
                  <span className="space-x-2 flex">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 11.4-13.4 10.7 2.4 1.2 5.4.6 7.4-.2 2.9-2.1 2.3-13-1-16.3C5.5 2.1 5.1 2.5 5.2 2.6c-4.4 2-6.5 7.3-5 10.9-2.5 2.2-1.3 5.4 1.2 6.7 5.8 5 15.2-2.1 12.2-9.6 4.3-3.6 5.8-9.4 5.8-9.4z"/></svg>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="2"/><circle cx="12" cy="11" r="3"/><path d="M18 21a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-3a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h3z"/></svg>
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Tabs Section */}
          <div className="my-16 container mx-auto px-4">
            <div className="flex justify-center space-x-8 border-b-2 border-gray-200">
              <button
                className={`py-2 px-4 font-semibold ${activeTab === 'description' ? 'text-yellow-600 border-b-2 border-yellow-600' : 'text-gray-500'}`}
                onClick={() => setActiveTab('description')}
              >
                Description
              </button>
              <button
                className={`py-2 px-4 font-semibold ${activeTab === 'additional' ? 'text-yellow-600 border-b-2 border-yellow-600' : 'text-gray-500'}`}
                onClick={() => setActiveTab('additional')}
              >
                Additional Information
              </button>
              <button
                className={`py-2 px-4 font-semibold ${activeTab === 'reviews' ? 'text-yellow-600 border-b-2 border-yellow-600' : 'text-gray-500'}`}
                onClick={() => setActiveTab('reviews')}
              >
                Reviews [5]
              </button>
            </div>
            <div className="pt-8 text-gray-600 text-sm leading-relaxed">
              {activeTab === 'description' && (
                <>
                  <p className="mb-4">{selectedProduct.description}</p>
                  <p>{selectedProduct.additionalInfo || 'No additional information available.'}</p>
                </>
              )}
              {activeTab === 'additional' && (
                <p>This is placeholder content for additional information.</p>
              )}
              {activeTab === 'reviews' && (
                <p>This is placeholder content for reviews.</p>
              )}
            </div>
          </div>

          {/* Related Products Section */}
          <div className="container mx-auto py-16 px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {selectedProduct.related && selectedProduct.related.map(product => (
                <div key={product.id} className="bg-gray-100 rounded-lg overflow-hidden relative group">
                  <div className="relative">
                    <img src={product.image} alt={product.name} className="w-full h-48 sm:h-56 md:h-64 object-cover" />
                    {product.discount && (
                      <div className="absolute top-4 right-4 bg-red-500 text-white text-sm font-bold rounded-full p-2">
                        -{product.discount}%
                      </div>
                    )}
                    {product.new && (
                      <div className="absolute top-4 right-4 bg-green-500 text-white text-sm font-bold rounded-full p-2">
                        New
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-xl">{product.name}</h3>
                    <p className="text-gray-500">{product.description}</p>
                    <div className="flex items-center mt-2 space-x-2">
                      <span className="font-bold text-lg">Rp {product.price.toLocaleString()}</span>
                      {product.oldPrice && (
                        <span className="text-gray-400 line-through">Rp {product.oldPrice.toLocaleString()}</span>
                      )}
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center space-y-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button 
                      onClick={() => addToCart(product)}
                      className="bg-white text-yellow-600 font-semibold py-2 px-6 rounded-md"
                    >
                      Add to cart
                    </button>
                    <div className="flex space-x-4 text-white text-sm">
                      <span className="flex items-center space-x-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><path d="M15 3h6v6"/><path d="M10 14 21 3"/></svg>
                        <span>Share</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M8 15h8M8 19h5M8 11h8"/></svg>
                        <span>Compare</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
                        <span>Like</span>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button
              className="mt-8 border border-yellow-600 text-yellow-600 font-semibold py-3 px-8 rounded-md hover:bg-yellow-600 hover:text-white transition-colors duration-200"
              onClick={() => setSelectedProduct(null)}
            >
              Show More
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
