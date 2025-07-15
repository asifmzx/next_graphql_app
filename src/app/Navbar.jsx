"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import xeonwhite from "@/assets/xeonwhite.png";
import xeonlogo from "@/assets/xeonlogo.png";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

export default function Navbar() {
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsClient(true);
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDarkTheme(mediaQuery.matches);
    console.log("isDarkTheme", mediaQuery.matches);
    const handler = (e) => setIsDarkTheme(e.matches);
    mediaQuery.addEventListener("change", handler);

    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  const currentPath = usePathname();

  return (
    <>
      {/* Desktop Navbar */}
      <nav className="hidden lg:flex fixed top-4 left-86 right-86 z-50 justify-between items-center w-auto h-16 mx-auto bg-white/80 backdrop-blur-md dark:bg-black/900 px-12 shadow-2xl rounded-3xl border border-white/20 dark:border-gray-700/30 transition-all duration-300">
        {/* Animated gradient border */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 opacity-0 hover:opacity-100 transition-opacity duration-500 -z-10"></div>

        <div className="relative z-10">
          <a
            href="/"
            className="block transition-transform duration-300 hover:scale-105"
          >
            <Image
              src={isClient ? (isDarkTheme ? xeonwhite : xeonlogo) : xeonwhite}
              width={160}
              height={64}
              alt="Xeon logo"
              className="drop-shadow-lg"
            />
          </a>
        </div>

        <div className="flex  items-center relative z-10">
          <Link
            href="/"
            className={`relative px-4 py-2 rounded-xl font-medium transition-all duration-300 hover:text-[#c2cc33] hover:bg-white/20 dark:hover:bg-gray-800/30 hover:scale-105 hover:shadow-lg ${
              currentPath === "/"
                ? "text-[#c2cc33] bg-white/30 dark:bg-gray-800/40 shadow-md"
                : ""
            }`}
          >
            <span className="relative z-10">Home</span>
            {currentPath === "/" && (
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 rounded-xl animate-pulse"></div>
            )}
          </Link>

          <a
            className="relative px-4 py-2 rounded-xl font-medium transition-all duration-300 hover:text-[#c2cc33] hover:bg-white/20 dark:hover:bg-gray-800/30 hover:scale-105 hover:shadow-lg"
            href="/Pages/404"
          >
            Products
          </a>

          <a
            className="relative px-4 py-2 rounded-xl font-medium transition-all duration-300 hover:text-[#c2cc33] hover:bg-white/20 dark:hover:bg-gray-800/30 hover:scale-105 hover:shadow-lg"
            href="/Pages/404"
          >
            Services
          </a>

          <a
            className="relative px-4 py-2 rounded-xl font-medium transition-all duration-300 hover:text-[#c2cc33] hover:bg-white/20 dark:hover:bg-gray-800/30 hover:scale-105 hover:shadow-lg"
            href="/Pages/404"
          >
            About Us
          </a>

          <a
            className="relative px-4 py-2 rounded-xl font-medium transition-all duration-300 hover:text-[#c2cc33] hover:bg-white/20 dark:hover:bg-gray-800/30 hover:scale-105 hover:shadow-lg"
            href="/Pages/404"
          >
            Contact Us
          </a>

          <Menu as="div" className="relative inline-block text-left group">
            <div>
              <MenuButton className="relative px-4 py-2 rounded-xl font-medium transition-all duration-300 hover:text-[#c2cc33] hover:bg-white/20 dark:hover:bg-gray-800/30 hover:scale-105 hover:shadow-lg inline-flex items-center gap-1">
                <span className="font-semibold">Tasks</span>
                <sub className="text-xs text-red-600 font-bold animate-pulse">
                  dev
                </sub>
                <div className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full ml-1 group-hover:animate-bounce"></div>
              </MenuButton>
            </div>

            <MenuItems
              transition
              className="absolute right-0 z-20 mt-3 w-56 origin-top-right divide-y divide-gray-100/50 dark:divide-gray-700/50 rounded-2xl bg-white/80 dark:bg-gray-800/900 backdrop-blur-md shadow-2xl ring-1 ring-black/5 dark:ring-white/10 transition-all duration-200 data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-150 data-leave:ease-in border border-white/20 dark:border-gray-700/30"
            >
              <div className="py-2">
                <MenuItem>
                  <a
                    href="/Pages/Tasks/crud_Table"
                    className="group flex items-center px-6 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gradient-to-r hover:from-cyan-50 hover:to-blue-50 dark:hover:from-gray-700/50 dark:hover:to-gray-600/50 hover:text-cyan-600 dark:hover:text-cyan-400 transition-all duration-200 rounded-xl mx-2"
                  >
                    <span className="w-2 h-2 bg-cyan-400 rounded-full mr-3 group-hover:animate-pulse"></span>
                    Table_CRD
                  </a>
                </MenuItem>
              </div>
              <div className="py-2">
                <MenuItem>
                  <a
                    href="/Pages/Tasks/level_3_search"
                    className="group flex items-center px-6 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gradient-to-r hover:from-cyan-50 hover:to-blue-50 dark:hover:from-gray-700/50 dark:hover:to-gray-600/50 hover:text-cyan-600 dark:hover:text-cyan-400 transition-all duration-200 rounded-xl mx-2"
                  >
                    <span className="w-2 h-2 bg-blue-400 rounded-full mr-3 group-hover:animate-pulse"></span>
                    Search filtermap (L3)
                  </a>
                </MenuItem>
                <MenuItem>
                  <a
                    href="/Pages/Tasks/search_traverse"
                    className="group flex items-center px-6 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gradient-to-r hover:from-cyan-50 hover:to-blue-50 dark:hover:from-gray-700/50 dark:hover:to-gray-600/50 hover:text-cyan-600 dark:hover:text-cyan-400 transition-all duration-200 rounded-xl mx-2"
                  >
                    <span className="w-2 h-2 bg-purple-400 rounded-full mr-3 group-hover:animate-pulse"></span>
                    Search traverse
                  </a>
                </MenuItem>
              </div>
            </MenuItems>
          </Menu>

          <Menu as="div" className="relative inline-block text-left group">
            <div>
              <MenuButton className="relative px-4 py-2 rounded-xl font-medium transition-all duration-300 hover:text-[#c2cc33] hover:bg-white/20 dark:hover:bg-gray-800/30 hover:scale-105 hover:shadow-lg inline-flex items-center gap-1">
                <span className="font-semibold">Projects</span>
                <sub className="text-xs text-red-600 font-bold animate-pulse">
                  dev
                </sub>
                <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full ml-1 group-hover:animate-bounce"></div>
              </MenuButton>
            </div>

            <MenuItems
              transition
              className="absolute right-0 z-20 mt-3 w-56 origin-top-right divide-y divide-gray-100/50 dark:divide-gray-700/50 rounded-2xl bg-white/80 dark:bg-gray-800/900 backdrop-blur-md shadow-2xl ring-1 ring-black/5 dark:ring-white/10 transition-all duration-200 data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-150 data-leave:ease-in border border-white/20 dark:border-gray-700/30"
            >
              <div className="py-2">
                <MenuItem>
                  <a
                    href="/Pages/on_dev/frm_val_crud/career"
                    className="group flex items-center px-6 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 dark:hover:from-gray-700/50 dark:hover:to-gray-600/50 hover:text-green-600 dark:hover:text-green-400 transition-all duration-200 rounded-xl mx-2"
                  >
                    <span className="w-2 h-2 bg-green-400 rounded-full mr-3 group-hover:animate-pulse"></span>
                    Career
                  </a>
                </MenuItem>
                <MenuItem>
                  <a
                    href="/Pages/on_dev/frm_val_crud/employer"
                    className="group flex items-center px-6 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 dark:hover:from-gray-700/50 dark:hover:to-gray-600/50 hover:text-green-600 dark:hover:text-green-400 transition-all duration-200 rounded-xl mx-2"
                  >
                    <span className="w-2 h-2 bg-emerald-400 rounded-full mr-3 group-hover:animate-pulse"></span>
                    Employer
                  </a>
                </MenuItem>
              </div>
              <div className="py-2">
                <MenuItem>
                  <a
                    href="/Pages/on_dev/vendure_crud"
                    className="group flex items-center px-6 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 dark:hover:from-gray-700/50 dark:hover:to-gray-600/50 hover:text-green-600 dark:hover:text-green-400 transition-all duration-200 rounded-xl mx-2"
                  >
                    <span className="w-2 h-2 bg-teal-400 rounded-full mr-3 group-hover:animate-pulse"></span>
                    GraphQL - Vendure
                  </a>
                </MenuItem>
                <MenuItem>
                  <a
                    href="/Pages/on_dev/ecommerce_vendure"
                    className="group flex items-center px-6 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 dark:hover:from-gray-700/50 dark:hover:to-gray-600/50 hover:text-green-600 dark:hover:text-green-400 transition-all duration-200 rounded-xl mx-2"
                  >
                    <span className="w-2 h-2 bg-lime-400 rounded-full mr-3 group-hover:animate-pulse"></span>
                    GraphQL - Products
                  </a>
                </MenuItem>
              </div>
            </MenuItems>
          </Menu>

          <Menu as="div" className="relative inline-block text-left group">
            <div>
              <MenuButton className="relative px-4 py-2 rounded-xl font-medium transition-all duration-300 hover:text-[#c2cc33] hover:bg-white/20 dark:hover:bg-gray-800/30 hover:scale-105 hover:shadow-lg inline-flex items-center gap-1">
                <span className="font-semibold">Hooks</span>
                <sub className="text-xs text-red-600 font-bold animate-pulse">
                  dev
                </sub>
                <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full ml-1 group-hover:animate-bounce"></div>
              </MenuButton>
            </div>

            <MenuItems
              transition
              className="absolute right-0 z-20 mt-3 w-56 origin-top-right divide-y divide-gray-100/50 dark:divide-gray-700/50 rounded-2xl bg-white/80 dark:bg-gray-800/900 backdrop-blur-md shadow-2xl ring-1 ring-black/5 dark:ring-white/10 transition-all duration-200 data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-150 data-leave:ease-in border border-white/20 dark:border-gray-700/30"
            >
              <div className="py-2">
                <MenuItem>
                  <a
                    href="/Pages/hooks/use_state/"
                    className="group flex items-center px-6 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 dark:hover:from-gray-700/50 dark:hover:to-gray-600/50 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-200 rounded-xl mx-2"
                  >
                    <span className="w-2 h-2 bg-purple-400 rounded-full mr-3 group-hover:animate-pulse"></span>
                    useState
                  </a>
                </MenuItem>
                <MenuItem>
                  <a
                    href="/Pages/hooks/use_effect/"
                    className="group flex items-center px-6 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 dark:hover:from-gray-700/50 dark:hover:to-gray-600/50 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-200 rounded-xl mx-2"
                  >
                    <span className="w-2 h-2 bg-indigo-400 rounded-full mr-3 group-hover:animate-pulse"></span>
                    useEffect
                  </a>
                </MenuItem>
                <MenuItem>
                  <a
                    href="/Pages/hooks/use_context/"
                    className="group flex items-center px-6 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 dark:hover:from-gray-700/50 dark:hover:to-gray-600/50 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-200 rounded-xl mx-2"
                  >
                    <span className="w-2 h-2 bg-blue-400 rounded-full mr-3 group-hover:animate-pulse"></span>
                    useContext
                  </a>
                </MenuItem>
                <MenuItem>
                  <a
                    href="/Pages/hooks/use_ref/"
                    className="group flex items-center px-6 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 dark:hover:from-gray-700/50 dark:hover:to-gray-600/50 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-200 rounded-xl mx-2"
                  >
                    <span className="w-2 h-2 bg-cyan-400 rounded-full mr-3 group-hover:animate-pulse"></span>
                    useRef
                  </a>
                </MenuItem>
                <MenuItem>
                  <a
                    href="/Pages/hooks/use_reducer/"
                    className="group flex items-center px-6 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 dark:hover:from-gray-700/50 dark:hover:to-gray-600/50 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-200 rounded-xl mx-2"
                  >
                    <span className="w-2 h-2 bg-teal-400 rounded-full mr-3 group-hover:animate-pulse"></span>
                    useReducer
                  </a>
                </MenuItem>
                <MenuItem>
                  <a
                    href="/Pages/hooks/use_callback/"
                    className="group flex items-center px-6 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 dark:hover:from-gray-700/50 dark:hover:to-gray-600/50 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-200 rounded-xl mx-2"
                  >
                    <span className="w-2 h-2 bg-emerald-400 rounded-full mr-3 group-hover:animate-pulse"></span>
                    useCallback
                  </a>
                </MenuItem>
                <MenuItem>
                  <a
                    href="/Pages/hooks/use_memo/"
                    className="group flex items-center px-6 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 dark:hover:from-gray-700/50 dark:hover:to-gray-600/50 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-200 rounded-xl mx-2"
                  >
                    <span className="w-2 h-2 bg-lime-400 rounded-full mr-3 group-hover:animate-pulse"></span>
                    useMemo
                  </a>
                </MenuItem>
              </div>
              <div className="py-2">
                <MenuItem>
                  <a
                    href="/Pages/hooks/custom_hooks/"
                    className="group flex items-center px-6 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 dark:hover:from-gray-700/50 dark:hover:to-gray-600/50 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-200 rounded-xl mx-2"
                  >
                    <span className="w-2 h-2 bg-pink-400 rounded-full mr-3 group-hover:animate-pulse"></span>
                    customHooks
                  </a>
                </MenuItem>
              </div>
            </MenuItems>
          </Menu>
        </div>
      </nav>

      {/* Mobile Navbar */}
      <nav className="lg:hidden fixed top-2 left-4 right-4 z-50 bg-white/80 backdrop-blur-md dark:bg-black/900 px-6 py-2 shadow-sm rounded-2xl border border-gray-200 dark:border-gray-600">
        {/* Animated gradient border */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 opacity-50"></div>

        <div className="flex justify-between items-center relative z-10">
          <div>
            <a
              href="/"
              className="block transition-transform duration-300 hover:scale-105"
            >
              <Image
                src={
                  isClient ? (isDarkTheme ? xeonwhite : xeonlogo) : xeonwhite
                }
                width={130}
                height={52}
                alt="Xeon logo"
                className="drop-shadow-lg"
              />
            </a>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="relative p-3 rounded-2xl text-gray-600 dark:text-gray-300 hover:text-[#c2cc33] bg-white/30 dark:bg-gray-800/30 hover:bg-white/50 dark:hover:bg-gray-800/50 transition-all duration-300 flex items-center justify-center w-12 h-12 shadow-lg hover:shadow-xl hover:scale-110 group"
          >
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-400/20 to-blue-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            {isMobileMenuOpen ? (
              <span className="text-2xl font-bold relative z-10 transform transition-transform duration-300 group-hover:rotate-90">
                ✕
              </span>
            ) : (
              <span className="text-2xl relative z-10 transform transition-transform duration-300 group-hover:scale-110">
                ☰
              </span>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600 max-h-[70vh] overflow-y-auto rounded-2xl bg-white/10 dark:bg-gray-800/10 backdrop-blur-sm">
            <div className="flex flex-col space-y-2 pb-6 px-4">
              <Link
                href="/"
                className={`relative px-6 py-4 rounded-2xl text-base font-semibold transition-all duration-300 hover:text-[#c2cc33] hover:bg-white/30 dark:hover:bg-gray-800/40 hover:scale-105 hover:shadow-lg group ${
                  currentPath === "/"
                    ? "text-[#c2cc33] bg-white/40 dark:bg-gray-800/50 shadow-lg scale-105"
                    : ""
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      currentPath === "/"
                        ? "bg-gradient-to-r from-cyan-400 to-blue-400 animate-pulse"
                        : "bg-gray-400 group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-blue-400"
                    }`}
                  ></div>
                  Home
                </div>
                {currentPath === "/" && (
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-blue-400/10 rounded-2xl animate-pulse"></div>
                )}
              </Link>

              <a
                className="relative px-6 py-4 rounded-2xl text-base font-semibold transition-all duration-300 hover:text-[#c2cc33] hover:bg-white/30 dark:hover:bg-gray-800/40 hover:scale-105 hover:shadow-lg group"
                href="/Pages/404"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-gray-400 rounded-full transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-green-400 group-hover:to-emerald-400"></div>
                  Products
                </div>
              </a>

              <a
                className="relative px-6 py-4 rounded-2xl text-base font-semibold transition-all duration-300 hover:text-[#c2cc33] hover:bg-white/30 dark:hover:bg-gray-800/40 hover:scale-105 hover:shadow-lg group"
                href="/Pages/404"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-gray-400 rounded-full transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400"></div>
                  Services
                </div>
              </a>

              <a
                className="relative px-6 py-4 rounded-2xl text-base font-semibold transition-all duration-300 hover:text-[#c2cc33] hover:bg-white/30 dark:hover:bg-gray-800/40 hover:scale-105 hover:shadow-lg group"
                href="/Pages/404"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-gray-400 rounded-full transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-orange-400 group-hover:to-red-400"></div>
                  About Us
                </div>
              </a>

              <a
                className="relative px-6 py-4 rounded-2xl text-base font-semibold transition-all duration-300 hover:text-[#c2cc33] hover:bg-white/30 dark:hover:bg-gray-800/40 hover:scale-105 hover:shadow-lg group"
                href="/Pages/404"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-gray-400 rounded-full transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-yellow-400 group-hover:to-orange-400"></div>
                  Contact Us
                </div>
              </a>

              {/* Mobile Tasks Menu */}
              <div className="px-4 py-4 bg-white/20 dark:bg-gray-800/20 rounded-2xl backdrop-blur-sm border border-white/10 dark:border-gray-700/20">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-4 h-4 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full animate-pulse"></div>
                  <span className="text-base font-bold text-gray-700 dark:text-gray-300">
                    Tasks
                  </span>
                  <sub className="text-xs text-red-500 font-bold animate-pulse bg-red-50 dark:bg-red-900/20 px-2 py-1 rounded-full">
                    dev
                  </sub>
                </div>
                <div className="ml-6 space-y-2">
                  <a
                    href="/Pages/Tasks/crud_Table"
                    className="flex items-center gap-3 px-4 py-3 text-sm text-gray-600 dark:text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-all duration-300 rounded-xl hover:bg-white/30 dark:hover:bg-gray-800/30 hover:scale-105 group"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span className="w-2 h-2 bg-cyan-400 rounded-full group-hover:animate-pulse"></span>
                    Table_CRD
                  </a>
                  <a
                    href="/Pages/Tasks/level_3_search"
                    className="flex items-center gap-3 px-4 py-3 text-sm text-gray-600 dark:text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-all duration-300 rounded-xl hover:bg-white/30 dark:hover:bg-gray-800/30 hover:scale-105 group"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span className="w-2 h-2 bg-blue-400 rounded-full group-hover:animate-pulse"></span>
                    Search filtermap (L3)
                  </a>
                  <a
                    href="/Pages/Tasks/search_traverse"
                    className="flex items-center gap-3 px-4 py-3 text-sm text-gray-600 dark:text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-all duration-300 rounded-xl hover:bg-white/30 dark:hover:bg-gray-800/30 hover:scale-105 group"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span className="w-2 h-2 bg-purple-400 rounded-full group-hover:animate-pulse"></span>
                    Search traverse
                  </a>
                </div>
              </div>

              {/* Mobile Projects Menu */}
              <div className="px-4 py-4 bg-white/20 dark:bg-gray-800/20 rounded-2xl backdrop-blur-sm border border-white/10 dark:border-gray-700/20">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-4 h-4 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full animate-pulse"></div>
                  <span className="text-base font-bold text-gray-700 dark:text-gray-300">
                    Projects
                  </span>
                  <sub className="text-xs text-red-500 font-bold animate-pulse bg-red-50 dark:bg-red-900/20 px-2 py-1 rounded-full">
                    dev
                  </sub>
                </div>
                <div className="ml-6 space-y-2">
                  <a
                    href="/Pages/on_dev/frm_val_crud/career"
                    className="flex items-center gap-3 px-4 py-3 text-sm text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-all duration-300 rounded-xl hover:bg-white/30 dark:hover:bg-gray-800/30 hover:scale-105 group"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span className="w-2 h-2 bg-green-400 rounded-full group-hover:animate-pulse"></span>
                    Career
                  </a>
                  <a
                    href="/Pages/on_dev/frm_val_crud/employer"
                    className="flex items-center gap-3 px-4 py-3 text-sm text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-all duration-300 rounded-xl hover:bg-white/30 dark:hover:bg-gray-800/30 hover:scale-105 group"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span className="w-2 h-2 bg-emerald-400 rounded-full group-hover:animate-pulse"></span>
                    Employer
                  </a>
                  <a
                    href="/Pages/on_dev/vendure_crud"
                    className="flex items-center gap-3 px-4 py-3 text-sm text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-all duration-300 rounded-xl hover:bg-white/30 dark:hover:bg-gray-800/30 hover:scale-105 group"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span className="w-2 h-2 bg-teal-400 rounded-full group-hover:animate-pulse"></span>
                    GraphQL - Vendure
                  </a>
                  <a
                    href="/Pages/on_dev/ecommerce_vendure"
                    className="flex items-center gap-3 px-4 py-3 text-sm text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-all duration-300 rounded-xl hover:bg-white/30 dark:hover:bg-gray-800/30 hover:scale-105 group"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span className="w-2 h-2 bg-lime-400 rounded-full group-hover:animate-pulse"></span>
                    GraphQL - Products
                  </a>
                </div>
              </div>

              {/* Mobile Hooks Menu */}
              <div className="px-4 py-4 bg-white/20 dark:bg-gray-800/20 rounded-2xl backdrop-blur-sm border border-white/10 dark:border-gray-700/20">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-4 h-4 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse"></div>
                  <span className="text-base font-bold text-gray-700 dark:text-gray-300">
                    Hooks
                  </span>
                  <sub className="text-xs text-red-500 font-bold animate-pulse bg-red-50 dark:bg-red-900/20 px-2 py-1 rounded-full">
                    dev
                  </sub>
                </div>
                <div className="ml-6 space-y-2">
                  <a
                    href="/Pages/hooks/use_state/"
                    className="flex items-center gap-3 px-4 py-3 text-sm text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-300 rounded-xl hover:bg-white/30 dark:hover:bg-gray-800/30 hover:scale-105 group"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span className="w-2 h-2 bg-purple-400 rounded-full group-hover:animate-pulse"></span>
                    useState
                  </a>
                  <a
                    href="/Pages/hooks/use_effect/"
                    className="flex items-center gap-3 px-4 py-3 text-sm text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-300 rounded-xl hover:bg-white/30 dark:hover:bg-gray-800/30 hover:scale-105 group"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span className="w-2 h-2 bg-indigo-400 rounded-full group-hover:animate-pulse"></span>
                    useEffect
                  </a>
                  <a
                    href="/Pages/hooks/use_context/"
                    className="flex items-center gap-3 px-4 py-3 text-sm text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-300 rounded-xl hover:bg-white/30 dark:hover:bg-gray-800/30 hover:scale-105 group"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span className="w-2 h-2 bg-blue-400 rounded-full group-hover:animate-pulse"></span>
                    useContext
                  </a>
                  <a
                    href="/Pages/hooks/use_ref/"
                    className="flex items-center gap-3 px-4 py-3 text-sm text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-300 rounded-xl hover:bg-white/30 dark:hover:bg-gray-800/30 hover:scale-105 group"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span className="w-2 h-2 bg-cyan-400 rounded-full group-hover:animate-pulse"></span>
                    useRef
                  </a>
                  <a
                    href="/Pages/hooks/use_reducer/"
                    className="flex items-center gap-3 px-4 py-3 text-sm text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-300 rounded-xl hover:bg-white/30 dark:hover:bg-gray-800/30 hover:scale-105 group"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span className="w-2 h-2 bg-teal-400 rounded-full group-hover:animate-pulse"></span>
                    useReducer
                  </a>
                  <a
                    href="/Pages/hooks/use_callback/"
                    className="flex items-center gap-3 px-4 py-3 text-sm text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-300 rounded-xl hover:bg-white/30 dark:hover:bg-gray-800/30 hover:scale-105 group"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span className="w-2 h-2 bg-emerald-400 rounded-full group-hover:animate-pulse"></span>
                    useCallback
                  </a>
                  <a
                    href="/Pages/hooks/use_memo/"
                    className="flex items-center gap-3 px-4 py-3 text-sm text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-300 rounded-xl hover:bg-white/30 dark:hover:bg-gray-800/30 hover:scale-105 group"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span className="w-2 h-2 bg-lime-400 rounded-full group-hover:animate-pulse"></span>
                    useMemo
                  </a>
                  <a
                    href="/Pages/hooks/custom_hooks/"
                    className="flex items-center gap-3 px-4 py-3 text-sm text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-300 rounded-xl hover:bg-white/30 dark:hover:bg-gray-800/30 hover:scale-105 group"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span className="w-2 h-2 bg-pink-400 rounded-full group-hover:animate-pulse"></span>
                    customHooks
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
