import { NavLink, Link } from "react-router-dom";
import { RiSearch2Line } from "react-icons/ri";
import { RiUserLine } from "react-icons/ri";
import styles from "./index.module.scss";
import { navData } from "../../../../../data/navItems";
import CartIcon from "./CartIcon";
import { useEffect, useState } from "react";

interface NavBarProps {
  handleShow: () => void;
}

const Navbar: React.FC<NavBarProps> = ({ handleShow }) => {
  const [hasScrolled, setHasSrolled] = useState(false);

  const resizeHeaderOnScroll = () => {
    setHasSrolled((hasScrolled) => {
      if (
        !hasScrolled &&
        (document.body.scrollTop > 20 ||
          document.documentElement.scrollTop > 20)
      ) {
        return true;
      }

      if (
        hasScrolled &&
        document.body.scrollTop < 4 &&
        document.documentElement.scrollTop < 4
      ) {
        return false;
      }

      return hasScrolled;
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", resizeHeaderOnScroll);

    return () => window.removeEventListener("scroll", resizeHeaderOnScroll);
  }, []);
  const navStyles = hasScrolled
    ? `${styles.nav} ${styles.hasScrolled}`
    : styles.nav;

  return (
    <nav className={navStyles}>
      <div className={styles.container_bottom}>
        <Link to="/" className={styles.title}>
          Flowy Cart
        </Link>
        <ul className={styles.links}>
          {navData.map((option) => {
            return (
              <li>
                <NavLink to={`/catalog/${option.name}`} className={styles.link}>
                  {option.name}
                </NavLink>
              </li>
            );
          })}
        </ul>
        <ul className={styles.icons_menu}>
          <li>
            <NavLink to={"/"} className={styles.link}>
              <RiSearch2Line />
            </NavLink>
          </li>
          <li>
            <div className={styles.link} onClick={handleShow}>
              <CartIcon />
            </div>
          </li>
          <li>
            <NavLink to={`/login`} className={styles.link}>
              <RiUserLine />
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
