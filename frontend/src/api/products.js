import axiosInstance from './axios';

export const fetchProducts = async (params) => {
  try {
    const response = await axiosInstance.get('/products', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const createProduct = async (payload) => {
  try {
    const response = await axiosInstance.post('/products', payload);
    return response.data;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

export const updateProduct = async (id, payload) => {
  try {
    const response = await axiosInstance.put(`/products/${id}`, payload);
    return response.data;
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
};

export const deleteProduct = async (id) => {
  try {
    const response = await axiosInstance.delete(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};

export const seedProducts = async () => {
  try {
    const response = await axiosInstance.post('/products/seed');
    return response.data;
  } catch (error) {
    console.error('Error seeding products:', error);
    throw error;
  }
};