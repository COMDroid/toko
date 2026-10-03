"use client";

import { motion } from "framer-motion";

export default function AnnouncementBar() {
  return (
    <motion.div
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-[var(--bg-secondary)] text-[var(--text-on-dark)] overflow-hidden border-b border-[var(--border)]"
    >
      <div className="py-2 flex whitespace-nowrap">
        <div className="animate-marquee flex items-center gap-12 text-xs tracking-[0.2em] uppercase font-medium">
          {Array.from({ length: 4 }).map((_, i) => (
            <span key={i} className="flex items-center gap-12">
              <span>Fresh Fits. New Energy.</span>
              <span className="text-[var(--accent)]">✦</span>
              <span>Step Into Style</span>
              <span className="text-[var(--accent)]">✦</span>
              <span>Tirur&apos;s Streetwear Destination</span>
              <span className="text-[var(--accent)]">✦</span>
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
