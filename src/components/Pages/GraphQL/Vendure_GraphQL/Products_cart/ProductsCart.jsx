"use client";
import React from 'react'
import { useState, useEffect } from 'react';
import { useQuery, gql } from "@apollo/client";
import Image from 'next/image';
import { useNavbar } from '@/contexts/NavbarContext';

import Buttonv2 from '@/components/UI/Button/Buttonv2';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';

const ProductsCart = ({ isNavbar }) => {
  const [totalItems, setTotalItems] = useState(20);
  const [page, setPage] = useState(0);
  const [expandedProducts, setExpandedProducts] = useState(new Set());
  const [mounted, setMounted] = useState(false);

  const { showNavbar, hideNavbar } = useNavbar();

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
              stockLevels{
                stockOnHand
              }
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
      <div className='p-4 sm:p-6 md:p-8 min-h-screen overflow-auto'>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3 sm:gap-4 md:gap-6'>
          {products.map(product => {
            const isExpanded = expandedProducts.has(product.id);
            return (
              <div
                key={product.id}
                className='bg-white/10 backdrop-blur-lg border border-white/30 rounded-xl p-4 shadow-lg hover:bg-white/20 transition-all duration-300 cursor-pointer'
                onClick={() => toggleProductExpansion(product.id)}
              >

                {((product.assets && product.assets.length > 0) ||
                  (product.variants && product.variants.length > 0 && product.variants[0].assets && product.variants[0].assets.length > 0)) && (
                    <Image
                      src={
                        product.assets && product.assets.length > 0
                          ? product.assets[0].preview
                          : product.variants[0].assets[0].preview
                      }
                      width={500}
                      height={500}
                      alt={product.name}
                      className="w-full h-48 object-cover rounded-lg mb-3"
                      unoptimized
                    />
                  )}

                <h3 className="text-white font-semibold text-sm md:text-base mb-3">{product.name}</h3>
                {product.variants && product.variants.length > 0 && (
                  <div className="mb-2">
                    <p className="text-green-300 text-sm font-semibold">
                      From ${Math.min(...product.variants.map(v => v.price)) / 100}
                    </p>
                    <p className="text-white/70 text-xs">
                      {product.variants.length} variant{product.variants.length > 1 ? 's' : ''} available
                    </p>
                  </div>
                )}

                {isExpanded && product.variants && product.variants.length > 0 && (
                  <div className="space-y-2 mt-3 border-t border-white/20 pt-3">
                    <p className="text-white/90 text-xs font-medium">Available Variants:</p>
                    {product.variants.map((variant, index) => (
                      <div
                        key={variant.id}
                        className="bg-white/5 rounded-lg p-2 border border-white/20"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2">
                              {variant.assets && variant.assets.length > 0 && (
                                <Image
                                  src={variant.assets[0].preview}
                                  width={40}
                                  height={40}
                                  alt={variant.name}
                                  className="w-8 h-8 object-cover rounded"
                                  unoptimized
                                />
                              )}
                              <div>
                                <p className="text-white/90 text-xs font-medium">{variant.name}</p>
                                <p className="text-green-300 text-sm font-semibold">${variant.price / 100}</p>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className={`text-xs ${variant.stockLevel > 0 ? 'text-green-300' : 'text-red-300'}`}>
                              {variant.stockLevel > 0 ? `Stock: ${variant.stockLevel}` : 'Out of Stock'}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex justify-center mt-3">
                  <div className="text-white/50 text-xs">
                    {isExpanded ? '▲ Click to collapse' : '▼ Click to expand variants'}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className='mt-6 sm:mt-8'>
          <div className='flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/20'>
            <div className='text-white text-xs sm:text-sm'>
              Showing {page + 1} - {Math.min(page + totalItems, totalItemsCount)} of {totalItemsCount} products
            </div>

            <div className='flex items-center space-x-2'>
              <div>
                <select
                  value={totalItems}
                  onChange={(e) => {
                    setTotalItems(Number(e.target.value));
                    setPage(0);
                  }}
                  className='px-2 sm:px-3 py-2 bg-white/10 text-white border border-white/30 rounded-lg text-xs sm:text-sm'
                >
                  <option value={20} className='bg-gray-800 text-white'>20</option>
                  <option value={50} className='bg-gray-800 text-white'>50</option>
                  <option value={100} className='bg-gray-800 text-white'>100</option>
                </select>
              </div>
              <Buttonv2
                variant="transparent"
                Icon={FaChevronLeft}
                onClick={() => setPage(Math.max(0, page - totalItems))}
                className='h-[36px] sm:h-[40px] text-sm sm:text-md'
                disabled={page === 0}
              />
              <Buttonv2
                variant="transparent"
                Icon={FaChevronRight}
                onClick={() => setPage(page + totalItems)}
                className='h-[36px] sm:h-[40px] text-sm sm:text-md'
                disabled={page + totalItems >= totalItemsCount}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductsCart
