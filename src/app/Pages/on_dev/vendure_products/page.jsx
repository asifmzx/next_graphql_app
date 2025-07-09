"use client";
import React from "react";
import dynamic from "next/dynamic";

const ProductsCart = dynamic(
    () => import("@/components/Pages/GraphQL/Vendure_GraphQL/Products_cart/ProductsCart"),
    {
        ssr: false,
        loading: () => (
            <div className='p-8 h-[calc(100vh-5rem)] bg-gradient-to-br from-dark-400 via-black-500 to-[#c4c932] flex justify-center items-center'>
                <div className='text-white text-lg'>Loading...</div>
            </div>
        )
    }
);

const page = () => {
    return (
        <ProductsCart />
    )
}

export default page