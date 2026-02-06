// lib/auth/auth.service.ts
import ApiClient from "../../api/todo/client";
import {
  RegisterRequest,
  LoginRequest,
  VerifyRequest,
  AuthResponse,
  User,
} from "../../types/auth.types";

class AuthService {
  private api = ApiClient.getInstance();

  async register(data: RegisterRequest): Promise<AuthResponse> {
    try {
      const response = await this.api.post("/register", data);

      if (response.data.status === "error") {
        throw new Error(response.data.message);
      }

      return {
        status: "success",
        message: response.data.message,
        data: response.data.data,
      };
    } catch {
      return {
        status: "error",
        message:
          "Registration failed",
      };
    }
  }

  async login(data: LoginRequest): Promise<AuthResponse> {
    try {
      const response = await this.api.post("/login", data);

      if (response.data.status === "error") {
        throw new Error(response.data.message);
      }

      // Store tokens if available
      if (response.data?.data) {
        document.cookie = `token=${response.data.data.id}; path=/;`;
      }
      if (response.data?.data) {
        localStorage.setItem("user", JSON.stringify(response.data.data));
      }

      return {
        status: "success",
        message: response.data.message,
        data: response.data.data,
      };
    } catch {
      return {
        status: "error",
        message: "Login failed",
      };
    }
  }

  async verify(data: VerifyRequest): Promise<AuthResponse> {
    try {
      const response = await this.api.post("/verify", data);

      if (response.data.status === "error") {
        throw new Error(response.data.message);
      }

      // If verification is successful, set token if provided
      if (response.data?.data) {
        document.cookie = `token=${response.data.data.id}; path=/;`;
        localStorage.setItem("user", JSON.stringify(response.data.data));
      }

      return {
        status: "success",
        message: response.data.message,
        data: response.data.data,
      };
    } catch {
      return {
        status: "error",
        message: "Verification failed",
      };
    }
  }

  logout(): void {
    if (typeof window !== "undefined") {
      // ✅ COOKIE DELETE
      document.cookie = "token=; Max-Age=0; path=/;";
      localStorage.removeItem("user");
    }
  }

  getCurrentUser(): User | null {
    if (typeof window === "undefined") return null;

    const userStr = localStorage.getItem("user");
    return userStr ? JSON.parse(userStr) : null;
  }

  getToken(): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("token");
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}

export default new AuthService();
