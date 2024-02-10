import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import authService from "./authService";
import { Login, UserDetails } from "../../types/auth";
import { STATUS } from "../../constants/Status";
import { toast } from "react-toastify";

interface AuthState {
  user: UserDetails | null;
  userId: 0;
  token: string;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  status: string;
}

const initialState: AuthState = {
  user: null,
  userId: 0,
  token: "",
  isError: false,
  isSuccess: false,
  isLoading: false,
  status: "",
};

export const login = createAsyncThunk(
  "auth/login",
  async (user: Login, thunkAPI) => {
    try {
      return await authService.login({
        username: String(user.username),
        password: String(user.password),
      });
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getUser = createAsyncThunk(
  "auth/user",
  async (userId: number, thunkAPI) => {
    try {
      return await authService.getUser(userId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    return await authService.logout();
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authReset: () => {
      initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state: AuthState) => {
        state.isLoading = true;
        state.status = STATUS.LOADING;
      })
      .addCase(
        login.fulfilled,
        (state: AuthState, action: PayloadAction<string>) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.token = action.payload;
          localStorage.setItem("user", JSON.stringify(2));
          state.status = STATUS.IDLE;
          toast.success(state.status);
        }
      )
      .addCase(login.rejected, (state: AuthState) => {
        state.isLoading = false;
        state.isError = true;
        state.user = null;
        state.status = STATUS.ERROR;
        toast.error(state.status);
      })
      .addCase(getUser.pending, (state: AuthState) => {
        state.isLoading = true;
        state.status = STATUS.LOADING;
      })
      .addCase(
        getUser.fulfilled,
        (state: AuthState, action: PayloadAction<UserDetails>) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.user = action.payload;
          localStorage.setItem("userDetails", JSON.stringify(action.payload));
          state.status = STATUS.IDLE;
          toast.success(state.status);
        }
      )
      .addCase(getUser.rejected, (state: AuthState) => {
        state.isLoading = false;
        state.isError = true;
        state.user = null;
        state.status = STATUS.ERROR;
        toast.error(state.status);
      })
      .addCase(logout.fulfilled, (state: AuthState) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = null;
        state.status = STATUS.IDLE;
      });
  },
});

export const { authReset } = authSlice.actions;
export default authSlice.reducer;
