import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

export interface OrderList {
  id: number;
  uuid: string;
  orderNumber: string;
  image?: string;
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

export interface OrderFilter {
  userId?: string;
  orderNumber?: string;
  status?: string;
  startDate?: string;
  endDate?: string;
  sortBy?: string;
  page?: string | number;
  limit?: number;
  currentPage?: number;
}

interface IOrderListState {
  orders: OrderList[];
  pageInfo: {
    currentPage: number;
    pages: number;
  };
  dataCount?: number;
  isLoading: boolean;
  isRejected: boolean;
  error: {
    message?: string;
    status?: number;
  } | null;
}

const initialState: IOrderListState = {
  orders: [],
  pageInfo: {
    currentPage: 1,
    pages: 1,
  },
  isLoading: false,
  isRejected: false,
  error: null,
};

export const fetchOrders = createAsyncThunk(
  "orders/fetchOrders",
  async (
    params: {
      userId?: string;
      page?: string | number;
      limit?: number;
      currentPage: number;
      filters?: OrderFilter;
    },
    { rejectWithValue, getState }
  ) => {
    const {
      auth: { token },
    } = getState() as RootState;

    try {
      const { userId, page, limit, filters, currentPage } = params;

      const newPage =
        page === "next"
          ? currentPage + 1
          : page === "previous"
          ? currentPage - 1
          : page;

      const url = `${import.meta.env.VITE_REACT_APP_API_URL}/orders`;
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          ...filters,
          userId,
          page: newPage,
          limit,
        },
      });
      return response.data;
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
        state.orders = action.payload.results;
        state.pageInfo = {
          currentPage: action.payload.meta.currentPage,
          pages: action.payload.meta.totalPage,
        };
        state.dataCount = action.payload.meta.totalData;
        state.isLoading = false;
        state.isRejected = false;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.isRejected = true;
        state.error = {
          message:
            (action.payload as { error: { message: string }; status: number })
              ?.error?.message || "Failed to fetch orders",
          status: (
            action.payload as { error: { message: string }; status: number }
          )?.status,
        };
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
        state.error = {
          message:
            (action.payload as { error: { message: string }; status: number })
              ?.error?.message || "Failed to create orders",
          status: (
            action.payload as { error: { message: string }; status: number }
          )?.status,
        };
      });
  },
});

export const orderAction = orderSlice.actions;
export type OrderState = ReturnType<typeof orderSlice.reducer>;
export default orderSlice.reducer;
