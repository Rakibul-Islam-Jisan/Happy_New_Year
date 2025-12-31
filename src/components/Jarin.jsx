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

export default function Jarin() {
  const [step, setStep] = useState(0); 
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [showWishBox, setShowWishBox] = useState(false);
  const audioRef = useRef(null);

  const quotes = [
    "Starting this year with a smile, because you make the world a bit brighter.",
    "May your journey this year be as beautiful as your heart.",
    "In 2026, I hope you find magic in the smallest moments.",
    "Keep being the version of yourself that makes you the happiest.",
    "Some people make moments feel lighter without even trying."
  ];

  // Noticeable background colors for each step
  // Starting with Snow, moving through Peach, Lavender, Mint, and soft Sky Blue
  const bgColors = ["#fffafa", "#fff5f5", "#f8f0ff", "#f0fff4", "#f0f7ff", "#fff9f0"];

  useEffect(() => {
    audioRef.current = new Audio("/Yiruma - River Flows in You.mp3");
    audioRef.current.loop = true;
  }, []);

  const triggerConfetti = () => {
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.8 },
      colors: ["#FFB6C1", "#FF69B4", "#FFE4E1"],
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

  const floatingElements = useMemo(() => Array.from({ length: 12 }, (_, i) => ({
    id: i,
    size: Math.random() * 20 + 10,
    left: Math.random() * 100,
    duration: 15 + Math.random() * 10,
    icon: i % 2 === 0 ? "🌸" : "❤"
  })), []);

  return (
    // Dynamic Background Motion
    <motion.div 
      animate={{ backgroundColor: step === 2 ? bgColors[5] : bgColors[quoteIndex] }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
      className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center text-gray-800 overflow-hidden font-sans select-none"
    >
      
      {/* Background Floating Elements */}
      {floatingElements.map((el) => (
        <motion.div
          key={el.id}
          initial={{ y: "110vh", opacity: 0 }}
          animate={{ y: "-10vh", opacity: [0, 0.4, 0] }}
          transition={{ duration: el.duration, repeat: Infinity, ease: "linear" }}
          className="absolute pointer-events-none text-pink-200"
          style={{ left: `${el.left}%`, fontSize: el.size }}
        >
          {el.icon}
        </motion.div>
      ))}

      {/* Header */}
      <motion.div className="z-10 mb-8" animate={{ y: step > 0 ? -20 : 0 }}>
        <h1 className="text-4xl md:text-5xl font-serif">
          Happy New Year, <br />
          <span className="italic font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-orange-300">Jarin ✨</span>
        </h1>
      </motion.div>

      <div className="z-20 w-full max-w-sm">
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div key="start" exit={{ opacity: 0, scale: 0.8 }}>
              <button onClick={handleNext} className="bg-white border border-pink-100 px-10 py-4 rounded-full shadow-lg text-gray-400 italic hover:text-pink-500 transition-all">
                Open with love
              </button>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div 
              key={`quote-${quoteIndex}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="bg-white/80 backdrop-blur-md p-8 rounded-[2rem] shadow-xl border border-white/50 min-h-[180px] flex flex-col justify-center"
            >
              <p className="text-xl italic font-serif text-gray-700 leading-relaxed">
                <Typewriter text={quotes[quoteIndex]} />
              </p>
              <button onClick={handleNext} className="mt-6 text-pink-400 text-xs font-bold uppercase tracking-widest">
                {quoteIndex === quotes.length - 1 ? "See My Wish →" : "Read More →"}
              </button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <div className="relative p-[2px] rounded-[2rem] bg-gradient-to-tr from-pink-300 to-orange-200 animate-gradient-x shadow-2xl">
                <div className="bg-white/95 p-10 rounded-[calc(2rem-2px)]">
                  <p className="italic text-xl text-gray-700 font-serif">
                    "2026 is a blank book, and I hope you write the most beautiful chapters yet."
                  </p>
                  <div className="w-10 h-[1px] bg-pink-100 mx-auto my-6" />
                  <p className="text-pink-400 font-serif text-2xl opacity-60 italic">— with love</p>
                </div>
              </div>

              <button 
                onClick={() => setShowWishBox(!showWishBox)}
                className="flex items-center gap-2 px-6 py-3 bg-white/80 rounded-full text-pink-500 text-sm font-bold mx-auto shadow-md"
              >
                <span>{showWishBox ? "Close" : "Open Surprise"}</span> 🎁
              </button>

              <AnimatePresence>
                {showWishBox && (
                  <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden">
                    <div className="bg-white/70 backdrop-blur-sm border border-dashed border-pink-200 p-6 rounded-[1.5rem] text-left text-gray-600 italic text-sm space-y-2 shadow-sm">
                      <p>• May your coffee be strong and Mondays short.</p>
                      <p>• May you find 100 reasons to laugh every day.</p>
                      <p>• May we finally meet this year.</p>
                      <p>• You are genuinely amazing. Keep shining.</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <p className="absolute bottom-8 text-[9px] uppercase tracking-[0.4em] opacity-30">2026 • FOR JARIN</p>

      <style>{`
        @keyframes gradient-x { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
        .animate-gradient-x { background-size: 200% 200%; animation: gradient-x 4s ease infinite; }
      `}</style>
    </motion.div>
  );
}