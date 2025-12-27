export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  address: string;
  role: "user" | "admin";
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
}

export interface User {
  _id: string;
  email: string;
  name?: string;
  role?: "user" | "admin";
}
