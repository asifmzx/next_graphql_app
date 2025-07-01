"use client";
import React, { useState } from "react";
const products = [
    {
        name: "product-1",
        price: 100,
    },
    {
        name: "product-2",
        price: 200,
    },
    {
        name: "product-3",
        price: 300,
    },
];
const page = () => {
    const [items, setItems] = useState([
        {
            name: "",
            price: 0,
            quantity: 1,
            discount: 0,
            subTotal: 0
        },
    ]);

    // console.log (items)
    const handleName = (event, index) => {
        const value = event.target.value;
        const selectedProduct = products.find(product => product.name === value);
        setItems((values) => 
            values.map((item, i) => 
                i === index 
                    ? { ...item, name: value, price: selectedProduct ? selectedProduct.price : 0 }
                    : item
            )
        );
    };
    const handlePrice = (event, index) => {
        const value = parseFloat(event.target.value) || 0;
        setItems((values) => 
            values.map((item, i) => 
                i === index 
                    ? { ...item, price: value }
                    : item
            )
        );
    };
    const handleQuantity = (event, index) => {
        const value = parseInt(event.target.value) || 0;
        setItems((values) => 
            values.map((item, i) => 
                i === index 
                    ? { ...item, quantity: value }
                    : item
            )
        );
    };
    const handleDiscount = (event, index) => {
        const value = parseFloat(event.target.value) || 0;
        setItems((values) => 
            values.map((item, i) => 
                i === index 
                    ? { ...item, discount: value }
                    : item
            )
        );
    };
    // const subTotal = items.price * items.quantity;
    // console.log(subTotal);

    const handleAdd = () => {
        setItems((values) => [
            ...values,
            {
                name: "",
                price: 0,
                quantity: 1,
                discount: 0,
                subTotal: 0
            },
        ]);
    };

    return (
        <div className="p-10">
            <div className="text-right pb-5">
                <button
                    className="px-4 py-2 border-1 rounded max-w-[200px] font-semibold bg-green-50 border-green-500 text-green-500 hover:bg-green-900 hover:text-white"
                    onClick={handleAdd}
                >
                    Add More
                </button>
            </div>
            <div className="grid grid-cols-5 gap-x-4 text-lg font-medium pb-2">
                <p>Product Name</p>
                <p>Product price</p>
                <p>Quantity</p>
                <p>Discount(%)</p>
                <p className="text-right">Total</p>
            </div>
            {items.map((data, index) => {
                const subTotal = (data.price * data.quantity) * (1 - data.discount / 100);
                return (
                    <div className="grid grid-cols-5 gap-x-4 py-3" key={index}>
                        <select
                            className="px-4 py-3 border-1 rounded w-full "
                            value={data.name}
                            onChange={(e) => handleName(e, index)}
                        >
                            <option value="" className="font-semibold ">choose Product</option>
                            {products.map((product, productIndex) => (
                                <option key={productIndex} value={product.name} className="font-semibold text-lg">
                                    {product.name}
                                </option>
                            ))}
                        </select>
                        <input
                            type="number"
                            name="price"
                            value={data.price || ""}
                            onChange={(e) => handlePrice(e, index)}
                            className="px-4 py-3 border-1 rounded w-full"
                        />
                        <input
                            type="number"
                            name="quantity"
                            value={data.quantity || ""}
                            onChange={(e) => handleQuantity(e, index)}
                            className="px-4 py-3 border-1 rounded w-full"
                        />
                        <input
                            type="number"
                            name="discount"
                            value={data.discount || ""}
                            onChange={(e) => handleDiscount(e, index)}
                            className="px-4 py-3 border-1 rounded w-full"
                        />
                        <p className="py-3 w-full text-right font-semibold text-lg">{subTotal.toFixed(2)}</p>
                    </div>
                );
            })}
        </div>
    );
};

export default page;