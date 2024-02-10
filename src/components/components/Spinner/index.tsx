import styles from "./index.module.scss";

const Spinner = ({ className }: { className?: string }) => {
  return (
    <div className={styles.loaderContainer}>
      <div className={className ? styles[className] : styles.loader}></div>
    </div>
  );
};

export default Spinner;
