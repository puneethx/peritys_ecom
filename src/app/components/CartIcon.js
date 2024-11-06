"use client"
import React from 'react';
import { useCart } from '../context/CartContext';
import { FaShoppingCart } from 'react-icons/fa';
import Link from 'next/link';

export function CartIcon() {
  const { cart } = useCart();
  
  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <Link href="/cart">
      <div className="relative cursor-pointer">
        <FaShoppingCart className="h-6 w-6 text-gray-700" />
        {itemCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
            {itemCount}
          </span>
        )}
      </div>
    </Link>
  );
}