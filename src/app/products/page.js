"use client"
import { useState, useEffect } from 'react'
import { FaHeart, FaShoppingCart } from 'react-icons/fa'
// import { useSession } from "next-auth/react"
import Image from 'next/image';
// import { useCart } from '../context/CartContext'

export default function ProductsPage() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
//   const { data: session } = useSession()
//   const { addToCart } = useCart()

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch('https://fakestoreapi.com/products')
      const data = await res.json()
      setProducts(data)
    }
    fetchProducts()

    const fetchCategories = async () => {
      const res = await fetch('https://fakestoreapi.com/products/categories')
      const data = await res.json()
      setCategories(data)
    }
    fetchCategories()
  }, [])

  return (
    <div>
      <section className="px-8 bg-gray-100 py-8">
        <div className="container mx-auto">
          <h2 className="text-lg font-bold mb-4">All Products</h2>
          <div className="grid grid-cols-5 gap-4">
            {products.map((product) => (
              <div key={product.id} className="bg-white shadow-md rounded-md overflow-hidden">
                <Image src={product.image} alt={product.title} className="w-full h-40 object-contain" />
                <div className="p-4">
                  <h3 className="text-lg font-bold mb-2">{product.title}</h3>
                  <p className="text-gray-600 mb-4">${product.price}</p>
                  <div className="flex justify-between items-center">
                    <button
                      onClick={() => addToCart(product)}
                      className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md"
                    >
                      Add to Cart
                    </button>
                    <button className="text-gray-400 hover:text-gray-600">
                      <FaHeart size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}