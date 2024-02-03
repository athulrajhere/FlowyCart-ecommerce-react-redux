import { useEffect, useState } from "react";

import { Outlet } from "react-router-dom";
import Header from "./Header";
import { AnimatePresence } from "framer-motion";
import CartModal from "../../../pages/Cart/CarModal";
import Footer from "./Footer";

const Layout = () => {
  const [showModal, setShow] = useState(false);

  useEffect(() => {
    const body = document.querySelector("body");
    if (body) {
      body.style.overflow = showModal ? "hidden" : "auto";
    }
  }, [showModal]);

  const handleShow = () => {
    setShow(true);
  };

  return (
    <>
      <div id="layout">
        <Header handleShow={handleShow} />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
      <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
        {showModal && <CartModal show={showModal} setShow={setShow} />}
      </AnimatePresence>
    </>
  );
};

export default Layout;
