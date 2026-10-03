"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { InstagramIcon as Instagram } from "./InstagramIcon";

const unsplashIds = [
  "1552374196-1ab2a1c593e8",
  "1503341455253-b2e723bb3dbb",
  "1503342217505-b0a15ec3261c",
  "1492707892479-7bc8d5a4ee93",
  "1469334031218-e382a71b716b",
  "1485230405346-71acb9518d9c"
];
const images = unsplashIds.map((id, i) => ({
  id: i,
  src: `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&q=80&w=600&h=600`,
  alt: `Street style look ${i + 1}`,
}));

export default function InstagramGallery() {
  return (
    <section className="py-16 sm:py-20 lg:py-24">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 sm:mb-14"
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <Instagram className="w-5 h-5 text-[var(--text-muted)]" />
            <p className="text-xs font-semibold tracking-[0.25em] uppercase text-[var(--text-muted)]">
              Follow us
            </p>
          </div>
          <h2
            className="text-2xl sm:text-3xl lg:text-4xl font-extrabold uppercase tracking-[0.05em] mb-3"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            @toko.fits_tirur
          </h2>
          <p className="text-sm text-[var(--text-muted)]">
            Tag us in your fits — dummy imagery shown below.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-3">
          {images.map((img, i) => (
            <motion.a
              key={img.id}
              href="https://www.instagram.com/toko.fits_tirur/"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.4 }}
              className="group relative aspect-square overflow-hidden bg-[var(--bg-secondary)]"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 640px) 33vw, 16vw"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                <Instagram className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
