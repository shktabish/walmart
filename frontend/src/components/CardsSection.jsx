import { Star } from 'lucide-react'
import React from 'react'

const CardsSection = ({ products }) => {
  return (
    <div className="flex flex-wrap space-x-4">
      {products.map((product, index) => (
        <div key={index} className="w-48 h-60 ml-14 overflow-hidden px-2 flex flex-col justify-center gap-2 border-[1px] border-black rounded-xl">
          <img src={product.image_link} alt="product image" className="h-1/2 aspect-square mx-auto" />
          <div className="truncate">{product.product_name}</div>
          <div className="flex gap-2 items-center">
            {product.ratings} 
            <Star className="w-4 h-4 fill-white" />
          </div>
          <div className="flex gap-3">
            <div className="line-through">{product.actual_price}</div>
            <div>{product.discount_price}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default CardsSection
