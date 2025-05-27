'use client';

import { useState, useEffect } from 'react';
import { Filter, ChevronDown, ArrowUpDown, Heart, Grid, List, ChevronLeft, ChevronRight } from 'lucide-react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import ProductCard from '../Components/ProductPage/ProductCard';
import ProductListItem from '../Components/ProductPage/ProductListItem';

export default function ProductPage() {
  // Product categories (same as in HomePage)
  const categories = [
    'iPhone', 'Mac', 'iPad', 'Apple Watch', 'AirPods', 'Accessories'
  ];

  // All products data
  const allProducts = [
    { 
      id: 1, 
      name: 'iPhone 15 Pro', 
      price: 999, 
      image: '/api/placeholder/400/400',
      category: 'iPhone',
      colors: ['Silver', 'Space Black', 'Titanium Blue', 'Natural Titanium'],
      storage: ['128GB', '256GB', '512GB', '1TB'],
      rating: 4.8,
      inStock: true,
      isNew: true,
      description: 'The iPhone 15 Pro is a significant upgrade featuring a titanium design, A17 Pro chip, and an advanced camera system.'
    },
    { 
      id: 2, 
      name: 'iPhone 15', 
      price: 799, 
      image: '/api/placeholder/400/400',
      category: 'iPhone',
      colors: ['Pink', 'Yellow', 'Green', 'Blue', 'Black'],
      storage: ['128GB', '256GB', '512GB'],
      rating: 4.7,
      inStock: true,
      isNew: true,
      description: 'The iPhone 15 features the innovative Dynamic Island, a 48MP camera, and the powerful A16 Bionic chip.'
    },
    { 
      id: 3, 
      name: 'iPhone 14 Pro', 
      price: 899, 
      image: '/api/placeholder/400/400',
      category: 'iPhone',
      colors: ['Silver', 'Gold', 'Space Black', 'Deep Purple'],
      storage: ['128GB', '256GB', '512GB', '1TB'],
      rating: 4.6,
      inStock: true,
      isNew: false,
      description: 'The iPhone 14 Pro features Dynamic Island, always-on display, and a 48MP main camera.'
    },
    { 
      id: 4, 
      name: 'MacBook Air M3', 
      price: 1299, 
      image: '/api/placeholder/400/400',
      category: 'Mac',
      colors: ['Silver', 'Space Gray', 'Starlight', 'Midnight'],
      storage: ['256GB', '512GB', '1TB'],
      rating: 4.9,
      inStock: true,
      isNew: true,
      description: 'The MacBook Air with M3 chip delivers incredible performance and all-day battery life in a thin and light design.'
    },
    { 
      id: 5, 
      name: 'MacBook Pro 14"', 
      price: 1999, 
      image: '/api/placeholder/400/400',
      category: 'Mac',
      colors: ['Silver', 'Space Gray'],
      storage: ['512GB', '1TB', '2TB'],
      rating: 4.8,
      inStock: true,
      isNew: true,
      description: 'The 14-inch MacBook Pro features M3 Pro or M3 Max chips, a Liquid Retina XDR display, and exceptional battery life.'
    },
    { 
      id: 6, 
      name: 'iMac 24"', 
      price: 1499, 
      image: '/api/placeholder/400/400',
      category: 'Mac',
      colors: ['Blue', 'Green', 'Pink', 'Silver', 'Yellow', 'Orange', 'Purple'],
      storage: ['256GB', '512GB', '1TB'],
      rating: 4.7,
      inStock: true,
      isNew: false,
      description: 'The 24-inch iMac features a stunning 4.5K Retina display, M3 chip, and a strikingly thin design.'
    },
    { 
      id: 7, 
      name: 'iPad Pro', 
      price: 799, 
      image: '/api/placeholder/400/400',
      category: 'iPad',
      colors: ['Silver', 'Space Gray'],
      storage: ['128GB', '256GB', '512GB', '1TB', '2TB'],
      rating: 4.8,
      inStock: true,
      isNew: true,
      description: 'The iPad Pro features the M2 chip, 12.9-inch Liquid Retina XDR display, and Thunderbolt connectivity.'
    },
    { 
      id: 8, 
      name: 'iPad Air', 
      price: 599, 
      image: '/api/placeholder/400/400',
      category: 'iPad',
      colors: ['Space Gray', 'Starlight', 'Pink', 'Purple', 'Blue'],
      storage: ['64GB', '256GB'],
      rating: 4.7,
      inStock: true,
      isNew: false,
      description: 'The iPad Air features the M1 chip, a 10.9-inch Liquid Retina display, and Touch ID in the top button.'
    },
    { 
      id: 9, 
      name: 'Apple Watch Series 9', 
      price: 399, 
      image: '/api/placeholder/400/400',
      category: 'Apple Watch',
      colors: ['Starlight', 'Midnight', 'Silver', 'Red', 'Pink'],
      size: ['41mm', '45mm'],
      rating: 4.8,
      inStock: true,
      isNew: true,
      description: 'Apple Watch Series 9 features a new S9 chip, Double Tap gesture, and a brighter Always-On display.'
    },
    { 
      id: 10, 
      name: 'Apple Watch Ultra 2', 
      price: 799, 
      image: '/api/placeholder/400/400',
      category: 'Apple Watch',
      colors: ['Natural Titanium'],
      size: ['49mm'],
      rating: 4.9,
      inStock: true,
      isNew: true,
      description: 'Apple Watch Ultra 2 features a rugged titanium case, precision dual-frequency GPS, and up to 36 hours of battery life.'
    },
    { 
      id: 11, 
      name: 'AirPods Pro (2nd Gen)', 
      price: 249, 
      image: '/api/placeholder/400/400',
      category: 'AirPods',
      colors: ['White'],
      rating: 4.7,
      inStock: true,
      isNew: true,
      description: 'AirPods Pro feature active noise cancellation, adaptive transparency, and personalized spatial audio.'
    },
    { 
      id: 12, 
      name: 'AirPods (3rd Gen)', 
      price: 169, 
      image: '/api/placeholder/400/400',
      category: 'AirPods',
      colors: ['White'],
      rating: 4.6,
      inStock: true,
      isNew: false,
      description: 'AirPods (3rd generation) feature spatial audio with dynamic head tracking and a contoured design.'
    },
    { 
      id: 13, 
      name: 'MagSafe Charger', 
      price: 39, 
      image: '/api/placeholder/400/400',
      category: 'Accessories',
      colors: ['White'],
      rating: 4.5,
      inStock: true,
      isNew: false,
      description: 'The MagSafe Charger maintains compatibility with Qi charging, so it can be used to wirelessly charge your iPhone.'
    },
    { 
      id: 14, 
      name: 'Magic Keyboard', 
      price: 99, 
      image: '/api/placeholder/400/400',
      category: 'Accessories',
      colors: ['White', 'Black'],
      rating: 4.7,
      inStock: true,
      isNew: false,
      description: 'Magic Keyboard combines a sleek design with a built-in rechargeable battery and enhanced key features.'
    },
    { 
      id: 15, 
      name: 'AirTag', 
      price: 29, 
      image: '/api/placeholder/400/400',
      category: 'Accessories',
      colors: ['White'],
      rating: 4.8,
      inStock: true,
      isNew: false,
      description: 'AirTag is a super easy way to keep track of your stuff. Attach one to your keys, slip another in your backpack.'
    },
    { 
      id: 16, 
      name: 'Apple Pencil (2nd Gen)', 
      price: 129, 
      image: '/api/placeholder/400/400',
      category: 'Accessories',
      colors: ['White'],
      rating: 4.8,
      inStock: true,
      isNew: false,
      description: 'Apple Pencil (2nd generation) delivers pixel-perfect precision and industry-leading low latency for creative professionals.'
    }
  ];

  // State variables
  const [products, setProducts] = useState(allProducts);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [sortOption, setSortOption] = useState('featured');
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  
  // Filter states
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedColors, setSelectedColors] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 2000 });
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [onlyNew, setOnlyNew] = useState(false);

  // All color options from products
  const allColors = [...new Set(allProducts.flatMap(product => product.colors || []))];
  
  // Pagination
  const productsPerPage = 8;
  const totalPages = Math.ceil(products.length / productsPerPage);
  const currentProducts = products.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  // Apply filters and sorting
  useEffect(() => {
    let filteredProducts = [...allProducts];
    
    // Apply category filter
    if (selectedCategory) {
      filteredProducts = filteredProducts.filter(product => product.category === selectedCategory);
    }
    
    // Apply color filter
    if (selectedColors.length > 0) {
      filteredProducts = filteredProducts.filter(product => 
        product.colors && product.colors.some(color => selectedColors.includes(color))
      );
    }
    
    // Apply price range filter
    filteredProducts = filteredProducts.filter(product => 
      product.price >= priceRange.min && product.price <= priceRange.max
    );
    
    // Apply in stock filter
    if (onlyInStock) {
      filteredProducts = filteredProducts.filter(product => product.inStock);
    }
    
    // Apply new products filter
    if (onlyNew) {
      filteredProducts = filteredProducts.filter(product => product.isNew);
    }
    
    // Apply sorting
    switch (sortOption) {
      case 'price-low':
        filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'rating':
        filteredProducts.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filteredProducts.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      default: // 'featured' - no specific sort, use default order
        break;
    }
    
    setProducts(filteredProducts);
    setCurrentPage(1); // Reset to first page when filters change
  }, [selectedCategory, selectedColors, priceRange, onlyInStock, onlyNew, sortOption]);

  // Handle color selection
  const handleColorToggle = (color) => {
    setSelectedColors(prevSelected => 
      prevSelected.includes(color)
        ? prevSelected.filter(c => c !== color)
        : [...prevSelected, color]
    );
  };

  // Handle price range change
  const handlePriceChange = (type, value) => {
    setPriceRange(prev => ({
      ...prev,
      [type]: parseInt(value, 10) || 0
    }));
  };

  // Reset all filters
  const resetFilters = () => {
    setSelectedCategory('');
    setSelectedColors([]);
    setPriceRange({ min: 0, max: 2000 });
    setOnlyInStock(false);
    setOnlyNew(false);
    setSortOption('featured');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header Component */}
      <Header categories={categories} />
      
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="border-b border-gray-200 pb-6">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">All Products</h1>
          <p className="mt-2 text-sm text-gray-500">
            {products.length} {products.length === 1 ? 'product' : 'products'} available
          </p>
        </div>
        
        {/* Filters and Sort */}
        <div className="pt-6 pb-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Mobile Filter Button */}
            <div className="md:hidden">
              <button
                type="button"
                className="flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="mr-2 h-4 w-4" />
                {showFilters ? 'Hide Filters' : 'Show Filters'}
              </button>
            </div>
            
            {/* Desktop Filters */}
            <div className="hidden md:flex md:items-center md:gap-x-4">
              <div className="flex items-center">
                <span className="mr-2 text-sm font-medium text-gray-700">Category:</span>
                <select
                  className="rounded-md border border-gray-300 py-1.5 pl-3 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="">All Categories</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="flex items-center">
                <span className="mr-2 text-sm font-medium text-gray-700">Sort by:</span>
                <select
                  className="rounded-md border border-gray-300 py-1.5 pl-3 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="name-asc">Name: A to Z</option>
                  <option value="name-desc">Name: Z to A</option>
                  <option value="rating">Highest Rated</option>
                  <option value="newest">Newest First</option>
                </select>
              </div>
              
              <button
                className="text-sm text-blue-600 hover:text-blue-800"
                onClick={resetFilters}
              >
                Reset Filters
              </button>
            </div>
            
            {/* View toggle and sort (mobile) */}
            <div className="flex items-center justify-between gap-4">
              <div className="flex md:hidden items-center">
                <span className="mr-2 text-sm font-medium text-gray-700">Sort:</span>
                <select
                  className="rounded-md border border-gray-300 py-1.5 pl-3 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>
              
              <div className="flex border rounded-md">
                <button
                  className={`p-2 ${viewMode === 'grid' ? 'bg-gray-100' : 'bg-white'}`}
                  onClick={() => setViewMode('grid')}
                >
                  <Grid className="h-5 w-5 text-gray-600" />
                </button>
                <button
                  className={`p-2 ${viewMode === 'list' ? 'bg-gray-100' : 'bg-white'}`}
                  onClick={() => setViewMode('list')}
                >
                  <List className="h-5 w-5 text-gray-600" />
                </button>
              </div>
            </div>
          </div>
          
          {/* Mobile Filters Panel */}
          {showFilters && (
            <div className="mt-4 border rounded-md p-4 md:hidden">
              <div className="space-y-6">
                {/* Category filter */}
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Category</h3>
                  <select
                    className="mt-2 w-full rounded-md border border-gray-300 py-1.5 pl-3 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    <option value="">All Categories</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
                
                {/* Color filter */}
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Color</h3>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {allColors.map((color) => (
                      <button
                        key={color}
                        className={`px-3 py-1 text-xs rounded-full ${
                          selectedColors.includes(color)
                            ? 'bg-blue-100 text-blue-800 border-blue-300'
                            : 'bg-gray-100 text-gray-800 border-gray-200'
                        } border`}
                        onClick={() => handleColorToggle(color)}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Price Range */}
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Price Range</h3>
                  <div className="mt-2 flex items-center space-x-4">
                    <div className="flex items-center">
                      <span className="mr-2 text-xs text-gray-500">$</span>
                      <input
                        type="number"
                        min="0"
                        max={priceRange.max}
                        value={priceRange.min}
                        onChange={(e) => handlePriceChange('min', e.target.value)}
                        className="w-20 rounded-md border border-gray-300 py-1 px-2 text-sm"
                      />
                    </div>
                    <span className="text-xs text-gray-500">to</span>
                    <div className="flex items-center">
                      <span className="mr-2 text-xs text-gray-500">$</span>
                      <input
                        type="number"
                        min={priceRange.min}
                        value={priceRange.max}
                        onChange={(e) => handlePriceChange('max', e.target.value)}
                        className="w-20 rounded-md border border-gray-300 py-1 px-2 text-sm"
                      />
                    </div>
                  </div>
                </div>
                
                {/* Availability filters */}
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      id="in-stock-mobile"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      checked={onlyInStock}
                      onChange={() => setOnlyInStock(!onlyInStock)}
                    />
                    <label htmlFor="in-stock-mobile" className="ml-3 text-sm text-gray-600">
                      In Stock Only
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="new-arrivals-mobile"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      checked={onlyNew}
                      onChange={() => setOnlyNew(!onlyNew)}
                    />
                    <label htmlFor="new-arrivals-mobile" className="ml-3 text-sm text-gray-600">
                      New Arrivals Only
                    </label>
                  </div>
                </div>
                
                <button
                  className="w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                  onClick={() => setShowFilters(false)}
                >
                  Apply Filters
                </button>
              </div>
            </div>
          )}
        </div>
        
        <div className="lg:grid lg:grid-cols-4 lg:gap-x-8">
          {/* Desktop Filter sidebar */}
          <div className="hidden lg:block">
            <div className="space-y-6 border-r pr-6">
              {/* Category filter */}
              <div>
                <h3 className="text-sm font-medium text-gray-900">Category</h3>
                <div className="mt-2 space-y-2">
                  <div className="flex items-center">
                    <input
                      id="all-categories"
                      type="radio"
                      name="category"
                      className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                      checked={selectedCategory === ''}
                      onChange={() => setSelectedCategory('')}
                    />
                    <label htmlFor="all-categories" className="ml-3 text-sm text-gray-600">
                      All Categories
                    </label>
                  </div>
                  
                  {categories.map((category) => (
                    <div key={category} className="flex items-center">
                      <input
                        id={`category-${category}`}
                        type="radio"
                        name="category"
                        className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                        checked={selectedCategory === category}
                        onChange={() => setSelectedCategory(category)}
                      />
                      <label htmlFor={`category-${category}`} className="ml-3 text-sm text-gray-600">
                        {category}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Color filter */}
              <div>
                <h3 className="text-sm font-medium text-gray-900">Color</h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {allColors.map((color) => (
                    <button
                      key={color}
                      className={`px-3 py-1 text-xs rounded-full ${
                        selectedColors.includes(color)
                          ? 'bg-blue-100 text-blue-800 border-blue-300'
                          : 'bg-gray-100 text-gray-800 border-gray-200'
                      } border`}
                      onClick={() => handleColorToggle(color)}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Price Range */}
              <div>
                <h3 className="text-sm font-medium text-gray-900">Price Range</h3>
                <div className="mt-2 space-y-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-500">$</span>
                    <input
                      type="number"
                      min="0"
                      max={priceRange.max}
                      value={priceRange.min}
                      onChange={(e) => handlePriceChange('min', e.target.value)}
                      className="w-20 rounded-md border border-gray-300 py-1 px-2 text-sm"
                    />
                    <span className="text-xs text-gray-500">to</span>
                    <span className="text-xs text-gray-500">$</span>
                    <input
                      type="number"
                      min={priceRange.min}
                      value={priceRange.max}
                      onChange={(e) => handlePriceChange('max', e.target.value)}
                      className="w-20 rounded-md border border-gray-300 py-1 px-2 text-sm"
                    />
                  </div>
                </div>
              </div>
              
              {/* Availability filters */}
              <div className="space-y-2">
                <div className="flex items-center">
                  <input
                    id="in-stock"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    checked={onlyInStock}
                    onChange={() => setOnlyInStock(!onlyInStock)}
                  />
                  <label htmlFor="in-stock" className="ml-3 text-sm text-gray-600">
                    In Stock Only
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="new-arrivals"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    checked={onlyNew}
                    onChange={() => setOnlyNew(!onlyNew)}
                  />
                  <label htmlFor="new-arrivals" className="ml-3 text-sm text-gray-600">
                    New Arrivals Only
                  </label>
                </div>
              </div>
              
              <button
                className="w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                onClick={resetFilters}
              >
                Reset All Filters
              </button>
            </div>
          </div>
          
          {/* Products Grid/List */}
          <div className="mt-6 lg:col-span-3 lg:mt-0">
            {products.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12">
                <p className="text-lg font-medium text-gray-900">No products found</p>
                <p className="mt-1 text-sm text-gray-500">Try adjusting your filters</p>
                <button
                  className="mt-4 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                  onClick={resetFilters}
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <>
                {viewMode === 'grid' ? (
                  <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3">
                    {currentProducts.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                ) : (
                  <div className="space-y-6">
                    {currentProducts.map((product) => (
                      <ProductListItem key={product.id} product={product} />
                    ))}
                  </div>
                )}
                
                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-8 flex items-center justify-center">
                    <nav className="flex items-center space-x-2" aria-label="Pagination">
                      <button
                        className={`rounded-md border ${
                          currentPage === 1
                            ? 'border-gray-200 bg-gray-100 text-gray-400'
                            : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                        } px-3 py-2`}
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(currentPage - 1)}
                      >
                        <span className="sr-only">Previous</span>
                        <ChevronLeft className="h-5 w-5" />
                      </button>
                      
                      {[...Array(totalPages)].map((_, i) => (
                        <button
                          key={i}
                          className={`px-3 py-2 rounded-md ${
                            currentPage === i + 1
                              ? 'bg-blue-600 text-white'
                              : 'bg-white text-gray-700 hover:bg-gray-50'
                          }`}
                          onClick={() => setCurrentPage(i + 1)}
                        >
                          {i + 1}
                        </button>
                      ))}
                      
                      <button
                        className={`rounded-md border ${
                          currentPage === totalPages
                            ? 'border-gray-200 bg-gray-100 text-gray-400'
                            : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                        } px-3 py-2`}
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(currentPage + 1)}
                      >
                        <span className="sr-only">Next</span>
                        <ChevronRight className="h-5 w-5" />
                      </button>
                    </nav>
                  </div>
                )}
                
              </>
            )}
          </div>
        </div>
      </main>

      {/* Footer Component */}
      <Footer categories={categories} />
    </div>
  );
}