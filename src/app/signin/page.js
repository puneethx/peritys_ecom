"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function SignIn() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Image */}
      <div className="hidden md:flex md:w-1/2 relative">
        <Image
          src="https://houseofcambridge.co.uk/img/SideImage.png"
          alt="Shopping Cart"
          fill
          className="object-cover"
          width={400} height={400}
        />
      </div>

      {/* Right Side - Form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-8 md:px-16">
        <div className="max-w-md w-full mx-auto">
          <h1 className="text-3xl font-bold mb-6">Log in to Exclusive</h1>
          <p className="text-gray-600 mb-8">Enter your details below</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <input
                type="text"
                placeholder="Email or Phone Number"
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
              />
            </div>

            <div>
              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-red-500 text-white px-8 py-3 rounded-lg hover:bg-red-600 transition-colors"
              >
                Log In
              </button>
              <Link href="/forgot-password" className="text-red-500 hover:text-red-600">
                Forget Password?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}