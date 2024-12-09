import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Product {
  title: string;
  description: string;
  image: string;
  learnMoreUrl?: string;
}

const products: Product[] = [
  {
    title: "Quick Market",
    description:
      "Connect to our pool of suppliers to get access to quality ingredients for all your kitchen resources at a fair and competitive market price.",
    image: "/assets/tomato-img.png",
  },
  {
    title: "Kittchen's Mobile",
    description:
      "Our customer facing mobile application allows chefs and restaurants to connect with a wide range of customers who place orders at their convenience.",
    image: "/assets/kitchen-mobile-app.png",
    learnMoreUrl: "https://kittchens.com/",
  },
  {
    title: "Kittchen's Go",
    description:
      "Get your meals delivered anywhere in your city. Our delivery agents are on standby to help you move stuff from favorite food outlets to your doorstep.",
    image: "/assets/delivery-guy.png",
    learnMoreUrl: "https://kittchens.com/",
  },
  {
    title: "Cloud Kittchens",
    description:
      "Seasoned chefs use our state of the art on-site Kittchen's to run their business. Take advantage of our exquisite locations on a plan that works for you.",
    image: "/assets/chef.png",
    learnMoreUrl: "https://kittchen.vercel.app",
  },
  {
    title: "Kittchen's Pastries",
    description:
      "Delight your taste with the variety of our pastry offerings. Visit our roadside tuck shops and grab a healthy bite on your way anywhere in your city.",
    image: "/assets/pasteries.png",
    learnMoreUrl: "https://kittchens.com/",
  },
  {
    title: "Megadel Farms",
    description:
      "Restaurants plug in immediate and future procurements for price friendly, quality supplies from our farms, so they can give their customers good meals at fair prices.",
    image: "/assets/farmer-img.png",
  },
];

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <Card className="bg-white overflow-hidden hover:shadow-xl transition-shadow">
      <div className="relative w-full aspect-[4/3]">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-cover"
        />
      </div>
      <CardContent className="p-6 space-y-4">
        <h3 className="text-xl font-semibold text-gray-900">{product.title}</h3>
        <p className="text-gray-600">{product.description}</p>
        {product.learnMoreUrl ? (
          <Link
            href={product.learnMoreUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              variant="link"
              className="p-0 text-primary hover:text-primary/80"
            >
              Learn More
            </Button>
          </Link>
        ) : (
          <Button
            variant="link"
            className="p-0 text-primary hover:text-primary/80"
          >
            Learn More
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

const ProductsSection = () => {
  return (
    <section
      id="products"
      className="container mx-auto md:min-w-full xl:min-w-[unset]"
    >
      <div className="bg-primary mx-auto px-8 py-16 w-full md:px-20">
        <h2 className="text-2xl font-semibold text-center text-white mb-6">
          Our Products/Channels
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
