import AboutSection from "@/components/home/AboutSection";
import ContactSection from "@/components/home/ContactSection";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import HeroBanner from "@/components/home/HeroBanner";
import ProductCategories from "@/components/home/ProductCategories";

export default function HomePage() {
  return (
    <main className="bg-white">
      <HeroBanner />
      <FeaturedProducts />
      <ProductCategories />
      <AboutSection />
      <ContactSection />
    </main>
  );
}
