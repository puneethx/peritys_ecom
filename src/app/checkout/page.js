"use client"
import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import Link from 'next/link';
import Image from 'next/image';

export default function CheckoutPage() {
    const { cart = [], apiCart = [], cartTotal = 0 } = useCart() || {};
    const [formData, setFormData] = useState({
        firstName: '',
        companyName: '',
        streetAddress: '',
        apartment: '',
        town: '',
        phoneNumber: '',
        emailAddress: '',
        saveInfo: false,
        paymentMethod: 'bank'
    });

    const [couponCode, setCouponCode] = useState('');
    const [formErrors, setFormErrors] = useState({});

    // Combine and merge duplicate items from both cart arrays
    const mergedCartItems = [...cart, ...apiCart].reduce((acc, item) => {
        const existingItem = acc.find(i => i.id === item.id);
        if (existingItem) {
            existingItem.quantity += item.quantity;
            existingItem.userId = existingItem.userId || item.userId;
        } else {
            acc.push({ ...item });
        }
        return acc;
    }, []);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const validateForm = () => {
        const errors = {};
        if (!formData.firstName) errors.firstName = 'First name is required';
        if (!formData.streetAddress) errors.streetAddress = 'Street address is required';
        if (!formData.town) errors.town = 'Town/City is required';
        if (!formData.phoneNumber) errors.phoneNumber = 'Phone number is required';
        if (!formData.emailAddress) errors.emailAddress = 'Email address is required';
        else if (!/\S+@\S+\.\S+/.test(formData.emailAddress)) {
            errors.emailAddress = 'Invalid email address';
        }
        return errors;
    };

    const handleApplyCoupon = () => {
        // Add coupon logic here
        console.log('Applying coupon:', couponCode);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = validateForm();

        if (Object.keys(errors).length === 0) {
            // Handle form submission
            try {
                // Add your order submission logic here
                console.log('Order submitted:', {
                    billingDetails: formData,
                    items: mergedCartItems,
                    total: cartTotal
                });
                // Redirect to success page or show confirmation
            } catch (error) {
                console.error('Error submitting order:', error);
            }
        } else {
            setFormErrors(errors);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row gap-8">
                {/* Billing Details Form */}
                <div className="w-2/3">
                    <h2 className="text-2xl font-bold mb-6">Billing Details</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="grid gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    First Name*
                                </label>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                    className={`w-full px-4 py-2 border rounded-md ${formErrors.firstName ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                />
                                {formErrors.firstName && (
                                    <p className="text-red-500 text-sm mt-1">{formErrors.firstName}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Company Name
                                </label>
                                <input
                                    type="text"
                                    name="companyName"
                                    value={formData.companyName}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Street Address*
                                </label>
                                <input
                                    type="text"
                                    name="streetAddress"
                                    value={formData.streetAddress}
                                    onChange={handleInputChange}
                                    className={`w-full px-4 py-2 border rounded-md ${formErrors.streetAddress ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                />
                                {formErrors.streetAddress && (
                                    <p className="text-red-500 text-sm mt-1">{formErrors.streetAddress}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Apartment, floor, etc. (optional)
                                </label>
                                <input
                                    type="text"
                                    name="apartment"
                                    value={formData.apartment}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Town/City*
                                </label>
                                <input
                                    type="text"
                                    name="town"
                                    value={formData.town}
                                    onChange={handleInputChange}
                                    className={`w-full px-4 py-2 border rounded-md ${formErrors.town ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                />
                                {formErrors.town && (
                                    <p className="text-red-500 text-sm mt-1">{formErrors.town}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Phone Number*
                                </label>
                                <input
                                    type="tel"
                                    name="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleInputChange}
                                    className={`w-full px-4 py-2 border rounded-md ${formErrors.phoneNumber ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                />
                                {formErrors.phoneNumber && (
                                    <p className="text-red-500 text-sm mt-1">{formErrors.phoneNumber}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Email Address*
                                </label>
                                <input
                                    type="email"
                                    name="emailAddress"
                                    value={formData.emailAddress}
                                    onChange={handleInputChange}
                                    className={`w-full px-4 py-2 border rounded-md ${formErrors.emailAddress ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                />
                                {formErrors.emailAddress && (
                                    <p className="text-red-500 text-sm mt-1">{formErrors.emailAddress}</p>
                                )}
                            </div>

                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    name="saveInfo"
                                    checked={formData.saveInfo}
                                    onChange={handleInputChange}
                                    className="h-4 w-4 text-red-500 focus:ring-red-400 border-gray-300 rounded"
                                />
                                <label className="ml-2 text-sm text-gray-700">
                                    Save this information for faster check-out next time
                                </label>
                            </div>
                        </div>

                        <div className="mt-8">
                            <h3 className="text-lg font-medium mb-4">Payment Method</h3>
                            <div className="space-y-4">
                                <div className="flex items-center">
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="bank"
                                        checked={formData.paymentMethod === 'bank'}
                                        onChange={handleInputChange}
                                        className="h-4 w-4 text-red-500 focus:ring-red-400 border-gray-300"
                                    />
                                    <label className="ml-2 text-sm text-gray-700">Bank</label>
                                </div>
                                <div className="flex items-center">
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="cash"
                                        checked={formData.paymentMethod === 'cash'}
                                        onChange={handleInputChange}
                                        className="h-4 w-4 text-red-500 focus:ring-red-400 border-gray-300"
                                    />
                                    <label className="ml-2 text-sm text-gray-700">Cash on delivery</label>
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="mt-8 w-full bg-red-500 text-white py-3 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                        >
                            Place Order
                        </button>
                    </form>
                </div>

                {/* Order Summary */}
                <div className="w-1/3">
                    <div className="bg-gray-50 rounded-lg p-6">
                        <h2 className="text-xl font-bold mb-6">Order Summary</h2>
                        <div className="space-y-4">
                            {mergedCartItems.map((item) => (
                                <div key={`${item.id}-${item.userId || 'local'}`} className="flex items-center">
                                    <div className="w-16 h-16 border border-gray-200 rounded-md overflow-hidden">
                                        <Image
                                            src={item.image}
                                            alt={item.title}
                                            className="w-full h-full object-center object-contain"
                                        />
                                    </div>
                                    <div className="ml-4 flex-1">
                                        <h3 className="text-sm font-medium">{item.title}</h3>
                                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                        <p 
                                        className="text-sm font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-6">
                            <div className="flex items-center space-x-2">
                                <input
                                    type="text"
                                    value={couponCode}
                                    onChange={(e) => setCouponCode(e.target.value)}
                                    placeholder="Coupon Code"
                                    className="flex-1 px-4 py-2 border border-gray-300 rounded-md"
                                />
                                <button
                                    onClick={handleApplyCoupon}
                                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                                >
                                    Apply
                                </button>
                            </div>
                        </div>

                        <div className="mt-6 space-y-4">
                            <div className="flex justify-between text-sm">
                                <span>Subtotal</span>
                                <span>${cartTotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span>Shipping</span>
                                <span>Free</span>
                            </div>
                            <div className="flex justify-between text-base font-medium border-t border-gray-200 pt-4">
                                <span>Total</span>
                                <span>${cartTotal.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}