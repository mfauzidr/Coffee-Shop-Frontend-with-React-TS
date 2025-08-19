import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError, AxiosResponse } from "axios";
import { RootState } from "../store";

export interface Product {
  id: number;
  uuid: string;
  image: string;
  productName: string;
  description: string;
  price: number;
  categoryId?: number;
  sizeId?: number;
  rating?: number | undefined;
  isFlashSale?: boolean | null | undefined;
  isRecommended?: boolean | null | undefined;
  ratingProduct?: number;
}

export interface ProductFilters {
  search?: string;
  category?: string;
  sortBy?: string;
  priceRange?: [number, number];
  limit?: number;
}

export interface ProductsState {
  products: Product[];
  highlightedProducts: Product[];
  detailProduct: Product;
  dataCount: number;
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
  detailProduct: {
    id: 0,
    uuid: "",
    image: "",
    productName: "",
    price: 0,
    description: "",
  },
  dataCount: 0,
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
  async (
    params: {
      page?: string | number;
      limit?: number;
      filters: ProductFilters;
      currentPage: number;
    },
    { rejectWithValue }
  ) => {
    try {
      const { page, limit, filters, currentPage } = params;
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
            limit,
          },
        }
      );

      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      if (err.response?.status === 404) {
        return rejectWithValue("Product Not Found.");
      }

      return rejectWithValue("An error occurred while fetching products.");
    }
  }
);

export const fetchProductDetail = createAsyncThunk<
  Product,
  { uuid: string },
  { rejectValue: { error: unknown; status?: number } }
>("products/fetchProductDetail", async ({ uuid }, { rejectWithValue }) => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_REACT_APP_API_URL}/products/${uuid}`
    );

    if (res.data && res.data.results && res.data.results.length > 0) {
      return res.data.results[0] as Product;
    } else {
      return rejectWithValue({
        error: "Invalid response structure",
      });
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue({
        error: error.response?.data || "Unknown error",
        status: error.response?.status,
      });
    }
    throw error;
  }
});

export const createProduct = createAsyncThunk<
  ProductsState,
  { formData: FormData }
>("products/createProduct", async ({ formData }, thunkAPI) => {
  try {
    const {
      auth: { token },
    } = thunkAPI.getState() as RootState;
    const url = `${import.meta.env.VITE_REACT_APP_API_URL}/products`;
    const response: AxiosResponse<ProductsState> = await axios.post(
      url,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return thunkAPI.rejectWithValue(error.message);
    } else {
      return thunkAPI.rejectWithValue("An unknown error occurred");
    }
  }
});

export const updateProduct = createAsyncThunk<
  ProductsState,
  { uuid: string; formData: FormData }
>("products/updateProduct", async ({ uuid, formData }, thunkAPI) => {
  try {
    const {
      auth: { token },
    } = thunkAPI.getState() as RootState;
    const url = `${import.meta.env.VITE_REACT_APP_API_URL}/products/${uuid}`;
    const response: AxiosResponse<ProductsState> = await axios.patch(
      url,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return thunkAPI.rejectWithValue(error.message);
    } else {
      return thunkAPI.rejectWithValue("An unknown error occurred");
    }
  }
});
export const deleteProduct = createAsyncThunk<ProductsState, { uuid: string }>(
  "products/deleteProduct",
  async ({ uuid }, thunkAPI) => {
    try {
      const {
        auth: { token },
      } = thunkAPI.getState() as RootState;
      const url = `${import.meta.env.VITE_REACT_APP_API_URL}/products/${uuid}`;
      const response: AxiosResponse<ProductsState> = await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return thunkAPI.rejectWithValue(error.message);
      } else {
        return thunkAPI.rejectWithValue("An unknown error occurred");
      }
    }
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
        state.dataCount = action.payload.meta.totalData;
        state.pageInfo = {
          currentPage: action.payload.meta.currentPage,
          pages: action.payload.meta.totalPage,
        };
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isRejected = true;
        state.error =
          (action.payload as string) ||
          action.error.message ||
          "An error occurred while fetching products.";
      })
      .addCase(fetchProductDetail.pending, (state) => {
        state.isLoading = true;
        state.isRejected = false;
        state.error = "";
      })
      .addCase(fetchProductDetail.fulfilled, (state, action) => {
        state.detailProduct = action.payload;
        state.isLoading = false;
        state.isRejected = false;
      })
      .addCase(fetchProductDetail.rejected, (state, action) => {
        state.isLoading = false;
        state.isRejected = true;
        state.error =
          action.error.message || "An error occurred while fetching products.";
      })
      .addCase(fetchHighlightedProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProduct.pending, (state) => {
        state.isLoading = true;
        state.isRejected = false;
        state.error = "";
      })
      .addCase(deleteProduct.fulfilled, (state) => {
        state.isLoading = false;
        state.isRejected = false;
      })
      .addCase(deleteProduct.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isRejected = true;
        state.error = payload as string;
      })
      .addCase(deleteProduct.pending, (state) => {
        state.isLoading = true;
        state.isRejected = false;
        state.error = "";
      })
      .addCase(updateProduct.fulfilled, (state, { payload }) => {
        state.detailProduct = {
          ...state.detailProduct,
          ...payload,
        };
        state.isLoading = false;
        state.isRejected = false;
      })
      .addCase(updateProduct.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isRejected = true;
        state.error = payload as string;
      })
      .addCase(fetchHighlightedProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.highlightedProducts = action.payload;
      })
      .addCase(fetchHighlightedProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isRejected = true;
        state.error =
          (action.payload as string) ||
          action.error.message ||
          "An error occurred while fetching highlighted products.";
      })
      .addCase(createProduct.pending, (state) => {
        state.isLoading = true;
        state.isRejected = false;
        state.error = "";
      })
      .addCase(createProduct.fulfilled, (state, { payload }) => {
        state.products = {
          ...state.products,
          ...payload,
        };
        state.isLoading = false;
        state.isRejected = false;
      })
      .addCase(createProduct.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isRejected = true;
        state.error = payload as string;
      });
  },
});

export default productSlice.reducer;
