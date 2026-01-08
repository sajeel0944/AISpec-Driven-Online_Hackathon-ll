import VerifyForm from "@/components/auth/VerifyForm";
import { redirect } from "next/navigation";

export default function VerifyPage(props: unknown) {
  const { searchParams } = props as { searchParams?: Record<string, string | string[] | undefined> };
  const emailParam = Array.isArray(searchParams?.email)
    ? searchParams?.email[0]
    : searchParams?.email;

  if (!emailParam) {
    redirect("/register");
  }

  const email = emailParam ?? null;

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">Verify your email</h1>
        <p className="mt-2 text-gray-600">
          Enter the 6-digit verification code sent to your email
        </p>
        <div className="mt-4 inline-flex items-center px-4 py-2 rounded-full bg-blue-50 text-blue-700 text-sm">
          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
          </svg>
          <span className="font-medium">{email}</span>
        </div>
      </div>

      <VerifyForm initialEmail={String(email)} />

      <div className="text-center text-sm text-gray-600">
        <p>
          Already verified?{" "}
          <a
            href="/login"
            className="font-medium text-blue-600 hover:text-blue-500 transition-colors"
          >
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}
