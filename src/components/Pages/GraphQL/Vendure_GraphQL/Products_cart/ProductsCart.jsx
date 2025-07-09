"use client";
import React from 'react'
import { useState } from 'react';
import { useQuery, gql } from "@apollo/client";
import Image from 'next/image';

import Buttonv2 from '@/components/UI/Button/Buttonv2';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';

const ProductsCart = () => {
  const [totalItems, setTotalItems] = useState(20);
  const [page, setPage] = useState(0);

  const GET_Products = gql`
      query getProducts($takeProduct: Int, $pagination: Int){ 
        products(options: {take:$takeProduct, skip:$pagination}){
          totalItems
          items{
            id
            name
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
  });

  if (loading) {
    return (
      <div className='p-8 bg-gradient-to-br from-dark-400 via-black-500 to-[#c4c932] flex justify-center items-center'>
        <div className='text-white text-lg'>Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='p-8 bg-gradient-to-br from-dark-400 via-black-500 to-[#c4c932] flex justify-center items-center'>
        <p className='text-red-400'>Error: {error.message}</p>
      </div>
    );
  }

  const totalItemsCount = data?.products?.totalItems || 0;
  const products = data?.products?.items || [];

  if (!products.length) {
    return (
      <div className='p-8 bg-gradient-to-br from-dark-400 via-black-500 to-[#c4c932] flex justify-center items-center'>
        <div className='text-white text-lg'>No products found</div>
      </div>
    );
  }

  return (
    <div>
      <div className='p-8 h-full md:h-[calc(100vh-4rem)] overflow-none bg-gradient-to-br from-dark-400 via-black-500 to-[#c4c932] '>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4'>
          {products.map(product => (
            <div key={product.id} className='bg-white/10 backdrop-blur-lg border border-white/30 rounded-xl p-4 shadow-lg hover:bg-white/30 transition-all duration-300'>
              {product.variants && product.variants.length > 0 && product.variants[0].assets && product.variants[0].assets.length > 0 && (
                <Image
                  src={product.variants[0].assets[0].preview}
                  width={500}
                  height={500}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-lg mb-2"
                  unoptimized
                />
              )}
              <h3 className="text-white font-semibold text-sm md:text-base">{product.name}</h3>
              {product.variants && product.variants.length > 0 && (
                <div className="mt-2">
                  <p className="text-white/80 text-sm">Price: ${product.variants[0].price / 100}</p>
                  <p className="text-white/80 text-sm">Stock: {product.variants[0].stockLevel}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className='mt-8'>
          <div className='flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0'>
            <div className='text-white text-sm'>
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
                  className='px-3 py-2 bg-white/10 text-white border border-white/30 rounded-lg'
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
                className='h-[40px] text-md'
                disabled={page === 0}
              />
              <Buttonv2
                variant="transparent"
                Icon={FaChevronRight}
                onClick={() => setPage(page + totalItems)}
                className='h-[40px] text-md'
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
