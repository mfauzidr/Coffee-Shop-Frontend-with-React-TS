import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface AdminProduct {
  uuid: string;
  image: string;
  productName: string;
  description: string;
  price: number;
  rating: number;
  isFlashSale: boolean;
  ratingProduct?: number;
}

export interface AdminProductFilters {
  search?: string;
}

export interface AdminProductsState {
  products: AdminProduct[];
  isLoading: boolean;
  isRejected: boolean;
  error: string | null;
  pageInfo: {
    currentPage: number;
    pages: number;
  };
}

const initialState: AdminProductsState = {
  products: [],
  isLoading: false,
  isRejected: false,
  error: null,
  pageInfo: {
    currentPage: 1,
    pages: 1,
  },
};

export const fetchAdminProducts = createAsyncThunk(
  "products/fetchAdminProducts",
  async (params: {
    page?: string | number;
    filters: AdminProductFilters;
    currentPage: number;
  }) => {
    const { page, filters, currentPage } = params;
    const modifiedFilters = { filters };

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
          limit: 5,
        },
      }
    );
    return response.data;
  }
);

const adminProductSlice = createSlice({
  name: "adminProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAdminProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isRejected = false;
        state.products = action.payload.results;
        state.pageInfo = {
          currentPage: action.payload.meta.currentPage,
          pages: action.payload.meta.totalPage,
        };
      })
      .addCase(fetchAdminProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isRejected = true;
        state.error =
          action.error.message || "An error occurred while fetching products.";
      });
  },
});

export default adminProductSlice.reducer;
