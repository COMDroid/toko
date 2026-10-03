"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Heart, Plus } from "lucide-react";
import type { Product } from "@/types";
import { useStore } from "@/store/store-context";
import { useState, useCallback } from "react";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { toggleWishlist, isInWishlist } = useStore();
  const [imgError, setImgError] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const wishlisted = isInWishlist(product.id);

  const handleWishlistClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      toggleWishlist(product.id);
    },
    [product.id, toggleWishlist]
  );

  const fallbackImage = `https://picsum.photos/seed/fallback${product.id}/600/800`;
  const mainImage = imgError ? fallbackImage : product.images[0];
  const hoverImage =
    product.images.length > 1 ? product.images[1] : undefined;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link
        href={`/product/${product.slug}`}
        className="group block"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {/* Image Container */}
        <div className="relative product-image-ratio overflow-hidden bg-[var(--bg-secondary)]">
          <Image
            src={mainImage}
            alt={product.name}
            fill
            className={`object-cover transition-all duration-700 ease-[var(--ease-out)] ${
              isHovering && hoverImage ? "opacity-0 scale-105" : "opacity-100 scale-100"
            }`}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            onError={() => setImgError(true)}
          />
          {hoverImage && (
            <Image
              src={hoverImage}
              alt={`${product.name} alternate view`}
              fill
              className={`object-cover transition-all duration-700 ease-[var(--ease-out)] ${
                isHovering ? "opacity-100 scale-100" : "opacity-0 scale-95"
              }`}
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          )}

          {/* Labels */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
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

          {/* Wishlist */}
          <button
            onClick={handleWishlistClick}
            className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-300 ${
              wishlisted
                ? "bg-[var(--bg-dark)] text-white"
                : "bg-white/80 backdrop-blur-sm text-[var(--text-primary)] opacity-0 group-hover:opacity-100"
            }`}
            aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart
              className={`w-4 h-4 transition-transform ${wishlisted ? "fill-current scale-110" : ""}`}
            />
          </button>

          {/* Quick Add */}
          <div
            className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-300"
          >
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                // Navigate to product page for size selection
                window.location.href = `/product/${product.slug}`;
              }}
              className="w-full py-2.5 bg-[var(--bg-dark)] text-white text-xs font-semibold tracking-[0.1em] uppercase flex items-center justify-center gap-2 hover:bg-[var(--accent)] transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              Quick Add
            </button>
          </div>
        </div>

        {/* Details */}
        <div className="mt-3 space-y-1.5">
          {/* Color Swatches */}
          {product.colors.length > 1 && (
            <div className="flex items-center gap-1.5">
              {product.colors.map((c) => (
                <span
                  key={c.name}
                  className="w-3 h-3 rounded-full border border-[var(--border)]"
                  style={{ backgroundColor: c.hex }}
                  title={c.name}
                />
              ))}
            </div>
          )}

          <h3 className="text-sm font-medium text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors line-clamp-1">
            {product.name}
          </h3>

          <div className="flex items-center gap-2">
            <span className={`text-sm font-semibold ${product.isSale ? "text-[var(--sale)]" : ""}`}>
              ₹{product.price.toLocaleString("en-IN")}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-[var(--text-muted)] price-strike">
                ₹{product.originalPrice.toLocaleString("en-IN")}
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
