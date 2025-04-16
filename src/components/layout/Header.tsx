"use client";

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-primary text-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">
            مقارنة المحافظ الإلكترونية
          </Link>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6 rtl:space-x-reverse">
            <Link href="/" className="hover:text-secondary transition-colors">
              الرئيسية
            </Link>
            <Link href="/wallets" className="hover:text-secondary transition-colors">
              المحافظ الإلكترونية
            </Link>
            <Link href="/comparison" className="hover:text-secondary transition-colors">
              المقارنة
            </Link>
            <Link href="/recommendation" className="hover:text-secondary transition-colors">
              التوصيات
            </Link>
            <Link href="/how-to-subscribe" className="hover:text-secondary transition-colors">
              كيفية الاشتراك
            </Link>
          </nav>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 space-y-3">
            <Link href="/" className="block hover:text-secondary transition-colors">
              الرئيسية
            </Link>
            <Link href="/wallets" className="block hover:text-secondary transition-colors">
              المحافظ الإلكترونية
            </Link>
            <Link href="/comparison" className="block hover:text-secondary transition-colors">
              المقارنة
            </Link>
            <Link href="/recommendation" className="block hover:text-secondary transition-colors">
              التوصيات
            </Link>
            <Link href="/how-to-subscribe" className="block hover:text-secondary transition-colors">
              كيفية الاشتراك
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
