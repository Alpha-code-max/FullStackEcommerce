'use client';

import { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useUser } from '@/context/UserContext';
import { loginUser } from '@/lib/api';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [serverError, setServerError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { setUser, refreshUser } = useUser();

  const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    setLoading(true);

    const res = await fetch("http://localhost:3000/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      credentials: "include", // include cookies if your auth uses sessions
    });

    if (res.ok) {
      // ✅ Login successful
      window.location.href = "/";
    } else {
      // ❌ Login failed, show server message if available
      const data = await res.json().catch(() => ({}));
      setServerError(data.message || "Login failed");
    }
  } catch (error) {
    setServerError("An error occurred. Please try again.");
  } finally {
    setLoading(false);
  }
};



  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <Card className="w-full max-w-md bg-white/70 backdrop-blur-md border border-gray-200 shadow-xl rounded-2xl">
        <CardHeader>
          <h2 className="text-2xl font-bold text-gray-900 text-center">Welcome Back</h2>
          <p className="text-gray-500 text-sm text-center mt-2">
            Sign in to continue to your account
          </p>
        </CardHeader>

        <form onSubmit={handleLogin}>
          <CardContent className="space-y-6">
            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {serverError && <p className="text-sm text-red-500">{serverError}</p>}
          </CardContent>

          <CardFooter className="flex flex-col space-y-4">
            <Button
              type="submit"
              disabled={loading}
              className="w-full rounded-full py-5 text-base font-medium shadow-md 
              bg-gradient-to-r from-blue-500 to-indigo-600 text-white 
              hover:shadow-lg hover:from-blue-600 hover:to-indigo-700"
            >
              {loading ? 'Logging in...' : 'Log In'}
            </Button>
            <p className="text-sm text-gray-500 text-center">
              Don’t have an account?{' '}
              <Link href="/register" className="text-blue-600 hover:underline">
                Sign Up
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
