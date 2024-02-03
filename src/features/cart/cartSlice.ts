import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import cartService from "./cartService";
import { toast } from "react-toastify";
import { CartItem } from "../../types/cart";
import { STATUS } from "../../constants/Status";
import { Product } from "../../types/product";

interface CartState {
  cartItems: CartItem[];
  totalItems: number;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  status: string;
}

const initialState: CartState = {
  cartItems: [],
  totalItems: 0,
  isError: false,
  isSuccess: false,
  isLoading: false,
  status: "",
};

export const addToCart = createAsyncThunk(
  "cart/add",
  async (cartItem: CartItem, thunkAPI) => {
    try {
      return await cartService.addToCart(cartItem);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const removeItemFromCart = createAsyncThunk(
  "cart/remove",
  async (id: number, thunkAPI) => {
    try {
      return await cartService.removeItemFromCart(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const reduceItemFromCart = createAsyncThunk(
  "cart/reduce",
  async (cartItem: Product, thunkAPI) => {
    try {
      return await cartService.reduceItemFromCart(cartItem);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const incrementItemFromCart = createAsyncThunk(
  "cart/increment",
  async (cartItem: Product, thunkAPI) => {
    try {
      return await cartService.incrementItemFromCart(cartItem);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    cartReset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state: CartState) => {
        state.isLoading = true;
        state.status = STATUS.LOADING;
      })
      .addCase(
        addToCart.fulfilled,
        (state: CartState, action: PayloadAction<CartItem>) => {
          state.isLoading = false;
          state.isSuccess = true;
          const itemIndex = state.cartItems.findIndex(
            (item) => item.product.id == action.payload.product.id
          );
          if (itemIndex >= 0) {
            state.cartItems[itemIndex].quantity += 1;
            state.totalItems += 1;
          } else {
            const product = { ...action.payload, quantity: 1 };
            state.totalItems += 1;
            state.cartItems.push(product);
          }

          localStorage.setItem("cart", JSON.stringify(state.cartItems));
          state.status = STATUS.IDLE;
          toast.success(state.status);
        }
      )
      .addCase(addToCart.rejected, (state: CartState) => {
        state.isLoading = false;
        state.isError = true;
        state.status = STATUS.IDLE;
        toast.error(state.status);
      })
      .addCase(removeItemFromCart.pending, (state) => {
        state.isLoading = true;
        state.status = STATUS.LOADING;
      })
      .addCase(
        removeItemFromCart.fulfilled,
        (state: CartState, action: PayloadAction<number>) => {
          state.isLoading = false;
          state.isSuccess = true;
          const updatedCart = state.cartItems.filter(
            (p) => p.product.id !== action.payload
          );
          state.cartItems = updatedCart;
          state.totalItems = state.cartItems.reduce(
            (total: number, curr: CartItem) => (total += curr.quantity),
            0
          );
          localStorage.setItem("cart", JSON.stringify(state.cartItems));
          state.status = STATUS.IDLE;
          toast.success(state.status);
        }
      )
      .addCase(removeItemFromCart.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.status = STATUS.ERROR;
        toast.error(state.status);
      })
      .addCase(reduceItemFromCart.pending, (state) => {
        state.isLoading = true;
        state.status = STATUS.LOADING;
      })
      .addCase(
        reduceItemFromCart.fulfilled,
        (state: CartState, action: PayloadAction<Product>) => {
          state.isLoading = false;
          state.isSuccess = true;
          const itemIndex = state.cartItems.findIndex(
            (item) => item.product.id === action.payload.id
          );

          if (state.cartItems[itemIndex].quantity > 1) {
            state.cartItems[itemIndex].quantity -= 1;
            state.totalItems -= 1;
          } else if (state.cartItems[itemIndex].quantity === 1) {
            const updatedCart = state.cartItems.filter(
              (p) => p.product.id !== action.payload.id
            );
            state.cartItems = updatedCart;
            state.totalItems -= 1;
          }
          localStorage.setItem("cart", JSON.stringify(state.cartItems));
          state.status = STATUS.IDLE;
          toast.success(state.status);
        }
      )
      .addCase(reduceItemFromCart.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.status = STATUS.ERROR;
        toast.error(state.status);
      })
      .addCase(incrementItemFromCart.pending, (state) => {
        state.isLoading = true;
        state.status = STATUS.LOADING;
      })
      .addCase(
        incrementItemFromCart.fulfilled,
        (state: CartState, action: PayloadAction<Product>) => {
          state.isLoading = false;
          state.isSuccess = true;
          const itemIndex = state.cartItems.findIndex(
            (item) => item.product.id === action.payload.id
          );

          if (state.cartItems[itemIndex].quantity >= 1) {
            state.cartItems[itemIndex].quantity += 1;
            state.totalItems += 1;
          }
          localStorage.setItem("cart", JSON.stringify(state.cartItems));
          state.status = STATUS.IDLE;
          toast.success(state.status);
        }
      )
      .addCase(incrementItemFromCart.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.status = STATUS.ERROR;
        toast.error(state.status);
      });
  },
});

export const { cartReset } = cartSlice.actions;
export default cartSlice.reducer;
