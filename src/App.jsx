import React from "react";
import { motion } from "framer-motion";

export default function App() {
  // Animation variants for fade + slide
  const fadeSlide = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 sm:px-8 md:px-16 lg:px-24 text-center bg-[#fdf9f5] text-gray-800 font-sans">

      {/* Hero */}
      <motion.h1
        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif mb-2 leading-snug"
        variants={fadeSlide}
        initial="hidden"
        animate="visible"
      >
        Happy New Year, <span className="italic">Jarin ✨</span>
      </motion.h1>
      <motion.p
        className="text-gray-600 text-sm sm:text-base md:text-lg mb-10 leading-relaxed"
        variants={fadeSlide}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.2 }}
      >
        Wishing you a calm, beautiful start to the year ahead.
      </motion.p>

      {/* Message Card */}
      <motion.div
        className="bg-white shadow-lg rounded-xl p-6 sm:p-8 md:p-10 max-w-xs sm:max-w-md md:max-w-lg w-full mb-10 cursor-pointer"
        whileHover={{ scale: 1.03, boxShadow: "0px 15px 25px rgba(0,0,0,0.15)" }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.4 } }}
      >
        <p className="mb-4 italic text-sm sm:text-base md:text-lg">
          Some people make moments feel lighter without even trying.
        </p>
        <hr className="my-4 border-gray-300" />
        <p className="italic text-sm sm:text-base md:text-lg">
          Hope this year brings you peace, growth, and smiles.
        </p>
      </motion.div>

      {/* Ending */}
      <motion.p
        className="text-gray-500 text-xs sm:text-sm md:text-base"
        variants={fadeSlide}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.6 }}
      >
        Just wanted to wish you in a slightly different way.
      </motion.p>
    </div>
  );
}
