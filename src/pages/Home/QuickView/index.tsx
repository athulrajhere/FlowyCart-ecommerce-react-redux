import { useState, useEffect } from "react";

import styles from "./index.module.scss";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  getCategory,
  getProducts,
} from "../../../features/product/productSlice";
import ProductCard from "../../../components/components/ProductCard";
import { navData } from "../../../data/navItems";
import { MdArrowRightAlt } from "react-icons/md";
import { Link } from "react-router-dom";
import { ROUTES } from "../../../constants/Route";

const QuickView = () => {
  const { products } = useAppSelector((state) => state.product);
  const dispatch = useAppDispatch();

  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  const handleCategory = (
    e: React.MouseEvent<HTMLInputElement, MouseEvent>
  ) => {
    const target = e.target as HTMLInputElement;
    setSelectedCategory(target.id);
    if (target.value !== "all") {
      const pathUrl = ROUTES.filter((item) => {
        return item.name.toLowerCase() === target.value.toLowerCase();
      });
      dispatch(getCategory(pathUrl[0].url.toLowerCase()));
    } else {
      dispatch(getProducts());
    }
  };

  return (
    <section className={styles.section}>
      <div className={`${styles.container} main-container`}>
        <p className={styles.section_title_top}>Quick View</p>
        <div className={styles.categories}>
          <div className={styles.buttonContainer}>
            {navData?.map((item) => {
              return (
                <div className={styles.button}>
                  <input
                    type="radio"
                    id={item.name}
                    name="category"
                    value={item.value}
                    onClick={(
                      e: React.MouseEvent<HTMLInputElement, MouseEvent>
                    ) => handleCategory(e)}
                  />
                  <label className="btn btn-default" htmlFor={item.name}>
                    {item.name}
                  </label>
                </div>
              );
            })}
          </div>
          <Link
            to={`/catalog/${String(selectedCategory)}`}
            className={styles.viewAllContainer}
          >
            <div className={styles.viewMore}>View More</div>
            <MdArrowRightAlt className={styles.icon} />
          </Link>
        </div>
        <div className={styles.productList}>
          {products?.slice(0, 8)?.map((product, index) => {
            return (
              <ProductCard
                id={product.id}
                key={index}
                title={product.title}
                price={product.price}
                category={product.category}
                description={product.description}
                image={product.image}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default QuickView;
