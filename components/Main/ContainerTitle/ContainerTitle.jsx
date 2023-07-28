import styles from "./ContainerTitle.module.css";
const ContainerTitle = ({ title }) => {
  return <h1 className={styles.title}>{title}</h1>;
};
export default ContainerTitle;
