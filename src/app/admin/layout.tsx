"use client";
import Link from 'next/link';
import { useState } from 'react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 right-0 z-50 w-64 bg-gray-800 text-white transition-all duration-300 transform ${
          isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
        } md:translate-x-0`}
      >
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">لوحة الإدارة</h2>
            <button
              className="md:hidden text-white focus:outline-none"
              onClick={() => setIsSidebarOpen(false)}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            <li>
              <Link
                href="/admin/dashboard"
                className="block py-2 px-4 rounded hover:bg-gray-700 transition-colors"
              >
                الرئيسية
              </Link>
            </li>
            <li>
              <Link
                href="/admin/wallets"
                className="block py-2 px-4 rounded hover:bg-gray-700 transition-colors"
              >
                المحافظ الإلكترونية
              </Link>
            </li>
            <li>
              <Link
                href="/admin/banks"
                className="block py-2 px-4 rounded hover:bg-gray-700 transition-colors"
              >
                البنوك
              </Link>
            </li>
            <li>
              <Link
                href="/admin/services"
                className="block py-2 px-4 rounded hover:bg-gray-700 transition-colors"
              >
                الخدمات
              </Link>
            </li>
            <li>
              <Link
                href="/admin/users"
                className="block py-2 px-4 rounded hover:bg-gray-700 transition-colors"
              >
                المستخدمين
              </Link>
            </li>
            <li>
              <Link
                href="/admin/statistics"
                className="block py-2 px-4 rounded hover:bg-gray-700 transition-colors"
              >
                الإحصائيات
              </Link>
            </li>
            <li className="pt-4 mt-4 border-t border-gray-700">
              <Link
                href="/"
                className="block py-2 px-4 rounded hover:bg-gray-700 transition-colors"
              >
                العودة للموقع
              </Link>
            </li>
            <li>
              <button
                className="w-full text-right py-2 px-4 rounded hover:bg-gray-700 transition-colors text-red-400"
              >
                تسجيل الخروج
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className={`md:mr-64 transition-all duration-300`}>
        {/* Header */}
        <header className="bg-white shadow-md">
          <div className="px-4 py-3 flex items-center justify-between">
            <button
              className="md:hidden text-gray-700 focus:outline-none"
              onClick={() => setIsSidebarOpen(true)}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <div className="flex items-center">
              <span className="text-gray-700 ml-2">مرحباً، المسؤول</span>
              <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                <span className="text-gray-700 font-bold">أ</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4">{children}</main>
      </div>
    </div>
  );
}
