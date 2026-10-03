"use client";

import Link from "next/link";
import { Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[var(--bg-dark)] text-[var(--text-on-dark)]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <h2
              className="text-2xl font-extrabold tracking-[0.15em] uppercase mb-4"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              TOKO FITS
            </h2>
            <p className="text-[var(--text-on-dark-muted)] text-sm max-w-xs leading-relaxed">
              Everyday streetwear. Fresh looks. Your own style. Tirur&apos;s destination for
              modern casual fashion.
            </p>
            <a
              href="https://www.instagram.com/toko.fits_tirur/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-6 text-sm text-[var(--text-on-dark-muted)] hover:text-white transition-colors group"
            >
              <Instagram className="w-5 h-5 group-hover:scale-110 transition-transform" />
              @toko.fits_tirur
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xs font-semibold tracking-[0.2em] uppercase text-[var(--text-on-dark-muted)] mb-6">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {[
                { label: "Home", href: "/" },
                { label: "Shop All", href: "/shop" },
                { label: "New Arrivals", href: "/shop?filter=new" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--text-on-dark-muted)] hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-xs font-semibold tracking-[0.2em] uppercase text-[var(--text-on-dark-muted)] mb-6">
              Categories
            </h3>
            <ul className="space-y-3">
              {["Oversized Tees", "Graphic Tees", "Shirts", "Bottomwear"].map(
                (cat) => (
                  <li key={cat}>
                    <Link
                      href={`/shop?category=${encodeURIComponent(cat)}`}
                      className="text-sm text-[var(--text-on-dark-muted)] hover:text-white transition-colors"
                    >
                      {cat}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[var(--text-on-dark-muted)]">
            © {new Date().getFullYear()} TOKO FITS TIRUR. All rights reserved.
          </p>
          <p className="text-xs text-[var(--text-on-dark-muted)]">
            Development preview — dummy data only.
          </p>
        </div>
      </div>
    </footer>
  );
}
