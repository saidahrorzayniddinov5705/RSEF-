import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function IntroVideo({ children }: { children: React.ReactNode }) {
  // Har doim (reload qilinganda ham) true by default:
  const [showIntro, setShowIntro] = useState(true);

  return (
    <>
      {/* Sayt fonga yuklanib turishi uchun children har doim render qilinadi */}
      {children}

      <AnimatePresence>
        {showIntro && (
          <motion.div
            key="intro-video"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 1 } }}
            className="fixed inset-0 z-[9999] bg-black"
          >
            {/* Videoga click qilib pause qilib qo'ymaslik uchun "shield" qatlam */}
            <div className="absolute inset-0 z-10" />
            
            <video
              src="/intro.mp4"
              autoPlay
              muted
              playsInline
              onEnded={() => setShowIntro(false)}
              onError={() => setShowIntro(false)}
              className="w-full h-full object-cover"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
