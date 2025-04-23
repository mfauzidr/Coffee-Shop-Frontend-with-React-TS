import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import { RootState } from "../store";

interface ProfileData {
  uuid?: string;
  fullName?: string;
  email?: string;
  phone?: string;
  address?: string;
  image?: string;
}

interface IProfileState {
  profile: ProfileData;
  isLoading: boolean;
  isRejected: boolean;
  isFulfilled: boolean;
  error: string | null;
}

const initialState: IProfileState = {
  profile: {},
  isLoading: false,
  isFulfilled: false,
  isRejected: false,
  error: null,
};

export const fetchProfile = createAsyncThunk<
  ProfileData,
  { uuid: string },
  { rejectValue: { error: Error; status?: number } }
>("profile/fetchProfile", async ({ uuid }, { rejectWithValue, getState }) => {
  const {
    auth: { token },
  } = getState() as RootState;

  try {
    const url = `${import.meta.env.VITE_REACT_APP_API_URL}/users/${uuid}`;
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: { uuid },
    });
    console.log(response.data.results[0]);
    return response.data.results[0];
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

export const updateProfileData = createAsyncThunk<
  IProfileState,
  { uuid: string; formData: FormData }
>("profile/updateProfileData", async ({ uuid, formData }, thunkAPI) => {
  try {
    const {
      auth: { token },
    } = thunkAPI.getState() as RootState;
    const url = `${import.meta.env.VITE_REACT_APP_API_URL}/users/${uuid}`;
    const response: AxiosResponse<IProfileState> = await axios.patch(
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

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.isLoading = true;
        state.isFulfilled = false;
        state.isRejected = false;
        state.error = "";
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
        state.isLoading = false;
        state.isFulfilled = true;
        state.isRejected = false;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isFulfilled = false;
        state.isRejected = true;
        state.error = action.payload?.error.message || "Failed to fetch carts.";
      })
      .addCase(updateProfileData.pending, (state) => {
        state.isLoading = true;
        state.isFulfilled = false;
        state.isRejected = false;
        state.error = "";
      })
      .addCase(updateProfileData.fulfilled, (state, { payload }) => {
        state.profile = {
          ...state.profile,
          ...payload,
        };
        state.isLoading = false;
        state.isFulfilled = true;
        state.isRejected = false;
      })
      .addCase(updateProfileData.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isFulfilled = false;
        state.isRejected = true;
        state.error = payload as string;
      });
  },
});

export const profileAction = profileSlice.actions;
export type ProfileState = ReturnType<typeof profileSlice.reducer>;
export default profileSlice.reducer;
