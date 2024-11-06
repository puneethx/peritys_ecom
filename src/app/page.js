"use client"
import React from 'react';
import { FaHeart, FaShoppingCart } from 'react-icons/fa';
import { useSession } from "next-auth/react";
import Image from 'next/image';
import ProductCard from './components/Card';
import Header from './components/Header';
import Footer from './components/Footer';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const [products, setProducts] = React.useState([]);
  const [bestProducts, setBestProducts] = React.useState([]);
  const [exploreProducts, setExploreProducts] = React.useState([]);
  const [categories, setCategories] = React.useState([]);
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [selectedCategory, setSelectedCategory] = React.useState(null);

  React.useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch('https://fakestoreapi.com/products/category/men%27s%20clothing');
      const data = await res.json();
      setProducts(data.map(product => ({ ...product, discount: true })));
    }
    fetchProducts();

    const fetchCategories = async () => {
      const res = await fetch('https://fakestoreapi.com/products/categories');
      const data = await res.json();
      setCategories(data);
    }
    fetchCategories();

    const fetchBestProducts = async () => {
      const res = await fetch('https://fakestoreapi.com/products?limit=4');
      const data = await res.json();
      setBestProducts(data);
    }
    fetchBestProducts();

    const fetchExploreProducts = async () => {
      const res = await fetch('https://fakestoreapi.com/products/category/jewelery');
      const data = await res.json();
      setExploreProducts(data);
    }
    fetchExploreProducts();
  }, []);

  const handleCarouselScroll = (direction) => {
    if (direction === 'left') {
      setActiveIndex(activeIndex === 0 ? products.length - 1 : activeIndex - 1);
    } else {
      setActiveIndex(activeIndex === products.length - 1 ? 0 : activeIndex + 1);
    }
  };

  const handleCategoryClick = (category) => {
    router.push(`/products/category/${category}`);
  };

  return (
    <div>
      <section className="bg-gray-100 py-8">
        <div className="container mx-auto">
          <div className="flex">
            <div className="w-1/6 pl-8 pr-8 mb-8">
              <h2 className="text-lg font-bold mb-4 text-black">Categories</h2>
              <ul>
                {categories.map((category, index) => (
                  <li 
                    key={index} 
                    className="mb-2 text-black cursor-pointer hover:text-gray-600"
                    onClick={() => handleCategoryClick(category)}
                  >
                    {category}
                  </li>
                ))}
              </ul>
            </div>
            <div className="w-5/6 pr-8">
              <div className="bg-white shadow-md rounded-md overflow-hidden mb-8">
                <div className="carousel flex">
                  <div className="carousel-item flex-shrink-0 w-full">
                    <Image 
                      src="https://phonebazaar.shop/assets/iphonebanner.svg" 
                      alt="iPhone Banner"
                      className="w-full h-64 object-cover" 
                      height={400} 
                      width={1200}
                      priority
                    />
                  </div>
                </div>
                <div className="carousel-controls flex justify-between items-center px-4 py-2">
                  <button className="text-gray-500 hover:text-gray-700" onClick={() => handleCarouselScroll('left')}>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button className="text-gray-500 hover:text-gray-700" onClick={() => handleCarouselScroll('right')}>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="mb-8 pl-8 pr-8">
            <div className="flex justify-between items-center mb-4">
              <div className="flex gap-20 items-center">
                <h2 className="text-lg font-bold text-black">Today&apos;s Flash Sales</h2>
                <div className="text-black">
                  <span className="font-bold">03</span>d :
                  <span className="font-bold">28</span>h :
                  <span className="font-bold">18</span>m :
                  <span className="font-bold">24</span>s
                </div>
              </div>
              <Link href="/products" className="text-red-500 hover:text-red-600 font-semibold">
                View All →
              </Link>
            </div>
            <div className="grid grid-cols-4 gap-4">
              {(selectedCategory
                ? products.filter((product) => product.category === selectedCategory)
                : products
              ).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
          <div className="mb-8 pl-8 pr-8">
            <div className="flex items-center">
              <div className="w-1/2">
                <h2 className="text-lg font-bold mb-4 text-black">Enhance Your Music Experience</h2>
                <p className="text-black mb-4">
                  Discover our latest audio products and accessories to elevate your music enjoyment.
                </p>
                <Link href="/products" className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md inline-block">
                  Shop Now
                </Link>
              </div>
              <div className="w-1/2">
                <Image 
                  src="https://m.media-amazon.com/images/I/710jk0KzTjL._SX679_.jpg" 
                  alt="Music Product" 
                  height={400} 
                  width={400}
                  className="w-full object-contain"
                />
              </div>
            </div>
          </div>
          <div className="mb-8 pl-8 pr-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-black">Explore Our Products</h2>
              <Link href="/products" className="text-red-500 hover:text-red-600 font-semibold">
                View All →
              </Link>
            </div>
            <div className="grid grid-cols-4 gap-4">
              {exploreProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
          <div className="mb-8 pl-8 pr-8">
            <h2 className="text-lg font-bold mb-4 text-black">New Arrival</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white shadow-md rounded-md overflow-hidden h-128">
                <Image 
                  src="https://www.concept-phones.com/wp-content/uploads/2020/11/sony-playstation-5-slim-concept-creator-letsgodigital-3-680x450.jpg" 
                  alt="New Arrival 1" 
                  className="w-full h-full object-cover" 
                  height={800} 
                  width={800}
                />
              </div>
              <div className="grid grid-cols-1 gap-4">
                <div className="bg-white shadow-md rounded-md overflow-hidden h-64">
                  <Image 
                    src="https://www.ftmodel.in/public/images/pages/best-modeling-agency-in-indore1696261326.jpg" 
                    alt="New Arrival 2" 
                    className="w-full h-full object-cover" 
                    height={400} 
                    width={400}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white shadow-md rounded-md overflow-hidden h-64">
                    <Image 
                      src="https://miro.medium.com/v2/resize:fit:750/format:webp/1*b70hpVaBiO_wlyYkDASDxQ.png" 
                      alt="New Arrival 4" 
                      className="w-full h-full object-cover" 
                      height={400} 
                      width={400}
                    />
                  </div>
                  <div className="bg-white shadow-md rounded-md overflow-hidden h-64">
                    <Image 
                      src="https://ferraricentre.com/wp-content/uploads/2024/01/652e82cd70aa6522dd785109a455904c.webp" 
                      alt="New Arrival 5" 
                      className="w-full h-full object-cover" 
                      height={400} 
                      width={400}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}