import React from 'react';
import { motion } from 'framer-motion';

const Loader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-gray-900 to-violet-950">
      {/* Background glow effect */}
      <div className="absolute w-32 h-32 bg-violet-500/20 blur-2xl rounded-full" />
      
      <div className="flex gap-2 items-end relative">
        {[0, 1, 2].map((index) => (
          <div key={index} className="relative">
            {/* Glow effect underneath each bar */}
            <motion.div
              className="absolute inset-0 bg-violet-500/50 blur-md rounded-full"
              animate={{
                height: ["16px", "32px", "16px"],
              }}
              transition={{
                duration: 0.75,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: index * 0.15,
              }}
            />
            
            {/* Main animated bar */}
            <motion.div
              className="w-1.5 bg-gradient-to-t from-violet-600 to-violet-400 rounded-full relative z-10"
              animate={{
                height: ["16px", "32px", "16px"],
                backgroundColor: ["#8B5CF6", "#A78BFA", "#8B5CF6"],
              }}
              transition={{
                duration: 0.75,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: index * 0.15,
              }}
            />
            
            {/* Subtle pulsing ring around each bar */}
            <motion.div
              className="absolute inset-0 border-2 border-violet-500/30 rounded-full"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0, 0.3],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "easeInOut",
                delay: index * 0.15,
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Loader;