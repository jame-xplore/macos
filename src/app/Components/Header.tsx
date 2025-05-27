'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Apple, 
  Search, 
  ShoppingBag, 
  User
} from 'lucide-react';

interface HeaderProps {
  categories: string[];
}

export default function Header({ categories = [] }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="sticky top-0 z-10 bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Apple className="h-8 w-8 text-black" />
            <span className="ml-2 text-xl font-medium hidden sm:inline">Macos Store</span>
          </Link>


          {/* Navigation Links */}
          <nav className="hidden lg:block">
            <ul className="flex space-x-8">
              {categories.map((category) => (
                <li key={category}>
                  <Link 
                    href={`/category/${category.toLowerCase().replace(' ', '-')}`}
                    className="text-sm font-medium text-gray-700 hover:text-blue-600"
                  >
                    {category}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Search, Account, Cart */}
          <div className="flex items-center space-x-6">
            <div className="relative rounded-full bg-gray-100 px-3 py-2">
              <div className="flex items-center">
                <Search className="h-4 w-4 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search products..."
                  className="ml-2 bg-transparent text-sm focus:outline-none"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            <Link href="/login" className="text-gray-700 hover:text-blue-600">
              <User className="h-6 w-6" />
            </Link>
            
            <Link href="/cart" className="relative text-gray-700 hover:text-blue-600">
              <ShoppingBag className="h-6 w-6" />
              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-xs text-white">
                0
              </span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}