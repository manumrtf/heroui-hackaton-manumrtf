import React from "react";

type PasswordStrength = {
  strength: number;
  message: string;
  color: "danger" | "warning" | "success" | "default";
};

export const usePasswordStrength = (password: string): PasswordStrength => {
  return React.useMemo(() => {
    if (!password) {
      return { strength: 0, message: "", color: "default" };
    }

    let strength = 0;
    let message = "Very weak";
    let color: "danger" | "warning" | "success" | "default" = "danger";

    // Length check
    if (password.length >= 8) strength += 1;

    // Contains lowercase
    if (/[a-z]/.test(password)) strength += 1;

    // Contains uppercase
    if (/[A-Z]/.test(password)) strength += 1;

    // Contains number
    if (/[0-9]/.test(password)) strength += 1;

    // Contains special character
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;

    // Determine message and color based on strength
    if (strength <= 1) {
      message = "Very weak";
      color = "danger";
    } else if (strength === 2) {
      message = "Weak";
      color = "danger";
    } else if (strength === 3) {
      message = "Medium";
      color = "warning";
    } else if (strength === 4) {
      message = "Strong";
      color = "success";
    } else {
      message = "Very strong";
      color = "success";
    }

    return { strength, message, color };
  }, [password]);
};
