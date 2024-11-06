"use client"
import React from 'react';
import { CartProvider, useCart } from '../context/CartContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaTrash } from 'react-icons/fa';

function CartContents() {
    const {
        cart = [],
        apiCart = [],
        cartTotal = 0,
        loading = true,
        error = null,
        removeFromCart,
        updateQuantity
    } = useCart() || {};
    const router = useRouter();
    if (loading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-red-500"></div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                    <strong className="font-bold">Error!</strong>
                    <span className="block sm:inline"> {error}</span>
                </div>
            </div>
        );
    }

    // Combine and merge duplicate items from both cart arrays
    const mergedCartItems = [...cart, ...apiCart].reduce((acc, item) => {
        const existingItem = acc.find(i => i.id === item.id);
        if (existingItem) {
            // If item already exists, combine quantities
            existingItem.quantity += item.quantity;
            // If one of the items is from API (has userId), preserve that information
            existingItem.userId = existingItem.userId || item.userId;
        } else {
            // If item doesn't exist, add it to accumulator
            acc.push({ ...item });
        }
        return acc;
    }, []);

    if (mergedCartItems.length === 0) {
        return (
            <div className="container mx-auto px-4 py-16">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
                    <p className="text-gray-600 mb-8">Looks like you haven't added anything to your cart yet.</p>
                    <Link
                        href="/"
                        className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                        Continue Shopping
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                        <ul className="divide-y divide-gray-200">
                            {mergedCartItems.map((item) => (
                                <li key={`${item.id}-${item.userId || 'local'}`} className="p-6">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden">
                                            <Image
                                                src={item.image}
                                                alt={item.title}
                                                className="w-full h-full object-center object-contain"
                                            />
                                        </div>

                                        <div className="ml-6 flex-1">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <h3 className="text-lg font-medium text-gray-900">
                                                        {item.title}
                                                    </h3>
                                                    <p className="mt-1 text-sm text-gray-500">
                                                        ${item.price.toFixed(2)}
                                                    </p>
                                                </div>
                                                <button
                                                    onClick={() => removeFromCart(item.id, !!item.userId)}
                                                    className="text-red-500 hover:text-red-600 p-2"
                                                >
                                                    <FaTrash />
                                                </button>
                                            </div>

                                            <div className="mt-4 flex items-center">
                                                <div className="flex items-center border rounded-md">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1), !!item.userId)}
                                                        className="p-2 text-gray-600 hover:text-gray-700 hover:bg-gray-100"
                                                    >
                                                        -
                                                    </button>
                                                    <span className="px-4 py-2 text-gray-900">
                                                        {item.quantity}
                                                    </span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1, !!item.userId)}
                                                        className="p-2 text-gray-600 hover:text-gray-700 hover:bg-gray-100"
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                                <div className="ml-auto">
                                                    <p className="text-lg font-medium text-gray-900">
                                                        ${(item.price * item.quantity).toFixed(2)}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="lg:col-span-1">
                    <div className="bg-white shadow-sm rounded-lg p-6 sticky top-4">
                        <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
                        <div className="flow-root">
                            <dl className="-my-4 text-sm divide-y divide-gray-200">
                                <div className="py-4 flex items-center justify-between">
                                    <dt className="text-gray-600">Subtotal</dt>
                                    <dd className="font-medium text-gray-900">${cartTotal.toFixed(2)}</dd>
                                </div>
                                <div className="py-4 flex items-center justify-between">
                                    <dt className="text-gray-600">Shipping</dt>
                                    <dd className="font-medium text-gray-900">Free</dd>
                                </div>
                                <div className="py-4 flex items-center justify-between">
                                    <dt className="text-base font-medium text-gray-900">Order Total</dt>
                                    <dd className="text-base font-medium text-gray-900">${cartTotal.toFixed(2)}</dd>
                                </div>
                            </dl>
                        </div>
                        <button
                            type="button"
                            onClick={() => router.push('/checkout')}
                            className="mt-6 w-full bg-red-500 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        >
                            Proceed to Checkout
                        </button>
                        <div className="mt-4 text-center">
                            <Link
                                href="/"
                                className="text-sm text-red-500 hover:text-red-600"
                            >
                                Continue Shopping
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function CartPage() {
    return (
        <CartProvider>
            <CartContents />
        </CartProvider>
    );
}