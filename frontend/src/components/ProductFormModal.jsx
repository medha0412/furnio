import React, { useEffect, useState } from 'react';

const ProductFormModal = ({ open, initialData, onClose, onSubmit }) => {
  const [form, setForm] = useState({ name: '', brand: '', category: '', material: '', price: '', description: '' });
  const isEdit = Boolean(initialData && initialData._id);

  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.name || '',
        brand: initialData.brand || '',
        category: initialData.category || '',
        material: initialData.material || '',
        price: initialData.price != null ? String(initialData.price) : '',
        description: initialData.description || ''
      });
    } else {
      setForm({ name: '', brand: '', category: '', material: '', price: '', description: '' });
    }
  }, [initialData]);

  if (!open) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...form, price: parseFloat(form.price) });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-2 sm:p-4">
      <div className="bg-white w-full max-w-lg rounded-xl shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 sticky top-0 bg-white">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800">{isEdit ? 'Update Product' : 'Add Product'}</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 transition-colors p-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 grid grid-cols-1 gap-4 sm:gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
            <input name="name" value={form.name} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-3 sm:px-4 py-2 text-sm sm:text-base focus:ring-yellow-500 focus:border-yellow-500 transition-colors" required />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Brand</label>
              <input name="brand" value={form.brand} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-3 sm:px-4 py-2 text-sm sm:text-base focus:ring-yellow-500 focus:border-yellow-500 transition-colors" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <input name="category" value={form.category} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-3 sm:px-4 py-2 text-sm sm:text-base focus:ring-yellow-500 focus:border-yellow-500 transition-colors" required />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Material</label>
            <input name="material" value={form.material} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-3 sm:px-4 py-2 text-sm sm:text-base focus:ring-yellow-500 focus:border-yellow-500 transition-colors" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
            <input name="price" type="number" step="0.01" value={form.price} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-3 sm:px-4 py-2 text-sm sm:text-base focus:ring-yellow-500 focus:border-yellow-500 transition-colors" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea name="description" rows="3" value={form.description} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-3 sm:px-4 py-2 text-sm sm:text-base focus:ring-yellow-500 focus:border-yellow-500 transition-colors" />
          </div>
          <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-4 pt-4">
            <button type="button" onClick={onClose} className="w-full sm:w-auto border border-gray-300 text-gray-700 px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg hover:bg-gray-100 transition-colors text-sm sm:text-base">Cancel</button>
            <button type="submit" className="w-full sm:w-auto bg-yellow-600 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg hover:bg-yellow-700 transition-colors text-sm sm:text-base">
              {isEdit ? 'Update' : 'Add'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductFormModal;
