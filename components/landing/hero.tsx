import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const HeroSection = () => {
  return (
    <section
      className="relative bg-cover bg-no-repeat bg-center"
      style={{
        backgroundImage: "url('/assets/bg-img.png')",
        backgroundPosition: "center top",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 pt-56 md:pt-56 xl:pt-72 2xl:pt-96">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            <span className="block md:inline">We are </span>
            <span className="text-secondary">simplifying </span>
            <span className="md:block md:text-nowrap">
              food business operations{" "}
            </span>
            <span className="block">across Africa</span>
          </h1>

          <p className="text-white text-lg mb-8">
            Our solution streamlines and enables seamless business operations
            for Restaurant owners around the continent.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 py-4 md:py-0 xl:py-8">
            <Button
              asChild
              variant="default"
              className="px-8 py-2 bg-primary text-white hover:bg-primary/50 transition-colors"
            >
              <Link href="https://forms.gle/PVNCmsyiQgdUC7KG9">
                Request Demo
              </Link>
            </Button>

            <Button
              asChild
              variant="secondary"
              className="px-8 py-2 text-white hover:bg-secondary/50 transition-colors"
            >
              <Link href="https://forms.gle/PVNCmsyiQgdUC7KG9">Start here</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
