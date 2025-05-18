"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Checkbox,
  Divider,
  Input,
  Link,
} from "@heroui/react";
import { Icon } from "@iconify/react";

import { usePasswordStrength } from "@/hooks/use-password-strength";
import { authClient } from "@/lib/auth-client";

export const RegisterForm = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [isVisible, setIsVisible] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [step, setStep] = React.useState<"register" | "verify-email">(
    "register"
  );

  const { strength, message, color } = usePasswordStrength(password);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const isEmailValid = React.useMemo(() => {
    if (!email) return true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailRegex.test(email);
  }, [email]);

  const isPasswordMatch = React.useMemo(() => {
    if (!confirmPassword) return true;

    return password === confirmPassword;
  }, [password, confirmPassword]);

  const isFormValid = React.useMemo(() => {
    return (
      email &&
      password &&
      confirmPassword &&
      isEmailValid &&
      isPasswordMatch &&
      strength >= 2
    );
  }, [
    email,
    password,
    confirmPassword,
    isEmailValid,
    isPasswordMatch,
    strength,
  ]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormValid) return;

    setIsLoading(true);

    const { error } = await authClient.signUp.email({
      email,
      password,
      name: email,
    });

    if (error) {
      return;
    }

    setStep("verify-email");

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Reset form
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setIsLoading(false);

    // Show success message or redirect
    console.log("Registration successful!");
  };

  if (step === "verify-email") {
    return (
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md mx-auto"
        initial={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <Card className="w-full" shadow="sm">
          <CardHeader className="flex flex-col gap-1 items-center">
            <h1 className="text-xl font-semibold">Verify your email</h1>
            <p className="text-small text-default-500">
              We&apos;ve sent a verification link
            </p>
          </CardHeader>
          <Divider />
          <CardBody className="flex flex-col gap-4">
            <p className="text-sm text-default-500">
              Please check your email and click the verification link to
              complete your registration. If you don&apos;t see the email, check
              your spam folder.
            </p>
            <Button
              color="primary"
              isLoading={isLoading}
              onClick={() => setStep("register")}
            >
              Back to registration
            </Button>
          </CardBody>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md mx-auto"
      initial={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      <Card className="w-full" shadow="sm">
        <CardHeader className="flex flex-col gap-1 items-center">
          <h1 className="text-xl font-semibold">Create an account</h1>
          <p className="text-small text-default-500">
            Enter your details to get started
          </p>
        </CardHeader>
        <Divider />
        <CardBody>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <Input
              isRequired
              errorMessage={
                !isEmailValid && "Please enter a valid email address"
              }
              isInvalid={!isEmailValid}
              label="Email"
              placeholder="Enter your email"
              startContent={
                <Icon className="text-default-400 text-sm" icon="lucide:mail" />
              }
              type="email"
              value={email}
              onValueChange={setEmail}
            />

            <Input
              isRequired
              endContent={
                <button
                  className="focus:outline-none"
                  type="button"
                  onClick={toggleVisibility}
                >
                  {isVisible ? (
                    <Icon
                      className="text-default-400 text-sm"
                      icon="lucide:eye"
                    />
                  ) : (
                    <Icon
                      className="text-default-400 text-sm"
                      icon="lucide:eye-off"
                    />
                  )}
                </button>
              }
              label="Password"
              placeholder="Enter your password"
              startContent={
                <Icon className="text-default-400 text-sm" icon="lucide:lock" />
              }
              type={isVisible ? "text" : "password"}
              value={password}
              onValueChange={setPassword}
            />

            {password && (
              <div className="flex flex-col gap-1">
                <div className="flex gap-2">
                  {[1, 2, 3, 4].map((level) => (
                    <div
                      key={level}
                      className={`h-1 flex-1 rounded-full ${
                        level <= strength ? `bg-${color}-500` : "bg-default-200"
                      }`}
                    />
                  ))}
                </div>
                <p className={`text-tiny text-${color}-500`}>{message}</p>
              </div>
            )}

            <Input
              isRequired
              endContent={
                <button
                  className="focus:outline-none"
                  type="button"
                  onClick={toggleVisibility}
                >
                  {isVisible ? (
                    <Icon
                      className="text-default-400 text-sm"
                      icon="lucide:eye"
                    />
                  ) : (
                    <Icon
                      className="text-default-400 text-sm"
                      icon="lucide:eye-off"
                    />
                  )}
                </button>
              }
              errorMessage={!isPasswordMatch && "Passwords do not match"}
              isInvalid={!isPasswordMatch}
              label="Confirm Password"
              placeholder="Confirm your password"
              startContent={
                <Icon className="text-default-400 text-sm" icon="lucide:lock" />
              }
              type={isVisible ? "text" : "password"}
              value={confirmPassword}
              onValueChange={setConfirmPassword}
            />

            <Button
              fullWidth
              className="mt-2"
              color="primary"
              isDisabled={!isFormValid}
              isLoading={isLoading}
              type="submit"
            >
              Create Account
            </Button>
          </form>
        </CardBody>
        <Divider />
        <CardFooter className="flex justify-center">
          <p className="text-small text-default-500">
            Already have an account?{" "}
            <Link className="text-primary" href="/login" size="sm">
              Sign in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </motion.div>
  );
};
