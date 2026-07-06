import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function IntroVideo({ children }: { children: React.ReactNode }) {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    // 2 soniyadan so'ng loading oynasini yopish
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Sayt fonga yuklanib turishi uchun children har doim render qilinadi */}
      {children}

      <AnimatePresence>
        {showIntro && (
          <motion.div
            key="intro-loading"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
            className="fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="flex flex-col items-center"
            >
              <div className="relative w-24 h-24 mb-8 flex justify-center items-center">
                 <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                    className="absolute inset-0 rounded-full border-4 border-slate-100 border-t-[#28A8EA]"
                 />
                 <span className="text-2xl font-black tracking-widest text-slate-800">RSEF</span>
              </div>
              <motion.p 
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="text-slate-500 text-sm tracking-widest uppercase font-medium text-center px-4"
              >
                Research, Science & Engineering Fair
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
