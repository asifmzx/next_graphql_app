import React from 'react'

const row_form = () => {
  return (
    <div>
      <tr>
        <td>
          <select
            name="products"
            id="products"
            className='border border-gray-300 p-3 rounded-md bg-black text-white w-full'
            onChange={handleProductChange}
            defaultValue=""
          >
            <option value="" disabled>Select a product</option>
            {productData.map((product) => (
              <option key={product.id} value={product.id}>{product.name}</option>
            ))}
          </select>
        </td>
        <td className='border border-gray-300 p-2'>{selectedProduct?.id || '-'}</td>
        <td className='border border-gray-300 p-2'>{selectedProduct?.name || '-'}</td>
        <td className='border border-gray-300 p-2'>${selectedProduct?.price?.toFixed(2) || '0.00'}</td>
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
          ${selectedProduct ? ((selectedProduct.price * selectedProductQuantity) - (selectedProduct.price * selectedProductQuantity * selectedProductDiscount / 100)).toFixed(2) : '0.00'}
        </td>
        <td className='border border-gray-300 p-2'>
          <button
            onClick={handleTotalItems}
            disabled={!selectedProduct}
            className={`px-3 py-1 rounded ${selectedProduct
              ? 'bg-blue-500 text-white hover:bg-blue-600'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
          >
            Add Item
          </button>
        </td>
      </tr>
    </div>
  )
}

export default row_form
