import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Download, Send } from "lucide-react";
import { Link } from "react-router-dom";

const GlowingButton = ({ children, primary = false, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        relative px-8 py-3 rounded-full flex items-center justify-center gap-2
        transition-all duration-500 ease-out
        ${primary ? "text-white" : "text-violet-100"}
        overflow-hidden
        ${primary ? "bg-violet-600" : "border-2 border-violet-600/50"}
        group
      `}
      style={{
        boxShadow: isHovered
          ? `0 0 20px ${primary ? "#7c3aed" : "rgba(124, 58, 237, 0.3)"}`
          : "none",
      }}
    >
      <motion.div
        className={`
          absolute inset-0 
          ${
            primary
              ? "bg-gradient-to-r from-violet-600 via-purple-600 to-violet-600"
              : "bg-gradient-to-r from-violet-600/20 via-purple-600/20 to-violet-600/20"
          }
        `}
        initial={{ x: "-100%" }}
        animate={{ x: isHovered ? "100%" : "-100%" }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      />

      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-violet-300 rounded-full"
          initial={{ scale: 0, opacity: 0 }}
          animate={
            isHovered
              ? {
                  scale: [0, 1.5, 0],
                  opacity: [0, 0.8, 0],
                  x: [0, (i - 1) * 30],
                  y: [0, (Math.random() - 0.5) * 20],
                }
              : {}
          }
          transition={{
            duration: 1,
            delay: i * 0.2,
            repeat: Infinity,
            repeatDelay: 0.5,
          }}
        />
      ))}

      <div className="relative flex items-center gap-2 z-10">
        <motion.div
          animate={isHovered ? { rotate: 360 } : { rotate: 0 }}
          transition={{ duration: 0.5 }}
        >
          {primary ? <Download size={20} /> : <Send size={20} />}
        </motion.div>
        <span className="relative">
          {children}
          <motion.div
            className="absolute bottom-0 left-0 w-full h-[2px] bg-white/50"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />
        </span>
      </div>
    </motion.button>
  );
};
const SpaceBackground = () => {
  const canvasRef = useRef(null);
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsMobile(window.innerWidth < 768);
    if (typeof window === "undefined") return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId;
    let mousePosition = { x: canvas.width / 2, y: canvas.height / 2 };

    const handleResize = () => {
      if (canvas && ctx) {
        const dpr = window.devicePixelRatio || 1;
        canvas.width = window.innerWidth * dpr;
        canvas.height = window.innerHeight * dpr;
        ctx.scale(dpr, dpr);
        setIsMobile(window.innerWidth < 768);
      }
    };

    const handleMouseMove = (e) => {
      mousePosition = {
        x: e.clientX,
        y: e.clientY,
      };
    };

    const handleTouchMove = (e) => {
      if (e.touches[0]) {
        mousePosition = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY,
        };
      }
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove);
    handleResize();

    // Enhanced icons with more complex designs
    const icons = [
      // React icon with orbital rings
      {
        draw: (ctx, x, y, size, time) => {
          const orbitSpeed = time * 2;
          ctx.beginPath();
          ctx.ellipse(x, y, size * 2, size * 0.8, orbitSpeed, 0, Math.PI * 2);
          ctx.moveTo(x - size, y);
          ctx.ellipse(x, y, size * 2, size * 0.8, orbitSpeed + Math.PI / 3, 0, Math.PI * 2);
          ctx.moveTo(x - size, y);
          ctx.ellipse(x, y, size * 2, size * 0.8, orbitSpeed - Math.PI / 3, 0, Math.PI * 2);
          // Add pulsing core
          ctx.arc(x, y, size * 0.5, 0, Math.PI * 2);
          ctx.stroke();
        },
        color: "61, 184, 255",
      },
      // Enhanced TypeScript icon
      {
        draw: (ctx, x, y, size, time) => {
          const pulse = Math.sin(time * 3) * 0.2 + 1;
          ctx.beginPath();
          ctx.rect(x - size * 1.2 * pulse, y - size * 1.2 * pulse, size * 2.4 * pulse, size * 2.4 * pulse);
          // Add dynamic crosshairs
          ctx.moveTo(x - size * 1.5, y);
          ctx.lineTo(x + size * 1.5, y);
          ctx.moveTo(x, y - size * 1.5);
          ctx.lineTo(x, y + size * 1.5);
          ctx.stroke();
        },
        color: "0, 122, 204",
      },
      // Rest of your icons with similar enhancements...
    ];

    // Adjust number of elements based on screen size
    const getElementCount = () => isMobile ? 15 : 25;

    // Enhanced floating elements with interactive behavior
    const floatingElements = Array.from({ length: getElementCount() }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * (isMobile ? 2 : 3) + 2,
      speed: Math.random() * 0.02 + 0.01,
      angle: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.001,
      icon: icons[Math.floor(Math.random() * icons.length)],
      glowIntensity: Math.random() * 0.4 + 0.3,
      pulseOffset: Math.random() * Math.PI * 2,
      pulseSpeed: Math.random() * 0.004 + 0.002,
      interactiveRadius: Math.random() * 100 + 50,
    }));

    // Enhanced stars with dynamic trails
    const stars = Array.from({ length: isMobile ? 40 : 80 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 1.5,
      speed: Math.random() * 0.5 + 0.1,
      trail: [],
      maxTrailLength: Math.floor(Math.random() * 10) + 5,
      color: Math.random() > 0.5 ? "147, 51, 234" : "64, 147, 255",
    }));

    const animate = () => {
      if (!ctx || !canvas) return;

      ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const time = Date.now() * 0.001;

      // Enhanced star animation with trails
      stars.forEach((star) => {
        star.y += star.speed;
        if (star.y > canvas.height) {
          star.y = 0;
          star.trail = [];
        }

        // Add current position to trail
        star.trail.unshift({ x: star.x, y: star.y });
        if (star.trail.length > star.maxTrailLength) {
          star.trail.pop();
        }

        // Draw trail
        star.trail.forEach((point, index) => {
          const alpha = (1 - index / star.maxTrailLength) * 0.3;
          ctx.fillStyle = `rgba(${star.color}, ${alpha})`;
          ctx.beginPath();
          ctx.arc(point.x, point.y, star.size * (1 - index / star.maxTrailLength), 0, Math.PI * 2);
          ctx.fill();
        });
      });

      // Enhanced floating elements with interactive behavior
      floatingElements.forEach((element) => {
        // Calculate distance to mouse
        const dx = mousePosition.x - element.x;
        const dy = mousePosition.y - element.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Interactive behavior
        if (distance < element.interactiveRadius) {
          const angle = Math.atan2(dy, dx);
          element.x -= Math.cos(angle) * 2;
          element.y -= Math.sin(angle) * 2;
          element.glowIntensity = 0.8;
        } else {
          element.glowIntensity = Math.max(0.3, element.glowIntensity - 0.02);
          element.x += Math.cos(element.angle) * element.speed;
          element.y += Math.sin(element.angle) * element.speed;
        }

        // Wrap around screen edges
        element.x = (element.x + canvas.width) % canvas.width;
        element.y = (element.y + canvas.height) % canvas.height;

        // Enhanced drawing with effects
        ctx.save();
        ctx.translate(element.x, element.y);
        
        const pulse = Math.sin(time * element.pulseSpeed * 5 + element.pulseOffset);
        const scale = 1 + pulse * 0.2;
        
        ctx.scale(scale, scale);
        ctx.rotate(time * element.rotationSpeed);

        // Enhanced glow effect
        ctx.shadowColor = `rgba(${element.icon.color}, ${element.glowIntensity})`;
        ctx.shadowBlur = 20 + pulse * 10;
        ctx.strokeStyle = `rgba(${element.icon.color}, ${element.glowIntensity})`;
        ctx.lineWidth = 1.5 + pulse * 0.5;

        element.icon.draw(ctx, 0, 0, element.size * 2, time);

        // Add interactive rings
        if (distance < element.interactiveRadius) {
          ctx.beginPath();
          ctx.arc(0, 0, element.size * 4 * (1 - distance / element.interactiveRadius), 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(${element.icon.color}, ${0.2 * (1 - distance / element.interactiveRadius)})`;
          ctx.stroke();
        }

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [mounted]);

  if (!mounted) {
    return (
      <div
        className="absolute inset-0 w-full h-full"
        style={{ background: "linear-gradient(to bottom, #040412, #0a0a20)" }}
      />
    );
  }

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ 
        background: "linear-gradient(to bottom, #040412, #0a0a20)",
        touchAction: "none" // Prevent default touch behaviors
      }}
    />
  );
};

// AnimatedText Component
const AnimatedText = ({ text, className = "", delay = 0 }) => {
  return (
    <motion.span
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay }}
      className="inline-block"
    >
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          className="inline-block"
          whileHover={{
            y: -5,
            color: "#a78bfa",
            transition: { duration: 0.2 },
          }}
          transition={{ duration: 0.2 }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.span>
  );
};

// Main Hero Component
const WavingHand = () => {
  return (
    <motion.span
      animate={{
        rotate: [0, 14, -8, 14, -4, 10, 0],
        transformOrigin: "70% 70%",
      }}
      transition={{
        duration: 2.5,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut",
        repeatDelay: 1,
      }}
      className="inline-block"
    >
      👋
    </motion.span>
  );
};

const Hero = () => {
  const [isMounted, setIsMounted] = useState(false);

  const handleCVDownload = async () => {
    try {
      const response = await fetch("/MohamedSari.pdf", {
        headers: {
          "Content-Type": "application/pdf",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.style.display = "none";
      link.href = url;
      link.download = "MohamedSari.pdf";

      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Failed to download CV:", error);
    }
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
      {/* Whatsapp */}
      
      {/* <WelcomePopup /> */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden ">
        {isMounted && <SpaceBackground />}

        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/50" />

        <div className="relative z-10 text-center px-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div className="mb-6" variants={itemVariants}>
              <motion.h2 className="text-violet-400 text-xl mb-4 font-light tracking-wide flex items-center justify-center gap-2">
                <AnimatedText text="Hello" delay={0.2} />
                <WavingHand />
                <AnimatedText text="I'm " delay={0.2} />
              </motion.h2>

              <h1 className="text-white text-5xl md:text-7xl font-bold mb-6 tracking-tight">
                <AnimatedText text="Mohamed Sari" delay={0.4} />
              </h1>

              <motion.p
                className="text-gray-300 text-xl md:text-2xl mb-8"
                variants={itemVariants}
              >
                <AnimatedText text="Fullstack Developer" delay={0.6} />
              </motion.p>
            </motion.div>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              variants={itemVariants}
            >
              <GlowingButton primary onClick={handleCVDownload}>
                Download CV
              </GlowingButton>

              <GlowingButton>
                <Link to="/contact" className="no-underline text-inherit">
                  Contact
                </Link>
              </GlowingButton>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Hero;
