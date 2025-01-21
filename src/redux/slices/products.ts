import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface Product {
  uuid: string;
  image: string;
  productName: string;
  description: string;
  price: number;
  rating: number;
  isFlashSale: boolean;
  ratingProduct?: number;
}

export interface ProductFilters {
  search?: string;
  category?: string;
  sortBy?: string;
  priceRange?: [number, number];
}

export interface ProductsState {
  products: Product[];
  highlightedProducts: Product[];
  isLoading: boolean;
  isRejected: boolean;
  error: string | null;
  pageInfo: {
    currentPage: number;
    pages: number;
  };
}

const initialState: ProductsState = {
  products: [],
  highlightedProducts: [],
  isLoading: false,
  isRejected: false,
  error: null,
  pageInfo: {
    currentPage: 1,
    pages: 1,
  },
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (params: {
    page?: string | number;
    filters: ProductFilters;
    currentPage: number;
  }) => {
    const { page, filters, currentPage } = params;
    const modifiedFilters = { ...filters };

    if (Array.isArray(filters.category)) {
      modifiedFilters.category = filters.category.join(",");
    }

    const newPage =
      page === "next"
        ? currentPage + 1
        : page === "previous"
        ? currentPage - 1
        : page;

    const response = await axios.get(
      `${import.meta.env.VITE_REACT_APP_API_URL}/products`,
      {
        params: {
          ...modifiedFilters,
          page: newPage,
          limit: 6,
        },
      }
    );
    return response.data;
  }
);

export const fetchHighlightedProducts = createAsyncThunk(
  "products/fetchHighlightedProducts",
  async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_REACT_APP_API_URL}/products`,
      {
        params: { limit: 4 },
      }
    );
    console.log(response);
    return response.data.results;
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isRejected = false;
        state.products = action.payload.results;
        state.pageInfo = {
          currentPage: action.payload.meta.currentPage,
          pages: action.payload.meta.totalPage,
        };
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isRejected = true;
        state.error =
          action.error.message || "An error occurred while fetching products.";
      })
      .addCase(fetchHighlightedProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchHighlightedProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.highlightedProducts = action.payload;
      })
      .addCase(fetchHighlightedProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isRejected = true;
        state.error =
          action.error.message ||
          "An error occurred while fetching highlighted products.";
      });
  },
});

export default productSlice.reducer;
