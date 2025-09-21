import styles from "./Input.module.css";

export const Input = ({ value, onChange, placeholder, name }) => {
  return (
    <input
      className={styles.inputTask}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      name={name}
    ></input>
  );
};
