import React from "react";
import Image from "next/image";

interface Partner {
  name: string;
  logo: string;
  addTopMargin?: boolean;
}

const partners: Partner[] = [
  {
    name: "AID",
    logo: "/assets/aid.png",
  },
  {
    name: "Sell It Off",
    logo: "/assets/sell-it-off-logo.png",
  },
  {
    name: "Megadel Farm",
    logo: "/assets/megadel-farm-logo.png",
  },
  {
    name: "Speed",
    logo: "/assets/speed.png",
    addTopMargin: true,
  },
  {
    name: "Sell Dome",
    logo: "/assets/sell-dome-logo.png",
    addTopMargin: true,
  },
  {
    name: "Red",
    logo: "/assets/red.png",
    addTopMargin: true,
  },
];

const PartnersSection = () => {
  return (
    <section
      id="partners"
      className="section z-20 relative container mx-auto px-6 py-6 bg-[#f3f5f7]"
    >
      <span className="text-secondary font-semibold text-lg block">
        Trusted Partners
      </span>

      <div className="grid grid-cols-3 gap-4 w-full mt-10 pb-28">
        {partners.map((partner, index) => (
          <div
            key={index}
            className={`flex justify-center items-center ${
              partner.addTopMargin ? "mt-8" : ""
            }`}
          >
            <div className="relative w-32 h-16">
              <Image
                src={partner.logo}
                alt={`${partner.name} logo`}
                fill
                className="object-contain"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PartnersSection;
