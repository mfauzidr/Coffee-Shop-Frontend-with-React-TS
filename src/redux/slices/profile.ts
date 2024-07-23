import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import { RootState } from "../store";

interface ProfileData {
  uuid?: string
  fullName?: string;
  email?: string;
  phone?: string;
  address?: string;
  image?: string; // Image field for profile photo
}

interface IProfileState {
  id: string;
  uuid: string;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  image: string;
  isLoading?: boolean;
  isRejected?: boolean;
  isFulfilled?: boolean;
  error?: string; // Add error field
}

const initialState: IProfileState = {
  id: '',
  uuid: '',
  fullName: '',
  email: '',
  phone: '',
  address: '',
  image: '',
  isLoading: false,
  isFulfilled: false,
  isRejected: false,
  error: '', // Initialize error field
};

export const updateProfileData = createAsyncThunk<IProfileState, ProfileData>(
  "profile/updateProfileData",
  async (formData, thunkAPI) => {
    try {
      const { uuid, ...data } = formData;
      const { auth: { token } } = thunkAPI.getState() as RootState;
      const url = `https://coffee-shop-backend-with-typescript.vercel.app/users/${uuid}`;
      const response: AxiosResponse<IProfileState> = await axios.patch(url, data, {
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

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateProfileData.pending, (state) => {
        state.isLoading = true;
        state.isFulfilled = false;
        state.isRejected = false;
        state.error = ''; // Clear previous errors
      })
      .addCase(updateProfileData.fulfilled, (state, { payload }) => {
        state.id = payload.id;
        state.uuid = payload.uuid;
        state.fullName = payload.fullName || state.fullName;
        state.email = payload.email || state.email;
        state.phone = payload.phone || state.phone;
        state.address = payload.address || state.address;
        state.image = payload.image || state.image;
        state.isLoading = false;
        state.isFulfilled = true;
        state.isRejected = false;
      })
      .addCase(updateProfileData.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isFulfilled = false;
        state.isRejected = true;
        state.error = payload as string; // Store the error message
      });
  },
});

export const profileAction = profileSlice.actions;
export type ProfileState = ReturnType<typeof profileSlice.reducer>;
export default profileSlice.reducer;
