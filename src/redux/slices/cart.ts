import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import { RootState } from "../store";

export interface Cart {
  id: number;
  uuid: string;
  productName: string;
  productId: string;
  image: string;
  quantity: number;
  size: string;
  sizeId: number;
  variant: string;
  variantId: number;
  subtotal: number;
}

interface ICartState {
  carts: Cart[];
  isLoading: boolean;
  isRejected: boolean;
  error: string | null;
}

const initialState: ICartState = {
  carts: [],
  isLoading: false,
  isRejected: false,
  error: null,
};

export const fetchCarts = createAsyncThunk<
  Cart[],
  { uuid: string },
  { rejectValue: { error: Error; status?: number } }
>("carts/fetchCarts", async ({ uuid }, { rejectWithValue, getState }) => {
  const {
    auth: { token },
  } = getState() as RootState;

  try {
    const url = `${import.meta.env.VITE_REACT_APP_API_URL}/cart`;
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: { uuid },
    });
    return response.data.results;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue({
        error: error.response?.data,
        status: error.response?.status,
      });
    }
    throw error;
  }
});

export const addToCart = createAsyncThunk<
  Cart[],
  {
    userId: string;
    productId: string;
    sizeId: number[];
    variantId: number[];
    qty: number[];
  },
  { rejectValue: { error: Error; status?: number } }
>(
  "carts/addToCart",
  async (
    { userId, productId, sizeId, variantId, qty },
    { rejectWithValue, getState }
  ) => {
    const {
      auth: { token },
    } = getState() as RootState;

    try {
      const url = `${import.meta.env.VITE_REACT_APP_API_URL}/cart/add`;
      const response = await axios.post(
        url,
        {
          userId,
          productId,
          sizeId,
          variantId,
          qty,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data.results;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue({
          error: error.response?.data,
          status: error.response?.status,
        });
      }
      throw error;
    }
  }
);

export const editCart = createAsyncThunk<
  Cart[],
  {
    updates: {
      id: number;
      productSizeId: number;
      productVariantId: number;
      quantity: number;
    }[];
  },
  { rejectValue: { error: Error; status?: number } }
>("carts/editCart", async ({ updates }, { rejectWithValue, getState }) => {
  const {
    auth: { token },
  } = getState() as RootState;

  try {
    const url = `${import.meta.env.VITE_REACT_APP_API_URL}/cart/edit`;
    const response = await axios.patch(
      url,
      { updates },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.results;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue({
        error: error.response?.data,
        status: error.response?.status,
      });
    }
    throw error;
  }
});

export const deleteCarts = createAsyncThunk<
  Cart[],
  { id: number },
  { rejectValue: { error: { message: string }; status?: number } }
>("carts/deleteCarts", async ({ id }, { rejectWithValue, getState }) => {
  const {
    auth: { token },
  } = getState() as RootState;

  try {
    const url = `${import.meta.env.VITE_REACT_APP_API_URL}/cart/delete/${id}`;
    const response: AxiosResponse<Cart[]> = await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue({
        error: {
          message:
            error.response?.data?.message || "Failed to delete cart item.",
        },
        status: error.response?.status,
      });
    }
    throw error;
  }
});

export const deleteAllCarts = createAsyncThunk<
  Cart[],
  { userId: string },
  { rejectValue: { error: { message: string }; status?: number } }
>("carts/deleteAllCarts", async ({ userId }, { rejectWithValue, getState }) => {
  const {
    auth: { token },
  } = getState() as RootState;

  try {
    const url = `${
      import.meta.env.VITE_REACT_APP_API_URL
    }/cart/deleteAll/${userId}`;
    const response: AxiosResponse<Cart[]> = await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue({
        error: {
          message:
            error.response?.data?.message || "Failed to delete cart item.",
        },
        status: error.response?.status,
      });
    }
    throw error;
  }
});

const cartSlice = createSlice({
  name: "carts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCarts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCarts.fulfilled, (state, action) => {
        state.carts = action.payload;
        state.isLoading = false;
        state.isRejected = false;
      })
      .addCase(fetchCarts.rejected, (state, action) => {
        state.isLoading = false;
        state.isRejected = true;
        state.error = action.payload?.error.message || "Failed to fetch carts.";
      })
      .addCase(addToCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.carts = action.payload;
        state.isLoading = false;
        state.isRejected = false;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isRejected = true;
        state.error = action.payload?.error.message || "Failed to add to cart.";
      })
      .addCase(editCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editCart.fulfilled, (state, action) => {
        state.carts = action.payload;
        state.isLoading = false;
        state.isRejected = false;
      })
      .addCase(editCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isRejected = true;
        state.error =
          action.payload?.error.message || "Failed to edit to cart.";
      })
      .addCase(deleteCarts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCarts.fulfilled, (state, action) => {
        state.carts = action.payload;
        state.isLoading = false;
        state.isRejected = false;
      })
      .addCase(deleteCarts.rejected, (state, action) => {
        state.isLoading = false;
        state.isRejected = true;
        state.error =
          action.payload?.error.message || "Failed to delete carts.";
      })
      .addCase(deleteAllCarts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAllCarts.fulfilled, (state, action) => {
        state.carts = action.payload;
        state.isLoading = false;
        state.isRejected = false;
      })
      .addCase(deleteAllCarts.rejected, (state, action) => {
        state.isLoading = false;
        state.isRejected = true;
        state.error =
          action.payload?.error.message || "Failed to delete carts.";
      });
  },
});

export const cartAction = cartSlice.actions;
export type CartState = ReturnType<typeof cartSlice.reducer>;
export default cartSlice.reducer;
