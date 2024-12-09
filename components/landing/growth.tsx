import React from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

interface GrowthFeature {
  title: string;
  description: string;
  icon: string;
  bgColor: string;
  textColor?: string;
}

const growthFeatures: GrowthFeature[] = [
  {
    title: "Stock Manager",
    description:
      "Set up your inventory, and monitor stock levels, get warnings when supplies are running low, and streamline restocking with supplier integration.",
    icon: "/assets/truck-icon.svg",
    bgColor: "bg-[#D1A753]",
  },
  {
    title: "InsightPro",
    description:
      "Dive into past and present details with insights into sales trends, customer preferences, and performance data, helping you make informed decisions to grow your business.",
    icon: "/assets/insight-pro.svg",
    bgColor: "bg-[#EBDED6]",
  },
  {
    title: "SyncBudget",
    description:
      "Looking for ways to control costs on expenses? Our budgeting tool helps you set and track budgets for expenses, making financial planning and resource management easier.",
    icon: "/assets/syncbudget-icon.svg",
    bgColor: "bg-[#AD92E3]",
  },
  {
    title: "CreditPlus",
    description:
      "Scale your food business to serve more customers with our flexible financing options for growth and expansion, access food grants and support capital when you need it.",
    icon: "/assets/cash-img.svg",
    bgColor: "bg-[#AD92E3]",
  },
  {
    title: "Buy now/ pay after",
    description:
      "Enjoy the flexibility to source for ingredients now and pay at a later date, increasing your purchasing power and keeping your restaurant adequately stocked for customer requests.",
    icon: "/assets/wallet-img.svg",
    bgColor: "bg-[#505050]",
    textColor: "text-white",
  },
  {
    title: "Auto re-order",
    description:
      "Based on your recent procurements, you can automatically generate new purchase orders or restocking requests with predefined criteria.",
    icon: "/assets/auto-reoder-img.svg",
    bgColor: "bg-[#505050]",
    textColor: "text-white",
  },
];

const GrowthCard = ({ feature }: { feature: GrowthFeature }) => {
  const textColorClass = feature.textColor || "text-gray-800";

  return (
    <Card
      className={`${feature.bgColor} border-none shadow-lg hover:shadow-xl transition-shadow`}
    >
      <CardContent className="p-6 flex flex-col justify-between h-full">
        <div className={`mb-6 ${textColorClass}`}>
          <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
          <p className={`${textColorClass} opacity-90`}>
            {feature.description}
          </p>
        </div>
        <div className="w-12 h-12 relative self-end">
          <Image
            src={feature.icon}
            alt={feature.title}
            fill
            className="object-contain"
          />
        </div>
      </CardContent>
    </Card>
  );
};

const GrowthSection = () => {
  return (
    <section
      id="growth-card"
      className="section z-20 relative container mx-auto px-6 py-16"
    >
      <div>
        <span className="text-secondary font-semibold text-lg block mb-2">
          Growth
        </span>
        <h2 className="text-3xl md:text-4xl font-bold mb-12">
          Enhance Your Restaurant&apos;s Profitability with Strategic Solutions
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {growthFeatures.map((feature, index) => (
            <GrowthCard key={index} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default GrowthSection;
