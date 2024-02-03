import axiosConfig from "../../app/axiosConfig";
import { CartItem } from "../../types/cart";
import { Product } from "../../types/product";

const addToCart = async (cartItem: CartItem) => {

  const response = await axiosConfig.post(
    "carts",
    cartItem
  );

  return cartItem;
};

const removeItemFromCart = async (id) => {

  const response = await axiosConfig.post("carts", id);

  return id;
};

const reduceItemFromCart = async (cartItem: Product) => {
  const response = await axiosConfig.post(
    "carts",
    cartItem
  );

  return cartItem;
};
const incrementItemFromCart = async (cartItem: Product) => {

  const response = await axiosConfig.post(
    "carts",
    cartItem
  );

  return cartItem;
};

const cartService = {
  addToCart,
  removeItemFromCart,
  reduceItemFromCart,
  incrementItemFromCart,
};

export default cartService;
