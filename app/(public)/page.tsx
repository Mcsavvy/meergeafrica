import FeatureCarousel from "@/components/landing/carousel";
import FeaturesSection from "@/components/landing/features";
import GrowthSection from "@/components/landing/growth";
import HeroSection from "@/components/landing/hero";
import PartnersSection from "@/components/landing/partners";
import ProductsSection from "@/components/landing/products";
import TestimonialsSection from "@/components/landing/testimonials";
import React from "react";

export const metadata = {
  title: "Meerge Africa | Home",
  description:
    "Meerge is a restaurant management software that helps you manage your restaurant operations effectively.",
};

const HomePage = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <HeroSection />

      {/* Carousel Section */}
      <section className="section second-section h2 flex flex-col items-center justify-center pt-12 w-full">
        <h2 className="text-3xl md:text-4xl text-center font-medium mb-16">
          <span className="block md:inline">Food business is </span>
          <strong className="font-bold">as serious as fun!</strong>{" "}
          <span className="block md:inline">Ease the stress </span>
          <strong className="font-bold">by 0.1%</strong>
        </h2>

        <FeatureCarousel />
      </section>
      <FeaturesSection />
      <GrowthSection />
      <ProductsSection />
      <TestimonialsSection />
      <PartnersSection />
    </div>
  );
};

export default HomePage;
