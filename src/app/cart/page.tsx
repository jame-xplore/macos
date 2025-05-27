'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Minus, 
  Plus, 
  Trash2, 
  ChevronLeft,
  ArrowRight,
  CreditCard,
  ShoppingBag
} from 'lucide-react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  quantity: number;
  color?: string;
  storage?: string;
}

export default function CartPage() {
  // Product categories (same as in HomePage for consistency)
  const categories = [
    'iPhone', 'Mac', 'iPad', 'Apple Watch', 'AirPods', 'Accessories'
  ];

  // Sample cart items - in a real app, this would come from a context or state management solution
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { 
      id: 1, 
      name: 'iPhone 15 Pro', 
      price: 999, 
      image: '/api/placeholder/120/120',
      category: 'Smartphones',
      quantity: 1,
      color: 'Space Black',
      storage: '256GB'
    },
    { 
      id: 2, 
      name: 'AirPods Pro', 
      price: 249, 
      image: '/api/placeholder/120/120',
      category: 'Audio',
      quantity: 2
    },
    { 
      id: 3, 
      name: 'Apple Watch Ultra', 
      price: 799, 
      image: '/api/placeholder/120/120',
      category: 'Wearables',
      quantity: 1,
      color: 'Titanium'
    }
  ]);

  // Shipping options
  const [shippingMethod, setShippingMethod] = useState('standard');
  const shippingOptions = {
    standard: { name: 'Standard Shipping', price: 0, days: '3-5' },
    express: { name: 'Express Shipping', price: 15, days: '1-2' }
  };

  // Calculate cart summary
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = shippingOptions[shippingMethod as keyof typeof shippingOptions].price;
  const tax = subtotal * 0.08; // Assuming 8% tax rate
  const total = subtotal + shipping + tax;

  // Update quantity handler
  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setCartItems(currentItems => 
      currentItems.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Remove item handler
  const removeItem = (id: number) => {
    setCartItems(currentItems => currentItems.filter(item => item.id !== id));
  };

  // When cart is empty
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header categories={categories} />
        <div className="flex-grow flex flex-col items-center justify-center py-16 px-4">
          <div className="text-center">
            <div className="bg-gray-100 rounded-full p-6 mx-auto w-24 h-24 flex items-center justify-center mb-6">
              <ShoppingBag className="h-12 w-12 text-gray-500" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h1>
            <p className="text-gray-500 mb-8 max-w-md">Looks like you haven't added anything to your cart yet.</p>
            <Link 
              href="/" 
              className="bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition"
            >
              Start Shopping
            </Link>
          </div>
        </div>
        <Footer categories={categories} />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header categories={categories} />
      
      <main className="flex-grow py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
          
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            {/* Cart Items Section */}
            <div className="lg:col-span-8">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
                <ul className="divide-y divide-gray-200">
                  {cartItems.map((item) => (
                    <li key={item.id} className="p-6">
                      <div className="flex items-center">
                        {/* Product Image */}
                        <div className="flex-shrink-0 w-24 h-24 bg-gray-100 rounded-md overflow-hidden">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-full h-full object-center object-cover"
                          />
                        </div>
                        
                        {/* Product Info */}
                        <div className="ml-6 flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="text-base font-medium text-gray-900">
                                <Link href={`/product/${item.id}`} className="hover:text-blue-600">
                                  {item.name}
                                </Link>
                              </h3>
                              <p className="mt-1 text-sm text-gray-500">{item.category}</p>
                              {(item.color || item.storage) && (
                                <div className="mt-1 text-sm text-gray-500">
                                  {item.color && <span>{item.color}</span>}
                                  {item.color && item.storage && <span> • </span>}
                                  {item.storage && <span>{item.storage}</span>}
                                </div>
                              )}
                            </div>
                            <p className="text-base font-medium text-gray-900">${item.price}</p>
                          </div>
                          
                          {/* Quantity & Remove Controls */}
                          <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center border border-gray-300 rounded-md">
                              <button 
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="p-2 text-gray-600 hover:text-gray-900"
                                aria-label="Decrease quantity"
                              >
                                <Minus className="h-4 w-4" />
                              </button>
                              <span className="px-4 py-2 text-gray-900">{item.quantity}</span>
                              <button 
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="p-2 text-gray-600 hover:text-gray-900"
                                aria-label="Increase quantity"
                              >
                                <Plus className="h-4 w-4" />
                              </button>
                            </div>
                            <button 
                              onClick={() => removeItem(item.id)}
                              className="text-gray-500 hover:text-red-600 flex items-center text-sm"
                            >
                              <Trash2 className="h-4 w-4 mr-1" />
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Back to Shopping */}
              <div className="mt-6">
                <Link 
                  href="/" 
                  className="text-blue-600 hover:text-blue-800 flex items-center text-sm font-medium"
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Continue Shopping
                </Link>
              </div>
            </div>
            
            {/* Order Summary Section */}
            <div className="lg:col-span-4 mt-8 lg:mt-0">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-6">Order Summary</h2>
                
                {/* Price Summary */}
                <div className="space-y-4">
                  <div className="flex justify-between text-base text-gray-600">
                    <p>Subtotal</p>
                    <p>${subtotal.toFixed(2)}</p>
                  </div>
                  
                  {/* Shipping Options */}
                  <div>
                    <p className="text-base text-gray-600 mb-2">Shipping</p>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <input 
                          id="standard-shipping" 
                          name="shipping-method" 
                          type="radio" 
                          className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                          checked={shippingMethod === 'standard'}
                          onChange={() => setShippingMethod('standard')}
                        />
                        <label htmlFor="standard-shipping" className="ml-3 text-sm text-gray-700">
                          <span className="block">{shippingOptions.standard.name} (Free)</span>
                          <span className="block text-gray-500">{shippingOptions.standard.days} business days</span>
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input 
                          id="express-shipping" 
                          name="shipping-method" 
                          type="radio" 
                          className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                          checked={shippingMethod === 'express'}
                          onChange={() => setShippingMethod('express')}
                        />
                        <label htmlFor="express-shipping" className="ml-3 text-sm text-gray-700">
                          <span className="block">{shippingOptions.express.name} (${shippingOptions.express.price})</span>
                          <span className="block text-gray-500">{shippingOptions.express.days} business days</span>
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between text-base text-gray-600">
                    <p>Estimated Tax</p>
                    <p>${tax.toFixed(2)}</p>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-4 flex justify-between text-base font-medium text-gray-900">
                    <p>Order Total</p>
                    <p>${total.toFixed(2)}</p>
                  </div>
                </div>
                
                {/* Checkout Button */}
                <div className="mt-6">
                  <Link 
                    href="/checkout" 
                    className="w-full flex items-center justify-center rounded-md border border-transparent bg-blue-600 py-3 px-4 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Proceed to Checkout
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
                
                {/* Payment Methods Banner */}
                <div className="mt-6 flex items-center justify-center">
                  <CreditCard className="h-5 w-5 text-gray-400" />
                  <span className="ml-2 text-sm text-gray-500">
                    Secure Checkout
                  </span>
                </div>
              </div>
              
              {/* Promo Code Section */}
              <div className="mt-6 bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-sm font-medium text-gray-900 mb-3">Promo Code</h3>
                <div className="flex">
                  <input
                    type="text"
                    name="promo-code"
                    id="promo-code"
                    className="block w-full rounded-l-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    placeholder="Enter promo code"
                  />
                  <button
                    type="submit"
                    className="rounded-r-md border border-l-0 border-gray-300 bg-gray-50 px-4 text-sm font-medium text-gray-700 hover:bg-gray-100"
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer categories={categories} />
    </div>
  );
}