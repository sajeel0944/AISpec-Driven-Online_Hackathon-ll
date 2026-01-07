// components/auth/VerifyForm.tsx
"use client";

import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import authService from "@/lib/auth/auth.service";
import { Button } from "@/components/ui/Button";
import Alert from "@/components/common/Alert/Alert";

interface VerifyFormProps {
  initialEmail: string;
}

const VerifyForm: React.FC<VerifyFormProps> = ({ initialEmail }) => {
  const router = useRouter();
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleOtpChange = (index: number, value: string) => {
    // Allow only digits and empty string
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-submit when all digits are entered
    const otpString = newOtp.join("");
    if (otpString.length === 6) {
      handleSubmit(otpString);
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace") {
      if (!otp[index] && index > 0) {
        // Move to previous input on backspace if current is empty
        inputRefs.current[index - 1]?.focus();
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").trim();

    // Check if pasted data is 6 digits
    if (/^\d{6}$/.test(pastedData)) {
      const digits = pastedData.split("");
      setOtp(digits);

      // Focus the last input
      inputRefs.current[5]?.focus();

      // Auto-submit
      setTimeout(() => {
        handleSubmit(pastedData);
      }, 100);
    }
  };

  const handleSubmit = async (otpValue?: string) => {
    const otpString = otpValue || otp.join("");

    if (otpString.length !== 6) {
      setError("Please enter a 6-digit verification code");
      return;
    }

    setError("");
    setSuccess("");
    setIsLoading(true);

    try {
      const result = await authService.verify({
        email: initialEmail,
        otp: otpString,
      });

      if (result.status === "success") {
        setSuccess("Email verified successfully! Redirecting to login...");

        // Wait a moment then redirect to login
        setTimeout(() => {
          router.push("/dashboard");
          router.refresh();
        }, 2000);
      } else {
        setError(result.message || "Invalid verification code");

        // Clear OTP on error
        setOtp(Array(6).fill(""));
        inputRefs.current[0]?.focus();
      }
    } catch {
      setError("Verification failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Form submission handler
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit();
  };

  return (
    <div className="space-y-6">
      {error && (
        <Alert
          type="error"
          title="Verification Failed"
          message={error}
          onClose={() => setError("")}
        />
      )}

      {success && <Alert type="success" title="Success!" message={success} />}

      <form onSubmit={onSubmit} className="space-y-6">
        {/* Hidden email field */}
        <input type="hidden" name="email" value={initialEmail} />

        {/* OTP Input Fields */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            6-digit verification code
          </label>
          <div className="flex justify-center space-x-2 sm:space-x-3">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => {
                    inputRefs.current[index] = el;
                }}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                disabled={isLoading}
                className="w-12 h-12 sm:w-14 sm:h-14 text-center text-2xl font-bold border-gray-400 text-gray-900 border rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label={`Digit ${index + 1} of 6 digit verification code`}
              />
            ))}
          </div>
          <p className="mt-2 text-sm text-gray-500 text-center">
            Enter the 6-digit code from your email
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button
            type="submit"
            size="lg"
            fullWidth
            loading={isLoading}
            disabled={isLoading || otp.join("").length !== 6}
          >
            {isLoading ? "Verifying..." : "Verify Email"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default VerifyForm;
