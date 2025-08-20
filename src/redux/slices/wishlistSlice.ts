import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WishlistItem } from '../../types';

interface WishlistState {
  items: WishlistItem[];
}

const initialState: WishlistState = {
  items: [],
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist: (state, action: PayloadAction<string>) => {
      const productId = action.payload;
      const exists = state.items.find(item => item.productId === productId);
      
      if (!exists) {
        state.items.push({
          id: `wishlist-${Date.now()}`,
          productId,
          addedAt: new Date().toISOString(),
        });
      }
    },
    removeFromWishlist: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.productId !== action.payload);
    },
    clearWishlist: (state) => {
      state.items = [];
    },
  },
});

export const { addToWishlist, removeFromWishlist, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
