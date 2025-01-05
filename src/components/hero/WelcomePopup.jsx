import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const WelcomePopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Check if we're not on the projects page before starting timer
    if (location.pathname === "/projects") {
      setIsOpen(false);
    } else {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 5000);
      
      // Cleanup function to prevent memory leaks
      return () => clearTimeout(timer);
    }
  }, []); // Empty dependency array for mount only
  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          className="fixed top-4 right-4 z-50"
        >
          <motion.div
            className="bg-violet-950/90 backdrop-blur-lg border border-violet-500/20 rounded-2xl p-6 shadow-2xl"
            animate={{
              y: [0, -10, 0],
              boxShadow: [
                "0 0 20px rgba(124, 58, 237, 0.3)",
                "0 0 40px rgba(124, 58, 237, 0.2)",
                "0 0 20px rgba(124, 58, 237, 0.3)",
              ],
            }}
            transition={{
              y: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              },
              boxShadow: {
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
              },
            }}
          >
            <button
              onClick={handleClose}
              className="absolute top-2 right-2 text-violet-300 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>

            <motion.div
              className="flex flex-col items-center gap-4"
              animate={{
                scale: [1, 1.02, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            >
              <div className="flex items-center gap-3">
                <span role="img" aria-label="sparkles" className="text-2xl">
                  ✨
                </span>
                <motion.span
                  className="text-white font-medium text-lg"
                  animate={{
                    color: ["#fff", "#a78bfa", "#fff"],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                >
                  Welcome to my Portfolio!
                </motion.span>
                <span role="img" aria-label="sparkles" className="text-2xl">
                  ✨
                </span>
              </div>

              <motion.p
                className="text-violet-200 text-center max-w-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Feel free to explore my projects and don't hesitate to reach out
                if you'd like to collaborate!
              </motion.p>

              <motion.button
                onClick={handleClose}
                className="px-6 py-2 bg-violet-600 text-white rounded-full hover:bg-violet-700 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link to="/projects" className="text-white no-underline">
                  Let's explore
                </Link>
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WelcomePopup;
