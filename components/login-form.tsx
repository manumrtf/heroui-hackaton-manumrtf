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
  toast,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { authClient } from "@/lib/auth-client";

export const LoginForm = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isVisible, setIsVisible] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [rememberMe, setRememberMe] = React.useState(false);
  const [errors, setErrors] = React.useState<string[]>([]);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const isEmailValid = React.useMemo(() => {
    if (!email) return true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailRegex.test(email);
  }, [email]);

  const isFormValid = React.useMemo(() => {
    return email && password && isEmailValid;
  }, [email, password, isEmailValid]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormValid) return;

    setIsLoading(true);

    const { error } = await authClient.signIn.email({
      email,
      password,
      callbackURL: "/",
    });

    if (error) {
      setErrors([error.message ?? "An error occurred"]);
    }

    setIsLoading(false);
  };

  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md mx-auto"
      initial={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      <Card className="w-full" shadow="sm">
        <CardHeader className="flex flex-col gap-1 items-center">
          <h1 className="text-xl font-semibold">Welcome back</h1>
          <p className="text-small text-default-500">Sign in to your account</p>
        </CardHeader>
        <Divider />
        <CardBody>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            {errors.map((error) => (
              <p key={error} className="text-danger">
                {error}
              </p>
            ))}
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

            <div className="flex justify-between items-center">
              <Checkbox
                isSelected={rememberMe}
                size="sm"
                onValueChange={setRememberMe}
              >
                <span className="text-small">Remember me</span>
              </Checkbox>
            </div>

            <Button
              fullWidth
              className="mt-2"
              color="primary"
              isDisabled={!isFormValid}
              isLoading={isLoading}
              type="submit"
            >
              Sign In
            </Button>
          </form>
        </CardBody>
        <Divider />
        <CardFooter className="flex justify-center">
          <p className="text-small text-default-500">
            Don&apos;t have an account?{" "}
            <Link className="text-primary" href="/register" size="sm">
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </motion.div>
  );
};
