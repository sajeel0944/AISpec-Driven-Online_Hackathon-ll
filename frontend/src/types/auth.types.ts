// types/auth.types.ts
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  profilePictureURL?: string;
  isVerified: boolean;
  createdAt: Date;
}

export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  profilePictureURL?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface VerifyRequest {
  email: string;
  otp: string;
}

export interface AuthResponse {
  status: 'success' | 'error';
  message: string;
  data?: {
    user: User;
    token?: string;
    refreshToken?: string;
  };
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface Session {
  user: User;
  token: string;
  expires: Date;
}
