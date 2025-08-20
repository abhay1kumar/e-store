import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './slices/productsSlice.ts';
import cartReducer from './slices/cartSlice.ts';
import filtersReducer from './slices/filtersSlice.ts';
import themeReducer from './slices/themeSlice.ts';
import wishlistReducer from './slices/wishlistSlice.ts';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    filters: filtersReducer,
    theme: themeReducer,
    wishlist: wishlistReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
