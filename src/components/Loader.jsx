import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Loader = () => {
  const [progress, setProgress] = useState(0);
  const circumference = 2 * Math.PI * 44;

  useEffect(() => {
    setProgress(0);
    const startTime = Date.now();
    const duration = 1000;

    const progressTimer = setInterval(() => {
      const elapsedTime = Date.now() - startTime;
      const newProgress = Math.min((elapsedTime / duration) * 100, 100);
      setProgress(newProgress);
      
      if (newProgress >= 100) {
        clearInterval(progressTimer);
      }
    }, 16);

    return () => clearInterval(progressTimer);
  }, []);

  return (
    <AnimatePresence mode="wait">
      <motion.div 
        className="fixed inset-0 z-[100] flex items-center justify-center bg-gradient-to-br from-black to-violet-950"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <div className="relative w-32 h-32">
          <div className="absolute inset-0 blur-xl bg-violet-500/30 rounded-full" />
          
          <svg className="w-full h-full -rotate-90 relative" viewBox="0 0 100 100">
            <circle
              className="text-violet-900"
              strokeWidth="4"
              stroke="currentColor"
              fill="transparent"
              r="44"
              cx="50"
              cy="50"
            />
            
            <motion.circle
              className="text-violet-400"
              strokeWidth="4"
              stroke="currentColor"
              fill="transparent"
              r="44"
              cx="50"
              cy="50"
              strokeDasharray={circumference}
              strokeDashoffset={circumference * (1 - progress / 100)}
              strokeLinecap="round"
              initial={{ strokeDashoffset: circumference }}
            />
            
            <motion.circle
              className="text-violet-300"
              r="2"
              cx="50"
              cy="6"
              fill="currentColor"
              animate={{ rotate: [0, 360] }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{ transformOrigin: "50px 50px" }}
            />
          </svg>

          <motion.div 
            className="absolute inset-0 flex flex-col items-center justify-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <span className="text-2xl font-bold bg-gradient-to-r from-violet-400 to-purple-600 bg-clip-text text-transparent">
              {Math.round(progress)}%
            </span>
            
            <motion.div
              className="absolute w-full h-full rounded-full border-2 border-violet-500/30"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.1, 0.3],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Loader;