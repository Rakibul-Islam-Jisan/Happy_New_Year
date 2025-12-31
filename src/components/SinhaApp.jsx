import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

const Typewriter = ({ text, delay = 40 }) => {
  const [displayedText, setDisplayedText] = useState("");
  useEffect(() => {
    setDisplayedText(""); 
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayedText(text.slice(0, i + 1));
        i++;
      } else clearInterval(timer);
    }, delay);
    return () => clearInterval(timer);
  }, [text, delay]);
  return <span>{displayedText}</span>;
};

export default function SinhaApp() {
  const [step, setStep] = useState(0); 
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [showWishBox, setShowWishBox] = useState(false);
  const audioRef = useRef(null);

  const quotes = [
    "To the friend who makes every bad day better just by being there.",
    "2026 better be ready for us, because we're about to make it legendary.",
    "May your year be full of spontaneous adventures and zero stress.",
    "I hope you achieve every single goal you've set for yourself this year.",
    "True friends are like stars—you don't always see them, but they're always there."
  ];

  // Vibrant, friendly palette: Mint, Sky, Sun, Lavender, Peach, White
  const bgColors = ["#f0fff4", "#e0f2fe", "#fef9c3", "#f5f3ff", "#fff7ed", "#ffffff"];

  useEffect(() => {
    // You can use a more upbeat track for a best friend!
    audioRef.current = new Audio("/happy-vibe-music.mp3"); 
    audioRef.current.loop = true;
  }, []);

  const triggerConfetti = () => {
    confetti({
      particleCount: 50,
      spread: 80,
      origin: { y: 0.8 },
      colors: ["#4ade80", "#60a5fa", "#facc15", "#f472b6"], // Multi-colored for friendship
    });
  };

  const handleNext = () => {
    if (step === 0) {
      audioRef.current?.play().catch(() => {});
      setStep(1);
    } else if (step === 1) {
      if (quoteIndex < quotes.length - 1) {
        setQuoteIndex(quoteIndex + 1);
        triggerConfetti();
      } else {
        setStep(2); 
        triggerConfetti();
      }
    }
  };

  const floatingElements = useMemo(() => Array.from({ length: 15 }, (_, i) => ({
    id: i,
    size: Math.random() * 25 + 10,
    left: Math.random() * 100,
    duration: 10 + Math.random() * 8,
    icon: i % 3 === 0 ? "🌟" : i % 3 === 1 ? "🎈" : "✨"
  })), []);

  return (
    <motion.div 
      animate={{ backgroundColor: step === 2 ? bgColors[5] : bgColors[quoteIndex] }}
      transition={{ duration: 1.2, ease: "circOut" }}
      className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center text-slate-800 overflow-hidden font-sans select-none"
    >
      
      {/* Dynamic Floating Icons */}
      {floatingElements.map((el) => (
        <motion.div
          key={el.id}
          initial={{ y: "110vh", opacity: 0 }}
          animate={{ y: "-10vh", opacity: [0, 0.6, 0], rotate: 360 }}
          transition={{ duration: el.duration, repeat: Infinity, ease: "linear" }}
          className="absolute pointer-events-none opacity-20"
          style={{ left: `${el.left}%`, fontSize: el.size }}
        >
          {el.icon}
        </motion.div>
      ))}

      {/* Header */}
      <motion.div className="z-10 mb-8" animate={{ scale: step > 0 ? 0.9 : 1 }}>
        <h1 className="text-4xl md:text-5xl font-black tracking-tight">
          HAPPY NEW YEAR, <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500">
            SINHA! ⚡
          </span>
        </h1>
      </motion.div>

      <div className="z-20 w-full max-w-sm">
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div key="start" exit={{ opacity: 0, scale: 1.2 }}>
              <button 
                onClick={handleNext} 
                className="bg-slate-900 text-white px-10 py-4 rounded-2xl shadow-2xl font-bold hover:bg-slate-800 transition-all active:scale-95"
              >
                Let's Go! 🚀
              </button>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div 
              key={`quote-${quoteIndex}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              className="bg-white/70 backdrop-blur-xl p-8 rounded-[2.5rem] shadow-2xl border border-white/50 min-h-[200px] flex flex-col justify-center relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-blue-400 to-emerald-400" />
              <p className="text-xl font-medium text-slate-700 leading-snug">
                <Typewriter text={quotes[quoteIndex]} />
              </p>
              <button onClick={handleNext} className="mt-8 text-blue-600 text-xs font-black uppercase tracking-[0.2em]">
                {quoteIndex === quotes.length - 1 ? "Final Message" : "Next Quote"}
              </button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
              <div className="bg-slate-900 p-1 rounded-[2.5rem] shadow-2xl">
                <div className="bg-white p-10 rounded-[calc(2.5rem-4px)]">
                  <h2 className="text-3xl mb-4">🤜🤛</h2>
                  <p className="text-lg text-slate-600 font-semibold italic">
                    "To another year of bad jokes, great food, and unshakeable friendship."
                  </p>
                  <div className="w-16 h-1 bg-slate-100 mx-auto my-6 rounded-full" />
                  <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">— Your Best Friend</p>
                </div>
              </div>

              <button 
                onClick={() => setShowWishBox(!showWishBox)}
                className="flex items-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-full text-sm font-bold mx-auto shadow-lg hover:bg-blue-700 transition-colors"
              >
                <span>{showWishBox ? "Hide List" : "2026 Goals"}</span> 📝
              </button>

              <AnimatePresence>
                {showWishBox && (
                  <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden">
                    <div className="bg-slate-50 p-6 rounded-[1.5rem] text-left text-slate-600 font-medium text-sm space-y-3 border border-slate-200">
                      <p>🔥 Stop procrastinating (maybe).</p>
                      <p>🍕 More hangouts and movie nights.</p>
                      <p>💰 Get that bag this year!</p>
                      <p>🌟 Stay as awesome as you are right now.</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <p className="absolute bottom-8 text-[10px] font-black tracking-[0.6em] text-slate-300">
        BROUGHT TO YOU BY YOUR BESTIE • 2026
      </p>
    </motion.div>
  );
}