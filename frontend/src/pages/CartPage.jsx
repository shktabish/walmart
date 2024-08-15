import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { useCart } from "../context/CartContext";
import { useMemo } from "react";


export default function CartPage() {
  const { cartItems } = useCart();

  const subtotal = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.totalPrice, 0);
  }, [cartItems]);

  const shipping = 5.00;
  const taxRate = 0.08; 
  const tax = useMemo(() => subtotal * taxRate, [subtotal]);

  const total = useMemo(() => subtotal + shipping + tax, [subtotal, shipping, tax]);

  return (
    <div className="h-screen bg-white container mx-auto px-4 sm:px-6 lg:px-8 py-12 text-black">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      <div className="grid grid-cols-1 md:grid-cols-[2fr,1fr] gap-8">
      <div className="bg-white rounded-lg shadow-md p-6">
          {cartItems.map((item) => (
            <div
              key={item.product_name}
              className="grid grid-cols-1 md:grid-cols-[80px,1fr,80px] gap-4 border-b pb-4 mb-4"
            >
              <img
                src={item.image_link}
                alt="Product Image"
                width={80}
                height={80}
                className="rounded-md object-cover"
                style={{ aspectRatio: "80/80", objectFit: "cover" }}
              />
              <div className="flex flex-col">
                <h3 className="text-lg font-medium">{item.product_name}</h3>
                <p className="text-muted-foreground text-sm">Quantity: {item.quantity}</p>
              </div>
              <div className="flex flex-col items-end">
                <p className="text-lg font-medium">Rs. {item.totalPrice}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="grid gap-4">
            {/* <div className="grid gap-2">
              <Label htmlFor="promo-code">Promo Code</Label>
              <div className="flex">
                <Input id="promo-code" placeholder="Enter promo code" />
                <Button variant="outline" className="ml-2">
                  Apply
                </Button>
              </div>
            </div> */}
            <Separator />
            <div className="grid gap-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-medium">Rs. {subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="font-medium">Rs. {shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span className="font-medium">Rs. {tax.toFixed(2)}</span>
              </div>
              <Separator />
              <div className="flex justify-between text-lg font-medium">
                <span>Total</span>
                <span>Rs. {total.toFixed(2)}</span>
              </div>
            </div>
            <Button size="lg" className="w-full">
              Proceed to Checkout
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

function MinusIcon(props) {
  return (
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
}


function PlusIcon(props) {
  return (
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
}