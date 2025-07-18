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
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center w-full h-16 mx-auto bg-white/80 backdrop-blur-md dark:bg-black/900 px-10 shadow-sm">
        <div>
          <a href="/">
            <Image
              src={isClient ? (isDarkTheme ? xeonwhite : xeonlogo) : xeonwhite}
              width={150}
              height={60}
              alt="Xeon logo"
            />
          </a>
        </div>
        <div className="flex gap-[2vw]">
          <Link
            href="/"
            className={`hover:text- ${currentPath === "/" ? "text-[#c2cc33]" : ""
              }`}
          >
            Home
          </Link>
          <a className="hover:text-[#c2cc33]" href="/Pages/404">
            Products
          </a>
          <a className="hover:text-[#c2cc33]" href="/Pages/404">
            Services
          </a>
          <a className="hover:text-[#c2cc33]" href="/Pages/404">
            About Us
          </a>
          <a className="hover:text-[#c2cc33]" href="/Pages/404">
            Contact Us
          </a>

          {/* <Link
            href="/Pages/employer"
            className={`hover:text- ${currentPath === "/Pages/employer" ? "text-[#c2cc33]" : ""
              }`}
          >
            <span>Employer</span><sub className="Dev text-xs text-red-600 mt-10">dev</sub>
          </Link> */}

          <Menu as="div" className="relative inline-block text-left ">
            <div>
              <MenuButton className="inline-flex w-full justify-center gap-0.5 hover:text-[#c2cc33]">
                <span className="font-semibold">Tasks</span>
                <sub className="Dev text-xs text-red-600 mt-1">dev</sub>
              </MenuButton>
            </div>

            <MenuItems
              transition
              className="absolute right-0 z-10 mt-2 w-30 origin-top-right divide-y divide-gray-100 rounded-md bg-white/10 backdrop-blur-md shadow-lg ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
            >
              <div className="py-1">
                <MenuItem>
                  <a
                    href="/Pages/Tasks/crud_Table"
                    className="block px-4 py-2 data-focus:bg-gray-100  data-focus:text-gray-900 data-focus:outline-hidden"
                  >
                    Table_CRD
                  </a>
                </MenuItem>
              </div>
              <div className="py-1">
                <MenuItem>
                  <a
                    href="/Pages/Tasks/level_3_search"
                    className="block px-4 py-2 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                  >
                    Search filtermap (L3)
                  </a>
                </MenuItem>
                <MenuItem>
                  <a
                    href="/Pages/Tasks/search_traverse"
                    className="block px-4 py-2 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                  >
                    Search traverse
                  </a>
                </MenuItem>
              </div>
            </MenuItems>
          </Menu>

          {/* <Link
            href="/Pages/on_dev"
            className={`hover:text- ${currentPath === "/Pages/on_dev" ? "text-[#c2cc33]" : ""
              }`}
          >
            <span>GraphQL</span><sub className="Dev text-xs text-red-600 mt-10">dev</sub>
          </Link> */}

          <Menu as="div" className="relative inline-block text-left ">
            <div>
              <MenuButton className="inline-flex w-full justify-center gap-0.5 hover:text-[#c2cc33]">
                <span className="font-semibold">Projects</span>
                <sub className="Dev text-xs text-red-600 mt-1">dev</sub>
              </MenuButton>
            </div>

            <MenuItems
              transition
              className="absolute right-0 z-10 mt-2 w-30 origin-top-right divide-y divide-gray-100 rounded-md bg-white/10 backdrop-blur-md shadow-lg ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
            >
              <div className="py-1">
                <MenuItem>
                  <a
                    href="/Pages/on_dev/frm_val_crud/career"
                    className="block px-4 py-2 data-focus:bg-gray-100  data-focus:text-gray-900 data-focus:outline-hidden"
                  >
                    Career
                  </a>
                </MenuItem>
                <MenuItem>
                  <a
                    href="/Pages/on_dev/frm_val_crud/employer"
                    className="block px-4 py-2 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                  >
                    Employer
                  </a>
                </MenuItem>
              </div>
              <div className="py-1">
                <MenuItem>
                  <a
                    href="/Pages/on_dev/vendure_crud"
                    className="block px-4 py-2 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                  >
                    GraphQL - Vendure
                  </a>
                </MenuItem>
                <MenuItem>
                  <a
                    href="/Pages/on_dev/ecommerce_vendure"
                    className="block px-4 py-2 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                  >
                    GraphQL - Products
                  </a>
                </MenuItem>
              </div>
            </MenuItems>
          </Menu>
          <Menu as="div" className="relative inline-block text-left ">
            <div>
              <MenuButton className="inline-flex w-full justify-center gap-0.5 hover:text-[#c2cc33]">
                <span className="font-semibold">Hooks</span>
                <sub className="Dev text-xs text-red-600 mt-1">dev</sub>
              </MenuButton>
            </div>

            <MenuItems
              transition
              className="absolute right-0 z-10 mt-2 w-30 origin-top-right divide-y divide-gray-100 rounded-md bg-white/10 backdrop-blur-md shadow-lg ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
            >
              <div className="py-1">
                <MenuItem>
                  <a
                    href="/Pages/hooks/use_state/"
                    className="block px-4 py-2 data-focus:bg-gray-100  data-focus:text-gray-900 data-focus:outline-hidden"
                  >
                    useState
                  </a>
                </MenuItem>
                <MenuItem>
                  <a
                    href="/Pages/hooks/use_effect/"
                    className="block px-4 py-2 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                  >
                    useEffect
                  </a>
                </MenuItem>
                <MenuItem>
                  <a
                    href="/Pages/hooks/use_context/"
                    className="block px-4 py-2 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                  >
                    useContext
                  </a>
                </MenuItem>
                <MenuItem>
                  <a
                    href="/Pages/hooks/use_ref/"
                    className="block px-4 py-2 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                  >
                    useRef
                  </a>
                </MenuItem>
                <MenuItem>
                  <a
                    href="/Pages/hooks/use_reducer/"
                    className="block px-4 py-2 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                  >
                    useReducer
                  </a>
                </MenuItem>
                <MenuItem>
                  <a
                    href="/Pages/hooks/use_callback/"
                    className="block px-4 py-2 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                  >
                    useCallback
                  </a>
                </MenuItem>
                <MenuItem>
                  <a
                    href="/Pages/hooks/use_memo/"
                    className="block px-4 py-2 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                  >
                    useMemo
                  </a>
                </MenuItem>
              </div>
              <div className="py-1">
                <MenuItem>
                  <a
                    href="/Pages/hooks/custom_hooks/"
                    className="block px-4 py-2 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                  >
                    customHooks
                  </a>
                </MenuItem>
              </div>
            </MenuItems>
          </Menu>
        </div>
      </nav>
    </>
  );
}
