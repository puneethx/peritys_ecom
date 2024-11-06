"use client";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function About() {
  const stats = [
    { number: '10.5k', label: 'Sellers active our site' },
    { number: '33k', label: 'Monthly Product Sale' },
    { number: '45.5k', label: 'Customer active in our site' },
    { number: '25k', label: 'Annual gross sale in our site' }
  ];

  const teamMembers = [
    { name: 'Tom Cruise', role: 'Founder & Chairman', image: 'https://ishaastudio.com/wp-content/uploads/2016/02/ct1.jpg' },
    { name: 'Emma Watson', role: 'Managing Director', image: 'https://ktprudential.eu/wp-content/uploads/2022/01/image-contacts.png' },
    { name: 'Will Smith', role: 'Product Designer', image: 'https://spartan-networks.com/wp-content/uploads/2022/02/savvy_businessman_img2.webp' }
  ];

  return (
    <main className="container mx-auto px-8 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm mb-8">
        <Link href="/" className="hover:text-gray-600">Home</Link>
        <span>/</span>
        <span>About</span>
      </div>

      {/* Story Section */}
      <div className="grid md:grid-cols-2 gap-12 mb-16">
        <div className="space-y-6">
          <h1 className="text-4xl font-bold">Our Story</h1>
          <p className="text-gray-600">
            Launched in 2015, Exclusive is South Asia&apos;s premier online shopping 
            marketplace with an active presence in Bangladesh. Supported
            by wide range of tailored marketing, data and service solutions, 
            Exclusive has 10,500 sellers and 300 brands and serves 3
            millions customers across the region.
          </p>
          <p className="text-gray-600">
            Exclusive has more than 1 Million products to offer, growing at a 
            very fast. Exclusive offers a diverse assortment in categories 
            ranging from consumer.
          </p>
        </div>
        <div className="relative h-[400px]">
          <Image 
            src="https://img.freepik.com/free-photo/young-ladies-viewing-something-mobile-phone-while-carrying-shopping-bags_181624-41965.jpg?t=st=1730861219~exp=1730864819~hmac=016980dae466df80eb41e9948cee1f814a8876cfd1c85cf65a8f7da4ff63e0ef&w=996"
            alt="Shopping"
            fill
            className="object-cover rounded-lg"
            width={400} height={400}
          />
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
        {stats.map((stat, index) => (
          <div key={index} className="p-6 border rounded-lg text-center">
            <div className="text-3xl font-bold mb-2">{stat.number}</div>
            <div className="text-gray-600">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Team Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Meet Our Team</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="text-center">
              <div className="relative h-80 mb-4 ml-36 w-60">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover rounded-lg"
                  width={400} height={400}
                />
              </div>
              <h3 className="text-xl font-bold mb-2">{member.name}</h3>
              <p className="text-gray-600">{member.role}</p>
              <div className="flex justify-center gap-4 mt-4">
                <Link href="#" className="hover:text-gray-600">Twitter</Link>
                <Link href="#" className="hover:text-gray-600">Instagram</Link>
                <Link href="#" className="hover:text-gray-600">LinkedIn</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}