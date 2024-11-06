import { FaShoppingCart } from 'react-icons/fa'
import ProductCard from '../../components/Card'

async function getProduct(id) {
  const res = await fetch(`https://fakestoreapi.com/products/${id}`)
  if (!res.ok) throw new Error('Failed to fetch product')
  return res.json()
}

async function getRelatedProducts(category) {
  const res = await fetch(`https://fakestoreapi.com/products/category/${encodeURIComponent(category)}`)
  if (!res.ok) throw new Error('Failed to fetch related products')
  const products = await res.json()
  
  // Filter out the current product and get random 4 products
  return products
    .sort(() => Math.random() - 0.5) // Shuffle array
    .slice(0, 4) // Get first 4 items
}

export default async function ProductDetailsPage({ params }) {
  const product = await getProduct(params.id)
  const relatedProducts = await getRelatedProducts(product.category)
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Main Product Details */}
      <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-8">
        <div className="md:flex">
          <div className="md:w-1/2">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-96 object-contain p-4"
            />
          </div>
          <div className="md:w-1/2 p-8">
            <div className="mb-4">
              <span className="text-sm text-gray-500 uppercase tracking-wide">
                {product.category}
              </span>
            </div>
            <h1 className="text-2xl font-bold text-black mb-4">{product.title}</h1>
            <p className="text-3xl font-bold text-black mb-4">${product.price}</p>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <div className="flex items-center mb-4">
              {[...Array(Math.floor(product.rating.rate))].map((_, i) => (
                <span key={i} className="text-yellow-500">⭐</span>
              ))}
              <span className="ml-2 text-gray-600">({product.rating.count} reviews)</span>
            </div>
            <form action="/api/cart" method="POST">
              <input type="hidden" name="productId" value={product.id} />
              <button 
                type="submit"
                className="bg-red-500 hover:bg-red-600 text-white py-3 px-6 rounded-md flex items-center"
              >
                <FaShoppingCart className="mr-2" />
                Add to Cart
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Related Items Section */}
      <div className="mb-8">
        <div className="border-b border-gray-200 mb-6">
          <h2 className="text-2xl font-bold text-black pb-4">Related Items</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedProducts
            .filter(relatedProduct => relatedProduct.id !== product.id)
            .map(relatedProduct => (
              <ProductCard 
                key={relatedProduct.id} 
                product={relatedProduct}
              />
            ))}
        </div>
      </div>
    </div>
  )
}

// Add loading and error states
export function loading() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      Loading...
    </div>
  )
}

export function error({ error }) {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-red-500 mb-4">Error</h2>
        <p className="text-gray-600">{error.message}</p>
      </div>
    </div>
  )
}