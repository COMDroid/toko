"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ShoppingBag, Menu, X, Heart } from "lucide-react";
import { useStore } from "@/store/store-context";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "New Arrivals", href: "/shop?filter=new" },
];

export default function Header() {
  const { cartCount, toggleCart } = useStore();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className={`sticky top-0 z-[var(--z-sticky)] transition-all duration-300 ${
          scrolled
            ? "bg-[var(--bg-card)]/90 backdrop-blur-md shadow-[var(--shadow-sm)] border-b border-[var(--border)]"
            : "bg-[var(--bg-primary)]"
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 -ml-2 hover:bg-[var(--bg-secondary)] rounded-lg transition-colors"
              aria-label="Open navigation menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Navigation — Desktop */}
            <nav className="hidden lg:flex items-center gap-8" aria-label="Main navigation">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium tracking-[0.08em] uppercase text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-[var(--text-primary)] transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </nav>

            {/* Logo */}
            <Link href="/" className="flex items-center gap-1">
              <span
                className="text-xl sm:text-2xl font-extrabold tracking-[0.15em] uppercase"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                TOKO
              </span>
              <span
                className="text-xl sm:text-2xl font-light tracking-[0.08em] uppercase text-[var(--text-secondary)]"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                FITS
              </span>
            </Link>

            {/* Right Icons */}
            <div className="flex items-center gap-1 sm:gap-2">
              <button
                className="p-2 hover:bg-[var(--bg-secondary)] rounded-lg transition-colors"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>
              <Link
                href="/shop?filter=wishlist"
                className="hidden sm:flex p-2 hover:bg-[var(--bg-secondary)] rounded-lg transition-colors"
                aria-label="Wishlist"
              >
                <Heart className="w-5 h-5" />
              </Link>
              <button
                onClick={() => toggleCart()}
                className="p-2 hover:bg-[var(--bg-secondary)] rounded-lg transition-colors relative"
                aria-label={`Shopping bag with ${cartCount} items`}
              >
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-0.5 -right-0.5 bg-[var(--bg-dark)] text-white text-[10px] font-semibold w-[18px] h-[18px] rounded-full flex items-center justify-center"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Navigation Drawer */}
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
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 left-0 bottom-0 w-[min(85vw,360px)] bg-[var(--bg-card)] z-[var(--z-modal)] lg:hidden flex flex-col"
            >
              <div className="flex items-center justify-between p-4 border-b border-[var(--border)]">
                <span
                  className="text-lg font-extrabold tracking-[0.15em] uppercase"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  TOKO FITS
                </span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-2 hover:bg-[var(--bg-secondary)] rounded-lg transition-colors"
                  aria-label="Close navigation menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <nav className="flex-1 p-6" aria-label="Mobile navigation">
                <ul className="space-y-1">
                  {navLinks.map((link, i) => (
                    <motion.li
                      key={link.href}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.05 * i }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className="block py-3 text-lg font-medium tracking-[0.05em] uppercase text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors border-b border-[var(--border)]"
                      >
                        {link.label}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </nav>
              <div className="p-6 border-t border-[var(--border)]">
                <a
                  href="https://www.instagram.com/toko.fits_tirur/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                >
                  @toko.fits_tirur
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
