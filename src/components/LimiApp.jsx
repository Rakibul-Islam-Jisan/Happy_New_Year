import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

const Typewriter = ({ text, delay = 50 }) => {
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

export default function LimiApp() {
  const [step, setStep] = useState(0); 
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [showWishBox, setShowWishBox] = useState(false);
  const audioRef = useRef(null);

  // Mature and respectful quotes for a friend who has moved forward
  const quotes = [
    "Growth looks so good on you, and I'm genuinely happy to see you thriving.",
    "May 2026 be a year of deep peace and beautiful new memories for you.",
    "I hope your days are filled with the kind of joy that feels like home.",
    "Always wishing the very best for your journey, wherever it leads.",
    "To a wonderful person: may your smile never lose its light."
  ];

  // Peaceful "Morning Forest" palette: Soft Sage -> Bone White -> Sand -> Pale Gold
  const bgColors = ["#f8fafc", "#f1f5f9", "#f0fdf4", "#fefce8", "#fdfcf0", "#ffffff"];

  useEffect(() => {
    // A soft, acoustic guitar or minimalist track works best for a respectful vibe
    audioRef.current = new Audio("/acoustic-peace.mp3"); 
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;
  }, []);

  const triggerConfetti = () => {
    confetti({
      particleCount: 25,
      spread: 40,
      origin: { y: 0.8 },
      colors: ["#94a3b8", "#cbd5e1", "#f1f5f9"], // Neutral, elegant tones
      shapes: ['circle'],
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

  const floatingElements = useMemo(() => Array.from({ length: 10 }, (_, i) => ({
    id: i,
    size: Math.random() * 10 + 5,
    left: Math.random() * 100,
    duration: 25 + Math.random() * 10,
    icon: i % 2 === 0 ? "🌿" : "✨"
  })), []);

  return (
    <motion.div 
      animate={{ backgroundColor: step === 2 ? bgColors[5] : bgColors[quoteIndex] }}
      transition={{ duration: 2, ease: "linear" }}
      className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center text-slate-600 overflow-hidden font-sans select-none"
    >
      
      {/* Subtle Background Elements */}
      {floatingElements.map((el) => (
        <motion.div
          key={el.id}
          initial={{ y: "110vh", opacity: 0 }}
          animate={{ y: "-10vh", opacity: [0, 0.3, 0] }}
          transition={{ duration: el.duration, repeat: Infinity, ease: "linear" }}
          className="absolute pointer-events-none text-slate-300"
          style={{ left: `${el.left}%`, fontSize: el.size }}
        >
          {el.icon}
        </motion.div>
      ))}

      {/* Header */}
      <motion.div className="z-10 mb-10" animate={{ y: step > 0 ? -10 : 0 }}>
        <h1 className="text-3xl md:text-4xl font-light tracking-widest text-slate-400 uppercase">
          Happy New Year, <br />
          <span className="mt-2 block font-serif italic lowercase text-slate-700 tracking-normal">
            Limi
          </span>
        </h1>
      </motion.div>

      <div className="z-20 w-full max-w-sm">
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div key="start" exit={{ opacity: 0, y: 10 }}>
              <button 
                onClick={handleNext} 
                className="px-8 py-3 bg-white border border-slate-100 rounded-full shadow-sm text-slate-400 text-sm tracking-widest hover:text-slate-600 transition-all active:scale-95"
              >
                Open Message
              </button>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div 
              key={`quote-${quoteIndex}`}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="bg-white/60 backdrop-blur-sm p-10 rounded-2xl border border-white/80 min-h-[160px] flex flex-col justify-center"
            >
              <p className="text-lg italic font-serif text-slate-600 leading-relaxed">
                <Typewriter text={quotes[quoteIndex]} />
              </p>
              <button onClick={handleNext} className="mt-10 text-[10px] uppercase tracking-[0.3em] text-slate-300 hover:text-slate-500 transition-colors">
                {quoteIndex === quotes.length - 1 ? "Closing Note" : "Next"}
              </button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div className="bg-white p-10 rounded-3xl border border-slate-50 shadow-sm">
                <p className="text-lg text-slate-500 font-serif italic leading-relaxed">
                  "Wishing you and those you hold dear a peaceful and prosperous year ahead."
                </p>
                <div className="w-6 h-[1px] bg-slate-200 mx-auto my-6" />
                <p className="text-slate-300 text-xs uppercase tracking-widest">Sincerely</p>
              </div>

              <button 
                onClick={() => setShowWishBox(!showWishBox)}
                className="text-slate-400 text-[10px] font-bold tracking-widest uppercase flex items-center gap-2 mx-auto"
              >
                <span>{showWishBox ? "Hide" : "2026 Well-Wishes"}</span>
              </button>

              <AnimatePresence>
                {showWishBox && (
                  <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
                    <div className="bg-slate-50/50 p-6 rounded-2xl text-left text-slate-500 text-xs space-y-3 border border-white">
                      <p>🌿 May your year be defined by happiness and clarity.</p>
                      <p>✨ May you continue to grow and reach your goals.</p>
                      <p>🕊️ Wishing you peace in every step you take.</p>
                      <p>⭐ Keep being the kind person you've always been.</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <p className="absolute bottom-8 text-[8px] uppercase tracking-[0.6em] text-slate-300">
        Kindness & Growth • 2026
      </p>
    </motion.div>
  );
}