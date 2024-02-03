import { useState, FC } from "react";
import styles from "./index.module.scss";
import { Link } from "react-router-dom";
import { Product } from "../../../types/product";
import { motion } from "framer-motion";
import { MdArrowOutward } from "react-icons/md";
import { useAppDispatch } from "../../../app/hooks";
import { CartItem } from "../../../types/cart";
import { addToCart } from "../../../features/cart/cartSlice";
import { CgShoppingBag } from "react-icons/cg";
import { useMediaQuery } from "react-responsive";
import Button from "../Button";

const ProductCard: FC<Product> = ({
  id,
  title,
  price,
  category,
  description,
  image,
}) => {
  const dispatch = useAppDispatch();

  const [showIcons, setShowIcons] = useState(false);

  const isBigScreen = useMediaQuery({
    query: "(min-width: 768px)",
  });

  const showActionIcons = (isShow: boolean) => {
    isShow ? setShowIcons(true) : setShowIcons(false);
  };

  const addToCartHandler = () => {
    const cartProduct: CartItem = {
      quantity: 1,
      product: {
        id: id,
        title: title,
        price: price,
        image: image,
        description: description,
        category: category,
      },
    };
    dispatch(addToCart(cartProduct));
  };

  return (
    <motion.div
      id={title}
      key={id}
      tabIndex={id}
      whileHover={{ cursor: "pointer" }}
      onMouseEnter={() => showActionIcons(true)}
      onMouseLeave={() => showActionIcons(false)}
      whileTap={{ cursor: "grabbing" }}
      transition={{
        ease: "easeInOut",
        duration: 0.4,
      }}
    >
      <div className={styles.productItem}>
        <div className={styles.productPic}>
          <Link to={`/products/${id}`}>
            <img src={image} alt={title} />
          </Link>
          {showIcons && isBigScreen && (
            <div className={styles.carouselHoverOverlay}>
              <div className={styles.carouselHoverWrapper}>
                <div className={styles.carouselHoverContent}>
                  <motion.button
                    key="cart"
                    className={styles.carouselHoverBtn}
                    whileHover={{ scale: 1.5 }}
                    onClick={() => addToCartHandler()}
                  >
                    <CgShoppingBag className={styles.icon} />
                  </motion.button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className={styles.productDetailsContainer}>
        <div className={styles.productDetails}>
          <div className={styles.productTitle}>
            <Link to={`/catalog/men`}>{title}</Link>
          </div>
          <div className={styles.productPrice}>{price}$</div>
        </div>
        {isBigScreen ? (
          <motion.div
            key="cart"
            whileHover={{ zoom: 1.2 }}
            style={{ height: "100%" }}
          >
            <Link
              to={`/products/${String(id)}`}
              className={styles.iconCcontainer}
            >
              <MdArrowOutward className={styles.icon} />
            </Link>
          </motion.div>
        ) : (
          <Button
            className={styles.iconCcontainer}
            onClick={() => addToCartHandler()}
          >
            <CgShoppingBag className={styles.icon} />
          </Button>
        )}
      </div>
    </motion.div>
  );
};

export default ProductCard;
