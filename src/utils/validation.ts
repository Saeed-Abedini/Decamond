import { FormValidation } from "@/types/auth";

export const validateIranianPhoneNumber = (
  phoneNumber: string
): FormValidation => {
  const trimmed = phoneNumber.trim();

  if (!trimmed) {
    return {
      isValid: false,
      message: "Phone number is required",
    };
  }

  const patterns = [
    /^09\d{9}$/, // Mobile (national)
    /^0[1-8]\d{9}$/, // Landline (national)
    /^\+989\d{9}$/, // Mobile (international)
    /^00989\d{9}$/, // Mobile (international)
    /^\+98[1-8]\d{9}$/, // Landline (international)
    /^0098[1-8]\d{9}$/, // Landline (international)
  ];

  const isValidFormat = patterns.some((pattern) => pattern.test(trimmed));

  if (!isValidFormat) {
    return {
      isValid: false,
      message: "The phone number format is not correct",
    };
  }

  return {
    isValid: true,
    message: "",
  };
};
