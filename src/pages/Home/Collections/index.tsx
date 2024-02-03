import styles from "./index.module.scss";
import { MdArrowOutward } from "react-icons/md";
import { Link } from "react-router-dom";
import { collectionImages } from "../../../data/images";
import { motion } from "framer-motion";

const Collections = () => {
  return (
    <section className={styles.section}>
      <div className={`${styles.container} main-container`}>
        <p className={styles.section_title_top}>Collections</p>
        <div className={styles.productList}>
          <div className={styles.collectionContainer}>
            {collectionImages.map((item, id) => {
              return (
                <Link to={item.link} className={styles["div" + (id + 1)]}>
                  <img
                    srcSet={item.path}
                    className={`${styles.image}`}
                    loading="lazy"
                  />
                  <motion.div
                    key="cart"
                    whileHover={{ zoom: 1.5 }}
                    style={{ height: "100%" }}
                  >
                    <Link to={item.link} className={styles.iconCcontainer}>
                      <MdArrowOutward className={styles.icon} />
                    </Link>
                  </motion.div>
                  <div className={styles.title}>{item.name}</div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Collections;
