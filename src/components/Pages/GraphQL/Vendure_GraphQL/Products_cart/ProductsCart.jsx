"use client";
import React from 'react'
import { useState, useEffect } from 'react';
import { useQuery, gql } from "@apollo/client";
import Image from 'next/image';
import { useNavbar } from '@/contexts/NavbarContext';
import { useCart } from '@/contexts/CartContext';

import Buttonv2 from '@/components/UI/Button/Buttonv2';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';
import { FaShoppingCart } from 'react-icons/fa';
import CartComponent from '@/components/UI/ShoppingCart/CartComponent';

const ProductsCart = ({ isNavbar }) => {
  const [totalItems, setTotalItems] = useState(20);
  const [page, setPage] = useState(0);
  const [expandedProducts, setExpandedProducts] = useState(new Set());
  const [mounted, setMounted] = useState(false);

  const { showNavbar, hideNavbar } = useNavbar();
  const { addToCart, cartItems, openCart } = useCart();

  useEffect(() => {
    console.log('Cart items changed:', cartItems);
  }, [cartItems]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isNavbar) {
      showNavbar();
    } else {
      hideNavbar();
    }

    return () => {
      showNavbar();
    };
  }, [isNavbar, showNavbar, hideNavbar]);

  const GET_Products = gql`
      query getProducts($takeProduct: Int, $pagination: Int){ 
        products(options: {take:$takeProduct, skip:$pagination}){
          totalItems
          items{
            id
            name
            assets{
              id
              preview
            }
            variants{
              id
              name
              price
              assets{
                id
                preview
              }
              stockLevel
            }
          }
        }
      }
    `;

  const { loading, error, data } = useQuery(GET_Products, {
    variables: { takeProduct: totalItems, pagination: page },
    skip: !mounted,
  });

  const toggleProductExpansion = (productId) => {
    const newExpanded = new Set(expandedProducts);
    if (newExpanded.has(productId)) {
      newExpanded.delete(productId);
    } else {
      newExpanded.add(productId);
    }
    setExpandedProducts(newExpanded);
  };

  const getStockDisplay = (variant) => {
    const stockLevel = variant.stockLevel;

    switch (stockLevel) {
      case "IN_STOCK":
        return "In Stock";
      case "LOW_STOCK":
        return "Low Stock";
      case "OUT_OF_STOCK":
        return "Out of Stock";
      default:
        if (typeof stockLevel === 'number' && stockLevel > 0) {
          return `Stock: ${stockLevel}`;
        }
        return "Out of Stock";
    }
  };
  const getStockLevel = (variant) => {
    if (variant.stockLevel === "IN_STOCK" || variant.stockLevel === "LOW_STOCK") {
      return 100;
    }

    if (variant.stockLevel === "OUT_OF_STOCK") {
      return 0;
    }

    if (typeof variant.stockLevel === 'number' && variant.stockLevel > 0) {
      return variant.stockLevel;
    }

    return 0;
  };

  if (!mounted || loading) {
    return (
      <div className='min-h-screen w-full p-4 sm:p-6 md:p-8 bg-gradient-to-br from-black via-black to-[#c4ca32] flex justify-center items-center'>
        <div className='text-white text-lg'>Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='min-h-screen w-full p-4 sm:p-6 md:p-8 bg-gradient-to-br from-black via-black to-[#c4ca32] flex justify-center items-center'>
        <p className='text-red-400'>Error: {error.message}</p>
      </div>
    );
  }

  const totalItemsCount = data?.products?.totalItems || 0;
  const products = data?.products?.items || [];

  if (!products.length) {
    return (
      <div className='min-h-screen w-full p-4 sm:p-6 md:p-8 bg-gradient-to-br from-black via-black to-[#c4ca32] flex justify-center items-center'>
        <div className='text-white text-lg'>No products found</div>
      </div>
    );
  }

  return (
    <div className='min-h-screen w-full bg-gradient-to-br from-black via-black to-[#c4ca32]'>
      {/* Fixed Cart Component */}
      <div className="fixed top-20 right-4 z-40">
        <CartComponent />
      </div>

      {/* Main Content */}
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6'>        {/* Filter and Search Section */}
        <div className="mb-6">
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-4 shadow-lg">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-bold text-white drop-shadow-lg">
                  Products
                </h2>
                <span className="bg-blue-500/20 text-blue-300 px-2 py-1 rounded text-sm font-medium">
                  {totalItemsCount} items
                </span>
              </div>

              <div className="flex items-center gap-3">
                <select
                  value={totalItems}
                  onChange={(e) => {
                    setTotalItems(Number(e.target.value));
                    setPage(0);
                  }}
                  className='px-3 py-2 bg-white/10 text-white border border-white/30 rounded-lg text-sm backdrop-blur-sm focus:border-blue-400/50 focus:outline-none'
                >
                  <option value={20} className='bg-gray-800 text-white'>20 per page</option>
                  <option value={50} className='bg-gray-800 text-white'>50 per page</option>
                  <option value={100} className='bg-gray-800 text-white'>100 per page</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-3 gap-4'>
          {products.map(product => {
            const isExpanded = expandedProducts.has(product.id);
            const minPrice = product.variants && product.variants.length > 0
              ? Math.min(...product.variants.map(v => v.price)) / 100
              : 0;

            return (
              <div
                key={product.id}
                className='group bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl overflow-hidden shadow-lg hover:shadow-xl hover:bg-white/15 transition-all duration-300'
              >
                <div className="relative overflow-hidden">
                  {((product.assets && product.assets.length > 0) ||
                    (product.variants && product.variants.length > 0 && product.variants[0].assets && product.variants[0].assets.length > 0)) && (
                      <div className="relative">
                        <Image
                          src={
                            product.assets && product.assets.length > 0
                              ? product.assets[0].preview
                              : product.variants[0].assets[0].preview
                          }
                          width={400}
                          height={300}
                          alt={product.name}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                          unoptimized
                        />
                        <div className="absolute top-2 left-2">
                          <span className="bg-green-500 text-white px-2 py-1 rounded-lg text-xs font-medium">
                            New
                          </span>
                        </div>
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <button
                            onClick={() => toggleProductExpansion(product.id)}
                            className="bg-white/90 text-gray-800 px-4 py-2 rounded-lg font-medium hover:bg-white transition-colors"
                          >
                            {isExpanded ? 'Hide Details' : 'Quick View'}
                          </button>
                        </div>
                      </div>
                    )}
                </div>

                <div className="p-4">
                  <div className="mb-3">
                    <h3 className="text-white font-semibold text-base mb-1 line-clamp-2 drop-shadow-lg">
                      {product.name}
                    </h3>

                    {product.variants && product.variants.length > 0 && (
                      <div className="mb-3">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xl font-bold text-green-300 drop-shadow-lg">
                            ${minPrice}
                            {product.variants.length > 1 && (
                              <span className="text-white/60 text-sm ml-1">and up</span>
                            )}
                          </span>
                          {product.variants.length > 1 && (
                            <span className="bg-blue-500/20 text-blue-300 px-2 py-1 rounded text-xs font-medium">
                              {product.variants.length} variant{product.variants.length > 1 ? 's' : ''}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${getStockLevel(product.variants[0]) > 0 ? 'bg-green-400' : 'bg-red-400'}`}></div>
                          <span className={`text-xs font-medium ${getStockLevel(product.variants[0]) > 0 ? 'text-green-300' : 'text-red-300'}`}>
                            {getStockDisplay(product.variants[0])}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>


                  <div className="space-y-2">
                    {product.variants && product.variants.length > 0 && getStockLevel(product.variants[0]) > 0 && (
                      <button
                        onClick={() => {
                          addToCart(product, product.variants[0], 1);
                          openCart();
                        }}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2"
                      >
                        <FaShoppingCart size={14} />
                        Add to Cart
                      </button>
                    )}

                    <button
                      onClick={() => toggleProductExpansion(product.id)}
                      className="w-full bg-white/10 hover:bg-white/20 text-white py-2 px-4 rounded-lg font-medium transition-all duration-300"
                    >
                      {isExpanded ? 'Hide Variants' : 'View All Variants'}
                    </button>
                  </div>
                </div>

                {isExpanded && product.variants && product.variants.length > 0 && (
                  <div className="border-t border-white/20 bg-white/5">
                    <div className="p-4">
                      <h4 className="text-white/90 font-medium mb-3 flex items-center gap-2">
                        <span>Available Variants</span>
                        <span className="bg-white/20 text-white px-2 py-1 rounded text-xs">
                          {product.variants.length}
                        </span>
                      </h4>

                      <div className="space-y-2 max-h-68 overflow-y-auto custom-scrollbar">
                        {product.variants.map((variant, index) => (
                          <div
                            key={variant.id}
                            className="bg-white/10 rounded-lg p-3 border border-white/20 hover:bg-white/15 transition-all duration-300"
                          >
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                                {variant.assets && variant.assets.length > 0 && (
                                  <Image
                                    src={variant.assets[0].preview}
                                    width={32}
                                    height={32}
                                    alt={variant.name}
                                    className="w-8 h-8 object-cover rounded border border-white/20"
                                    unoptimized
                                  />
                                )}
                                <div>
                                  <p className="text-white font-medium text-sm">{variant.name}</p>
                                  <p className="text-green-300 font-bold text-sm">${variant.price / 100}</p>
                                </div>
                              </div>

                              <div className="flex items-center gap-1">
                                <div className={`w-1.5 h-1.5 rounded-full ${getStockLevel(variant) > 0 ? 'bg-green-400' : 'bg-red-400'}`}></div>
                                <span className={`text-xs ${getStockLevel(variant) > 0 ? 'text-green-300' : 'text-red-300'}`}>
                                  {getStockLevel(variant) > 0 ? 'In Stock' : 'Out of Stock'}
                                </span>
                              </div>
                            </div>

                            {getStockLevel(variant) > 0 ? (
                              <button
                                onClick={() => {
                                  addToCart(product, variant, 1);
                                  openCart();
                                }}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2"
                              >
                                <FaShoppingCart size={12} />
                                Add This Variant
                              </button>
                            ) : (
                              <div className="w-full bg-gray-600/50 text-gray-300 py-2 px-3 rounded text-sm text-center">
                                Out of Stock
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Pagination Section */}
        <div className='mt-8'>
          <div className='bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-4 shadow-lg'>
            <div className='flex flex-col sm:flex-row justify-between items-center gap-4'>
              <div className='text-white/80 text-sm'>
                Showing {page + 1} - {Math.min(page + totalItems, totalItemsCount)} of {totalItemsCount} products
              </div>

              <div className='flex items-center space-x-3'>
                <Buttonv2
                  variant="transparent"
                  Icon={FaChevronLeft}
                  onClick={() => setPage(Math.max(0, page - totalItems))}
                  className='bg-white/10 hover:bg-white/20 border border-white/30 px-3 py-2 rounded-lg transition-all duration-300'
                  disabled={page === 0}
                />

                <span className="text-white/70 text-sm">
                  Page {Math.floor(page / totalItems) + 1} of {Math.ceil(totalItemsCount / totalItems)}
                </span>

                <Buttonv2
                  variant="transparent"
                  Icon={FaChevronRight}
                  onClick={() => setPage(page + totalItems)}
                  className='bg-white/10 hover:bg-white/20 border border-white/30 px-3 py-2 rounded-lg transition-all duration-300'
                  disabled={page + totalItems >= totalItemsCount}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductsCart
