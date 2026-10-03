"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Minus, Plus, Check, ChevronDown } from "lucide-react";
import type { Product, ProductColor } from "@/types";
import { useStore } from "@/store/store-context";
import SizeGuideModal from "./SizeGuideModal";

interface VariantSelectorProps {
  product: Product;
  onColorChange?: (color: ProductColor) => void;
}

export default function VariantSelector({ product, onColorChange }: VariantSelectorProps) {
  const { addToCart, toggleWishlist, isInWishlist } = useStore();
  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [sizeError, setSizeError] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [descOpen, setDescOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const wishlisted = isInWishlist(product.id);

  const handleColorChange = useCallback(
    (color: ProductColor) => {
      setSelectedColor(color);
      onColorChange?.(color);
    },
    [onColorChange]
  );

  const handleAddToCart = () => {
    if (!selectedSize) {
      setSizeError(true);
      return;
    }
    setSizeError(false);
    addToCart({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: selectedColor.images?.[0] || product.images[0],
      color: selectedColor.name,
      size: selectedSize,
      quantity,
    });
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const inStock = product.stock > 0;
  const lowStock = product.stock > 0 && product.stock <= 5;

  return (
    <div className="space-y-6">
      {/* Colour */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-semibold uppercase tracking-[0.1em]">Colour:</span>
          <span className="text-xs text-[var(--text-muted)]">{selectedColor.name}</span>
        </div>
        <div className="flex gap-2">
          {product.colors.map((color) => (
            <button
              key={color.name}
              onClick={() => handleColorChange(color)}
              className={`relative w-10 h-10 rounded-full border-2 transition-all ${
                selectedColor.name === color.name
                  ? "border-[var(--bg-dark)] scale-110"
                  : "border-[var(--border)] hover:border-[var(--text-muted)]"
              }`}
              style={{ backgroundColor: color.hex }}
              aria-label={`Select ${color.name}`}
              title={color.name}
            >
              {selectedColor.name === color.name && (
                <Check
                  className={`w-4 h-4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${
                    isLightColor(color.hex) ? "text-black" : "text-white"
                  }`}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Size */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold uppercase tracking-[0.1em]">Size</span>
          <button
            onClick={() => setSizeGuideOpen(true)}
            className="text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] underline underline-offset-2 transition-colors"
          >
            Size Guide
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {product.sizes.map((size) => (
            <motion.button
              key={size}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setSelectedSize(size);
                setSizeError(false);
              }}
              className={`px-4 py-2.5 text-sm font-medium border transition-all min-w-[3rem] ${
                selectedSize === size
                  ? "bg-[var(--bg-dark)] text-white border-[var(--bg-dark)]"
                  : sizeError
                    ? "border-[var(--error)] text-[var(--error)]"
                    : "border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--text-primary)]"
              }`}
            >
              {size}
            </motion.button>
          ))}
        </div>
        <AnimatePresence>
          {sizeError && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="text-xs text-[var(--error)] mt-2"
            >
              Please select a size before adding to bag.
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Quantity */}
      <div>
        <span className="text-xs font-semibold uppercase tracking-[0.1em] mb-3 block">
          Quantity
        </span>
        <div className="inline-flex items-center border border-[var(--border)]">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="px-3 py-2.5 hover:bg-[var(--bg-secondary)] transition-colors"
            aria-label="Decrease quantity"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="px-4 py-2.5 text-sm font-medium min-w-[3rem] text-center border-x border-[var(--border)]">
            {quantity}
          </span>
          <button
            onClick={() => setQuantity(Math.min(10, quantity + 1))}
            className="px-3 py-2.5 hover:bg-[var(--bg-secondary)] transition-colors"
            aria-label="Increase quantity"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Stock Status */}
      <div className="text-xs">
        {lowStock ? (
          <span className="text-[var(--error)] font-medium">
            Only {product.stock} left in stock
          </span>
        ) : inStock ? (
          <span className="text-[var(--success)] font-medium">In Stock</span>
        ) : (
          <span className="text-[var(--text-muted)]">Out of Stock</span>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={handleAddToCart}
          disabled={!inStock}
          className={`flex-1 py-3.5 text-sm font-semibold tracking-[0.1em] uppercase transition-all flex items-center justify-center gap-2 ${
            addedToCart
              ? "bg-[var(--success)] text-white"
              : inStock
                ? "bg-[var(--bg-dark)] text-white hover:bg-[var(--accent)]"
                : "bg-[var(--border)] text-[var(--text-muted)] cursor-not-allowed"
          }`}
        >
          {addedToCart ? (
            <>
              <Check className="w-4 h-4" />
              Added to Bag
            </>
          ) : (
            "Add to Bag"
          )}
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => toggleWishlist(product.id)}
          className={`p-3.5 border transition-all ${
            wishlisted
              ? "bg-[var(--bg-dark)] text-white border-[var(--bg-dark)]"
              : "border-[var(--border)] hover:border-[var(--text-primary)]"
          }`}
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart className={`w-5 h-5 ${wishlisted ? "fill-current" : ""}`} />
        </motion.button>
      </div>

      {/* Accordion sections */}
      <div className="border-t border-[var(--border)] pt-4 space-y-0">
        {/* Description */}
        <div className="border-b border-[var(--border)]">
          <button
            onClick={() => setDescOpen(!descOpen)}
            className="flex items-center justify-between w-full py-4 text-sm font-medium uppercase tracking-[0.08em]"
          >
            Description
            <ChevronDown
              className={`w-4 h-4 text-[var(--text-muted)] transition-transform ${
                descOpen ? "rotate-180" : ""
              }`}
            />
          </button>
          <AnimatePresence>
            {descOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed pb-4">
                  {product.description}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Details */}
        {product.details && (
          <div className="border-b border-[var(--border)]">
            <button
              onClick={() => setDetailsOpen(!detailsOpen)}
              className="flex items-center justify-between w-full py-4 text-sm font-medium uppercase tracking-[0.08em]"
            >
              Product Details
              <ChevronDown
                className={`w-4 h-4 text-[var(--text-muted)] transition-transform ${
                  detailsOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            <AnimatePresence>
              {detailsOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <ul className="text-sm text-[var(--text-secondary)] space-y-2 pb-4">
                    {product.details.map((d, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-[var(--accent)] mt-0.5">•</span>
                        {d}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Size Guide Modal */}
      <SizeGuideModal open={sizeGuideOpen} onClose={() => setSizeGuideOpen(false)} />
    </div>
  );
}

function isLightColor(hex: string): boolean {
  const c = hex.replace("#", "");
  const r = parseInt(c.substring(0, 2), 16);
  const g = parseInt(c.substring(2, 4), 16);
  const b = parseInt(c.substring(4, 6), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 186;
}
