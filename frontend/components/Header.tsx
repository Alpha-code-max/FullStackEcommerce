'use client';

import { Phone, Wrench, MapPin, LogIn, UserPlus, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useAuthStore } from '@/store/authStore'; // Adjust path if needed

export function Header() {
  // Zustand store values and actions
  const { user, isAuthenticated, isLoading, loadUser, logout } = useAuthStore();
  const [menuOpen, setMenuOpen] = useState(false);

  // Auto-load user on component mount (in case page is refreshed)
  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      loadUser();
    }
  }, []); // Only run once on mount

  const handleLogout = async () => {
    const result = await logout();
    if (result.success) {
      setMenuOpen(false); // Close mobile menu
      window.location.href = '/'; // Or use router.push('/') if using Next.js navigation
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo + Brand */}
          <div className="flex items-center space-x-4">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-2 rounded-xl shadow-md">
              <Wrench className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-extrabold text-gray-900 tracking-tight">
                His Grace Buildings
              </h1>
              <p className="text-gray-500 text-xs">Building Materials &amp; Solutions</p>
            </div>
          </div>

          {/* Contact Info (hidden on small screens) */}
          <div className="hidden lg:flex items-center space-x-8 text-sm text-gray-600">
            <div className="flex items-center gap-1 hover:text-blue-600 transition-colors">
              <Phone className="w-4 h-4" />
              <span>+234 9167 454 750</span>
            </div>
            <div className="flex items-center gap-1 hover:text-blue-600 transition-colors">
              <MapPin className="w-4 h-4" />
              <span>Amansea Awka, Anambra State</span>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-6">
            {isLoading ? (
              <span className="text-gray-500 text-sm">Loading...</span>
            ) : isAuthenticated && user ? (
              <>
                <span className="text-gray-700 font-medium">Hi, {user.name || user.email}</span>
                {user.role === 'admin' && (
                  <Link href="/admin" className="text-sm text-blue-600 hover:underline">
                    Admin Dashboard
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="text-sm text-red-600 hover:underline"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="relative text-sm text-gray-600 hover:text-blue-600 transition-colors 
                  after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-blue-600 
                  after:left-0 after:-bottom-1 after:transition-all after:duration-300 hover:after:w-full"
                >
                  <div className="flex items-center gap-1">
                    <LogIn className="w-4 h-4" />
                    <span>Login</span>
                  </div>
                </Link>
                <Link
                  href="/register"
                  className="relative text-sm text-gray-600 hover:text-blue-600 transition-colors 
                  after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-blue-600 
                  after:left-0 after:-bottom-1 after:transition-all after:duration-300 hover:after:w-full"
                >
                  <div className="flex items-center gap-1">
                    <UserPlus className="w-4 h-4" />
                    <span>Sign Up</span>
                  </div>
                </Link>
              </>
            )}
          </nav>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-gray-100"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-md">
          <nav className="flex flex-col space-y-4 p-4">
            {isLoading ? (
              <span className="text-gray-500">Loading user...</span>
            ) : isAuthenticated && user ? (
              <>
                <span className="text-gray-700 font-medium">Hi, {user.name || user.email}</span>
                {user.role === 'admin' && (
                  <Link href="/admin" className="text-sm text-blue-600 hover:underline">
                    Admin Dashboard
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="text-sm text-red-600 hover:underline text-left"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="flex items-center gap-2 text-gray-600 hover:text-blue-600">
                  <LogIn className="w-4 h-4" />
                  <span>Login</span>
                </Link>
                <Link href="/register" className="flex items-center gap-2 text-gray-600 hover:text-blue-600">
                  <UserPlus className="w-4 h-4" />
                  <span>Sign Up</span>
                </Link>
              </>
            )}
            <hr />
            <div className="flex items-center gap-2 text-gray-600 text-sm">
              <Phone className="w-4 h-4" />
              <span>+234 9167 454 750</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600 text-sm">
              <MapPin className="w-4 h-4" />
              <span>Amansea Awka, Anambra State</span>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}