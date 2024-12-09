import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MessageSquare } from "lucide-react";

const CTABanner = () => {
  return (
    <section
      className="section container mx-auto"
      style={{
        backgroundImage:
          "linear-gradient(to bottom, rgb(35 37 41 / 53%), rgb(35 37 41 / 53%)), url('/assets/bar-man.png')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center top",
      }}
    >
      <div className="py-10 px-8">
        <h2 className="text-2xl md:text-3xl text-white font-semibold">
          Managing your restaurant has never been more effortless.
        </h2>

        <div className="w-full md:w-fit mt-8 bg-primary p-4 md:p-8 rounded-lg space-y-4">
          <p className="text-white text-lg">
            You&apos;re just one click away from getting started.
          </p>

          <Button
            asChild
            variant="secondary"
            className="mt-5 flex items-center gap-2 justify-center text-white py-2 px-3 w-fit rounded-lg"
          >
            <Link href="https://forms.gle/PVNCmsyiQgdUC7KG9">
              Request Demo
              <MessageSquare className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTABanner;
