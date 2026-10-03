"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-[85vh] lg:min-h-[90vh] flex items-end overflow-hidden bg-[var(--bg-dark)]">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?auto=format&fit=crop&q=80&w=1920&h=1080"
          alt="Male fashion model in streetwear campaign"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20 lg:pb-24">
        <div className="max-w-2xl">
          {/* Tag */}
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-[var(--accent)] text-xs sm:text-sm font-semibold tracking-[0.25em] uppercase mb-4 sm:mb-6"
          >
            New Season — 2025 Collection
          </motion.p>

          {/* Headline */}
          <motion.h1
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold uppercase leading-[0.95] text-white mb-4 sm:mb-6"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Your Fit.
            <br />
            Your Rules.
          </motion.h1>

          {/* Sub-headline */}
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="text-base sm:text-lg text-white/70 max-w-md mb-8 sm:mb-10 leading-relaxed"
          >
            Everyday streetwear. Fresh looks. Your own style. Built for those
            who move different.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4"
          >
            <Link
              href="/shop"
              className="inline-flex items-center justify-center px-8 py-3.5 bg-white text-[var(--bg-dark)] text-sm font-semibold tracking-[0.1em] uppercase hover:bg-[var(--accent)] hover:text-white transition-all duration-300 group"
            >
              Shop Now
              <svg
                className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href="/shop"
              className="inline-flex items-center justify-center px-8 py-3.5 border border-white/40 text-white text-sm font-semibold tracking-[0.1em] uppercase hover:bg-white/10 hover:border-white/70 transition-all duration-300"
            >
              Explore the Collection
            </Link>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="hidden lg:block absolute bottom-8 right-8"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2 text-white/40"
          >
            <span className="text-[10px] tracking-[0.2em] uppercase rotate-90 origin-center mb-6">
              Scroll
            </span>
            <div className="w-[1px] h-8 bg-white/30" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
