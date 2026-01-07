// app/(auth)/register/page.tsx
import React from 'react';
import { Metadata } from 'next';
import RegisterForm from '../../../components/auth/RegisterForm';

export const metadata: Metadata = {
  title: 'Sign Up - AuthApp',
  description: 'Create a new AuthApp account',
};

export default function RegisterPage() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">Create account</h1>
        <p className="mt-2 text-gray-600">Start your journey with us</p>
      </div>
      <RegisterForm />
    </div>
  );
}