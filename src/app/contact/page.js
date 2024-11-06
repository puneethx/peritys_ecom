import React from 'react';
import Link from 'next/link';

const Contact = () => {
    return (
        <div className="container mx-auto px-32 py-16">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm mb-8">
                <Link href="/" className="hover:text-gray-600">Home</Link>
                <span>/</span>
                <span>Contact</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="contact-info">
                    <div className="call-to-us">
                        <h2 className="text-2xl font-bold mb-4">Call To Us</h2>
                        <p className="mb-2">We are available 24/7, 7 days a week.</p>
                        <p className="mb-4">Phone: +88016111122222</p>
                    </div>
                    <div className="write-to-us">
                        <h2 className="text-2xl font-bold mb-4">Write To US</h2>
                        <p className="mb-2">Fill out our form and we will contact you within 24 hours.</p>
                        <p className="mb-2">Emails: customer@exclusive.com</p>
                        <p className="mb-4">Emails: support@exclusive.com</p>
                    </div>
                </div>
                <div className="contact-form">
                    <form>
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
                                Your Name *
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
                                Your Email *
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="phone" className="block text-gray-700 font-bold mb-2">
                                Your Phone *
                            </label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="message" className="block text-gray-700 font-bold mb-2">
                                Your Message
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contact;