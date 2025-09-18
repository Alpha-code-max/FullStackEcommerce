'use client';

import { Wrench, Phone, Mail, MapPin } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-blue-600 p-3 rounded-xl shadow-md">
                <Wrench className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-2xl font-bold text-white">His Grace Supplies</h4>
            </div>
            <p className="text-gray-400 leading-relaxed max-w-lg">
              Your trusted partner for quality building materials — from cement and steel rods to
              nails, pipes, and construction tools. We deliver durability and value for every project.
            </p>
          </div>

          {/* Products */}
          <div>
            <h5 className="text-lg font-semibold text-white mb-4">Products</h5>
            <ul className="space-y-3">
              {[
                'Cement',
                'Steel Rods',
                'Pipes',
                'Nails & Fasteners',
                'Other Materials',
              ].map((item) => (
                <li
                  key={item}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h5 className="text-lg font-semibold text-white mb-4">Contact</h5>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2 hover:text-white transition-colors">
                <Phone className="w-4 h-4" />
                <span>+234 801 234 5678</span>
              </li>
              <li className="flex items-center space-x-2 hover:text-white transition-colors">
                <Mail className="w-4 h-4" />
                <span>sales@buildmartsupplies.com</span>
              </li>
              <li className="flex items-center space-x-2 hover:text-white transition-colors">
                <MapPin className="w-4 h-4" />
                <span>Onitsha, Anambra, Nigeria</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between text-sm">
          <p>&copy; {new Date().getFullYear()} His Grace Supplies. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
