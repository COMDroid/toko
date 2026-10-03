"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useStore } from "@/store/store-context";

export default function CartDrawer() {
  const {
    cart,
    cartOpen,
    toggleCart,
    removeFromCart,
    updateQuantity,
    cartCount,
    cartTotal,
  } = useStore();

  return (
    <AnimatePresence>
      {cartOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-[var(--z-overlay)]"
            onClick={() => toggleCart(false)}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 w-[min(90vw,420px)] bg-white z-[var(--z-modal)] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-[var(--border)]">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5" />
                <h2
                  className="text-base font-bold uppercase tracking-[0.1em]"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  Your Bag
                </h2>
                <span className="text-xs text-[var(--text-muted)]">
                  ({cartCount} {cartCount === 1 ? "item" : "items"})
                </span>
              </div>
              <button
                onClick={() => toggleCart(false)}
                className="p-2 hover:bg-[var(--bg-secondary)] rounded-lg transition-colors"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <ShoppingBag className="w-12 h-12 text-[var(--text-muted)] mb-4" />
                  <p className="text-lg font-bold uppercase tracking-[0.05em] mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                    Your bag is empty
                  </p>
                  <p className="text-sm text-[var(--text-muted)] mb-6">
                    Add something to get started.
                  </p>
                  <Link
                    href="/shop"
                    onClick={() => toggleCart(false)}
                    className="px-6 py-2.5 bg-[var(--bg-dark)] text-white text-xs font-semibold tracking-[0.1em] uppercase hover:bg-[var(--accent)] transition-colors"
                  >
                    Shop Now
                  </Link>
                </div>
              ) : (
                <ul className="space-y-4">
                  <AnimatePresence mode="popLayout">
                    {cart.map((item) => {
                      const key = `${item.productId}-${item.color}-${item.size}`;
                      return (
                        <motion.li
                          key={key}
                          layout
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          className="flex gap-4 py-4 border-b border-[var(--border)] last:border-0"
                        >
                          {/* Image */}
                          <div className="relative w-20 h-24 shrink-0 overflow-hidden bg-[var(--bg-secondary)]">
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              className="object-cover"
                              sizes="80px"
                            />
                          </div>

                          {/* Details */}
                          <div className="flex-1 min-w-0">
                            <Link
                              href={`/product/${item.slug}`}
                              onClick={() => toggleCart(false)}
                              className="text-sm font-medium hover:text-[var(--accent)] transition-colors line-clamp-1"
                            >
                              {item.name}
                            </Link>
                            <p className="text-xs text-[var(--text-muted)] mt-0.5">
                              {item.color} / {item.size}
                            </p>
                            <p className="text-sm font-semibold mt-1">
                              ₹{item.price.toLocaleString("en-IN")}
                            </p>

                            {/* Quantity */}
                            <div className="flex items-center gap-0 mt-2">
                              <button
                                onClick={() =>
                                  updateQuantity(
                                    item.productId,
                                    item.color,
                                    item.size,
                                    item.quantity - 1
                                  )
                                }
                                className="p-1.5 border border-[var(--border)] hover:bg-[var(--bg-secondary)] transition-colors"
                                aria-label="Decrease quantity"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="px-3 py-1 border-y border-[var(--border)] text-xs font-medium min-w-[2rem] text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  updateQuantity(
                                    item.productId,
                                    item.color,
                                    item.size,
                                    item.quantity + 1
                                  )
                                }
                                className="p-1.5 border border-[var(--border)] hover:bg-[var(--bg-secondary)] transition-colors"
                                aria-label="Increase quantity"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                          </div>

                          {/* Remove */}
                          <button
                            onClick={() =>
                              removeFromCart(item.productId, item.color, item.size)
                            }
                            className="self-start p-1 text-[var(--text-muted)] hover:text-[var(--error)] transition-colors"
                            aria-label="Remove item"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </motion.li>
                      );
                    })}
                  </AnimatePresence>
                </ul>
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="px-6 py-5 border-t border-[var(--border)] space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium uppercase tracking-[0.05em]">
                    Subtotal
                  </span>
                  <span className="text-lg font-bold" style={{ fontFamily: "var(--font-heading)" }}>
                    ₹{cartTotal.toLocaleString("en-IN")}
                  </span>
                </div>
                <p className="text-xs text-[var(--text-muted)]">
                  Checkout is not implemented in this demo.
                </p>
                <button
                  className="w-full py-3.5 bg-[var(--bg-dark)] text-white text-sm font-semibold tracking-[0.1em] uppercase hover:bg-[var(--accent)] transition-colors cursor-not-allowed opacity-60"
                  disabled
                >
                  Checkout — Demo Only
                </button>
                <Link
                  href="/shop"
                  onClick={() => toggleCart(false)}
                  className="block text-center text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors underline underline-offset-2"
                >
                  Continue Shopping
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
