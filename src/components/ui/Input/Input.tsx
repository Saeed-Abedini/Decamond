import React, {
  forwardRef,
  InputHTMLAttributes,
  useDeferredValue,
  useState,
  useEffect,
  useId,
} from "react";
import styles from "./Input.module.scss";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  debounceMs?: number;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      className,
      debounceMs = 300,
      onChange,
      id,
      ...props
    },
    ref
  ) => {
    const [value, setValue] = useState(props.value || "");
    const deferredValue = useDeferredValue(value);
    const inputId = useId();
    const finalId = id || inputId;

    // Handle debounced onChange
    useEffect(() => {
      if (onChange && typeof props.value === "undefined") {
        const timeoutId = setTimeout(() => {
          const syntheticEvent = {
            target: { value: deferredValue },
          } as React.ChangeEvent<HTMLInputElement>;
          onChange(syntheticEvent);
        }, debounceMs);

        return () => clearTimeout(timeoutId);
      }
    }, [deferredValue, onChange, debounceMs, props.value]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
      if (onChange) {
        onChange(e);
      }
    };

    return (
      <div className={styles.inputWrapper}>
        {label && (
          <label htmlFor={finalId} className={styles.label}>
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={finalId}
          className={`${styles.input} ${error ? styles.error : ""} ${
            className || ""
          }`}
          onChange={handleChange}
          value={value}
          {...props}
        />
        {error && (
          <span className={styles.errorMessage} id={`${finalId}-error`}>
            {error}
          </span>
        )}
        {helperText && !error && (
          <span className={styles.helperText} id={`${finalId}-help`}>
            {helperText}
          </span>
        )}
      </div>
    );
  }
);

export default Input;
