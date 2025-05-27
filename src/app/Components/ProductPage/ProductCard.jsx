'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Heart, Star } from 'lucide-react';

export default function ProductCard({ product }) {
  const [isFavorited, setIsFavorited] = useState(false);
  
  // Toggle favorite state
  const toggleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorited(!isFavorited);
  };
  
  // Generate star rating display
  const renderRating = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    
    return (
      <div className="flex items-center">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={`full-${i}`} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
        ))}
        
        {halfStar && (
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" strokeWidth={0} style={{ clipPath: 'inset(0 50% 0 0)' }} />
        )}
        
        {[...Array(emptyStars)].map((_, i) => (
          <Star key={`empty-${i}`} className="h-4 w-4 text-gray-300" />
        ))}
        
        <span className="ml-1 text-xs text-gray-500">{rating.toFixed(1)}</span>
      </div>
    );
  };

  return (
    <div className="group relative">
      <div className="aspect-square w-full overflow-hidden rounded-lg bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover object-center transition-opacity group-hover:opacity-75"
        />
        
        {/* "New" badge */}
        {product.isNew && (
          <div className="absolute left-2 top-2">
            <span className="rounded-full bg-blue-600 px-2 py-1 text-xs font-medium text-white">
              New
            </span>
          </div>
        )}
        
        {/* Favorite button */}
        <div className="absolute right-2 top-2">
          <button 
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-md hover:bg-gray-100"
            onClick={toggleFavorite}
          >
            <Heart 
              className={`h-5 w-5 ${isFavorited ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} 
            />
          </button>
        </div>
      </div>
      
      <div className="mt-4 space-y-2">
        {/* Product name and price */}
        <div className="flex justify-between">
          <h3 className="text-sm font-medium text-gray-900">
            <Link href={`/product/${product.id}`} className="hover:underline">
              <span aria-hidden="true" className="absolute inset-0" />
              {product.name}
            </Link>
          </h3>
          <p className="text-sm font-medium text-gray-900">${product.price}</p>
        </div>
        
        {/* Category */}
        <p className="text-sm text-gray-500">{product.category}</p>
        
        {/* Rating */}
        <div className="flex items-center">
          {renderRating(product.rating)}
        </div>
        
        {/* Color options preview */}
        {product.colors && product.colors.length > 0 && (
          <div className="flex items-center space-x-1">
            <span className="text-xs text-gray-500">Colors:</span>
            <div className="flex items-center space-x-1">
              {product.colors.slice(0, 3).map((color) => (
                <div 
                  key={color}
                  className="h-3 w-3 rounded-full border border-gray-200"
                  style={{ backgroundColor: color.toLowerCase() === 'white' ? '#ffffff' : 
                            color.toLowerCase() === 'space black' || color.toLowerCase() === 'midnight' ? '#222222' : 
                            color.toLowerCase() === 'space gray' ? '#86868b' :
                            color.toLowerCase() === 'silver' ? '#e1e2e3' :
                            color.toLowerCase() === 'starlight' ? '#faf7f2' :
                            color.toLowerCase() === 'natural titanium' ? '#9c9c9c' :
                            color.toLowerCase() === 'titanium blue' ? '#39678C' :
                            color.toLowerCase().includes('gold') ? '#FAD7BD' :
                            color.toLowerCase().includes('purple') ? '#c1a5c6' :
                            color.toLowerCase().includes('yellow') ? '#ffcc00' :
                            color.toLowerCase().includes('green') ? '#aee1cd' :
                            color.toLowerCase().includes('pink') ? '#fab1a0' :
                            color.toLowerCase().includes('red') ? '#ff6961' :
                            color.toLowerCase().includes('blue') ? '#99badd' :
                            color.toLowerCase().includes('orange') ? '#ffb74d' : '#ddd'
                  }}
                />
              ))}
              {product.colors.length > 3 && (
                <span className="text-xs text-gray-500">+{product.colors.length - 3} more</span>
              )}
            </div>
          </div>
        )}
        
        {/* Buy button */}
        <div className="mt-3">
          <Link 
            href={`/product/${product.id}`}
            className="block w-full rounded-md bg-blue-600 px-4 py-2 text-center text-sm font-medium text-white hover:bg-blue-700"
          >
            {product.inStock ? 'Add to Cart' : 'Out of Stock'}
          </Link>
        </div>
      </div>
    </div>
  );
}