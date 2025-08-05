import React, { forwardRef, ButtonHTMLAttributes, use } from "react";
import styles from "./Button.module.scss";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  size?: "small" | "medium" | "large";
  loading?: boolean;
  children: React.ReactNode;
  promise?: Promise<any>;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "medium",
      loading = false,
      className,
      disabled,
      children,
      promise,
      ...props
    },
    ref
  ) => {
    const promiseResult = promise ? use(promise) : null;

    const buttonClasses = [
      styles.button,
      styles[variant],
      styles[size],
      loading ? styles.loading : "",
      className || "",
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <button
        ref={ref}
        className={buttonClasses}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <span className={styles.spinner}>
            <svg className={styles.spinnerIcon} fill="none" viewBox="0 0 24 24">
              <circle
                className={styles.spinnerCircle}
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
            </svg>
          </span>
        )}
        <span className={styles.content}>
          {promiseResult ? `${children} (${promiseResult})` : children}
        </span>
      </button>
    );
  }
);

export default Button;
