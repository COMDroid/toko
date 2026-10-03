"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect } from "react";

interface SizeGuideModalProps {
  open: boolean;
  onClose: () => void;
}

const sizeData = [
  { size: "S", chest: "96", length: "68", shoulder: "46" },
  { size: "M", chest: "100", length: "70", shoulder: "48" },
  { size: "L", chest: "106", length: "72", shoulder: "50" },
  { size: "XL", chest: "112", length: "74", shoulder: "52" },
  { size: "XXL", chest: "118", length: "76", shoulder: "54" },
];

const bottomData = [
  { size: "28", waist: "72", hip: "92", length: "100" },
  { size: "30", waist: "76", hip: "96", length: "102" },
  { size: "32", waist: "80", hip: "100", length: "104" },
  { size: "34", waist: "84", hip: "104", length: "106" },
  { size: "36", waist: "88", hip: "108", length: "108" },
];

export default function SizeGuideModal({ open, onClose }: SizeGuideModalProps) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      const handleKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
      };
      window.addEventListener("keydown", handleKey);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handleKey);
      };
    }
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[var(--z-modal)] flex items-center justify-center p-4"
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/50" onClick={onClose} />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative bg-white w-full max-w-lg max-h-[80vh] overflow-y-auto z-10 p-6 sm:p-8"
          >
            <div className="flex items-center justify-between mb-6">
              <h2
                className="text-lg font-bold uppercase tracking-[0.1em]"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Size Guide
              </h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-[var(--bg-secondary)] rounded-lg transition-colors"
                aria-label="Close size guide"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-[var(--text-muted)] mb-6">
              All measurements are in centimetres. These are garment measurements, not body
              measurements. For best results, measure a similar garment you own.
            </p>

            {/* Tops */}
            <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--text-muted)] mb-3">
              Tops & Tees
            </h3>
            <div className="overflow-x-auto mb-8">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--border)]">
                    <th className="text-left py-2 pr-4 font-semibold text-xs uppercase tracking-[0.1em]">
                      Size
                    </th>
                    <th className="text-left py-2 pr-4 font-semibold text-xs uppercase tracking-[0.1em]">
                      Chest
                    </th>
                    <th className="text-left py-2 pr-4 font-semibold text-xs uppercase tracking-[0.1em]">
                      Length
                    </th>
                    <th className="text-left py-2 font-semibold text-xs uppercase tracking-[0.1em]">
                      Shoulder
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sizeData.map((row) => (
                    <tr key={row.size} className="border-b border-[var(--border)]">
                      <td className="py-2.5 pr-4 font-medium">{row.size}</td>
                      <td className="py-2.5 pr-4 text-[var(--text-secondary)]">{row.chest}</td>
                      <td className="py-2.5 pr-4 text-[var(--text-secondary)]">{row.length}</td>
                      <td className="py-2.5 text-[var(--text-secondary)]">{row.shoulder}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Bottoms */}
            <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--text-muted)] mb-3">
              Bottomwear
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--border)]">
                    <th className="text-left py-2 pr-4 font-semibold text-xs uppercase tracking-[0.1em]">
                      Size
                    </th>
                    <th className="text-left py-2 pr-4 font-semibold text-xs uppercase tracking-[0.1em]">
                      Waist
                    </th>
                    <th className="text-left py-2 pr-4 font-semibold text-xs uppercase tracking-[0.1em]">
                      Hip
                    </th>
                    <th className="text-left py-2 font-semibold text-xs uppercase tracking-[0.1em]">
                      Length
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {bottomData.map((row) => (
                    <tr key={row.size} className="border-b border-[var(--border)]">
                      <td className="py-2.5 pr-4 font-medium">{row.size}</td>
                      <td className="py-2.5 pr-4 text-[var(--text-secondary)]">{row.waist}</td>
                      <td className="py-2.5 pr-4 text-[var(--text-secondary)]">{row.hip}</td>
                      <td className="py-2.5 text-[var(--text-secondary)]">{row.length}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
