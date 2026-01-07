import { VerifyRequest } from '@/types/auth.types';
import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:5000';

export async function POST(request: NextRequest) {
  try {
    const body: VerifyRequest = await request.json();

    if (!body.email || !body.otp) {
      return NextResponse.json(
        { status: 'error', message: 'Email and OTP are required' },
        { status: 400 }
      );
    }

    const response = await fetch(`${BACKEND_URL}/verify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Verify error:', error);
    return NextResponse.json(
      { status: 'error', message: 'Verification failed' },
      { status: 500 }
    );
  }
}