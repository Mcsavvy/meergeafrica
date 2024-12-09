import React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface Testimonial {
  content: string;
  name: string;
  role: string;
}

const testimonials: Testimonial[] = [
  {
    content:
      "I can say my business have found an easy to use product with Meerge solution. The process of getting my staff to learn how it works was pretty simple.",
    name: "Akani",
    role: "Business Owner",
  },
  {
    content:
      "At first, we needed to understand how Meerge was going to help us with operations before getting onboard. I believe we made a good decision to.",
    name: "Olayemi",
    role: "Resturant Manager",
  },
  {
    content:
      "We started talking with the Customer team and it didn't take long for us to conclude on using Meerge to manage some of our routine business activities.",
    name: "Chef Janet",
    role: "",
  },
];

const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => {
  return (
    <Card className="h-auto bg-white text-black hover:shadow-lg transition-shadow">
      <CardContent className="p-6 flex flex-col justify-between h-full">
        <p className="text-gray-700 mb-6 italic">
          &quot;{testimonial.content}&quot;
        </p>
        <div>
          <p className="font-semibold text-gray-900">{testimonial.name}</p>
          {testimonial.role && (
            <p className="text-gray-600 text-sm">{testimonial.role}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

const TestimonialsSection = () => {
  return (
    <section className="section z-20 relative container mx-auto px-6 py-16">
      <h2 className="text-center text-2xl font-semibold mb-16 w-full mt-20">
        Here&apos;s what{" "}
        <span className="font-bold md:inline block">our trusted partners</span>{" "}
        <span className="block">say about us</span>
      </h2>

      <div className="grid md:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <TestimonialCard key={index} testimonial={testimonial} />
        ))}
      </div>
    </section>
  );
};

export default TestimonialsSection;
