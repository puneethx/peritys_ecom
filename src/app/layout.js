// src/app/layout.js
import { FaHeart, FaShoppingCart } from 'react-icons/fa'
// import { useSession, signIn, signOut } from "next-auth/react"
// import { useCart } from '../context/CartContext'
import './globals.css'
import Header from "./components/Header"
import Footer from "./components/Footer"
import { CartProvider } from './context/CartContext'

export default function RootLayout({ children }) {
  // const { data: session } = useSession()
  // const { cart } = useCart()

  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  )
}