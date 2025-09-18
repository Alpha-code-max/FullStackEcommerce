'use client';

import { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { UserPlus2, ChevronDown } from 'lucide-react';

export default function SignupPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    address: '',
    role: 'user', // default role
  });
  const [serverError, setServerError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setServerError(null);

    if (form.password !== form.confirmPassword) {
      setServerError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`http://localhost:3000/user/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const result = await res.json();

      if (!res.ok) {
        setServerError(result.message || 'Signup failed');
      } else {
        window.location.href = '/login';
      }
    } catch (err) {
      setServerError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-100 p-6">
      <Card className="w-full max-w-md bg-white/70 backdrop-blur-md border border-gray-200 shadow-xl rounded-2xl">
        <CardHeader>
          <h2 className="text-2xl font-bold text-gray-900 text-center">Create Account</h2>
          <p className="text-gray-500 text-sm text-center mt-2">
            Join us and get started today
          </p>
        </CardHeader>

        <form onSubmit={handleSignup}>
          <CardContent className="space-y-6">
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" type="text" placeholder="John Doe" value={form.name} onChange={handleChange} required />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="you@example.com" value={form.email} onChange={handleChange} required />
            </div>

            {/* Address */}
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input id="address" type="text" placeholder="Your address" value={form.address} onChange={handleChange} required />
            </div>

            {/* Role */}
            <div className="space-y-2">
              <Label htmlFor="role" className="flex items-center gap-2">
                <UserPlus2 className="h-5 w-5 text-gray-500" />
                Role
              </Label>
              <div className="relative">
                <select
                  id="role"
                  value={form.role}
                  onChange={handleChange}
                  className="w-full appearance-none rounded-xl border border-gray-300 bg-white px-4 py-2.5 pr-10
                    text-gray-700 transition duration-200 ease-in-out
                    focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20
                    hover:border-gray-400 sm:text-sm"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                </div>
              </div>
            </div>
            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="••••••••" value={form.password} onChange={handleChange} required />
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input id="confirmPassword" type="password" placeholder="••••••••" value={form.confirmPassword} onChange={handleChange} required />
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
              {loading ? 'Signing up...' : 'Sign Up'}
            </Button>
            <p className="text-sm text-gray-500 text-center">
              Already have an account?{' '}
              <Link href="/login" className="text-blue-600 hover:underline">
                Log In
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
