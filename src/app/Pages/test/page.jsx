"use client"
import React, { useState } from 'react'
import { productData } from './data/productData'

const page = () => {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [selectedProductDiscount, setSelectedProductDiscount] = useState(0);
    const [selectedProductQuantity, setSelectedProductQuantity] = useState(1);
    const [totalItems, setTotalItems] = useState([]);

    const handleProductChange = (e) => {
        const productId = parseInt(e.target.value);
        const product = productData.find(p => p.id === productId);
        setSelectedProduct(product);
    };

    const handleQuantityChange = (e) => {
        setSelectedProductQuantity(Number(e.target.value));
    };

    const handleDiscountChange = (e) => {
        setSelectedProductDiscount(Number(e.target.value));
    };

    function TotalSum() {
        let sum = 0;
        totalItems.forEach((item) => {
            sum += item.total;
        });
        return sum.toFixed(2);
    }

    console.log('Total Items:', totalItems);

    const handleTotalItems = () => {
        if (!totalItems.find(item => item.id === selectedProduct.id)) {
            const newItem = {
                id: selectedProduct.id,
                name: selectedProduct.name,
                price: selectedProduct.price,
                quantity: selectedProductQuantity,
                discount: selectedProductDiscount,
                total: (selectedProduct.price * selectedProductQuantity) - (selectedProduct.price * selectedProductQuantity * selectedProductDiscount / 100)
            };
            setTotalItems(prev => [...prev, newItem]);
            setSelectedProduct(null);
            setSelectedProductQuantity(1);
            setSelectedProductDiscount(0);
        }
    }

    return (
        <div className='p-4 md:p-6 bg-gray-white'>
            <select
                name="products"
                id="products"
                className='border border-gray-300 p-2 rounded-md ml-2 bg-black text-white'
                onChange={handleProductChange}
                defaultValue=""
            >
                <option value="" disabled>Select a product</option>
                {productData.map((product) => (
                    <option key={product.id} value={product.id}>{product.name}</option>
                ))}
            </select>
            <table className='w-full mt-4 border-collapse'>
                <thead>
                    <tr>
                        <th className='border border-gray-300 p-2'>ID</th>
                        <th className='border border-gray-300 p-2'>Product Name</th>
                        <th className='border border-gray-300 p-2'>Price</th>
                        <th className='border border-gray-300 p-2'>Quantity</th>
                        <th className='border border-gray-300 p-2'>Discount</th>
                        <th className='border border-gray-300 p-2'>Total</th>
                        <th className='border border-gray-300 p-2'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    
                        {selectedProduct && (
                            <tr key={selectedProduct.id}>
                                <td className='border border-gray-300 p-2'>{selectedProduct.id}</td>
                                <td className='border border-gray-300 p-2'>{selectedProduct.name}</td>
                                <td className='border border-gray-300 p-2'>${selectedProduct.price.toFixed(2)}</td>
                                <td className='border border-gray-300 p-2'>
                                    <input
                                        type="number"
                                        className='w-full border border-gray-300 p-1 rounded'
                                        value={selectedProductQuantity}
                                        onChange={handleQuantityChange}
                                    />
                                </td>
                                <td className='border border-gray-300 p-2'>
                                    <input
                                        type="number"
                                        className='w-full border border-gray-300 p-1 rounded'
                                        value={selectedProductDiscount}
                                        onChange={handleDiscountChange}
                                    />
                                </td>
                                <td className='border border-gray-300 p-2'>
                                    ${((selectedProduct.price * selectedProductQuantity) - (selectedProduct.price * selectedProductQuantity * selectedProductDiscount / 100)).toFixed(2)}
                                </td>
                                <td className='border border-gray-300 p-2'>
                                    <button
                                        onClick={handleTotalItems}
                                        className='bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600'
                                    >
                                        Add Item
                                    </button>
                                </td>
                            </tr>
                        )}
                    
                    {totalItems.map((item) => (
                        <tr key={item.id}>
                            <td className='border border-gray-300 p-2'>{item.id}</td>
                            <td className='border border-gray-300 p-2'>{item.name}</td>
                            <td className='border border-gray-300 p-2'>${item.price.toFixed(2)}</td>
                            <td className='border border-gray-300 p-2'>{item.quantity}</td>
                            <td className='border border-gray-300 p-2'>{item.discount}%</td>
                            <td className='border border-gray-300 p-2'>${item.total.toFixed(2)}</td>
                            <td className='border border-gray-300 p-2'><button>...</button></td>
                        </tr>
                    ))}
                    <tr>
                        <td colSpan="6" className='p-2 text-right font-semibold'>Total Items:</td>
                        <td className='p-2 text-center font-semibold'>
                            {totalItems.length}
                        </td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan="5" className='p-2 text-right font-semibold'>Sub Total:</td>
                        <td className='p-2 text-center font-semibold'>
                            ${TotalSum()}
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
    )
}

export default page
