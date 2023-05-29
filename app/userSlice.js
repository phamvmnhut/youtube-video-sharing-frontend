import { createAsyncThunk } from "@reduxjs/toolkit";
import { BackendApi } from '@components/common/Apis/Api';
import { createSlice } from "@reduxjs/toolkit";
import { deleteAccessTokenLocalStorage, deleteRefreshTokenLocalStorage, getRefreshTokenLocalStorage, saveAccessTokenLocalStorage, saveRefreshTokenLocalStorage } from "@utils/localStorage";
import { toast } from "react-toastify";

export const UserName = "userName";
export const UserStatus = {
  "NO_LOGIN": "no-login",
  "LOGGED": "logged",
}

export const initUser = createAsyncThunk(`${UserName}/init`, async ({ }, { rejectWithValue, dispatch }) => {
  console.log("[call time] : init");
})

export const registerUser = createAsyncThunk(`${UserName}/register`, async ({ name, email, password, password_confirmation }, { rejectWithValue }) => {
  try {
    console.log("[call time] : register");

    const bodyData = {
      users: {
        name,
        email,
        password,
        password_confirmation
      }
    };

    console.log(bodyData);

    await BackendApi.post("/registrations", bodyData);
  } catch (e) {
    return rejectWithValue(e.response.data);
  }
})

export const loginUser = createAsyncThunk(`${UserName}/login`, async ({ email, password }, { rejectWithValue }) => {
  console.log("[call time] : login");
  try {
    const loginForm = { email, password };
    const response = await BackendApi.post("/sessions", loginForm);
    const loginData = await response.data;

    console.log("loginData", loginData);

    saveAccessTokenLocalStorage(loginData.auth_token);

    // setInterval(()=> {
    //   dispatch(refreshTokenUserNft());
    // }, 50 * 60 * 1000); // 50 minutes

    return {
      status: UserStatus.LOGGED,
      id: loginData.data.id,
      name: loginData.data.name,
      email: loginData.data.email
    };
  } catch (err) {
    return rejectWithValue(e.response.data);
  }

})

const initialState = {
  loading: false,
  status: UserStatus.NO_LOGIN,
  id: null,
  name: null,
}

export const userSlice = createSlice({
  name: UserName,
  initialState,
  reducers: {
    logout: (state) => {
      state.status = UserStatus.NO_LOGIN;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(initUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.id = payload.id;
        state.name = payload.name;
        state.status = payload.status;
      })
      .addCase(initUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.name = payload?.name;
        state.status = payload?.status;
      })

    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.loading = false;
        toast.error(payload.error);
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        toast.info("Register Success")
      })

    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.id = payload.id;
        state.name = payload.name;
        state.status = payload.status;
        toast.info("Login Success")
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.loading = false;
        toast.error(payload.error);
      })
  }
})

export const { logout } = userSlice.actions;

export const selectUserId = (state) => state.user.id;
export const selectUserStatus = (state) => state.user.status;
export const selectUserUsername = (state) => state.user.name;

export default userSlice.reducer
