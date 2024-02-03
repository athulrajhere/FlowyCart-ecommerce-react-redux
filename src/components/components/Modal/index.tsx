import { useEffect, useContext, createContext, ReactNode } from "react";
import { motion } from "framer-motion";
import styles from "./index.module.scss";

interface IModal {
  onClose: () => void;
}

const ModalContext = createContext<IModal | undefined>(undefined);

export const Modal = ({
  children,
  onClose,
  isRight,
}: {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  isRight?: boolean;
}) => {
  const handleEscape = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleEscape);

    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  const cartModalVariants = isRight
    ? {
        hidden: { x: "50vw", opacity: 0 },
        visible: { x: 0, opacity: 1 },
        exit: { x: "50vw", opacity: 0 },
      }
    : {
        hidden: { y: "50vh", opacity: 0 },
        visible: { y: 0, opacity: 1 },
        exit: { y: "50vh", opacity: 0 },
      };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className={styles.reactModalOverlay}
    >
      <motion.div
        initial="hidden"
        animate="visible"
        variants={cartModalVariants}
        exit="exit"
        className={`${styles.reactModalWrapper} ${
          isRight ? `${styles.modalWrapperRight}` : ""
        }`}
      >
        <div
          className={`${styles.reactModalContent}  ${
            isRight ? `${styles.modalContentRight}` : ""
          }`}
        >
          <ModalContext.Provider value={{ onClose }}>
            {children}
          </ModalContext.Provider>
        </div>
      </motion.div>
    </motion.div>
  );
};

const DismissButton = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  const { onClose } = useContext(ModalContext) as IModal;

  return (
    <button type="button" className={className} onClick={onClose}>
      {children}
    </button>
  );
};

const ModalHeader = ({ children }: { children: ReactNode }) => {
  return (
    <div className={styles.reactModalHeader}>
      <div className={styles.reactModalTitle}>{children}</div>
    </div>
  );
};

const ModalBody = ({
  children,
  isRight,
}: {
  children: ReactNode;
  isRight?: boolean;
}) => {
  return (
    <>
      {!isRight && (
        <div className={styles.btnCloseContainer}>
          <DismissButton className={styles.btnClose}>&times;</DismissButton>
        </div>
      )}
      <div className={styles.reactModalBody}>{children}</div>
    </>
  );
};

const ModalFooter = ({ children }: { children: ReactNode }) => {
  return <div className={styles.reactModalFooter}>{children}</div>;
};

Modal.Header = ModalHeader;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;
Modal.DismissButton = DismissButton;

export default Modal;
