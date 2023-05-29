import { createAsyncThunk } from "@reduxjs/toolkit";
import { BackendApi } from '@components/common/Apis/Api';
import { createSlice } from "@reduxjs/toolkit";

export const ShareName = "shareName";

export const initShare = createAsyncThunk(`${ShareName}/init`, async ({ }, { rejectWithValue, dispatch }) => {
  console.log("[call time] : Share#init");
  const response = await BackendApi.get("/shareds");
  const shareData = await response.data;
  console.log(shareData);

  return shareData.data;
})

const initialState = {
  loading: false,
  data: [],
}

export const shareSlice = createSlice({
  name: ShareName,
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(initShare.pending, (state) => {
        state.loading = true;
      })
      .addCase(initShare.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.data = payload
      })
      .addCase(initShare.rejected, (state, {payload}) => {
        state.loading = false;
        state.data = [];
      })
  }
})

export const selectShareData = (state) => state.share.data;
export const selectShareLoading = (state) => state.share.loading;

export default shareSlice.reducer
