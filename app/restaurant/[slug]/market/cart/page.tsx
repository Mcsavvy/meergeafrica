"use client";

import React, { useContext, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ArrowLeft, ArrowLeftCircle, Info } from "lucide-react";
import { useMarket } from "@/lib/contexts/market-context";
import Link from "next/link";
import { RestaurantContext } from "@/lib/contexts/restaurant";

const formatPrice = (price: number) => {
  return `₦${price.toLocaleString()}`;
};

const CartPage = () => {
  const { cart, products, removeFromCart, updateCartQuantity } = useMarket();
  const [promoCode, setPromoCode] = useState("");
  const [deliveryOption, setDeliveryOption] = useState("pickup");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedLocation, setSelectedLocation] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedBranch, setSelectedBranch] = useState("");
  const { slug } = useContext(RestaurantContext);

  // Get cart items with product details
  const cartItems = cart.map((item) => {
    const product = products.find((p) => p.id === item.productId);
    return {
      ...item,
      product,
    };
  });

  // Calculate totals
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const deliveryFee = deliveryOption === "delivery" ? 2000 : 0;
  const discount = promoCode ? 700 : 0;
  const total = subtotal + deliveryFee - discount;

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    updateCartQuantity(productId, newQuantity);
  };

  const handleRemoveItem = (productId: string) => {
    removeFromCart(productId);
  };

  return (
    <div className="bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-semibold">My Cart</h1>
          <Button variant="outline" className="bg-white" asChild>
            <Link href={`/restaurant/${slug}/market`}>
              <ArrowLeft className="w-4 h-4" />
              Back
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div
            className="lg:col-span-2 bg-white rounded-lg p-6 h-fit container overflow-y-auto"
            style={{ height: "calc(100vh - 160px)" }}
          >
            <h2 className="font-medium mb-4">
              Items in Cart ({cartItems.length})
            </h2>

            {cartItems.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 mb-4">Your cart is empty</p>
                <Button asChild variant="ghost">
                  <Link href={`/restaurant/${slug}/market`}>
                    <ArrowLeftCircle className="w-4 h-4 text-primary" />
                    Continue shopping
                  </Link>
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                {cartItems.map(
                  (item) =>
                    item.product && (
                      <div key={item.id} className="flex gap-4">
                        <div className="w-24 h-24 relative">
                          <Image
                            src={item.product.image || "/placeholder.png"}
                            alt={item.product.name}
                            fill
                            className="object-cover rounded-lg"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium">{item.product.name}</h3>
                          <p className="text-sm text-gray-500">
                            Category: {item.product.category}
                          </p>
                          <p className="text-sm text-gray-500">
                            Manufacturer&apos;s name:{" "}
                            {item.product.manufacturerName}
                          </p>
                          <p className="font-medium mt-1">
                            {formatPrice(item.price)}
                          </p>
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() =>
                                  handleQuantityChange(
                                    item.productId,
                                    item.quantity - 1
                                  )
                                }
                              >
                                -
                              </Button>
                              <span className="w-8 text-center">
                                {item.quantity}
                              </span>
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() =>
                                  handleQuantityChange(
                                    item.productId,
                                    item.quantity + 1
                                  )
                                }
                              >
                                +
                              </Button>
                            </div>
                            <Button
                              variant="ghost"
                              className="text-red-500 hover:text-red-600 hover:bg-red-50"
                              onClick={() => handleRemoveItem(item.productId)}
                            >
                              Remove from cart
                            </Button>
                          </div>
                        </div>
                      </div>
                    )
                )}

                <Button asChild variant="ghost">
                  <Link href={`/restaurant/${slug}/market`}>
                    <ArrowLeftCircle className="w-4 h-4 text-primary" />
                    Continue shopping
                  </Link>
                </Button>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div
            className="bg-white rounded-lg p-6 container overflow-y-auto"
            style={{ height: "calc(100vh - 160px)" }}
          >
            <h2 className="font-medium mb-6">Order Summary</h2>

            <RadioGroup
              defaultValue="pickup"
              className="mb-6"
              onValueChange={(value) => setDeliveryOption(value)}
            >
              <div className="flex items-center space-x-4 mb-4">
                <RadioGroupItem value="online" id="online" />
                <Label htmlFor="online">Online Payment</Label>
                <RadioGroupItem value="delivery" id="delivery" />
                <Label htmlFor="delivery">Payment on delivery</Label>
              </div>
            </RadioGroup>

            <div className="space-y-4 mb-6">
              <div>
                <Label>Choose your Pickup Location</Label>
                <Select onValueChange={setSelectedLocation}>
                  <SelectTrigger>
                    <SelectValue placeholder="Lagos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lagos">Lagos</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Select onValueChange={setSelectedBranch}>
                  <SelectTrigger>
                    <SelectValue placeholder="Adeniyi Adekkunbo Crescent, Wuse 2" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="wuse">
                      Adeniyi Adekkunbo Crescent, Wuse 2
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-start gap-2 text-sm">
                <Info className="w-4 h-4 mt-0.5 text-gray-400" />
                <div>
                  <p className="font-medium">Pickup Yourself</p>
                  <p className="text-gray-500">
                    Ready for pickup between today (05 January) and 09 January
                    if you request delivery within 30minutes
                  </p>
                </div>
                <Button variant="link" className="text-primary">
                  Details
                </Button>
              </div>

              <div className="flex items-start gap-2 text-sm">
                <Info className="w-4 h-4 mt-0.5 text-gray-400" />
                <div>
                  <p className="font-medium">Door Delivery</p>
                  <p className="text-gray-500">
                    Ready for pickup between today (05 January) and 09 January
                    if you request delivery within 30minutes
                  </p>
                </div>
                <Button variant="link" className="text-primary">
                  Details
                </Button>
              </div>
            </div>

            {/* Promo Code */}
            <div className="mb-6">
              <Label>Do you have a promo code?</Label>
              <p className="text-sm text-gray-500 mb-2">
                You save money when you apply a promo code
              </p>
              <div className="flex gap-2">
                <Input
                  placeholder="Enter code here"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                />
                <Button variant="secondary">Apply</Button>
              </div>
            </div>

            {/* Price Summary */}
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Subtotal Product:</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery:</span>
                <span>{formatPrice(deliveryFee)}</span>
              </div>
              <div className="flex justify-between">
                <span>Discount:</span>
                <span className="text-red-500">
                  {discount ? `(N${discount})` : "-"}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Promo code:</span>
                <span>-</span>
              </div>
              <div className="flex justify-between font-medium text-lg pt-2 border-t">
                <span>Total</span>
                <span className="text-primary">{formatPrice(total)}</span>
              </div>
            </div>

            <Button className="w-full mt-6">Proceed to checkout</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
