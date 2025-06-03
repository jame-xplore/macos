"use client";

import React, { useState, useEffect } from "react";
import {
  Heart,
  Share2,
  Star,
  Truck,
  Shield,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Plus,
  Minus,
  ShoppingCart,
  Apple,
  Smartphone,
  Monitor,
  Headphones,
  Watch,
} from "lucide-react";
import Header from "@/app/Components/Header";

// Mock data - replace with your actual data fetching

const productData = {
  id: 1,
  name: "iPhone 15 Pro",
  category: "iPhone",
  price: 999,
  originalPrice: 1099,
  rating: 4.8,
  reviewCount: 2847,
  description:
    "The iPhone 15 Pro features a stunning titanium design, the powerful A17 Pro chip, and an advanced camera system that captures incredible detail.",
  longDescription:
    "Experience the pinnacle of iPhone technology with the iPhone 15 Pro. Crafted from premium titanium, this device combines durability with elegance. The revolutionary A17 Pro chip delivers unprecedented performance for gaming, photography, and productivity. The advanced triple-camera system with 5x telephoto zoom lets you capture professional-quality photos and videos from any distance.",
  images: [
    "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&h=800&fit=crop",
    "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&h=800&fit=crop",
    "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=800&h=800&fit=crop",
    "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=800&h=800&fit=crop",
  ],
  colors: [
    { name: "Natural Titanium", value: "#8B7355", available: true },
    { name: "Blue Titanium", value: "#4A90E2", available: true },
    { name: "White Titanium", value: "#F5F5F5", available: true },
    { name: "Black Titanium", value: "#2C2C2C", available: false },
  ],
  storage: [
    { size: "128GB", price: 999, available: true },
    { size: "256GB", price: 1099, available: true },
    { size: "512GB", price: 1299, available: true },
    { size: "1TB", price: 1499, available: true },
  ],
  features: [
    {
      icon: Smartphone,
      title: "A17 Pro Chip",
      description: "The most powerful chip ever in iPhone",
    },
    {
      icon: Monitor,
      title: "ProRAW Photography",
      description: "Capture and edit professional photos",
    },
    {
      icon: Shield,
      title: "Titanium Design",
      description: "Incredibly strong and lightweight",
    },
    {
      icon: Apple,
      title: "iOS 17",
      description: "Latest features and security updates",
    },
  ],
  specifications: {
    Display: "6.1-inch Super Retina XDR OLED",
    Chip: "A17 Pro with 6-core GPU",
    Camera: "48MP Main, 12MP Ultra Wide, 12MP Telephoto",
    Battery: "Up to 23 hours video playback",
    "Water Resistance": "IP68 (6 meters for 30 minutes)",
    Connectivity: "5G, Wi-Fi 6E, Bluetooth 5.3",
  },
  inStock: true,
  isNew: true,
  shippingInfo: {
    freeShipping: true,
    estimatedDelivery: "2-3 business days",
    returnPolicy: "30-day return policy",
  },
};

const ProductDetailPage = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(productData.colors[0]);
  const [selectedStorage, setSelectedStorage] = useState(
    productData.storage[0]
  );
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("overview");

  const currentPrice = selectedStorage.price;
  const savings = productData.originalPrice - currentPrice;

  const handleQuantityChange = (action: string) => {
    if (action === "increase") {
      setQuantity((prev) => prev + 1);
    } else if (action === "decrease" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % productData.images.length);
  };

  const prevImage = () => {
    setSelectedImage(
      (prev) =>
        (prev - 1 + productData.images.length) % productData.images.length
    );
  };

  return (
    <div className="min-h-screen bg-white">
      <Header categories={["iPhone", "iPad", "Mac", "Watch", "Accessories"]} />
      {/* Breadcrumb */}
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
        <ol className="flex items-center space-x-2 text-sm">
          <li>
            <a href="/" className="text-gray-500 hover:text-gray-900">
              Home
            </a>
          </li>
          <li className="text-gray-400">/</li>
          <li>
            <a href="/product" className="text-gray-500 hover:text-gray-900">
              Product
            </a>
          </li>
          <li className="text-gray-400">/</li>
          <li>
            <a
              href={`/category/${productData.category.toLowerCase()}`}
              className="text-gray-500 hover:text-gray-900"
            >
              {productData.category}
            </a>
          </li>
          <li className="text-gray-400">/</li>
          <li className="text-gray-900 font-medium">{productData.name}</li>
        </ol>
      </nav>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16">
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
          {/* Product Images */}
          <div className="flex flex-col-reverse">
            {/* Image Thumbnails */}
            <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
              <div className="grid grid-cols-4 gap-6">
                {productData.images.map((image, index) => (
                  <button
                    key={index}
                    className={`relative h-24 bg-white rounded-md flex items-center justify-center text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4 ${
                      index === selectedImage
                        ? "ring-2 ring-blue-500"
                        : "ring-1 ring-gray-300"
                    }`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <img
                      src={image}
                      alt={`Product ${index + 1}`}
                      className="h-full w-full object-cover object-center rounded-md"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Main Image */}
            <div className="w-full relative">
              <div className="aspect-w-1 aspect-h-1 bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={productData.images[selectedImage]}
                  alt={productData.name}
                  className="w-full h-full object-center object-cover"
                />

                {/* Navigation Arrows */}
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-75 hover:bg-opacity-100 rounded-full p-2 shadow-lg transition-all"
                >
                  <ChevronLeft className="h-6 w-6 text-gray-600" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-75 hover:bg-opacity-100 rounded-full p-2 shadow-lg transition-all"
                >
                  <ChevronRight className="h-6 w-6 text-gray-600" />
                </button>
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
            {/* Product Title and Rating */}

            {/* Price */}
            <div className="mt-4">
              <div className="flex items-center space-x-4">
                <p className="text-3xl font-bold text-gray-900">
                  ${currentPrice}
                </p>
                {productData.originalPrice > currentPrice && (
                  <p className="text-xl text-gray-500 line-through">
                    ${productData.originalPrice}
                  </p>
                )}
              </div>
              <p className="mt-1 text-sm text-gray-500">
                Price includes all taxes
              </p>
            </div>

            {/* Color Selection */}
            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-900">
                Color: {selectedColor.name}
              </h3>
              <div className="mt-2 flex items-center space-x-3">
                {productData.colors.map((color) => (
                  <button
                    key={color.name}
                    className={`relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none ${
                      selectedColor.name === color.name
                        ? "ring-2 ring-blue-500"
                        : ""
                    } ${
                      !color.available ? "cursor-not-allowed opacity-50" : ""
                    }`}
                    onClick={() => color.available && setSelectedColor(color)}
                    disabled={!color.available}
                  >
                    <span className="sr-only">{color.name}</span>
                    <span
                      className="h-8 w-8 rounded-full border border-black border-opacity-10"
                      style={{ backgroundColor: color.value }}
                    />
                    {!color.available && (
                      <div className="absolute inset-0 rounded-full border-2 border-gray-300">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="h-px w-6 bg-gray-300 transform rotate-45" />
                        </div>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Storage Selection */}
            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-900">Storage</h3>
              <div className="mt-2 grid grid-cols-2 gap-3">
                {productData.storage.map((storage) => (
                  <button
                    key={storage.size}
                    className={`relative bg-white border rounded-md py-3 px-4 flex items-center justify-center text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 ${
                      selectedStorage.size === storage.size
                        ? "border-blue-500 ring-2 ring-blue-500"
                        : "border-gray-300"
                    } ${
                      !storage.available ? "cursor-not-allowed opacity-50" : ""
                    }`}
                    onClick={() =>
                      storage.available && setSelectedStorage(storage)
                    }
                    disabled={!storage.available}
                  >
                    <span className="block">
                      {storage.size}
                      <span className="block text-xs text-gray-500 font-normal">
                        ${storage.price}
                      </span>
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="mt-6">
              <div className="flex items-center space-x-4">
                <div className="flex items-center border border-gray-300 rounded-md">
                  <button
                    onClick={() => handleQuantityChange("decrease")}
                    className="p-2 hover:bg-gray-50"
                    disabled={quantity === 1}
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="px-4 py-2 text-center min-w-[3rem]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange("increase")}
                    className="p-2 hover:bg-gray-50"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>

                <button className="flex-1 bg-blue-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Add to Cart
                </button>

                <button className="bg-white border border-gray-300 rounded-md py-3 px-3 flex items-center justify-center text-gray-400 hover:bg-gray-50 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  <Share2 className="h-6 w-6" />
                </button>
              </div>
            </div>

            {/* Shipping Info */}
            <div className="mt-6 border-t border-gray-200 pt-6">
              <div className="space-y-3">
                <div className="flex items-center">
                  <Truck className="h-5 w-5 text-green-600 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Free Shipping
                    </p>
                    <p className="text-sm text-gray-500">
                      Estimated delivery:{" "}
                      {productData.shippingInfo.estimatedDelivery}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <RotateCcw className="h-5 w-5 text-blue-600 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Easy Returns
                    </p>
                    <p className="text-sm text-gray-500">
                      {productData.shippingInfo.returnPolicy}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Shield className="h-5 w-5 text-purple-600 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Warranty
                    </p>
                    <p className="text-sm text-gray-500">
                      1-year limited warranty
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {["overview", "specifications"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm capitalize ${
                    activeTab === tab
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>

          <div className="mt-8">
            {activeTab === "overview" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Description
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {productData.longDescription}
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Key Features
                  </h3>
                  <div className="space-y-4">
                    {productData.features.map((feature, index) => (
                      <div key={index} className="flex items-start">
                        <feature.icon className="h-6 w-6 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-medium text-gray-900">
                            {feature.title}
                          </h4>
                          <p className="text-sm text-gray-600">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "specifications" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                {Object.entries(productData.specifications).map(
                  ([key, value]) => (
                    <div key={key} className="border-b border-gray-200 pb-4">
                      <dt className="font-medium text-gray-900">{key}</dt>
                      <dd className="mt-1 text-gray-600">{value}</dd>
                    </div>
                  )
                )}
              </div>
            )}

            {activeTab === "reviews" && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-medium text-gray-900">
                    Customer Reviews
                  </h3>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700">
                    Write a Review
                  </button>
                </div>

                <div className="bg-gray-50 rounded-lg p-6 mb-6">
                  <div className="flex items-center">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < Math.floor(productData.rating)
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="ml-3 text-lg font-medium text-gray-900">
                      {productData.rating} out of 5
                    </p>
                  </div>
                  <p className="mt-1 text-sm text-gray-600">
                    Based on {productData.reviewCount} reviews
                  </p>
                </div>

                <div className="space-y-6">
                  {/* Sample reviews - replace with real data */}
                  {[1, 2, 3].map((review) => (
                    <div key={review} className="border-b border-gray-200 pb-6">
                      <div className="flex items-center mb-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className="h-4 w-4 text-yellow-400 fill-current"
                            />
                          ))}
                        </div>
                        <span className="ml-2 text-sm font-medium text-gray-900">
                          John D.
                        </span>
                        <span className="ml-2 text-sm text-gray-500">
                          2 days ago
                        </span>
                      </div>
                      <p className="text-gray-600">
                        Amazing product! The build quality is exceptional and
                        the performance is outstanding. Highly recommend this to
                        anyone looking for a premium device.
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductDetailPage;
