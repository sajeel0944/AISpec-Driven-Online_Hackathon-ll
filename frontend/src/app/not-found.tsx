import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-6 text-center">
      <h1 className="text-6xl font-extrabold text-gray-800">404</h1>

      <p className="mt-4 text-xl font-semibold text-gray-700">
        Page Not Found
      </p>

      <p className="mt-2 max-w-md text-gray-500">
        Sorry, the page you are looking for does not exist or has been moved.
      </p>

      <div className="mt-6 flex gap-4">
        <Link
          href="/"
          className="rounded-lg bg-blue-600 px-6 py-2 text-white transition hover:bg-blue-700"
        >
          Go Home
        </Link>

        <Link
          href="/login"
          className="rounded-lg border border-gray-300 px-6 py-2 text-gray-700 transition hover:bg-gray-100"
        >
          Login
        </Link>
      </div>
    </div>
  );
}
