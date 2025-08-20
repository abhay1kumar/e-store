import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FilterState, ViewMode } from '../../types';

interface FiltersSliceState extends FilterState {
  sortBy: string;
  viewMode: ViewMode;
}

const initialState: FiltersSliceState = {
  category: [],
  priceRange: [0, 1000],
  rating: 0,
  inStock: false,
  brands: [],
  searchQuery: '',
  sortBy: 'featured',
  viewMode: 'grid',
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setCategory: (state, action: PayloadAction<string[]>) => {
      state.category = action.payload;
    },
    setPriceRange: (state, action: PayloadAction<[number, number]>) => {
      state.priceRange = action.payload;
    },
    setRating: (state, action: PayloadAction<number>) => {
      state.rating = action.payload;
    },
    setInStock: (state, action: PayloadAction<boolean>) => {
      state.inStock = action.payload;
    },
    setBrands: (state, action: PayloadAction<string[]>) => {
      state.brands = action.payload;
    },
    setSortBy: (state, action: PayloadAction<string>) => {
      state.sortBy = action.payload;
    },
    setViewMode: (state, action: PayloadAction<ViewMode>) => {
      state.viewMode = action.payload;
    },
    clearFilters: (state) => {
      state.category = [];
      state.priceRange = [0, 1000];
      state.rating = 0;
      state.inStock = false;
      state.brands = [];
      state.searchQuery = '';
    },
  },
});

export const {
  setSearchQuery,
  setCategory,
  setPriceRange,
  setRating,
  setInStock,
  setBrands,
  setSortBy,
  setViewMode,
  clearFilters,
} = filtersSlice.actions;

export default filtersSlice.reducer;
