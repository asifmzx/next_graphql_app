"use client";
import React from "react";
import { useState, useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import Image from "next/image";
import { useNavbar } from "@/contexts/NavbarContext";
import { useCart } from "@/contexts/CartContext";

import Buttonv2 from "@/components/UI/Button/Buttonv2";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import CartComponent from "@/components/UI/ShoppingCart/CartComponent";

const ProductsCart = ({ isNavbar }) => {
  const [totalItems, setTotalItems] = useState(20);
  const [page, setPage] = useState(0);
  const [expandedProducts, setExpandedProducts] = useState(new Set());
  const [mounted, setMounted] = useState(false);

  const { showNavbar, hideNavbar } = useNavbar();
  const { addToCart, cartItems, openCart } = useCart();

  useEffect(() => {
    console.log("Cart items changed:", cartItems);
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
    query getProducts($takeProduct: Int, $pagination: Int) {
      products(options: { take: $takeProduct, skip: $pagination }) {
        totalItems
        items {
          id
          name
          assets {
            id
            preview
          }
          variants {
            id
            name
            price
            assets {
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
        if (typeof stockLevel === "number" && stockLevel > 0) {
          return `Stock: ${stockLevel}`;
        }
        return "Out of Stock";
    }
  };
  const getStockLevel = (variant) => {
    if (
      variant.stockLevel === "IN_STOCK" ||
      variant.stockLevel === "LOW_STOCK"
    ) {
      return 100;
    }

    if (variant.stockLevel === "OUT_OF_STOCK") {
      return 0;
    }

    if (typeof variant.stockLevel === "number" && variant.stockLevel > 0) {
      return variant.stockLevel;
    }

    return 0;
  };

  if (!mounted || loading) {
    return (
      <div className="min-h-screen w-full p-4 sm:p-6 md:p-8 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex justify-center items-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 border-4 border-blue-400/30 border-t-blue-400 rounded-full animate-spin"></div>
          <div className="text-blue-300 text-xl font-semibold">
            Loading Premium Gadgets...
          </div>
          <div className="text-slate-400 text-sm mt-2">
            Preparing the latest tech for you
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen w-full p-4 sm:p-6 md:p-8 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex justify-center items-center">
        <div className="text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <p className="text-red-400 text-xl font-semibold mb-2">
            System Error
          </p>
          <p className="text-slate-300">{error.message}</p>
        </div>
      </div>
    );
  }

  const totalItemsCount = data?.products?.totalItems || 0;
  const products = data?.products?.items || [];

  if (!products.length) {
    return (
      <div className="min-h-screen w-full p-4 sm:p-6 md:p-8 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex justify-center items-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🔍</div>
          <div className="text-blue-300 text-xl font-semibold mb-2">
            No Gadgets Found
          </div>
          <div className="text-slate-400">
            Check back later for new arrivals
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className=" pt-16 min-h-screen w-full bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      {/* Custom CSS for scrollbar */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(15, 23, 42, 0.3);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #06b6d4, #3b82f6);
          border-radius: 10px;
          border: 1px solid rgba(6, 182, 212, 0.3);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #0891b2, #2563eb);
        }
      `}</style>
      {/* Fixed Cart Component */}
      <div className="fixed top-20 right-4 z-40">
        <CartComponent />
      </div>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-blue-500/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 via-indigo-400 to-blue-300 bg-clip-text text-transparent mb-4">
              TechGadgets Pro
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Discover the latest cutting-edge technology and premium gadgets
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {/* Filter and Search Section */}
        <div className="mb-8">
          <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 shadow-2xl">
            <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full animate-pulse"></div>
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                    Premium Gadgets
                  </h2>
                </div>
                <span className="bg-gradient-to-r from-blue-500/20 to-indigo-500/20 text-blue-300 px-4 py-2 rounded-full text-sm font-semibold border border-blue-500/20">
                  {totalItemsCount} Products Available
                </span>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-slate-300 text-sm font-medium">
                    Show:
                  </span>
                  <select
                    value={totalItems}
                    onChange={(e) => {
                      setTotalItems(Number(e.target.value));
                      setPage(0);
                    }}
                    className="px-4 py-3 bg-slate-700/50 text-white border border-slate-600/50 rounded-xl text-sm backdrop-blur-sm focus:border-blue-400/50 focus:outline-none focus:ring-2 focus:ring-blue-400/20 transition-all"
                  >
                    <option value={20} className="bg-slate-800 text-white">
                      20 per page
                    </option>
                    <option value={50} className="bg-slate-800 text-white">
                      50 per page
                    </option>
                    <option value={100} className="bg-slate-800 text-white">
                      100 per page
                    </option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product) => {
            const isExpanded = expandedProducts.has(product.id);
            const minPrice =
              product.variants && product.variants.length > 0
                ? Math.min(...product.variants.map((v) => v.price)) / 100
                : 0;

            return (
              <div
                key={product.id}
                className="group relative bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-2xl overflow-hidden shadow-2xl hover:shadow-blue-500/10 hover:border-blue-500/30 transition-all duration-500 transform hover:-translate-y-2"
              >
                {/* Tech Border Animation */}
                <div className="absolute inset-0 bg-gradient-to-r from-slate-800/80 via-blue-500/20 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="relative overflow-hidden">
                  {((product.assets && product.assets.length > 0) ||
                    (product.variants &&
                      product.variants.length > 0 &&
                      product.variants[0].assets &&
                      product.variants[0].assets.length > 0)) && (
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
                        className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
                        unoptimized
                      />
                      {/* Premium Badge */}
                      <div className="absolute top-4 left-4">
                        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                          <span className="w-1.5 h-1.5 bg-black rounded-full animate-pulse"></span>
                          PREMIUM
                        </div>
                      </div>
                      {/* Tech Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                        <button
                          onClick={() => toggleProductExpansion(product.id)}
                          className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-400 hover:to-indigo-400 transition-all duration-300 transform hover:scale-105 shadow-lg"
                        >
                          {isExpanded ? "🔒 Hide Specs" : "🔍 View Specs"}
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <div className="relative p-6">
                  <div className="mb-4">
                    <h3 className="text-white font-bold text-lg mb-2 line-clamp-2 group-hover:text-blue-300 transition-colors duration-300">
                      {product.name}
                    </h3>

                    {product.variants && product.variants.length > 0 && (
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                              ${minPrice}
                            </span>
                            {product.variants.length > 1 && (
                              <span className="text-slate-400 text-sm">
                                starting from
                              </span>
                            )}
                          </div>
                          {product.variants.length > 1 && (
                            <span className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 px-3 py-1 rounded-full text-xs font-semibold border border-purple-500/20">
                              {product.variants.length} Models
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-3">
                          <div
                            className={`w-3 h-3 rounded-full ${
                              getStockLevel(product.variants[0]) > 0
                                ? "bg-gradient-to-r from-green-400 to-emerald-400 shadow-lg shadow-green-400/30"
                                : "bg-gradient-to-r from-red-400 to-pink-400 shadow-lg shadow-red-400/30"
                            } animate-pulse`}
                          ></div>
                          <span
                            className={`text-sm font-semibold ${
                              getStockLevel(product.variants[0]) > 0
                                ? "text-green-300"
                                : "text-red-300"
                            }`}
                          >
                            {getStockDisplay(product.variants[0])}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="space-y-3">
                    {product.variants &&
                      product.variants.length > 0 &&
                      getStockLevel(product.variants[0]) > 0 && (
                        <button
                          onClick={() => {
                            addToCart(product, product.variants[0], 1);
                            openCart();
                          }}
                          className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-400 hover:to-indigo-400 text-white py-3 px-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-blue-500/25 transform hover:scale-105"
                        >
                          <FaShoppingCart size={16} />
                          Add to Cart
                        </button>
                      )}

                    <button
                      onClick={() => toggleProductExpansion(product.id)}
                      className="w-full bg-slate-700/50 hover:bg-slate-600/50 text-slate-300 hover:text-white py-3 px-4 rounded-xl font-medium transition-all duration-300 border border-slate-600/50 hover:border-slate-500/50"
                    >
                      {isExpanded ? "📱 Hide All Models" : "🔧 View All Models"}
                    </button>
                  </div>
                </div>

                {isExpanded &&
                  product.variants &&
                  product.variants.length > 0 && (
                    <div className="border-t border-slate-700/50 bg-gradient-to-b from-slate-800/30 to-slate-900/30 backdrop-blur-sm">
                      <div className="p-6">
                        <h4 className="text-slate-200 font-bold mb-4 flex items-center gap-3">
                          <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                            ⚡ Available Models
                          </span>
                          <span className="bg-gradient-to-r from-slate-700 to-slate-800 text-blue-300 px-3 py-1 rounded-full text-xs font-semibold">
                            {product.variants.length} Options
                          </span>
                        </h4>

                        <div className="space-y-4 max-h-80 overflow-y-auto custom-scrollbar">
                          {product.variants.map((variant, index) => (
                            <div
                              key={variant.id}
                              className="bg-gradient-to-r from-slate-700/30 to-slate-800/30 rounded-xl p-4 border border-slate-600/30 hover:border-blue-500/30 transition-all duration-300 group/variant backdrop-blur-sm"
                            >
                              <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-3">
                                  {variant.assets &&
                                    variant.assets.length > 0 && (
                                      <div className="relative">
                                        <Image
                                          src={variant.assets[0].preview}
                                          width={48}
                                          height={48}
                                          alt={variant.name}
                                          className="w-12 h-12 object-cover rounded-lg border-2 border-slate-600/50 group-hover/variant:border-blue-500/50 transition-all duration-300"
                                          unoptimized
                                        />
                                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full animate-pulse"></div>
                                      </div>
                                    )}
                                  <div>
                                    <p className="text-white font-semibold text-sm group-hover/variant:text-blue-300 transition-colors">
                                      {variant.name}
                                    </p>
                                    <p className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                                      ${variant.price / 100}
                                    </p>
                                  </div>
                                </div>

                                <div className="flex items-center gap-2">
                                  <div
                                    className={`w-2 h-2 rounded-full ${
                                      getStockLevel(variant) > 0
                                        ? "bg-gradient-to-r from-green-400 to-emerald-400 shadow-lg shadow-green-400/50"
                                        : "bg-gradient-to-r from-red-400 to-pink-400 shadow-lg shadow-red-400/50"
                                    } animate-pulse`}
                                  ></div>
                                  <span
                                    className={`text-xs font-semibold ${
                                      getStockLevel(variant) > 0
                                        ? "text-green-300"
                                        : "text-red-300"
                                    }`}
                                  >
                                    {getStockLevel(variant) > 0
                                      ? "✅ Available"
                                      : "❌ Sold Out"}
                                  </span>
                                </div>
                              </div>

                              {getStockLevel(variant) > 0 ? (
                                <button
                                  onClick={() => {
                                    addToCart(product, variant, 1);
                                    openCart();
                                  }}
                                  className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-400 hover:to-indigo-400 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-blue-500/25 transform hover:scale-105"
                                >
                                  <FaShoppingCart size={14} />
                                  Add This Model
                                </button>
                              ) : (
                                <div className="w-full bg-gradient-to-r from-slate-600/50 to-slate-700/50 text-slate-400 py-3 px-4 rounded-lg text-sm text-center font-medium border border-slate-600/30">
                                  🚫 Currently Unavailable
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
        <div className="mt-12">
          <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 shadow-2xl">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
              <div className="text-slate-300 text-sm flex items-center gap-2">
                <span className="w-2 h-2 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full animate-pulse"></span>
                Showing{" "}
                <span className="text-blue-300 font-semibold">
                  {page + 1} - {Math.min(page + totalItems, totalItemsCount)}
                </span>{" "}
                of{" "}
                <span className="text-blue-300 font-semibold">
                  {totalItemsCount}
                </span>{" "}
                premium gadgets
              </div>

              <div className="flex items-center space-x-4">
                <Buttonv2
                  variant="transparent"
                  Icon={FaChevronLeft}
                  onClick={() => setPage(Math.max(0, page - totalItems))}
                  className="bg-slate-700/50 hover:bg-gradient-to-r hover:from-blue-500/20 hover:to-indigo-500/20 border border-slate-600/50 hover:border-blue-500/30 px-4 py-3 rounded-xl transition-all duration-300 text-slate-300 hover:text-blue-300"
                  disabled={page === 0}
                />

                <div className="bg-gradient-to-r from-slate-700/50 to-slate-800/50 px-4 py-3 rounded-xl border border-slate-600/50">
                  <span className="text-slate-300 text-sm font-medium">
                    Page{" "}
                    <span className="text-blue-300 font-bold">
                      {Math.floor(page / totalItems) + 1}
                    </span>{" "}
                    of{" "}
                    <span className="text-blue-300 font-bold">
                      {Math.ceil(totalItemsCount / totalItems)}
                    </span>
                  </span>
                </div>

                <Buttonv2
                  variant="transparent"
                  Icon={FaChevronRight}
                  onClick={() => setPage(page + totalItems)}
                  className="bg-slate-700/50 hover:bg-gradient-to-r hover:from-blue-500/20 hover:to-indigo-500/20 border border-slate-600/50 hover:border-blue-500/30 px-4 py-3 rounded-xl transition-all duration-300 text-slate-300 hover:text-blue-300"
                  disabled={page + totalItems >= totalItemsCount}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsCart;
