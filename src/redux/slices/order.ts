import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

export interface OrderList {
  id: number;
  uuid: string;
  orderNumber: string;
  imageUrl?: string;
  userId: string;
  productId: string;
  sizeId: string;
  variantId: string;
  quantity: number;
  subtotal: number;
  createdAt: string;
  fullName: string;
  email: string;
  deliveryAddress?: string;
  deliveryMethod: string;
  status: string;
}

interface IOrderListState {
  orders: OrderList[];
  isLoading: boolean;
  isRejected: boolean;
  error: string | null;
}

const initialState: IOrderListState = {
  orders: [],
  isLoading: false,
  isRejected: false,
  error: null,
};

export const fetchOrders = createAsyncThunk<
  OrderList[],
  { userId: string },
  { rejectValue: { error: Error; status?: number } }
>("orders/fetchOrders", async ({ userId }, { rejectWithValue, getState }) => {
  const {
    auth: { token },
  } = getState() as RootState;

  try {
    const url = `${import.meta.env.VITE_REACT_APP_API_URL}/orders`;
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: { userId },
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

export const createOrder = createAsyncThunk<
  OrderList[],
  {
    userId: string;
    productId: string[];
    sizeId: number[];
    variantId: number[];
    qty: number[];
    fullName: string;
    email: string;
    deliveryAddress: string;
    deliveryMethod: string;
  },
  { rejectValue: { error: Error; status?: number } }
>(
  "orders/createOrder",
  async (
    {
      userId,
      productId,
      sizeId,
      variantId,
      qty,
      fullName,
      email,
      deliveryAddress,
      deliveryMethod,
    },
    { rejectWithValue, getState }
  ) => {
    const {
      auth: { token },
    } = getState() as RootState;

    try {
      const url = `${import.meta.env.VITE_REACT_APP_API_URL}/orders`;
      const response = await axios.post(
        url,
        {
          userId,
          productId,
          sizeId,
          variantId,
          qty,
          fullName,
          email,
          deliveryAddress,
          deliveryMethod,
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

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.isLoading = false;
        state.isRejected = false;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.isRejected = true;
        state.error = action.payload?.error.message || "Failed to fetch carts.";
      })
      .addCase(createOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.isLoading = false;
        state.isRejected = false;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.isRejected = true;
        state.error = action.payload?.error.message || "Failed to fetch carts.";
      });
  },
});

export const orderAction = orderSlice.actions;
export type OrderState = ReturnType<typeof orderSlice.reducer>;
export default orderSlice.reducer;
