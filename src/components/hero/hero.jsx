import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Download, Send } from "lucide-react";
import { Link } from "react-router-dom";
// GlowingButton Component
const GlowingButton = ({ children, primary = false,onClick }) => {
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

// SpaceBackground Component
const SpaceBackground = () => {
  const canvasRef = useRef(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window === "undefined") return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId;

    const handleResize = () => {
      if (canvas && ctx) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    // Earth-like glow effect
    const drawEarthGlow = () => {
      const gradient = ctx.createRadialGradient(
        canvas.width * 0.2,
        canvas.height * 1.2,
        0,
        canvas.width * 0.2,
        canvas.height * 1.2,
        canvas.height
      );
      gradient.addColorStop(0, "rgba(64, 147, 255, 0.15)");
      gradient.addColorStop(0.5, "rgba(64, 147, 255, 0.05)");
      gradient.addColorStop(1, "rgba(64, 147, 255, 0)");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    // Web development icons
    const icons = [
      // React icon
      {
        draw: (ctx, x, y, size) => {
          ctx.beginPath();
          ctx.ellipse(x, y, size * 2, size * 0.8, 0, 0, Math.PI * 2);
          ctx.moveTo(x - size, y);
          ctx.ellipse(x, y, size * 2, size * 0.8, Math.PI / 3, 0, Math.PI * 2);
          ctx.moveTo(x - size, y);
          ctx.ellipse(x, y, size * 2, size * 0.8, -Math.PI / 3, 0, Math.PI * 2);
          ctx.stroke();
        },
      },
      // Next.js icon
      {
        draw: (ctx, x, y, size) => {
          ctx.beginPath();
          ctx.moveTo(x - size, y - size);
          ctx.lineTo(x + size, y + size);
          ctx.moveTo(x - size, y + size);
          ctx.lineTo(x + size, y - size);
          ctx.moveTo(x - size * 1.2, y);
          ctx.lineTo(x + size * 1.2, y);
          ctx.stroke();
        },
      },
      // Node.js icon
      {
        draw: (ctx, x, y, size) => {
          ctx.beginPath();
          ctx.moveTo(x - size, y);
          ctx.quadraticCurveTo(x, y - size, x + size, y);
          ctx.quadraticCurveTo(x, y + size, x - size, y);
          ctx.stroke();
        },
      },
    ];

    // Floating elements without trails
    const floatingElements = Array.from({ length: 15 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 3 + 2,
      speed: Math.random() * 0.015 + 0.005,
      angle: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.0008,
      icon: icons[Math.floor(Math.random() * icons.length)],
      glowIntensity: Math.random() * 0.3 + 0.2,
    }));

    // Stars with subtle glow
    const stars = Array.from({ length: 80 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 1.2,
      twinkleSpeed: Math.random() * 0.0008 + 0.0004,
      twinkleOffset: Math.random() * Math.PI * 2,
      color: Math.random() > 0.5 ? "147, 51, 234" : "64, 147, 255",
    }));

    // Atmospheric light waves
    const waves = Array.from({ length: 3 }, (_, i) => ({
      y: canvas.height * (0.3 + i * 0.2),
      amplitude: 20 + i * 10,
      frequency: 0.002 + i * 0.001,
      speed: 0.0005 + i * 0.0002,
    }));

    const animate = () => {
      if (!ctx || !canvas) return;

      ctx.fillStyle = "rgba(0, 0, 0, 0.15)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      drawEarthGlow();

      // Draw atmospheric waves
      waves.forEach((wave) => {
        ctx.beginPath();
        for (let x = 0; x < canvas.width; x += 5) {
          const y =
            wave.y +
            Math.sin(x * wave.frequency + Date.now() * wave.speed) *
              wave.amplitude;
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        const gradient = ctx.createLinearGradient(
          0,
          wave.y - wave.amplitude,
          0,
          wave.y + wave.amplitude
        );
        gradient.addColorStop(0, "rgba(64, 147, 255, 0)");
        gradient.addColorStop(0.5, "rgba(64, 147, 255, 0.05)");
        gradient.addColorStop(1, "rgba(64, 147, 255, 0)");
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      // Draw stars
      stars.forEach((star) => {
        const twinkle = Math.sin(
          Date.now() * star.twinkleSpeed + star.twinkleOffset
        );
        const alpha = 0.2 + twinkle * 0.15;
        ctx.fillStyle = `rgba(${star.color}, ${alpha})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw floating elements
      floatingElements.forEach((element) => {
        const time = Date.now() * 0.001;

        element.x += Math.cos(element.angle) * element.speed;
        element.y += Math.sin(element.angle) * element.speed;

        if (element.x < 0) element.x = canvas.width;
        if (element.x > canvas.width) element.x = 0;
        if (element.y < 0) element.y = canvas.height;
        if (element.y > canvas.height) element.y = 0;

        // Draw icon with glow
        ctx.save();
        ctx.translate(element.x, element.y);
        ctx.rotate(time * element.rotationSpeed);

        // Add subtle glow
        ctx.shadowColor = "rgba(64, 147, 255, 0.5)";
        ctx.shadowBlur = 15;

        ctx.strokeStyle = `rgba(64, 147, 255, ${0.4 + element.glowIntensity})`;
        ctx.lineWidth = 1.5;
        element.icon.draw(ctx, 0, 0, element.size * 2);
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    if (canvas && ctx) {
      animate();
    }

    return () => {
      window.removeEventListener("resize", handleResize);
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
      style={{ background: "linear-gradient(to bottom, #040412, #0a0a20)" }}
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

      // Clean up
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Failed to download CV:", error);
    }
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {isMounted && <SpaceBackground />}

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/50" />

      <div className="relative z-10 text-center px-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <motion.div className="mb-6">
            <motion.h2
              className="text-violet-400 text-xl mb-4 font-light tracking-wide"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <AnimatedText text="Hello, I'm" delay={0.2} />
            </motion.h2>

            <h1 className="text-white text-5xl md:text-7xl font-bold mb-6 tracking-tight">
              <AnimatedText text="Mohamed Sari" delay={0.4} />
            </h1>

            <motion.p
              className="text-gray-300 text-xl md:text-2xl mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <AnimatedText text="Fullstack Developer" delay={0.6} />
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <GlowingButton primary onClick={handleCVDownload}>
              Download CV
            </GlowingButton>

            <GlowingButton>
              <Link to="/contact">Contact Me</Link>
            </GlowingButton>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
