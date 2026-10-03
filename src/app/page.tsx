"use client";

import { motion } from "framer-motion";
import HeroSection from "@/components/HeroSection";
import FeaturedCategories from "@/components/FeaturedCategories";
import ProductGrid from "@/components/ProductGrid";
import EditorialSection from "@/components/EditorialSection";
import InstagramGallery from "@/components/InstagramGallery";
import { products } from "@/data/products";

export default function HomePage() {
  const newArrivals = products.filter((p) => p.isNew || p.featured).slice(0, 8);

  return (
    <>
      <HeroSection />

      <FeaturedCategories />

      {/* New Arrivals */}
      <section className="py-16 sm:py-20 lg:py-24 bg-[var(--bg-secondary)]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10 sm:mb-14"
          >
            <p className="text-xs font-semibold tracking-[0.25em] uppercase text-[var(--text-muted)] mb-3">
              Just Dropped
            </p>
            <h2
              className="text-2xl sm:text-3xl lg:text-4xl font-extrabold uppercase tracking-[0.05em]"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              New Arrivals
            </h2>
          </motion.div>

          <ProductGrid products={newArrivals} />

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <a
              href="/shop"
              className="inline-flex items-center justify-center px-8 py-3.5 border border-[var(--text-primary)] text-sm font-semibold tracking-[0.1em] uppercase hover:bg-[var(--bg-dark)] hover:text-white transition-all duration-300"
            >
              View All Products
            </a>
          </motion.div>
        </div>
      </section>

      <EditorialSection />

      <InstagramGallery />
    </>
  );
}
