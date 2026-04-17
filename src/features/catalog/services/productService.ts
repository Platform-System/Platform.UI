import { catalogApi } from '@/core/api/httpClient';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  // Add other fields based on your Backend Product entity
}

export const productService = {
  // Get all products
  getProducts: async (): Promise<Product[]> => {
    const response = await catalogApi.get('/products');
    return response.data;
  },
  
  // Get single product detail
  getProductById: async (id: string): Promise<Product> => {
    const response = await catalogApi.get(`/products/${id}`);
    return response.data;
  },

  // Example of a mutation (Create)
  createProduct: async (product: Partial<Product>): Promise<Product> => {
    const response = await catalogApi.post('/products', product);
    return response.data;
  }
};
