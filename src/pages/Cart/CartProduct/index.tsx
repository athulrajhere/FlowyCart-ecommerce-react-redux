import { FC } from "react";
import { Link } from "react-router-dom";
import styles from "./index.module.scss";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  incrementItemFromCart,
  reduceItemFromCart,
  removeItemFromCart,
} from "../../../features/cart/cartSlice";
import { MdDelete } from "react-icons/md";
import Button from "../../../components/components/Button";
import { CartItem } from "../../../types/cart";
import Spinner from "../../../components/components/Spinner";

interface CartProps {
  item: CartItem;
  onClick?: () => void;
}

const CartProduct: FC<CartProps> = ({ item, onClick }) => {
  const { isLoading } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  if (isLoading) return <Spinner />;

  return (
    <div className={styles.cartCardWrapper}>
      <Link
        to={`/products/${item.product.id}`}
        className={styles.cartCardContainer}
        onClick={onClick}
      >
        <div className={styles.cartCardImage}>
          <img src={item.product.image} alt={item.product.title} />
        </div>
        <div className={styles.cartCardDetails}>
          <div className={styles.cartCardLeft}>
            <div className={styles.title}>{item.product.title}</div>
            <div className={styles.size}>Size: 36</div>
            <div className={styles.price}>$ {item.product.price}</div>
          </div>
        </div>
      </Link>
      <div className={styles.cartCardRight}>
        <div className={styles.cartCardRightWrapper}>
          <Button
            className={styles.button}
            // disabled={item.quantity < 2}
            onClick={() => dispatch(reduceItemFromCart(item.product))}
          >
            -
          </Button>
          <div className={styles.counter}>{item.quantity}</div>
          <Button
            className={styles.button}
            onClick={() => dispatch(incrementItemFromCart(item.product))}
          >
            +
          </Button>
        </div>
        <Button
          className={styles.cartCardDelete}
          onClick={() => dispatch(removeItemFromCart(item.product.id))}
        >
          <MdDelete className={styles.icon} />
        </Button>
      </div>
    </div>
  );
};

export default CartProduct;
