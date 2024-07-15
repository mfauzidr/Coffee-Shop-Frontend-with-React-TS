import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import { RootState } from "../store";

interface ProfileData {
  fullName?: string;
  email?: string;
  phone?: string;
  address?: string;
  image?: string;
}

interface IProfileState {
  uuid: string;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  image: string;
  isLoading?: boolean;
  isRejected?: boolean;
  isFulfilled?: boolean;
  results?: ProfileData[];
}




// Async thunk untuk fetch data profil
export const profileThunk = createAsyncThunk<IProfileState, string>(
  "profile",
  async (uuid, thunkAPI) => {
    try {
      const { auth: { token } } = thunkAPI.getState() as RootState;
      const url = `https://coffee-shop-backend-with-typescript.vercel.app/users/${uuid}`;
      const response: AxiosResponse<IProfileState> = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw error;
      } else {
        throw new Error("An unknown error occurred");
      }
    }
  }
);

// Async thunk untuk update data profil
// export const updateProfileData = createAsyncThunk<
//   IProfileState,
//   UpdateProfileData & { uuid: string }
// >("profile/updateProfileData", async (formData) => {
//   const { uuid, ...data } = formData;
//   try {
//     const url = `https://coffee-shop-backend-with-typescript.vercel.app/user/${uuid}`;
//     const response: AxiosResponse<IProfileState> = await axios.patch(url, data);
//     return response.data;
//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       throw error;
//     } else {
//       throw new Error("An unknown error occurred");
//     }
//   }
// });

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    uuid: "", // Initially empty
    fullName: "",
    email: "",
    phone: "",
    address: "",
    isLoading: false,
    isRejected: false,
    isFulfilled: false,
  } as IProfileState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(profileThunk.pending, (state) => {
        state.isLoading = true;
        state.isFulfilled = false;
        state.isRejected = false;
      })
      .addCase(profileThunk.fulfilled, (state, { payload }) => {
        state.uuid = payload.uuid;
        state.fullName = payload.fullName;
        state.email = payload.email;
        state.phone = payload.phone;
        state.address = payload.address;
        state.isLoading = false;
        state.isFulfilled = true;
      })
      .addCase(profileThunk.rejected, (state) => {
        state.isLoading = false;
        state.isRejected = true;
      })
    // .addCase(updateProfileData.pending, (state) => {
    //   state.isLoading = true;
    //   state.isFulfilled = false;
    //   state.isRejected = false;
    // })
    // .addCase(updateProfileData.fulfilled, (state, { payload }) => {
    //   state.fullName = payload.fullName;
    //   state.email = payload.email;
    //   state.phone = payload.phone;
    //   state.address = payload.address;
    //   state.isLoading = false;
    //   state.isFulfilled = true;
    // })
    // .addCase(updateProfileData.rejected, (state) => {
    //   state.isLoading = false;
    //   state.isRejected = true;
    // });
  },
});

export type ProfileState = ReturnType<typeof profileSlice.reducer>;
export default profileSlice.reducer;
