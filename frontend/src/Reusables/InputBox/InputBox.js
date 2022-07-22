import React from "react";
import styles from "./InputBox.module.css";

const InputBox = ({ placeholder, state, changeHandler }) => {
  return (
    <div className={styles.inputWrapper}>
      <input
        type="text"
        id={placeholder}
        className={styles.input}
        autoComplete="off"
        placeholder=" "
        value={state}
        onChange={(e) => {
          changeHandler(e.target.value);
        }}
      />
      <label htmlFor={placeholder} className={styles.inputLabel}>
        {placeholder}
      </label>
    </div>
  );
};

export default InputBox;
