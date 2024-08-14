import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

export default function CartPage() {
  return (
    <div className="h-screen bg-white container mx-auto px-4 sm:px-6 lg:px-8 py-12 text-black">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      <div className="grid grid-cols-1 md:grid-cols-[2fr,1fr] gap-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="grid grid-cols-1 md:grid-cols-[80px,1fr,80px] gap-4 border-b pb-4 mb-4">
            <img
              src="/placeholder.svg"
              alt="Product Image"
              width={80}
              height={80}
              className="rounded-md object-cover"
              style={{ aspectRatio: "80/80", objectFit: "cover" }}
            />
            <div className="flex flex-col">
              <h3 className="text-lg font-medium">Acme T-Shirt</h3>
              <p className="text-muted-foreground text-sm">Color: Black</p>
              <p className="text-muted-foreground text-sm">Size: M</p>
            </div>
            <div className="flex flex-col items-end">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon">
                  <MinusIcon className="h-4 w-4" />
                </Button>
                <span className="text-lg font-medium">2</span>
                <Button variant="outline" size="icon">
                  <PlusIcon className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-lg font-medium">$39.99</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-[80px,1fr,80px] gap-4 border-b pb-4 mb-4">
            <img
              src="/placeholder.svg"
              alt="Product Image"
              width={80}
              height={80}
              className="rounded-md object-cover"
              style={{ aspectRatio: "80/80", objectFit: "cover" }}
            />
            <div className="flex flex-col">
              <h3 className="text-lg font-medium">Acme Hoodie</h3>
              <p className="text-muted-foreground text-sm">Color: Navy</p>
              <p className="text-muted-foreground text-sm">Size: L</p>
            </div>
            <div className="flex flex-col items-end">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon">
                  <MinusIcon className="h-4 w-4" />
                </Button>
                <span className="text-lg font-medium">1</span>
                <Button variant="outline" size="icon">
                  <PlusIcon className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-lg font-medium">$59.99</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="promo-code">Promo Code</Label>
              <div className="flex">
                <Input id="promo-code" placeholder="Enter promo code" />
                <Button variant="outline" className="ml-2">
                  Apply
                </Button>
              </div>
            </div>
            <Separator />
            <div className="grid gap-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-medium">$99.98</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="font-medium">$5.00</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span className="font-medium">$8.00</span>
              </div>
              <Separator />
              <div className="flex justify-between text-lg font-medium">
                <span>Total</span>
                <span>$112.98</span>
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