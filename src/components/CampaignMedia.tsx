"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef } from "react";
import Hls from "hls.js";

export default function CampaignMedia() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoSrc =
    "https://www.fadon.in/cdn/shop/videos/c/vp/9fb153173db049c29cbeb46744d238f4/9fb153173db049c29cbeb46744d238f4.m3u8?v=0";

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (Hls.isSupported()) {
      const hls = new Hls({
        startPosition: -1,
        capLevelToPlayerSize: true,
      });
      hls.loadSource(videoSrc);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch(() => {});
      });

      return () => {
        hls.destroy();
      };
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = videoSrc;
      video.play().catch(() => {});
    }
  }, [videoSrc]);

  return (
    <section className="w-full">
      {/* Edge-to-edge Multi-Level Grid */}
      <div className="grid grid-cols-2 xl:grid-cols-4 grid-rows-none xl:grid-rows-3 h-auto xl:h-[120vh] min-h-[600px]">
        
        {/* Main Video Block (Spans 2 columns, 2 rows on Desktop) */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="col-span-2 xl:col-span-2 xl:row-span-2 relative h-[50vh] md:h-[60vh] xl:h-full overflow-hidden group bg-black"
        >
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />

          <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10">
            <span className="bg-white text-black text-[10px] sm:text-xs font-bold px-4 py-1.5 uppercase tracking-widest">
              Winter &apos;25 Film
            </span>
            <h3 
              className="text-white text-3xl sm:text-5xl font-bold mt-4 uppercase tracking-wide leading-none"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Move<br />Different
            </h3>
          </div>
        </motion.div>

        {/* Wide Image Block (Top right on desktop) */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="col-span-2 xl:col-span-2 xl:row-span-1 relative h-[40vh] xl:h-full overflow-hidden group bg-black"
        >
          <Image
            src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1200&h=800"
            alt="Lookbook Wide"
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-[var(--ease-out)] opacity-90 group-hover:opacity-100"
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
          <div className="absolute bottom-6 left-6 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
            <h3 className="text-white text-2xl font-bold uppercase tracking-wide" style={{ fontFamily: "var(--font-heading)" }}>
              Look 01
            </h3>
          </div>
        </motion.div>

        {/* Square Image Block 1 */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="col-span-1 xl:col-span-1 xl:row-span-1 relative h-[40vh] xl:h-full overflow-hidden group bg-black"
        >
          <Image
            src="https://images.unsplash.com/photo-1503342394128-c104d54dba01?auto=format&fit=crop&q=80&w=600&h=800"
            alt="Lookbook Square 1"
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-[var(--ease-out)] opacity-90 group-hover:opacity-100"
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
          <div className="absolute bottom-6 left-6 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
            <h3 className="text-white text-xl font-bold uppercase tracking-wide" style={{ fontFamily: "var(--font-heading)" }}>
              Look 02
            </h3>
          </div>
        </motion.div>

        {/* Square Image Block 2 */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="col-span-1 xl:col-span-1 xl:row-span-1 relative h-[40vh] xl:h-full overflow-hidden group bg-black"
        >
          <Image
            src="https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&q=80&w=600&h=800"
            alt="Lookbook Square 2"
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-[var(--ease-out)] opacity-90 group-hover:opacity-100"
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
          <div className="absolute bottom-6 left-6 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
            <h3 className="text-white text-xl font-bold uppercase tracking-wide" style={{ fontFamily: "var(--font-heading)" }}>
              Look 03
            </h3>
          </div>
        </motion.div>

        {/* Bottom Banner Image Block (Spans 2 columns on Desktop) */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="col-span-2 xl:col-span-2 xl:row-span-1 relative h-[30vh] xl:h-full overflow-hidden group bg-black"
        >
          <Image
            src="https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&q=80&w=1200&h=400"
            alt="Lookbook Banner"
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-[var(--ease-out)] opacity-90 group-hover:opacity-100"
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
          <div className="absolute bottom-6 left-6 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
            <h3 className="text-white text-xl font-bold uppercase tracking-wide" style={{ fontFamily: "var(--font-heading)" }}>
              The Process
            </h3>
          </div>
        </motion.div>
        
      </div>
    </section>
  );
}
