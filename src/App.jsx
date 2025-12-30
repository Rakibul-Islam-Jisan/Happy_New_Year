import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

export default function App() {
  const [step, setStep] = useState(0); // ০: বাটন, ১: প্রথম উইশ, ২: ফাইনাল মেসেজ
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState([]);

  // ১. Heart Trail Logic (মাউস বা টাচ এর পেছনে হার্ট বের হবে)
  useEffect(() => {
    const handleMove = (e) => {
      const x = e.touches ? e.touches[0].clientX : e.clientX;
      const y = e.touches ? e.touches[0].clientY : e.clientY;
      
      setMousePos({
        x: (x / window.innerWidth - 0.5) * 20,
        y: (y / window.innerHeight - 0.5) * 20,
      });

      const newHeart = { id: Date.now(), x, y };
      setTrail((prev) => [...prev.slice(-10), newHeart]);
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("touchmove", handleMove);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("touchmove", handleMove);
    };
  }, []);

  const triggerConfetti = () => {
    const heartPath = "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z";
    const heart = confetti.shapeFromPath({ path: heartPath });
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.7 },
      shapes: [heart],
      colors: ["#FF69B4", "#FFB6C1", "#FFD700"],
      scalar: 2,
    });
  };

  const nextStep = () => {
    if (step === 0) triggerConfetti();
    setStep(step + 1);
  };

  const sparkles = useMemo(() => Array.from({ length: 15 }, (_, i) => ({
    id: i,
    size: Math.random() * 3 + 2,
    top: Math.random() * 100,
    left: Math.random() * 100,
  })), []);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center bg-[#fdfaf8] text-gray-800 overflow-hidden font-sans select-none touch-none">
      
      {/* Heart Trail Animation */}
      <AnimatePresence>
        {trail.map((h) => (
          <motion.span
            key={h.id}
            initial={{ opacity: 0.8, scale: 0.5 }}
            animate={{ opacity: 0, scale: 1.5, y: h.y - 50 }}
            exit={{ opacity: 0 }}
            className="absolute pointer-events-none text-pink-300 z-50"
            style={{ left: h.x, top: h.y }}
          >
            ❤
          </motion.span>
        ))}
      </AnimatePresence>

      {/* Background Sparkles */}
      {sparkles.map((s) => (
        <motion.div
          key={s.id}
          className="absolute rounded-full blur-[1px] bg-pink-200/40 pointer-events-none"
          style={{ width: s.size, height: s.size, top: `${s.top}%`, left: `${s.left}%` }}
          animate={{ x: mousePos.x * (s.size / 3), y: mousePos.y * (s.size / 3), opacity: [0.1, 0.4, 0.1] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      ))}

      {/* Header */}
      <motion.div className="z-10 mb-10" animate={{ y: step > 0 ? -20 : 0 }}>
        <h1 className="text-4xl md:text-6xl font-serif">
          Happy New Year, <br />
          <span className="italic font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-rose-500">Jarin ✨</span>
        </h1>
      </motion.div>

      {/* Storytelling Steps */}
      <div className="z-20 w-full max-w-sm">
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div key="s1" exit={{ opacity: 0, scale: 0.8 }}>
              <button onClick={nextStep} className="bg-white/80 backdrop-blur-md border border-pink-100 px-12 py-5 rounded-full shadow-lg text-gray-400 italic hover:text-pink-500 transition-all font-medium">
                Open with love
              </button>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div 
              key="s2" 
              initial={{ opacity: 0, x: 50 }} 
              animate={{ opacity: 1, x: 0 }} 
              exit={{ opacity: 0, x: -50 }}
              className="bg-white/90 p-8 rounded-[2rem] shadow-xl border border-pink-50"
            >
              <p className="text-xl italic font-serif text-gray-700">"Starting this year with a smile, because you make the world a bit brighter."</p>
              <button onClick={nextStep} className="mt-6 text-pink-400 text-sm font-bold uppercase tracking-widest">Next →</button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div 
              key="s3" 
              initial={{ opacity: 0, scale: 0.9 }} 
              animate={{ opacity: 1, scale: 1 }}
              className="relative bg-white/95 backdrop-blur-2xl p-10 rounded-[2rem] shadow-2xl border border-pink-100"
            >
              <p className="italic text-xl md:text-2xl text-gray-700 leading-relaxed font-serif">
                "Some people make moments feel <span className="text-pink-400">lighter</span> without even trying."
              </p>
              <div className="w-10 h-[1px] bg-pink-100 mx-auto my-6" />
              <p className="text-lg text-gray-500 font-light italic">Hope this year brings you peace, growth, and smiles.</p>
              
              {/* Handwritten Signature */}
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
                className="mt-8 font-[cursive] text-pink-400 text-2xl opacity-80"
                style={{ fontFamily: "'Dancing Script', cursive" }} // Google Fonts ব্যবহার করতে পারেন
              >
                — with love
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <p className="absolute bottom-8 text-[9px] uppercase tracking-[0.4em] opacity-30">2025 • For Jarin</p>
    </div>
  );
}