import { Star } from 'lucide-react'
import React, { useState } from 'react'
import ProductComponent from './ProductCard'

const CardsSection = ({ products }) => {
  const [selectedProduct, setSelectedProduct] = useState(null)

  return (
    <div className="grid max-sm:grid-cols-1 max-xl:grid-cols-2 max-2xl:grid-cols-3 grid-cols-4 max-lg:w-full  max-xl:w-4/5 w-[70%] max-md:ml-4 ml-14 gap-4">
      {products.map((product, index) => (
        <div 
          onClick={() => setSelectedProduct(product)}
          key={index} 
          className="w-48 h-72 overflow-hidden flex flex-col justify-start gap-2 rounded-xl cursor-pointer bg-white/10 text-white"
        >
          <img src={product.image_link} alt="product image" className="h-2/3 w-full object-cover" />
          <div className="truncate py-1 px-2 font-semibold">{product.product_name}</div>
          {/* <div className="flex gap-2 items-center">
            {product.ratings} 
            <Star className="w-4 h-4 fill-white" />
          </div> */}
          <div className="flex gap-3 px-2">
            <div className="line-through">Rs. {product.actual_price}</div>
            <div>Rs. {product.discount_price}</div>
          </div>
        </div>
      ))}
      {selectedProduct && <ProductComponent product={selectedProduct} setProduct={setSelectedProduct} />}
    </div>
  )
}

export default CardsSection
