"use client";

import { use, useState, useCallback } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { getProductBySlug, getRelatedProducts } from "@/data/products";
import type { ProductColor } from "@/types";
import ProductGallery from "@/components/ProductGallery";
import VariantSelector from "@/components/VariantSelector";
import ProductGrid from "@/components/ProductGrid";

export default function ProductPage({ params }: PageProps<"/product/[slug]">) {
  const { slug } = use(params);
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const related = getRelatedProducts(product, 4);
  const [activeImages, setActiveImages] = useState(product.images);

  const handleColorChange = useCallback(
    (color: ProductColor) => {
      if (color.images && color.images.length > 0) {
        setActiveImages(color.images);
      } else {
        setActiveImages(product.images);
      }
    },
    [product.images]
  );

  return (
    <div className="min-h-screen">
      {/* Product Detail */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-[var(--text-muted)] mb-6 lg:mb-8">
          <Link href="/" className="hover:text-[var(--text-primary)] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/shop" className="hover:text-[var(--text-primary)] transition-colors">
            Shop
          </Link>
          <ChevronRight className="w-3 h-3" />
          <Link
            href={`/shop?category=${encodeURIComponent(product.category)}`}
            className="hover:text-[var(--text-primary)] transition-colors"
          >
            {product.category}
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-[var(--text-secondary)] truncate max-w-[150px]">
            {product.name}
          </span>
        </nav>

        {/* Product Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ProductGallery images={activeImages} productName={product.name} />
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {/* Labels */}
            <div className="flex items-center gap-2 mb-3">
              {product.isNew && (
                <span className="bg-[var(--bg-dark)] text-white text-[10px] font-semibold tracking-[0.15em] uppercase px-2.5 py-1">
                  New
                </span>
              )}
              {product.isSale && (
                <span className="bg-[var(--sale)] text-white text-[10px] font-semibold tracking-[0.15em] uppercase px-2.5 py-1">
                  Sale
                </span>
              )}
            </div>

            {/* Name */}
            <h1
              className="text-2xl sm:text-3xl font-extrabold uppercase tracking-[0.02em] mb-2"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {product.name}
            </h1>

            {/* Category */}
            <p className="text-xs text-[var(--text-muted)] uppercase tracking-[0.15em] mb-4">
              {product.category}
            </p>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6">
              <span
                className={`text-2xl font-bold ${product.isSale ? "text-[var(--sale)]" : ""}`}
                style={{ fontFamily: "var(--font-heading)" }}
              >
                ₹{product.price.toLocaleString("en-IN")}
              </span>
              {product.originalPrice && (
                <span className="text-base text-[var(--text-muted)] price-strike">
                  ₹{product.originalPrice.toLocaleString("en-IN")}
                </span>
              )}
              {product.originalPrice && (
                <span className="text-xs font-semibold text-[var(--sale)]">
                  {Math.round(
                    ((product.originalPrice - product.price) / product.originalPrice) * 100
                  )}
                  % OFF
                </span>
              )}
            </div>

            {/* Short description */}
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-8 border-b border-[var(--border)] pb-6">
              {product.description}
            </p>

            {/* Variant Selector */}
            <VariantSelector product={product} onColorChange={handleColorChange} />
          </motion.div>
        </div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <section className="py-16 sm:py-20 bg-[var(--bg-secondary)]">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-10"
            >
              <h2
                className="text-xl sm:text-2xl font-extrabold uppercase tracking-[0.05em]"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                You May Also Like
              </h2>
            </motion.div>
            <ProductGrid products={related} />
          </div>
        </section>
      )}
    </div>
  );
}
