import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FooterLink {
  text: string;
  href: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

interface SocialLink {
  platform: string;
  icon: string;
  href: string;
}

const footerSections: FooterSection[] = [
  {
    title: "About Us",
    links: [
      { text: "Company", href: "#" },
      { text: "Careers", href: "#" },
      { text: "Support", href: "#" },
      { text: "FAQs", href: "#" },
      { text: "Privacy policy", href: "#" },
    ],
  },
  {
    title: "Products",
    links: [
      { text: "Pricing", href: "#" },
      { text: "Earnings", href: "#" },
      { text: "Growth", href: "#" },
    ],
  },
  {
    title: "Partners",
    links: [
      { text: "Aidi Venture", href: "#" },
      { text: "Sell It Off", href: "#" },
      { text: "Megadel Farm", href: "#" },
      { text: "Sell Dome", href: "#" },
      { text: "SpeedMeals Culinary School", href: "#" },
      { text: "Reddish Culinary School", href: "#" },
    ],
  },
];

const socialLinks: SocialLink[] = [
  {
    platform: "Instagram",
    icon: "/assets/instagram-icon.svg",
    href: "https://www.instagram.com/meergeafrica",
  },
  { platform: "Facebook", icon: "/assets/facebook-icon.svg", href: "#" },
  {
    platform: "X",
    icon: "/assets/X-icon.svg",
    href: "https://www.x.com/meergeafrica",
  },
  {
    platform: "LinkedIn",
    icon: "/assets/lin.png",
    href: "https://www.linkedin.com/company/meerge-africa/",
  },
];

const Footer = () => {
  return (
    <footer className="bg-white">
      {/* Mobile Footer */}
      <div className="p-4 space-y-4 md:hidden">
        <Link href="/" className="logo block mb-6">
          <Image
            src="/assets/Meerge-logo.svg"
            alt="Meerge Africa Logo"
            width={128}
            height={48}
            className="w-32"
          />
        </Link>

        <Accordion type="single" collapsible>
          {footerSections.map((section, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="font-semibold">
                {section.title}
              </AccordionTrigger>
              <AccordionContent>
                <div className="pl-4 pb-4 space-y-2">
                  {section.links.map((link, linkIndex) => (
                    <Link
                      key={linkIndex}
                      href={link.href}
                      className="block hover:text-secondary"
                    >
                      {link.text}
                    </Link>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="pt-4">
          <h3 className="font-semibold mb-2">Contact</h3>
          <div className="space-y-2">
            <p>hello@meergeafrica.com</p>
            <p>+234 813 918 8935</p>
          </div>
        </div>
      </div>

      {/* Desktop Footer */}
      <div className="hidden px-4 md:flex flex-wrap justify-between">
        <div className="space-y-8">
          <Link href="/" className="logo">
            <Image
              src="/assets/Meerge-logo.svg"
              alt="Meerge Africa Logo"
              width={48}
              height={48}
              className="h-12"
            />
          </Link>

          <div className="space-y-2">
            <h3 className="font-semibold">Contact</h3>
            <p>hello@meergeafrica.com</p>
            <p>+234 813 918 8935</p>
          </div>
        </div>

        {footerSections.map((section, index) => (
          <div key={index} className="space-y-4">
            <h3 className="font-semibold text-primary">{section.title}</h3>
            <div className="flex flex-col space-y-2">
              {section.links.map((link, linkIndex) => (
                <Link
                  key={linkIndex}
                  href={link.href}
                  className="hover:text-secondary"
                >
                  {link.text}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Social Media and Copyright */}
      <div className="flex flex-col justify-left mt-16 px-4 socials">
        <h3 className="font-semibold mb-4">Socials</h3>
        <div className="flex mb-10">
          {socialLinks.map((social, index) => (
            <Link
              key={index}
              href={social.href}
              className={index > 0 ? "mx-2" : ""}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src={social.icon}
                alt={`${social.platform} icon`}
                width={24}
                height={24}
              />
            </Link>
          ))}
        </div>

        <div className="text-left text-sm">
          <p className="mb-2">© 2024 Meerge Africa. All rights reserved</p>
          <p>
            <Link href="#" className="hover:text-secondary">
              Privacy Policy
            </Link>
            {" | "}
            <Link href="#" className="hover:text-secondary">
              Terms of use
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
