"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight, X } from "lucide-react";
import { products } from "@/data/products";
import type { Filters, SortOption } from "@/types";
import ProductFilters from "@/components/ProductFilters";
import SortSelector from "@/components/SortSelector";
import ProductGrid from "@/components/ProductGrid";

export default function ShopPage() {
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState<Filters>({
    category: null,
    size: null,
    color: null,
    priceRange: null,
  });
  const [sort, setSort] = useState<SortOption>("featured");

  // Apply URL params on mount
  useEffect(() => {
    const cat = searchParams.get("category");
    const filterParam = searchParams.get("filter");
    if (cat) {
      setFilters((f) => ({ ...f, category: cat }));
    }
    if (filterParam === "new") {
      // We'll handle "new" filter in the filtering logic
    }
  }, [searchParams]);

  const isNewFilter = searchParams.get("filter") === "new";

  const filtered = useMemo(() => {
    let result = [...products];

    if (isNewFilter) {
      result = result.filter((p) => p.isNew);
    }

    if (filters.category) {
      result = result.filter((p) => p.category === filters.category);
    }
    if (filters.size) {
      result = result.filter((p) => p.sizes.includes(filters.size!));
    }
    if (filters.color) {
      result = result.filter((p) =>
        p.colors.some((c) => c.name === filters.color)
      );
    }
    if (filters.priceRange) {
      const [min, max] = filters.priceRange;
      result = result.filter((p) => p.price >= min && p.price <= max);
    }

    // Sort
    switch (sort) {
      case "newest":
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "featured":
      default:
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }

    return result;
  }, [filters, sort, isNewFilter]);

  const activeFilterTags = [
    filters.category && { key: "category", label: filters.category },
    filters.size && { key: "size", label: `Size: ${filters.size}` },
    filters.color && { key: "color", label: `Colour: ${filters.color}` },
    filters.priceRange && {
      key: "priceRange",
      label: `₹${filters.priceRange[0].toLocaleString("en-IN")} — ₹${filters.priceRange[1].toLocaleString("en-IN")}`,
    },
  ].filter(Boolean) as { key: string; label: string }[];

  const removeFilter = (key: string) => {
    setFilters((f) => ({ ...f, [key]: null }));
  };

  return (
    <div className="min-h-screen">
      {/* Store Header */}
      <div className="bg-[var(--bg-dark)] text-white py-16 sm:py-20">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-white/40 mb-6">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white/70">
              {isNewFilter ? "New Arrivals" : "Shop"}
            </span>
          </nav>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase tracking-[0.05em] mb-3"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {isNewFilter ? "New Arrivals" : "The Collection"}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-sm text-white/50 max-w-md"
          >
            {isNewFilter
              ? "The latest drops — freshly added to the collection."
              : "Explore our full range of streetwear essentials. Filter by category, size, colour, or price to find your perfect fit."}
          </motion.p>
        </div>
      </div>

      {/* Shop Content */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 lg:mb-8">
          <div className="flex items-center gap-4 flex-wrap">
            <ProductFilters
              filters={filters}
              onFilterChange={setFilters}
              productCount={filtered.length}
            />

            {/* Active Filters Tags */}
            {activeFilterTags.map((tag) => (
              <motion.span
                key={tag.key}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[var(--bg-secondary)] text-xs font-medium"
              >
                {tag.label}
                <button
                  onClick={() => removeFilter(tag.key)}
                  className="hover:text-[var(--error)] transition-colors"
                  aria-label={`Remove ${tag.label} filter`}
                >
                  <X className="w-3 h-3" />
                </button>
              </motion.span>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <span className="text-xs text-[var(--text-muted)]">
              {filtered.length} {filtered.length === 1 ? "product" : "products"}
            </span>
            <SortSelector value={sort} onChange={setSort} />
          </div>
        </div>

        {/* Grid + Sidebar */}
        <div className="flex gap-8 lg:gap-12">
          {/* Sidebar (desktop only — already rendered via ProductFilters) */}
          <div className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h3
                  className="text-sm font-bold uppercase tracking-[0.1em]"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  Filters
                </h3>
                {activeFilterTags.length > 0 && (
                  <button
                    onClick={() =>
                      setFilters({ category: null, size: null, color: null, priceRange: null })
                    }
                    className="text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] underline underline-offset-2"
                  >
                    Clear all
                  </button>
                )}
              </div>
              <DesktopFilterContent filters={filters} onFilterChange={setFilters} />
            </div>
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            <ProductGrid products={filtered} />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Inline Desktop Filter Content ─── */

import { AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { categories, allSizes, allColors } from "@/data/products";

function DesktopFilterContent({
  filters,
  onFilterChange,
}: {
  filters: Filters;
  onFilterChange: (f: Filters) => void;
}) {
  const [openSection, setOpenSection] = useState<string | null>("category");

  const toggleSection = (s: string) =>
    setOpenSection((prev) => (prev === s ? null : s));

  const priceRanges: { label: string; range: [number, number] }[] = [
    { label: "Under ₹1,000", range: [0, 999] },
    { label: "₹1,000 — ₹2,000", range: [1000, 2000] },
    { label: "₹2,000 — ₹3,000", range: [2000, 3000] },
    { label: "Over ₹3,000", range: [3000, 99999] },
  ];

  return (
    <div className="space-y-0">
      {/* Category */}
      <Accordion
        title="Category"
        isOpen={openSection === "category"}
        toggle={() => toggleSection("category")}
      >
        <div className="space-y-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() =>
                onFilterChange({
                  ...filters,
                  category: filters.category === cat ? null : cat,
                })
              }
              className={`block w-full text-left px-3 py-2 text-sm transition-colors rounded ${
                filters.category === cat
                  ? "bg-[var(--bg-dark)] text-white"
                  : "text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </Accordion>

      {/* Size */}
      <Accordion
        title="Size"
        isOpen={openSection === "size"}
        toggle={() => toggleSection("size")}
      >
        <div className="flex flex-wrap gap-2">
          {allSizes.map((size) => (
            <button
              key={size}
              onClick={() =>
                onFilterChange({
                  ...filters,
                  size: filters.size === size ? null : size,
                })
              }
              className={`px-3 py-1.5 text-xs font-medium border transition-colors ${
                filters.size === size
                  ? "bg-[var(--bg-dark)] text-white border-[var(--bg-dark)]"
                  : "border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--text-primary)]"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </Accordion>

      {/* Colour */}
      <Accordion
        title="Colour"
        isOpen={openSection === "color"}
        toggle={() => toggleSection("color")}
      >
        <div className="flex flex-wrap gap-2">
          {allColors.map((color) => (
            <button
              key={color.name}
              onClick={() =>
                onFilterChange({
                  ...filters,
                  color: filters.color === color.name ? null : color.name,
                })
              }
              className="group"
              title={color.name}
            >
              <span
                className={`block w-6 h-6 rounded-full border-2 transition-all ${
                  filters.color === color.name
                    ? "border-[var(--bg-dark)] scale-110"
                    : "border-[var(--border)] group-hover:border-[var(--text-muted)]"
                }`}
                style={{ backgroundColor: color.hex }}
              />
            </button>
          ))}
        </div>
        {filters.color && (
          <p className="text-xs text-[var(--text-muted)] mt-2">Selected: {filters.color}</p>
        )}
      </Accordion>

      {/* Price */}
      <Accordion
        title="Price"
        isOpen={openSection === "price"}
        toggle={() => toggleSection("price")}
      >
        <div className="space-y-1">
          {priceRanges.map((pr) => (
            <button
              key={pr.label}
              onClick={() =>
                onFilterChange({
                  ...filters,
                  priceRange:
                    filters.priceRange?.[0] === pr.range[0] &&
                    filters.priceRange?.[1] === pr.range[1]
                      ? null
                      : pr.range,
                })
              }
              className={`block w-full text-left px-3 py-2 text-sm transition-colors rounded ${
                filters.priceRange?.[0] === pr.range[0] &&
                filters.priceRange?.[1] === pr.range[1]
                  ? "bg-[var(--bg-dark)] text-white"
                  : "text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)]"
              }`}
            >
              {pr.label}
            </button>
          ))}
        </div>
      </Accordion>
    </div>
  );
}

function Accordion({
  title,
  isOpen,
  toggle,
  children,
}: {
  title: string;
  isOpen: boolean;
  toggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="border-b border-[var(--border)]">
      <button
        onClick={toggle}
        className="flex items-center justify-between w-full py-4 text-sm font-medium uppercase tracking-[0.08em] hover:text-[var(--accent)] transition-colors"
      >
        {title}
        <ChevronDown
          className={`w-4 h-4 text-[var(--text-muted)] transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="pb-4">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
