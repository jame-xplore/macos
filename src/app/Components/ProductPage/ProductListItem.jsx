"use client";

import { useState } from "react";
import Link from "next/link";
import { Heart, Star, ShoppingCart } from "lucide-react";

export default function ProductListItem({ product }) {
  const [isFavorited, setIsFavorited] = useState(false);

  // Generate star rating display
  const renderRating = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <div className="flex items-center">
        {[...Array(fullStars)].map((_, i) => (
          <Star
            key={`full-${i}`}
            className="h-4 w-4 fill-yellow-400 text-yellow-400"
          />
        ))}

        {halfStar && (
          <Star
            className="h-4 w-4 fill-yellow-400 text-yellow-400"
            strokeWidth={0}
            style={{ clipPath: "inset(0 50% 0 0)" }}
          />
        )}

        {[...Array(emptyStars)].map((_, i) => (
          <Star key={`empty-${i}`} className="h-4 w-4 text-gray-300" />
        ))}

        <span className="ml-1 text-sm text-gray-500">{rating.toFixed(1)}</span>
      </div>
    );
  };

  return (
    <div className="flex flex-col sm:flex-row gap-6 border rounded-lg p-4 hover:shadow-md transition-shadow">
      {/* Product Image */}
      <div className="relative sm:w-36 md:w-48">
        <div className="aspect-square w-full overflow-hidden rounded-lg bg-gray-100">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover object-center"
          />

          {/* "New" badge */}
          {product.isNew && (
            <div className="absolute left-2 top-2">
              <span className="rounded-full bg-blue-600 px-2 py-1 text-xs font-medium text-white">
                New
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Product Details */}
      <div className="flex-1 flex flex-col">
        <div className="flex justify-between items-start">
          <div>
            <Link href={`/product/${product.id}`} className="hover:underline">
              <h3 className="text-lg font-medium text-gray-900">
                {product.name}
              </h3>
            </Link>
            <p className="mt-1 text-sm text-gray-500">{product.category}</p>
          </div>

          {/* Favorite button */}
          <button
            className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-gray-100"
            onClick={toggleFavorite}
          >
            <Heart
              className={`h-5 w-5 ${
                isFavorited ? "fill-red-500 text-red-500" : "text-gray-400"
              }`}
            />
          </button>
        </div>

        {/* Rating */}
        <div className="mt-2">{renderRating(product.rating)}</div>

        {/* Description */}
        <p className="mt-2 text-sm text-gray-600 flex-grow">
          {product.description}
        </p>

        {/* Color and Storage Options */}
        <div className="mt-3 space-y-2">
          {/* Color options */}
          {product.colors && product.colors.length > 0 && (
            <div className="flex items-center space-x-2">
              <span className="text-xs text-gray-500">Available Colors:</span>
              <div className="flex items-center space-x-1">
                {product.colors.map((color) => (
                  <div
                    key={color}
                    className="h-4 w-4 rounded-full border border-gray-200"
                    title={color}
                    style={{
                      backgroundColor:
                        color.toLowerCase() === "white"
                          ? "#ffffff"
                          : color.toLowerCase() === "space black" ||
                            color.toLowerCase() === "midnight"
                          ? "#222222"
                          : color.toLowerCase() === "space gray"
                          ? "#86868b"
                          : color.toLowerCase() === "silver"
                          ? "#e1e2e3"
                          : color.toLowerCase() === "starlight"
                          ? "#faf7f2"
                          : color.toLowerCase() === "natural titanium"
                          ? "#9c9c9c"
                          : color.toLowerCase() === "titanium blue"
                          ? "#39678C"
                          : color.toLowerCase().includes("gold")
                          ? "#FAD7BD"
                          : color.toLowerCase().includes("purple")
                          ? "#c1a5c6"
                          : color.toLowerCase().includes("yellow")
                          ? "#ffcc00"
                          : color.toLowerCase().includes("green")
                          ? "#aee1cd"
                          : color.toLowerCase().includes("pink")
                          ? "#fab1a0"
                          : color.toLowerCase().includes("red")
                          ? "#ff6961"
                          : color.toLowerCase().includes("blue")
                          ? "#99badd"
                          : color.toLowerCase().includes("orange")
                          ? "#ffb74d"
                          : "#ddd",
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Storage options */}
          {product.storage && product.storage.length > 0 && (
            <div className="flex items-center space-x-2">
              <span className="text-xs text-gray-500">Storage:</span>
              <div className="flex flex-wrap gap-2">
                {product.storage.map((size) => (
                  <span
                    key={size}
                    className="text-xs bg-gray-100 px-2 py-1 rounded"
                  >
                    {size}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Size options for watches */}
          {product.size && product.size.length > 0 && (
            <div className="flex items-center space-x-2">
              <span className="text-xs text-gray-500">Size:</span>
              <div className="flex flex-wrap gap-2">
                {product.size.map((size) => (
                  <span
                    key={size}
                    className="text-xs bg-gray-100 px-2 py-1 rounded"
                  >
                    {size}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Price and Buy Button */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-lg font-medium text-gray-900">
              ${product.price}
            </p>
            {product.inStock ? (
              <p className="text-xs text-green-600">In Stock</p>
            ) : (
              <p className="text-xs text-red-600">Out of Stock</p>
            )}
          </div>

          <div className="flex space-x-2">
            <Link
              href={`/product/${product.id}`}
              className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Details
            </Link>

            <button
              className={`flex items-center rounded-md ${
                product.inStock
                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              } px-4 py-2 text-sm font-medium`}
              disabled={!product.inStock}
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
