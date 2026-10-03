"use client";

import type { Product } from "@/types";
import ProductCard from "./ProductCard";

interface ProductGridProps {
  products: Product[];
  columns?: 2 | 3 | 4;
}

export default function ProductGrid({ products, columns = 4 }: ProductGridProps) {
  const gridCols =
    columns === 2
      ? "grid-cols-2"
      : columns === 3
        ? "grid-cols-2 lg:grid-cols-3"
        : "grid-cols-2 md:grid-cols-3 xl:grid-cols-4";

  if (products.length === 0) {
    return (
      <div className="py-20 text-center">
        <p
          className="text-2xl font-bold uppercase tracking-[0.1em] text-[var(--text-muted)] mb-3"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          No products found
        </p>
        <p className="text-sm text-[var(--text-muted)]">
          Try adjusting your filters or browse all products.
        </p>
      </div>
    );
  }

  return (
    <div className={`grid ${gridCols} gap-4 sm:gap-6 lg:gap-8`}>
      {products.map((product, index) => (
        <ProductCard key={product.id} product={product} index={index} />
      ))}
    </div>
  );
}
