// src/lib/api.ts
export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
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

// Define the expected User type
export interface User {
  _id: string;
  email: string;
  name?: string;
  role?: "user" | "admin"; // optional but useful
}
// 🔹 Register user
export async function registerUser(payload: RegisterPayload): Promise<ApiResponse> {
  try {
    const res = await fetch("http://localhost:3000/user/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      credentials: "include", // include cookies if your auth uses sessions
    });

    const data = await res.json();

    if (!res.ok) {
      return { success: false, message: data.message || "Registration failed" };
    }

    return { success: true, data };
  } catch (err) {
    return { success: false, message: "Network error. Please try again." };
  }
}

// 🔹 Login user
export async function loginUser(payload: LoginPayload): Promise<ApiResponse> {
  try {
    const res = await fetch("http://localhost:3000/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      credentials: "include", // include cookies if your auth uses sessions
    });

    const data = await res.json();

    if (!res.ok) {
      return { success: false, message: data.message || "Registration failed" };
    }

    console.log('This data is from the login', data)
    return { success: true, data };
  } catch (err) {
    return { success: false, message: "Network error. Please try again." };
  }
}

// 🔹 Get current user details after authentication

export async function getCurrentUser(): Promise<ApiResponse<User>> {
  try {
    const res = await fetch("http://localhost:3000/user/me", {
      method: "GET",
      credentials: "include", // send cookies/session token
    });

    const json = await res.json();

    if (!res.ok) {
      return { success: false, message: json.message || "Failed to fetch user" };
    }

    console.log('this is the data from the getme', json);

    return { success: true, data: json.data as User };
  } catch (err) {
    return { success: false, message: "Network error. Please try again." };
  }
}

// 🔹 Logout user
export async function logoutUser(): Promise<ApiResponse> {
  try {
    const res = await fetch("http://localhost:3000/user/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include", // include cookies if your auth uses sessions
    });

    const data = await res.json();

    if (!res.ok) {
      return { success: false, message: data.message || "Registration failed" };
    }

    return { success: true, data };
  } catch (err) {
    return { success: false, message: "Network error. Please try again." };
  }
}
