import CTABanner from "@/components/landing/cta-banner";
import Footer from "@/components/landing/footer";
import Navbar from "@/components/landing/navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <CTABanner />
      <Footer />
    </>
  );
}
