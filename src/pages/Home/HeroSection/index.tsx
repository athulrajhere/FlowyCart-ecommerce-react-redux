import styles from "./index.module.scss";
import Button from "../../../components/components/Button";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { heroImages } from "../../../data/images";

const HeroSection = () => {
  return (
    <section className={styles.section}>
      <div className={`${styles.container} main-container`}>
        <div className={styles.content_wrapper}>
          <header className={styles.header}>
            <h1 className={styles.title} style={{ fontWeight: 1000 }}>
              unleash your Fashion
            </h1>
            <h1 className={styles.title} style={{ fontWeight: 1000 }}>
              find your Flow.
            </h1>
          </header>
          <div className={styles.buttons_wrapper}>
            <Button to="/catalog/All" className={styles.button}>
              Shop Now
            </Button>
          </div>
          <Swiper
            pagination={{
              dynamicBullets: true,
            }}
            modules={[Pagination]}
            className={styles.image}
          >
            {heroImages.map((items) => {
              return (
                <SwiperSlide>
                  <img srcSet={items.path} />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
