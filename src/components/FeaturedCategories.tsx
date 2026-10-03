"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const categories = [
  {
    name: "Oversized Tees",
    image: "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?auto=format&fit=crop&q=80&w=600&h=800",
    slug: "Oversized Tees",
  },
  {
    name: "Graphic Tees",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=600&h=800",
    slug: "Graphic Tees",
  },
  {
    name: "Shirts",
    image: "https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?auto=format&fit=crop&q=80&w=600&h=800",
    slug: "Shirts",
  },
  {
    name: "Bottomwear",
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&q=80&w=600&h=800",
    slug: "Bottomwear",
  },
];

export default function FeaturedCategories() {
  return (
    <section className="py-16 sm:py-20 lg:py-24">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 sm:mb-14"
        >
          <p className="text-xs font-semibold tracking-[0.25em] uppercase text-[var(--text-muted)] mb-3">
            Browse by
          </p>
          <h2
            className="text-2xl sm:text-3xl lg:text-4xl font-extrabold uppercase tracking-[0.05em]"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Categories
          </h2>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <Link
                href={`/shop?category=${encodeURIComponent(cat.slug)}`}
                className="group relative block product-image-ratio overflow-hidden bg-[var(--bg-secondary)]"
              >
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover transition-transform duration-700 ease-[var(--ease-out)] group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                <div className="absolute inset-0 flex items-end p-4 sm:p-6">
                  <div>
                    <h3 className="text-white text-sm sm:text-base font-bold tracking-[0.05em] uppercase">
                      {cat.name}
                    </h3>
                    <span className="inline-block mt-1 text-white/60 text-xs tracking-[0.1em] uppercase group-hover:text-[var(--accent)] transition-colors">
                      Shop Now →
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
