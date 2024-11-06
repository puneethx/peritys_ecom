"use client"
import React from 'react';
import { useRouter } from 'next/navigation';
import { FaSearch, FaHeart, FaShoppingCart } from 'react-icons/fa';
import Link from 'next/link';

const Header = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = React.useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search functionality
    console.log('Searching for:', searchTerm);
  };

  return (
    <header className="bg-white-900 text-black py-4 px-6">
      <div className="container mx-auto flex justify-between items-center">
        <span className="text-2xl font-bold">Exclusive</span>
        <div className="flex items-center">
          <nav className="ml-40">
            <ul className="flex space-x-10 font-bold">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/contact">Contact</Link></li>
              <li><Link href="/about">About</Link></li>
              <li><Link href="/signup">Sign Up</Link></li>
            </ul>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="What are you looking for?"
              className="bg-gray-100 text-black w-64 py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit" className="absolute right-2 top-1/2 transform -translate-y-1/2">
              <FaSearch className="text-gray-500 hover:text-black" />
            </button>
          </form>
          <Link href="/wishlist" className="text-gray-500 hover:text-black">
            <FaHeart />
          </Link>
          <Link href="/cart" className="text-gray-500 hover:text-black">
            <FaShoppingCart />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;