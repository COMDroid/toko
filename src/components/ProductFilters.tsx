"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, SlidersHorizontal, ChevronDown } from "lucide-react";
import type { Filters } from "@/types";
import { categories, allSizes, allColors } from "@/data/products";

interface ProductFiltersProps {
  filters: Filters;
  onFilterChange: (filters: Filters) => void;
  productCount: number;
}

export default function ProductFilters({
  filters,
  onFilterChange,
  productCount,
}: ProductFiltersProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openSection, setOpenSection] = useState<string | null>("category");

  const hasActiveFilters =
    filters.category || filters.size || filters.color || filters.priceRange;

  const clearAll = () =>
    onFilterChange({ category: null, size: null, color: null, priceRange: null });

  const toggleSection = (section: string) =>
    setOpenSection((prev) => (prev === section ? null : section));

  const priceRanges: { label: string; range: [number, number] }[] = [
    { label: "Under ₹1,000", range: [0, 999] },
    { label: "₹1,000 — ₹2,000", range: [1000, 2000] },
    { label: "₹2,000 — ₹3,000", range: [2000, 3000] },
    { label: "Over ₹3,000", range: [3000, 99999] },
  ];

  const FilterContent = () => (
    <div className="space-y-0">
      {/* Category */}
      <FilterSection
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
      </FilterSection>

      {/* Size */}
      <FilterSection
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
      </FilterSection>

      {/* Color */}
      <FilterSection
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
              className="flex items-center gap-2 group"
              title={color.name}
            >
              <span
                className={`w-6 h-6 rounded-full border-2 transition-all ${
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
          <p className="text-xs text-[var(--text-muted)] mt-2">
            Selected: {filters.color}
          </p>
        )}
      </FilterSection>

      {/* Price */}
      <FilterSection
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
      </FilterSection>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-64 shrink-0">
        <div className="sticky top-24">
          <div className="flex items-center justify-between mb-6">
            <h3
              className="text-sm font-bold uppercase tracking-[0.1em]"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Filters
            </h3>
            {hasActiveFilters && (
              <button
                onClick={clearAll}
                className="text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] underline underline-offset-2 transition-colors"
              >
                Clear all
              </button>
            )}
          </div>
          <FilterContent />
        </div>
      </aside>

      {/* Mobile Filter Button */}
      <div className="lg:hidden">
        <button
          onClick={() => setMobileOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 border border-[var(--border)] text-sm font-medium hover:bg-[var(--bg-secondary)] transition-colors"
        >
          <SlidersHorizontal className="w-4 h-4" />
          Filters
          {hasActiveFilters && (
            <span className="w-5 h-5 bg-[var(--bg-dark)] text-white text-[10px] font-semibold rounded-full flex items-center justify-center">
              {[filters.category, filters.size, filters.color, filters.priceRange].filter(Boolean).length}
            </span>
          )}
        </button>
      </div>

      {/* Mobile Filter Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-[var(--z-overlay)] lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 max-h-[80vh] bg-white z-[var(--z-modal)] lg:hidden rounded-t-2xl flex flex-col"
            >
              {/* Handle */}
              <div className="flex justify-center py-3">
                <div className="w-10 h-1 bg-[var(--border)] rounded-full" />
              </div>
              <div className="flex items-center justify-between px-6 pb-4 border-b border-[var(--border)]">
                <h3
                  className="text-base font-bold uppercase tracking-[0.1em]"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  Filters
                </h3>
                <div className="flex items-center gap-4">
                  {hasActiveFilters && (
                    <button
                      onClick={clearAll}
                      className="text-xs text-[var(--text-muted)] underline underline-offset-2"
                    >
                      Clear all
                    </button>
                  )}
                  <button
                    onClick={() => setMobileOpen(false)}
                    className="p-2 hover:bg-[var(--bg-secondary)] rounded-lg"
                    aria-label="Close filters"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto px-6 py-4">
                <FilterContent />
              </div>
              <div className="px-6 py-4 border-t border-[var(--border)]">
                <button
                  onClick={() => setMobileOpen(false)}
                  className="w-full py-3 bg-[var(--bg-dark)] text-white text-sm font-semibold tracking-[0.1em] uppercase"
                >
                  Show {productCount} {productCount === 1 ? "Product" : "Products"}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

/* ─── Filter Section Accordion ─── */

function FilterSection({
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
        className="flex items-center justify-between w-full py-4 text-sm font-medium uppercase tracking-[0.08em] text-left hover:text-[var(--accent)] transition-colors"
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
