import { useState, FC } from "react";
import styles from "./index.module.scss";
import { Link } from "react-router-dom";
import { Product } from "../../../types/product";
import { motion } from "framer-motion";
import { useAppDispatch } from "../../../app/hooks";
import { CartItem } from "../../../types/cart";
import { addToCart } from "../../../features/cart/cartSlice";
import { CgShoppingBag } from "react-icons/cg";
import Button from "../Button";
import Spinner from "../Spinner";

interface ProductCardProps extends Product {
  key: number;
}

const ProductCard: FC<ProductCardProps> = ({
  id,
  key,
  title,
  price,
  category,
  description,
  image,
}) => {
  const dispatch = useAppDispatch();

  // const [showIcons, setShowIcons] = useState(false);
  const [isLoadingProduct, setIsLoadingProduct] = useState(false);

  // const showActionIcons = (isShow: boolean) => {
  //   isShow ? setShowIcons(true) : setShowIcons(false);
  // };

  const addToCartHandler = () => {
    setIsLoadingProduct(true);

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

    dispatch(addToCart(cartProduct)).then(() => {
      setIsLoadingProduct(false);
    });
  };

  return (
    <motion.div
      id={title}
      key={key}
      tabIndex={id}
      whileHover={{ cursor: "pointer" }}
      // onMouseEnter={() => showActionIcons(true)}
      // onMouseLeave={() => showActionIcons(false)}
      whileTap={{ cursor: "grabbing" }}
      transition={{
        ease: "easeInOut",
        duration: 0.4,
      }}
    >
      <div className={styles.productItem}>
        <div className={styles.productPic}>
          <Link to={`/products/${String(id)}`}>
            <img src={image} alt={title} />
          </Link>
        </div>
      </div>
      <div className={styles.productDetailsContainer}>
        <Link
          to={`/products/${String(id)}`}
          className={styles.productDetailsWrapper}
        >
          <div className={styles.productDetails}>
            <div className={styles.productTitle}>
              <div>{title}</div>
            </div>
            <div className={styles.productPrice}>{price}$</div>
          </div>
        </Link>
        <motion.div
          key={key}
          whileHover={{ zoom: 1.2 }}
          style={{ height: "100%" }}
          onClick={() => addToCartHandler()}
        >
          <Button className={styles.iconCcontainer}>
            {isLoadingProduct && <Spinner className={"addToCart"} />}
            <CgShoppingBag
              className={`${styles.icon} ${
                isLoadingProduct && styles.loadingIcon
              }`}
            />
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
