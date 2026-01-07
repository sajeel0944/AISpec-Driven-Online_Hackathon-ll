// components/auth/LoginForm.tsx
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "../../hooks/useForm";
import authService from "../../lib/auth/auth.service";
import Input from "../ui/Input";
import { Button } from "../ui/Button";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { validateEmail } from "@/utils/validators";
import Alert from "../common/Alert/Alert";

interface LoginFormData {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const router = useRouter();
  const [error, setError] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { values, errors, handleChange, handleSubmit } = useForm<LoginFormData>(
    {
      initialValues: {
        email: "",
        password: "",
      },
      onSubmit: async (data) => {
        setError("");
        setIsLoading(true);

        try {
          const result = await authService.login(data);

          if (result.status === "success") {
            router.push("/dashboard");
            router.refresh();
          } else {
            setError(result.message);
          }
        } catch {
          setError("Login failed");
        } finally {
          setIsLoading(false);
        }
      },
      validate: (values) => {
        const errors: Partial<Record<keyof LoginFormData, string>> = {};

        if (!values.email) {
          errors.email = "Email is required";
        } else if (!validateEmail(values.email)) {
          errors.email = "Please enter a valid email";
        }

        if (!values.password) {
          errors.password = "Password is required";
        }

        return errors;
      },
    }
  );

  return (
    <div className="space-y-6">
      {error && (
        <Alert
          type="error"
          title="Login Failed"
          message={error}
          onClose={() => setError("")}
        />
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Email Address"
          type="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          error={errors.email}
          icon={<FiMail />}
          placeholder="john@example.com"
          required
        />

        <Input
          label="Password"
          type={showPassword ? "text" : "password"}
          name="password"
          value={values.password}
          onChange={handleChange}
          error={errors.password}
          icon={<FiLock />}
          placeholder="••••••••"
          required
          suffix={
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className=" inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          }
        />

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label
              htmlFor="remember-me"
              className="ml-2 block text-sm text-gray-700"
            >
              Remember me
            </label>
          </div>

          <Link
            href="/forgot-password"
            className="text-sm font-medium text-blue-600 hover:text-blue-500 transition-colors"
          >
            Forgot password?
          </Link>
        </div>

        <Button
          type="submit"
          size="lg"
          fullWidth
          loading={isLoading}
          disabled={isLoading}
        >
          Sign In
        </Button>
      </form>

      <div className="text-center text-sm text-gray-600">
        <p>
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="font-medium text-blue-600 hover:text-blue-500 transition-colors"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
