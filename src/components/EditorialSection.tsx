"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function EditorialSection() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-[var(--bg-dark)] text-white overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative aspect-[3/4] lg:aspect-[4/5] overflow-hidden"
          >
            <Image
              src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=900&h=1200"
              alt="Editorial streetwear campaign"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="lg:pl-8"
          >
            <p className="text-[var(--accent)] text-xs font-semibold tracking-[0.25em] uppercase mb-4">
              The Edit
            </p>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase leading-[0.95] mb-6"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Built for
              <br />
              the Streets
            </h2>
            <p className="text-white/60 text-sm sm:text-base leading-relaxed max-w-md mb-8">
              Every piece is designed for movement, comfort, and confidence.
              No rules. No limits. Just real clothes for real people.
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-3 text-sm font-semibold tracking-[0.1em] uppercase text-white hover:text-[var(--accent)] transition-colors group"
            >
              Explore the collection
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-white/10">
              {[
                { value: "100+", label: "Fresh Styles" },
                { value: "12K+", label: "Happy Customers" },
                { value: "4.9", label: "Avg. Rating" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p
                    className="text-xl sm:text-2xl font-bold text-[var(--accent)]"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {stat.value}
                  </p>
                  <p className="text-xs text-white/40 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
