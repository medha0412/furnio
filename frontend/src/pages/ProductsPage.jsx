import React, { useEffect, useMemo, useState } from 'react';
import ProductCard from '../components/ProductCard';
import Pagination from '../components/Pagination';
import Filters from '../components/Filters';
import ProductFormModal from '../components/ProductFormModal';
import ConfirmDeleteModal from '../components/ConfirmDeleteModal';
import { fetchProducts, createProduct, updateProduct, deleteProduct } from '../api/products';

const ProductsPage = () => {
  const [items, setItems] = useState([]);
  const [pagination, setPagination] = useState({ currentPage: 1, totalPages: 1, limit: 12, totalCount: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [filtersState, setFiltersState] = useState({ brand: '', category: '', minPrice: '', maxPrice: '' });
  const [sortBy, setSortBy] = useState('brand');
  const [sortOrder, setSortOrder] = useState('asc');

  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const load = async (page = 1) => {
    try {
      setLoading(true);
      setError('');
      const res = await fetchProducts({
        page,
        limit: pagination.limit,
        sortBy,
        sortOrder,
        ...filtersState,
      });
      setItems(res.products || []);
      setPagination(res.pagination || { currentPage: 1, totalPages: 1, limit: 12, totalCount: 0 });
    } catch (e) {
      setError('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortBy, sortOrder, filtersState]);

  const categories = useMemo(() => {
    const set = new Set(items.map((p) => p.category).filter(Boolean));
    return Array.from(set);
  }, [items]);

  const onAdd = () => { setEditing(null); setShowForm(true); };
  const onEdit = (product) => { setEditing(product); setShowForm(true); };
  const onDelete = (product) => { setConfirmDelete(product); };

  const handleFormSubmit = async (formData) => {
    try {
      if (editing) {
        await updateProduct(editing._id, formData);
      } else {
        await createProduct(formData);
      }
      setShowForm(false);
      setEditing(null);
      await load(pagination.currentPage);
    } catch (e) {
      console.error(e);
    }
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteProduct(confirmDelete._id);
      setConfirmDelete(null);
      await load(pagination.currentPage);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-4">
        <Filters
          categories={categories}
          selectedCategory={filtersState.category}
          onSelectCategory={(val) => setFiltersState((s) => ({ ...s, category: val || '' }))}
        />

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-2">
            <label className="text-sm">Sort by</label>
            <select className="border rounded px-2 py-1 w-full sm:w-auto" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="brand">Brand</option>
              <option value="price">Price</option>
              <option value="createdAt">Newest</option>
            </select>
            <select className="border rounded px-2 py-1 w-full sm:w-auto" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
              <option value="asc">Asc</option>
              <option value="desc">Desc</option>
            </select>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
            <input
              placeholder="Filter brand"
              className="border rounded px-2 py-1 w-full sm:w-48"
              value={filtersState.brand}
              onChange={(e) => setFiltersState((s) => ({ ...s, brand: e.target.value }))}
            />
            <input
              placeholder="Min price"
              type="number"
              className="border rounded px-2 py-1 w-full sm:w-28"
              value={filtersState.minPrice}
              onChange={(e) => setFiltersState((s) => ({ ...s, minPrice: e.target.value }))}
            />
            <input
              placeholder="Max price"
              type="number"
              className="border rounded px-2 py-1 w-full sm:w-28"
              value={filtersState.maxPrice}
              onChange={(e) => setFiltersState((s) => ({ ...s, maxPrice: e.target.value }))}
            />
          </div>

          <button onClick={onAdd} className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700 w-full sm:w-auto">Add Product</button>
        </div>
      </div>

      {error && <div className="text-red-600 mb-2">{error}</div>}

      {loading ? (
        <div className="py-16 text-center text-gray-600">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {items.map((product) => (
            <ProductCard key={product._id} product={product} onEdit={onEdit} onDelete={onDelete} />
          ))}
        </div>
      )}

      {pagination.totalPages > 1 && (
        <Pagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          onPageChange={(p) => load(p)}
        />
      )}

      <ProductFormModal
        open={showForm}
        initialData={editing}
        onClose={() => { setShowForm(false); setEditing(null); }}
        onSubmit={handleFormSubmit}
      />

      <ConfirmDeleteModal
        open={Boolean(confirmDelete)}
        product={confirmDelete}
        onCancel={() => setConfirmDelete(null)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default ProductsPage;
