import { FaWhatsapp } from "react-icons/fa";
import { motion } from "framer-motion"; 

export default function Whatsapp() {
  return (
    <motion.a
      target="_blank"
      href="https://wa.me/+212675775884"
      className="fixed md:bottom-6 bottom-14 right-2  p-3 rounded-full  z-30"
      initial={{ y: -100, opacity: 0.2 }}
      animate={{ y: [0, -15, 0], opacity: 1 }}
      transition={{
        duration: 1.2,
        ease: [0.17, 0.67, 0.83, 0.67],
        repeat: Infinity,
        repeatDelay: 2,
      }}
      whileHover={{
        scale: 1.1,
      }}
      whileTap={{ scale: 0.9 }}
    >
      <FaWhatsapp size={45} className="text-green-500" />
    </motion.a>
  );
}