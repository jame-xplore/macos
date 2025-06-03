"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight, Heart } from "lucide-react";
import Header from "./Components/Header";
import Footer from "./Components/Footer";

export default function HomePage() {
  // Product categories
  const categories = ["iPhone", "Mac", "iPad", "Apple Watch", "Accessories"];

  // Featured products data
  const featuredProducts = [
    {
      id: 1,
      name: "iPhone 15 Pro",
      price: 999,
      image:
        "https://ik.imagekit.io/noname/apple-banner.png?updatedAt=1748848483409",
      category: "Smartphones",
    },
    {
      id: 2,
      name: "MacBook Air M3",
      price: 1299,
      image:
        "https://ik.imagekit.io/noname/Macbook/Macbook_air_gen4_black-Photoroom.png?updatedAt=1748929170254",
      category: "Laptops",
    },
    {
      id: 3,
      name: "iPad Pro",
      price: 799,
      image:
        "https://ik.imagekit.io/noname/Tablet/IpadPro_gen3-Photoroom.png?updatedAt=1748929233630",
      category: "Tablets",
    },
    {
      id: 4,
      name: "Apple Watch Series 9",
      price: 399,
      image:
        "https://ik.imagekit.io/noname/Watch/AppleWatch_SE-Photoroom.png?updatedAt=1748929322635",
      category: "Wearables",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header Component */}
      <Header categories={categories} />

      <main>
        {/* Hero Banner */}
        <section className="bg-gray-100 py-12 sm:py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="mb-8 md:mb-0 md:w-1/2">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block">The new</span>
                  <span className="block text-blue-600">iPhone 15 Pro</span>
                </h1>
                <p className="mt-4 max-w-lg text-xl text-gray-500">
                  Titanium. So strong. So light. So Pro.
                </p>
                <div className="mt-8 flex space-x-4">
                  <Link
                    href="/product/iphone-15-pro"
                    className="rounded-md bg-blue-600 px-6 py-3 text-base font-medium text-white hover:bg-blue-700"
                  >
                    Buy now
                  </Link>
                  <Link
                    href="/product/:id"
                    className="rounded-md border border-gray-300 bg-white px-6 py-3 text-base font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Learn more
                  </Link>
                </div>
              </div>
              <div className="md:w-1/2">
                <img
                  src="https://ik.imagekit.io/noname/apple-banner.png?updatedAt=1748849710168"
                  alt="iPhone 15 Pro"
                  className="rounded-lg object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                Featured Products
              </h2>
              <Link
                href="/product"
                className="flex items-center text-sm font-medium text-blue-600 hover:text-blue-500"
              >
                View all
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4">
              {featuredProducts.map((product) => (
                <div key={product.id} className="group relative">
                  <div className="aspect-square w-full overflow-hidden rounded-lg bg-gray-100">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover object-center transition-opacity group-hover:opacity-75"
                    />
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">
                        {/* <Link href={`/product/${product.id}`}> */}
                        <Link href={`/product/:id`}>
                          <span
                            aria-hidden="true"
                            className="absolute inset-0"
                          />
                          {product.name}
                        </Link>
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        {product.category}
                      </p>
                    </div>
                    <p className="text-sm font-medium text-gray-900">
                      ${product.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Categories Grid
        <section className="bg-gray-50 py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">
              Shop by Category
            </h2>

            <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {categories.map((category) => (
                <Link
                  key={category}
                  href={`/category/${category.toLowerCase().replace(" ", "-")}`}
                  className="flex flex-col items-center justify-center rounded-lg bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="mb-4 h-12 w-12 rounded-full bg-blue-100 p-2">
                    <img
                      src="/api/placeholder/48/48"
                      alt={category}
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-900">
                    {category}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section> */}

        {/* Promotion Banner */}
        <section className="py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="overflow-hidden rounded-2xl bg-blue-600">
              <div className="px-8 py-12 sm:px-12 lg:flex lg:items-center lg:py-20">
                <div className="lg:w-0 lg:flex-1">
                  <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                    Get 10% off your first order
                  </h2>
                  <p className="mt-4 max-w-3xl text-lg text-blue-100">
                    Sign up for our newsletter and receive exclusive offers,
                    early access to new products, and more.
                  </p>
                  <div className="mt-8 sm:flex">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="w-full rounded-md border-white px-5 py-3 text-base text-gray-900 placeholder-gray-500 focus:outline-none"
                    />
                    <div className="mt-3 sm:ml-3 sm:mt-0">
                      <button
                        type="submit"
                        className="block w-full rounded-md bg-white px-5 py-3 text-base font-medium text-blue-600 shadow hover:bg-blue-50 focus:outline-none"
                      >
                        Subscribe
                      </button>
                    </div>
                  </div>
                </div>
                <div className="mt-12 lg:ml-8 lg:mt-0 lg:flex lg:flex-1 lg:items-center">
                  <img
                    src="https://ik.imagekit.io/noname/macbook%20air%20gen3%20-%20white-Photoroom.png?updatedAt=1748882140739"
                    alt="App screenshot"
                    className="mx-auto w-full max-w-sm rounded-lg lg:w-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer Component */}
      <Footer categories={categories} />
    </div>
  );
}
