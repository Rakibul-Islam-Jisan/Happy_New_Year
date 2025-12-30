import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

// ১. Typewriter Component
const Typewriter = ({ text, delay = 50 }) => {
  const [displayedText, setDisplayedText] = useState("");
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      setDisplayedText(text.slice(0, i + 1));
      i++;
      if (i >= text.length) clearInterval(timer);
    }, delay);
    return () => clearInterval(timer);
  }, [text, delay]);
  return <span>{displayedText}</span>;
};

export default function App() {
  const [step, setStep] = useState(0);
  const [showWishBox, setShowWishBox] = useState(false);
  const [trail, setTrail] = useState([]);
  const audioRef = useRef(null);

  useEffect(() => {
    // অডিও পাথটি আপনার ফাইল অনুযায়ী ঠিক করে নেবেন
    audioRef.current = new Audio("/public/Yiruma  - River Flows in You.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = 0.4;
  }, []);

  // কনফেটি লজিক
  const triggerConfetti = (type) => {
    const colors = type === 'final' ? ["#FF69B4", "#FFD700", "#ffffff"] : ["#FFB6C1", "#FF69B4"];
    confetti({
      particleCount: type === 'final' ? 150 : 50,
      spread: 70,
      origin: { y: 0.7 },
      colors: colors,
      shapes: ['heart', 'circle'],
    });
  };

  const nextStep = () => {
    if (step === 0 && audioRef.current) {
      audioRef.current.play().catch(() => {});
    }
    triggerConfetti(step === 1 ? 'final' : 'normal');
    setStep(step + 1);
  };

  // ভাসমান এলিমেন্ট
  const floatingElements = useMemo(() => Array.from({ length: 12 }, (_, i) => ({
    id: i,
    size: Math.random() * 20 + 10,
    left: Math.random() * 100,
    delay: Math.random() * 5,
    duration: 10 + Math.random() * 10,
    icon: i % 2 === 0 ? "🌸" : "❤"
  })), []);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center bg-[#fffafa] text-gray-800 overflow-hidden font-sans select-none touch-none">
      
      {/* Background Elements */}
      {floatingElements.map((el) => (
        <motion.div
          key={el.id}
          initial={{ y: "110vh", opacity: 0 }}
          animate={{ y: "-10vh", opacity: [0, 0.5, 0], x: ["-10px", "10px", "-10px"] }}
          transition={{ duration: el.duration, repeat: Infinity, delay: el.delay, ease: "linear" }}
          className="absolute pointer-events-none text-pink-100"
          style={{ left: `${el.left}%`, fontSize: el.size }}
        >
          {el.icon}
        </motion.div>
      ))}

      {/* Header */}
      <motion.div className="z-10 mb-10" animate={{ y: step > 0 ? -20 : 0 }}>
        <h1 className="text-4xl md:text-6xl font-serif">
          Happy New Year, <br />
          <span className="italic font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-orange-400">Jarin ✨</span>
        </h1>
      </motion.div>

      {/* Storytelling Steps */}
      <div className="z-20 w-full max-w-sm md:max-w-md">
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div key="s1" exit={{ opacity: 0, scale: 0.8 }}>
              <button onClick={nextStep} className="bg-white/80 backdrop-blur-md border border-pink-100 px-12 py-5 rounded-full shadow-lg text-gray-400 italic hover:text-pink-500 transition-all font-medium active:scale-95">
                Open with love
              </button>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div 
              key="s2" 
              initial={{ opacity: 0, scale: 0.9 }} 
              animate={{ opacity: 1, scale: 1 }} 
              exit={{ opacity: 0, x: -50 }}
              className="bg-white/90 p-8 rounded-[2rem] shadow-xl border border-pink-50"
            >
              <p className="text-xl italic font-serif text-gray-700 leading-relaxed">
                <Typewriter text="Starting this year with a smile, because you make the world a bit brighter." />
              </p>
              <button onClick={nextStep} className="mt-6 text-pink-400 text-sm font-bold uppercase tracking-widest animate-pulse font-bold">Click for more →</button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div className="flex flex-col items-center gap-6">
              <motion.div 
                key="s3" 
                initial={{ opacity: 0, y: 30 }} 
                animate={{ opacity: 1, y: 0 }}
                className="relative p-[2px] rounded-[2rem] bg-gradient-to-tr from-pink-300 via-orange-200 to-pink-300 animate-gradient-x shadow-2xl w-full"
              >
                <div className="bg-white/95 backdrop-blur-2xl p-10 rounded-[calc(2rem-2px)]">
                  <p className="italic text-xl md:text-2xl text-gray-700 leading-relaxed font-serif">
                    "Some people make moments feel <span className="text-pink-400 font-medium">lighter</span> without even trying."
                  </p>
                  <div className="w-10 h-[1px] bg-pink-100 mx-auto my-6" />
                  <p className="text-lg text-gray-500 font-light italic">
                    <Typewriter text="Hope this year brings you peace, growth, and smiles." delay={70} />
                  </p>
                  <div className="mt-8 font-serif text-pink-400 text-2xl opacity-60 italic">— with love</div>
                </div>
              </motion.div>

              {/* Wish Box / Surprise Drawer */}
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                transition={{ delay: 2 }}
                className="w-full"
              >
                <button 
                  onClick={() => setShowWishBox(!showWishBox)}
                  className="flex items-center gap-2 px-6 py-3 bg-pink-50 rounded-full text-pink-500 text-sm font-bold shadow-inner hover:bg-pink-100 transition-all mx-auto"
                >
                  <span>{showWishBox ? "Close Box" : "Surprise Box"}</span>
                  <motion.span animate={{ rotate: showWishBox ? 180 : 0 }}>🎁</motion.span>
                </button>

                <AnimatePresence>
                  {showWishBox && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden mt-4"
                    >
                      <div className="bg-white/60 backdrop-blur-sm border border-dashed border-pink-200 p-6 rounded-[1.5rem] text-left">
                        <h4 className="text-pink-400 font-bold text-xs uppercase tracking-widest mb-3">Special Wishes for You:</h4>
                        <ul className="text-gray-600 italic text-sm space-y-2">
                          <li>• May your coffee be strong and your Mondays be short.</li>
                          <li>• May you find 100 reasons to laugh every single day.</li>
                          <li>• May we finally meet in this year</li>
                          <li>• Keep being the amazing person you are.</li>
                          <li>• 2026 is going to be your year! 🚀</li>
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <p className="absolute bottom-8 text-[9px] uppercase tracking-[0.4em] opacity-30">2025 • FOR JARIN</p>

      <style>{`
        @keyframes gradient-x {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 4s ease infinite;
        }
      `}</style>
    </div>
  );
}