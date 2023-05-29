import { createAsyncThunk } from "@reduxjs/toolkit";
import CategoryApi from '@components/common/Apis/Api'
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
}

export const loadingSlice = createSlice({
    name: "loading",
    initialState,
    reducers: {
        loadingOn: (state) => {
            state.loading = true;
        },
        loadingOff: (state) => {
            state.loading = false;
        },
    },
})

export const { loadingOn, loadingOff } = loadingSlice.actions

export const selectLoading = (state) => state.loading.loading;

export default loadingSlice.reducer
