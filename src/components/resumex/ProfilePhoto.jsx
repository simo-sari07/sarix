import React from "react";
import { motion } from "framer-motion";
import pfoto from "../../../public/pro.webp";

const ProfilePhoto = () => {
  return (
    <div className="relative w-48 h-48 mx-auto mb-8">
      <motion.div
        className="absolute inset-0 rounded-full border-4 border-dashed border-violet-500"
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      {/* <div className="absolute inset-2 rounded-full overflow-hidden">
        <img src={pfoto} alt="Profile" className="w-full h-full object-cover" />
      </div> */}
    </div>
  );
};

export default ProfilePhoto;
