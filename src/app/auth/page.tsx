"use client";

import React, { useState, useRef, useActionState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { fetchRandomUser } from "@/services/api";
import { validateIranianPhoneNumber } from "@/utils/validation";
import { User } from "@/types/auth";
import Input from "@/components/ui/Input/Input";
import Button from "@/components/ui/Button/Button";
import styles from "./page.module.scss";

interface ActionState {
  error: string | null;
  success: boolean;
  user: User | null;
}

// Action function for form submission
async function loginAction(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const phoneNumber = formData.get("phoneNumber") as string;

  // Validate phone number
  const validationResult = validateIranianPhoneNumber(phoneNumber);

  if (!validationResult.isValid) {
    return {
      error: validationResult.message,
      success: false,
      user: null,
    };
  }

  try {
    const response = await fetchRandomUser();
    const user = response.results[0];

    return {
      user,
      success: true,
      error: null,
    };
  } catch (err) {
    return {
      error: "Login failed. Please try again.",
      success: false,
      user: null,
    };
  }
}

const AuthPage: React.FC = () => {
  const router = useRouter();
  const { login } = useAuth();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [validation, setValidation] = useState({ isValid: true, message: "" });
  const phoneInputRef = useRef<HTMLInputElement>(null);

  const [state, formAction, isPending] = useActionState(loginAction, {
    error: null,
    success: false,
    user: null,
  });

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPhoneNumber(value);

    // Validate phone number
    const validationResult = validateIranianPhoneNumber(value);
    setValidation(validationResult);
  };

  // Handle successful login
  React.useEffect(() => {
    if (state.success && state.user) {
      login(state.user);
      router.push("/dashboard");
    }
  }, [state.success, state.user, login, router]);

  return (
    <div className={styles.container}>
      <div className={styles.background}>
        <div className={styles.backgroundShapes}>
          <div className={styles.shape1}></div>
          <div className={styles.shape2}></div>
          <div className={styles.shape3}></div>
          <div className={styles.shape4}></div>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.authCard}>
          <div className={styles.header}>
            <div className={styles.logo}>
              <div className={styles.logoIcon}>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z"
                    fill="currentColor"
                  />
                  <path
                    d="M19 15L19.74 17.74L22.5 18.5L19.74 19.26L19 22L18.26 19.26L15.5 18.5L18.26 17.74L19 15Z"
                    fill="currentColor"
                  />
                  <path
                    d="M5 6L5.5 7.5L7 8L5.5 8.5L5 10L4.5 8.5L3 8L4.5 7.5L5 6Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <h1 className={styles.brandName}>AuthFlow</h1>
            </div>
            <h2 className={styles.title}>Welcome Back</h2>
            <p className={styles.subtitle}>
              Enter your phone number to access your dashboard
            </p>
          </div>

          <form action={formAction} className={styles.form}>
            <div className={styles.inputGroup}>
              <Input
                ref={phoneInputRef}
                label="Phone Number"
                type="tel"
                name="phoneNumber"
                placeholder="e.g., 09123456789"
                value={phoneNumber}
                onChange={handlePhoneChange}
                error={!validation.isValid ? validation.message : ""}
                helperText="Iranian mobile or landline number"
                required
                className={styles.phoneInput}
              />
            </div>

            {state.error && (
              <div className={styles.errorContainer}>
                <div className={styles.errorIcon}>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
                <p className={styles.errorMessage}>{state.error}</p>
              </div>
            )}

            <Button
              type="submit"
              variant="primary"
              size="large"
              loading={isPending}
              disabled={!validation.isValid || isPending}
              className={styles.submitButton}
            >
              {isPending ? "Signing In..." : "Sign In"}
            </Button>
          </form>

          <div className={styles.footer}>
            <p className={styles.footerText}>
              By signing in, you agree to our{" "}
              <a href="#" className={styles.footerLink}>
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className={styles.footerLink}>
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
