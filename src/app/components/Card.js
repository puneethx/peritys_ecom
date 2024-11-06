"use client"
import Link from 'next/link'

export default function ProductCard({ product }) {
  return (
    <Link href={`/products/${product.id}`}>
      <div className="bg-white shadow-md rounded-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300">
        <div className="relative">
          <img 
            src={product.image} 
            alt={product.title} 
            className="w-full h-40 object-contain"
          />
          {product.discount && (
            <span className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-sm">
              -{Math.floor(Math.random() * 50)}%
            </span>
          )}
        </div>
        <div className="p-4">
          <h3 className="text-lg font-bold mb-2 text-black line-clamp-1">{product.title}</h3>
          <p className="text-black mb-2">${product.price}</p>
          <div className="flex items-center text-yellow-500 mb-2">
            {[...Array(Math.floor(product.rating.rate))].map((_, i) => (
              <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="text-gray-500 ml-2">({product.rating.count})</span>
          </div>
          <button
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md w-full"
            onClick={(e) => {
              e.preventDefault();
              // Add to cart logic here
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </Link>
  )
}