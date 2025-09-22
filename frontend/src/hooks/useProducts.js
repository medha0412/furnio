import { useState, useEffect } from 'react';
import { fetchProducts } from '../api/products';

const useProducts = (category, page, limit) => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchProducts({ category, page, limit });
        setProducts(data.products);
        setTotal(data.total);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [category, page, limit]);

  return { products, total, loading, error };
};

export default useProducts;
