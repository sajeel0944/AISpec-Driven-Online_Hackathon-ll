// components/auth/RegisterForm.tsx
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "../../hooks/useForm";
import authService from "../../lib/auth/auth.service";
import Input from "../ui/Input";
import { Button } from "../ui/Button";
import { FiMail, FiLock, FiUser } from "react-icons/fi";
import Alert from "../common/Alert/Alert";
import { validateEmail, validatePassword } from "@/utils/validators";
import UploadPicture from "./UploadPicture";

interface RegisterFormData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  profilePictureURL?: string;
}

const RegisterForm: React.FC = () => {
  const router = useRouter();
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | undefined>();

  const { values, errors, handleChange, handleSubmit } =
    useForm<RegisterFormData>({
      initialValues: {
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        profilePictureURL: "",
      },
      onSubmit: async (data) => {
        setError("");
        setSuccess("");
        setIsLoading(true);

        try {
          data.profilePictureURL = imageUrl;
          const result = await authService.register(data);

          if (result.status === "success") {
            setSuccess(
              "Registration successful! Please check your email for verification code."
            );
            setTimeout(() => {
              router.push(`/verify?email=${data.email}`);
            }, 2000);
          } else {
            setError(result.message);
          }
        } catch {
          setError("Registration failed");
        } finally {
          setIsLoading(false);
        }
      },
      validate: (values) => {
        const errors: Partial<Record<keyof RegisterFormData, string>> = {};

        if (!values.email) {
          errors.email = "Email is required";
        } else if (!validateEmail(values.email)) {
          errors.email = "Please enter a valid email";
        }

        if (!values.password) {
          errors.password = "Password is required";
        } else if (!validatePassword(values.password)) {
          errors.password =
            "Password must be at least 8 characters with uppercase, lowercase, and number";
        }

        if (!values.firstName.trim()) {
          errors.firstName = "First name is required";
        } else if (values.firstName.trim().length < 2) {
          errors.firstName = "First name must be at least 2 characters";
        }

        if (!values.lastName.trim()) {
          errors.lastName = "Last name is required";
        } else if (values.lastName.trim().length < 2) {
          errors.lastName = "Last name must be at least 2 characters";
        }

        return errors;
      },
    });

  return (
    <div className="space-y-6">
      {error && (
        <Alert
          type="error"
          title="Registration Failed"
          message={error}
          onClose={() => setError("")}
        />
      )}

      {success && <Alert type="success" title="Success!" message={success} />}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="First Name"
            name="firstName"
            value={values.firstName}
            onChange={handleChange}
            error={errors.firstName}
            icon={<FiUser />}
            placeholder="John"
            required
          />

          <Input
            label="Last Name"
            name="lastName"
            value={values.lastName}
            onChange={handleChange}
            error={errors.lastName}
            icon={<FiUser />}
            placeholder="Doe"
            required
          />
        </div>

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
          type="password"
          name="password"
          value={values.password}
          onChange={handleChange}
          error={errors.password}
          icon={<FiLock />}
          placeholder="••••••••"
          required
          helperText="Must be at least 8 characters with uppercase, lowercase, and number"
        />

        <UploadPicture imageUrl={imageUrl} setImageUrl={setImageUrl} />

        <div className="flex items-center">
          <input
            id="terms"
            name="terms"
            type="checkbox"
            required
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
            I agree to the{" "}
            <Link href="/terms" className="text-blue-600 hover:text-blue-500">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-blue-600 hover:text-blue-500">
              Privacy Policy
            </Link>
          </label>
        </div>

        <Button
          type="submit"
          size="lg"
          fullWidth
          loading={isLoading}
          disabled={isLoading}
        >
          Create Account
        </Button>
      </form>

      <div className="text-center text-sm text-gray-600">
        <p>
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-blue-600 hover:text-blue-500 transition-colors"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
