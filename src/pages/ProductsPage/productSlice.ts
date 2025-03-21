import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  liked?: boolean;
}

export interface ProductsState {
  products: Product[];
  currentPage: number;
  pageSize: number; 
}

const initialState: ProductsState = {
  products: [],
  currentPage: 1,
  pageSize: 10, 
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
    toggleLike: (state, action: PayloadAction<number>) => {
      const product = state.products.find((p) => p.id === action.payload);
      if (product) {
        product.liked = !product.liked;
      }
    },
    deleteProduct: (state, action: PayloadAction<number>) => {
      state.products = state.products.filter((p) => p.id !== action.payload);
    },
    addProduct: (state, action: PayloadAction<Product>) => {
      state.products.push(action.payload);
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload; 
    },
    setPageSize: (state, action: PayloadAction<number>) => {
      state.pageSize = action.payload; 
    },
    editProduct: (state, action: PayloadAction<Product>) => {
      const index = state.products.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) {
        state.products[index] = action.payload;
      }
    },
  },
});

export const { setProducts, toggleLike, deleteProduct, addProduct, setCurrentPage, setPageSize, editProduct, } =
  productSlice.actions;

export const productReducer = productSlice.reducer;