// app/(auth)/login/page.tsx
import React from 'react';
import { Metadata } from 'next';
import LoginForm from '../../../components/auth/LoginForm';

export const metadata: Metadata = {
  title: 'Sign In - AuthApp',
  description: 'Sign in to your AuthApp account',
};

export default function LoginPage() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">Welcome back</h1>
        <p className="mt-2 text-gray-600">Sign in to your account to continue</p>
      </div>
      <LoginForm />
    </div>
  );
}