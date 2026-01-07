// app/(auth)/layout.tsx
import React from 'react';
import Link from 'next/link';
import { Card } from '../../components/ui/Card';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex flex-col">
      {/* Header */}
      <header className="py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Link href="/" className="flex items-center space-x-3 w-fit">
            <div className="h-10 w-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xl">A</span>
            </div>
            <span className="text-2xl font-bold text-gray-900">AuthApp</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-lg">
          <Card padding="lg" className="shadow-2xl border-0">
            {children}
          </Card>
          
          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-xs text-gray-500">
              By continuing, you agree to our{' '}
              <Link href="/terms" className="font-medium text-blue-600 hover:text-blue-500">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link href="/privacy" className="font-medium text-blue-600 hover:text-blue-500">
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>
      </main>

      {/* Global Footer */}
      <footer className="py-6 px-4 sm:px-6 lg:px-8 border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto">
          <p className="text-center text-sm text-gray-500">
            © {new Date().getFullYear()} AuthApp. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}