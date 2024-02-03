import React from "react";
import { useAppSelector } from "../../../app/hooks";
import Button from "../../../components/components/Button";
import Modal from "../../../components/components/Modal";
import styles from "./index.module.scss";
import { useMediaQuery } from "react-responsive";
import CartProduct from "../CartProduct";
import { CartItem } from "../../../types/cart";

interface CartModalProps {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

const CartModal: React.FC<CartModalProps> = ({ show, setShow }) => {
  const { cartItems } = useAppSelector((state) => state.cart);

  const isBigScreen = useMediaQuery({
    query: "(min-width: 768px)",
  });

  const totalPrice = cartItems.reduce(
    (a, c) => a + c.quantity * c.product.price,
    0
  );

  const handleClose = () => {
    setShow(false);
  };

  return (
    <Modal isOpen={show} onClose={handleClose} isRight={isBigScreen}>
      <div className={styles.container}>
        <div className={styles.content}>
          {cartItems.map((item: CartItem) => (
            <CartProduct
              key={item.product.id}
              item={item}
              onClick={handleClose}
            />
          ))}
        </div>
        <div className={styles.footer_container}>
          <div className={styles.footer_wrapper}>
            <div className={styles.footer_total}>
              <p>
                <span>Total</span>
              </p>
              <p>
                <span>{totalPrice.toFixed(2)}</span>
              </p>
            </div>
            <div className={styles.buttons_wrapper}>
              <div className={styles.buttons_container}>
                <Button
                  className={`${styles.button} ${styles.cart_button}`}
                  to="/cart"
                  onClick={handleClose}
                >
                  Your cart
                </Button>
                <Button
                  className={`${styles.button} ${styles.checkout_button}`}
                  to="/cart"
                  onClick={handleClose}
                >
                  Check out
                </Button>
              </div>
              <Button
                className={`${styles.button} ${styles.close_button}`}
                onClick={handleClose}
              >
                Go Back
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default CartModal;
