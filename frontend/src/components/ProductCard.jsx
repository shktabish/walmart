import { Button } from "@/components/ui/button"
import { useState } from "react"

// Icon Components
const MinusIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5 12h14" />
  </svg>
)

const PlusIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5 12h14" />
    <path d="M12 5v14" />
  </svg>
)

const CloseIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
)

const StarIcon = ({ filled, ...props }) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon
      points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
      className={filled ? "fill-primary" : "fill-muted stroke-muted-foreground"}
    />
  </svg>
)

export default function ProductComponent({ product, setProduct }) {
  const [quantity, setQuantity] = useState(1)
  const [totalPrice, setTotalPrice] = useState(product.discount_price)

  const increaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1)
    setTotalPrice((prevPrice) => prevPrice + product.discount_price)
  }

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1)
      setTotalPrice((prevPrice) => prevPrice - product.discount_price)
    }
  }

  const closeProduct = () => {
    setProduct(null)
  }

  return (
    <div className="absolute top-0 left-0 h-screen w-full bg-red-400">
      <div className="grid justify-center md:grid-cols-2 gap-6 lg:gap-12 items-start max-w-6xl px-4 mx-auto py-6">
        <ProductImage image={product.image_link} />
        <ProductDetails
          product={product}
          quantity={quantity}
          totalPrice={totalPrice}
          increaseQuantity={increaseQuantity}
          decreaseQuantity={decreaseQuantity}
          closeProduct={closeProduct}
        />
      </div>
      <CloseButton closeProduct={closeProduct} />
    </div>
  )
}

const ProductImage = ({ image }) => (
  <div className="grid gap-4">
    <img
      src={image}
      alt="Product Image"
      className="h-96 aspect-auto object-contain border w-full rounded-lg overflow-hidden"
    />
  </div>
)

const ProductDetails = ({
  product,
  quantity,
  totalPrice,
  increaseQuantity,
  decreaseQuantity,
  closeProduct,
}) => (
  <div className="grid gap-4 md:gap-8">
    <ProductTitle title={product.product_name} description={product.description} />
    <ProductPrice price={totalPrice} />
    <ProductActions
      quantity={quantity}
      increaseQuantity={increaseQuantity}
      decreaseQuantity={decreaseQuantity}
    />
  </div>
)

const ProductTitle = ({ title, description }) => (
  <div className="grid gap-2">
    <h1 className="font-bold text-lg lg:text-xl">{title}</h1>
    <p>{description}</p>
    <div className="flex items-center gap-4">
      <Rating />
    </div>
  </div>
)

const Rating = () => (
  <div className="flex items-center gap-0.5">
    {[1, 2, 3].map((_, i) => (
      <StarIcon key={i} filled />
    ))}
    {[1, 2].map((_, i) => (
      <StarIcon key={i} />
    ))}
  </div>
)

const ProductPrice = ({ price }) => (
  <div className="text-4xl font-bold">${price.toFixed(2)}</div>
)

const ProductActions = ({ quantity, increaseQuantity, decreaseQuantity }) => (
  <div className="flex items-center justify-between">
    <QuantityControl
      quantity={quantity}
      increaseQuantity={increaseQuantity}
      decreaseQuantity={decreaseQuantity}
    />
    <Button size="sm">Add to Cart</Button>
  </div>
)

const QuantityControl = ({ quantity, increaseQuantity, decreaseQuantity }) => (
  <div className="flex items-center gap-4">
    <Button variant="outline" size="sm" onClick={decreaseQuantity}>
      <MinusIcon className="w-4 h-4" />
    </Button>
    <span className="text-4xl font-bold">{quantity}</span>
    <Button variant="outline" size="sm" onClick={increaseQuantity}>
      <PlusIcon className="w-4 h-4" />
    </Button>
  </div>
)

const CloseButton = ({ closeProduct }) => (
  <button
    onClick={closeProduct}
    className="absolute top-4 right-4 p-2 rounded-full bg-white shadow-lg"
  >
    <CloseIcon className="w-6 h-6 text-red-500" />
  </button>
)
