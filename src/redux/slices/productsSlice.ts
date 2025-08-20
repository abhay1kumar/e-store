import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product, Category } from '../../types';
import productsData from '../../data/products.json';
import categoriesData from '../../data/categories.json';

interface ProductsState {
  products: Product[];
  categories: Category[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  products: productsData as unknown as Product[],
  categories: categoriesData as Category[],
  loading: false,
  error: null,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    updateProductStock: (state, action: PayloadAction<{ productId: string; quantity: number }>) => {
      const { productId, quantity } = action.payload;
      const product = state.products.find(p => p.id === productId);
      if (product && product.stock >= quantity) {
        product.stock -= quantity;
      }
    },
  },
});

export const { setLoading, setError, updateProductStock } = productsSlice.actions;
export default productsSlice.reducer;
