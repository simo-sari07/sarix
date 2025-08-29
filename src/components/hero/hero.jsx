"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { Download, Send } from "lucide-react"
import { Link } from "react-router-dom"

// Quote component
const Quote = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 0.8 }}
      className="absolute top-4 left-0 right-0 mx-auto w-full max-w-xl text-center z-20"
    >
      <div className="bg-gradient-to-r from-gray-900/80 to-black/80 backdrop-blur-sm p-3 rounded-lg border border-gray-800/50">
        <p className="text-gray-300 italic text-sm md:text-base">"We love what we do, so we do it best"</p>
      </div>
    </motion.div>
  )
}

const GlowingButton = ({ children, primary = false, onClick }) => {
  const [isHovered, setIsHovered] = useState(false)

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
        boxShadow: isHovered ? `0 0 20px ${primary ? "#7c3aed" : "rgba(124, 58, 237, 0.3)"}` : "none",
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
            repeat: Number.POSITIVE_INFINITY,
            repeatDelay: 0.5,
          }}
        />
      ))}

      <div className="relative flex items-center gap-2 z-10">
        <motion.div animate={isHovered ? { rotate: 360 } : { rotate: 0 }} transition={{ duration: 0.5 }}>
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
  )
}

const SpaceBackground = () => {
  const canvasRef = useRef(null)
  const [mounted, setMounted] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setMounted(true)
    setIsMobile(window.innerWidth < 768)
    if (typeof window === "undefined") return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId
    let mousePosition = { x: canvas.width / 2, y: canvas.height / 2 }

    const handleResize = () => {
      if (canvas && ctx) {
        const dpr = window.devicePixelRatio || 1
        canvas.width = window.innerWidth * dpr
        canvas.height = window.innerHeight * dpr
        ctx.scale(dpr, dpr)
        setIsMobile(window.innerWidth < 768)
      }
    }

    const handleMouseMove = (e) => {
      mousePosition = {
        x: e.clientX,
        y: e.clientY,
      }
    }

    const handleTouchMove = (e) => {
      if (e.touches[0]) {
        mousePosition = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY,
        }
      }
    }

    window.addEventListener("resize", handleResize)
    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("touchmove", handleTouchMove)
    handleResize()

    // Enhanced icons with more complex designs
    const icons = [
      // React icon with orbital rings
      {
        draw: (ctx, x, y, size, time) => {
          const orbitSpeed = time * 2
          ctx.beginPath()
          ctx.ellipse(x, y, size * 2, size * 0.8, orbitSpeed, 0, Math.PI * 2)
          ctx.moveTo(x - size, y)
          ctx.ellipse(x, y, size * 2, size * 0.8, orbitSpeed + Math.PI / 3, 0, Math.PI * 2)
          ctx.moveTo(x - size, y)
          ctx.ellipse(x, y, size * 2, size * 0.8, orbitSpeed - Math.PI / 3, 0, Math.PI * 2)
          // Add pulsing core
          ctx.arc(x, y, size * 0.5, 0, Math.PI * 2)
          ctx.stroke()
        },
        color: "61, 184, 255",
      },
      // Enhanced TypeScript icon
      {
        draw: (ctx, x, y, size, time) => {
          const pulse = Math.sin(time * 3) * 0.2 + 1
          ctx.beginPath()
          ctx.rect(x - size * 1.2 * pulse, y - size * 1.2 * pulse, size * 2.4 * pulse, size * 2.4 * pulse)
          // Add dynamic crosshairs
          ctx.moveTo(x - size * 1.5, y)
          ctx.lineTo(x + size * 1.5, y)
          ctx.moveTo(x, y - size * 1.5)
          ctx.lineTo(x, y + size * 1.5)
          ctx.stroke()
        },
        color: "0, 122, 204",
      },
    ]

    // Adjust number of elements based on screen size
    const getElementCount = () => (isMobile ? 15 : 25)

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
    }))

    // Enhanced stars with dynamic trails
    const stars = Array.from({ length: isMobile ? 40 : 80 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 1.5,
      speed: Math.random() * 0.5 + 0.1,
      trail: [],
      maxTrailLength: Math.floor(Math.random() * 10) + 5,
      color: Math.random() > 0.5 ? "147, 51, 234" : "64, 147, 255",
    }))

    const animate = () => {
      if (!ctx || !canvas) return

      ctx.fillStyle = "rgba(0, 0, 0, 0.1)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const time = Date.now() * 0.001

      // Enhanced star animation with trails
      stars.forEach((star) => {
        star.y += star.speed
        if (star.y > canvas.height) {
          star.y = 0
          star.trail = []
        }

        // Add current position to trail
        star.trail.unshift({ x: star.x, y: star.y })
        if (star.trail.length > star.maxTrailLength) {
          star.trail.pop()
        }

        // Draw trail
        star.trail.forEach((point, index) => {
          const alpha = (1 - index / star.maxTrailLength) * 0.3
          ctx.fillStyle = `rgba(${star.color}, ${alpha})`
          ctx.beginPath()
          ctx.arc(point.x, point.y, star.size * (1 - index / star.maxTrailLength), 0, Math.PI * 2)
          ctx.fill()
        })
      })

      // Enhanced floating elements with interactive behavior
      floatingElements.forEach((element) => {
        // Calculate distance to mouse
        const dx = mousePosition.x - element.x
        const dy = mousePosition.y - element.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        // Interactive behavior
        if (distance < element.interactiveRadius) {
          const angle = Math.atan2(dy, dx)
          element.x -= Math.cos(angle) * 2
          element.y -= Math.sin(angle) * 2
          element.glowIntensity = 0.8
        } else {
          element.glowIntensity = Math.max(0.3, element.glowIntensity - 0.02)
          element.x += Math.cos(element.angle) * element.speed
          element.y += Math.sin(element.angle) * element.speed
        }

        // Wrap around screen edges
        element.x = (element.x + canvas.width) % canvas.width
        element.y = (element.y + canvas.height) % canvas.height

        // Enhanced drawing with effects
        ctx.save()
        ctx.translate(element.x, element.y)

        const pulse = Math.sin(time * element.pulseSpeed * 5 + element.pulseOffset)
        const scale = 1 + pulse * 0.2

        ctx.scale(scale, scale)
        ctx.rotate(time * element.rotationSpeed)

        // Enhanced glow effect
        ctx.shadowColor = `rgba(${element.icon.color}, ${element.glowIntensity})`
        ctx.shadowBlur = 20 + pulse * 10
        ctx.strokeStyle = `rgba(${element.icon.color}, ${element.glowIntensity})`
        ctx.lineWidth = 1.5 + pulse * 0.5

        element.icon.draw(ctx, 0, 0, element.size * 2, time)

        // Add interactive rings
        if (distance < element.interactiveRadius) {
          ctx.beginPath()
          ctx.arc(0, 0, element.size * 4 * (1 - distance / element.interactiveRadius), 0, Math.PI * 2)
          ctx.strokeStyle = `rgba(${element.icon.color}, ${0.2 * (1 - distance / element.interactiveRadius)})`
          ctx.stroke()
        }

        ctx.restore()
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("touchmove", handleTouchMove)
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
    }
  }, [mounted])

  if (!mounted) {
    return (
      <div
        className="absolute inset-0 w-full h-full"
        style={{ background: "linear-gradient(to bottom, #040412, #0a0a20)" }}
      />
    )
  }

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{
        background: "linear-gradient(to bottom, #040412, #0a0a20)",
        touchAction: "none", // Prevent default touch behaviors
      }}
    />
  )
}

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
  )
}

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
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "loop",
        ease: "easeInOut",
        repeatDelay: 1,
      }}
      className="inline-block"
    >
      👋
    </motion.span>
  )
}

const Hero = () => {
  const [isMounted, setIsMounted] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  const handleCVDownload = async () => {
    try {
      const response = await fetch("/MohamedSari.pdf", {
        headers: {
          "Content-Type": "application/pdf",
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.style.display = "none"
      link.href = url
      link.download = "MohamedSari.pdf"

      document.body.appendChild(link)
      link.click()

      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error("Failed to download CV:", error)
    }
  }

  useEffect(() => {
    setIsMounted(true)

    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => {
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  // Tech stack badges
  const TechBadge = ({ icon, name }) => (
    <motion.div
      className="flex items-center gap-1.5 px-3 py-1.5 bg-violet-900/20 rounded-full border border-violet-500/20"
      whileHover={{ scale: 1.05, backgroundColor: "rgba(124, 58, 237, 0.3)" }}
      transition={{ duration: 0.2 }}
    >
      {icon}
      <span className="text-xs text-violet-200">{name}</span>
    </motion.div>
  )

  return (
    <>
      <div
        className={`relative min-h-screen flex items-center justify-center overflow-hidden ${isMobile ? "bg-gradient-to-b from-black to-violet-800" : ""}`}
      >
        {isMounted && !isMobile && <SpaceBackground />}
        {!isMobile && <Quote />}

        {!isMobile && <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/50" />}

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.div variants={containerVariants} initial="hidden" animate="visible">
            <motion.div className={`${isMobile ? "mb-4" : "mb-6"}`} variants={itemVariants}>
              <motion.h2
                className={`text-violet-400 ${isMobile ? "text-lg" : "text-xl"} mb-4 font-light tracking-wide flex items-center justify-center gap-2`}
              >
                <AnimatedText text="Hello" delay={0.2} />
                <WavingHand />
                <AnimatedText text="I'm " delay={0.2} />
              </motion.h2>

              <h1
                className={`text-white ${isMobile ? "text-4xl" : "text-5xl md:text-7xl"} font-bold ${isMobile ? "mb-4" : "mb-6"} tracking-tight`}
              >
                <AnimatedText text="Mohamed Sari" delay={0.4} />
              </h1>

              <motion.div
                className={`text-gray-300 ${isMobile ? "text-lg" : "text-xl md:text-2xl"} mb-4`}
                variants={itemVariants}
              >
                <AnimatedText text="Fullstack Developer" delay={0.6} />
              </motion.div>

              <motion.p
                className={`${isMobile ? "text-gray-200 text-sm" : "text-violet-300"} mb-8 max-w-2xl mx-auto`}
                variants={itemVariants}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
              >
                {isMobile ? (
                  <>
                    Professional developer specializing in <span className="font-semibold text-white">MERN stack</span>,{" "}
                    <span className="font-semibold text-white">Next.js</span>, and{" "}
                    <span className="font-semibold text-white">TypeScript</span> for building scalable web applications.
                  </>
                ) : (
                  <>
                    I'm specialized in <span className="font-semibold text-white">MERN stack</span> development,
                    creating powerful web applications with modern technologies.
                  </>
                )}
              </motion.p>
            </motion.div>

            {/* Tech stack badges */}
            <motion.div
              className={`flex flex-wrap justify-center gap-2 ${isMobile ? "mb-6" : "mb-10"}`}
              variants={itemVariants}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
            >
              <TechBadge
                icon={
                  <svg
                    className="w-3.5 h-3.5 text-blue-400"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 10.11c1.03 0 1.87.84 1.87 1.89 0 1-.84 1.85-1.87 1.85-1.03 0-1.87-.85-1.87-1.85 0-1.05.84-1.89 1.87-1.89M7.37 20c.63.38 2.01-.2 3.6-1.7-.52-.59-1.03-1.23-1.51-1.9-.82-.08-1.63-.2-2.4-.36-.51 2.14-.32 3.61.31 3.96m.71-5.74l-.29-.51c-.11.29-.22.58-.29.86.27.06.57.11.88.16l-.3-.51m6.54-.76l.81-1.5-.81-1.5c-.3-.53-.62-1-.91-1.47C13.17 9 12.6 9 12 9c-.6 0-1.17 0-1.71.03-.29.47-.61.94-.91 1.47L8.57 12l.81 1.5c.3.53.62 1 .91 1.47.54.03 1.11.03 1.71.03.6 0 1.17 0 1.71-.03.29-.47.61-.94.91-1.47M12 6.78c-.19.22-.39.45-.59.72h1.18c-.2-.27-.4-.5-.59-.72m0 10.44c.19-.22.39-.45.59-.72h-1.18c.2.27.4.5.59.72M16.62 4c-.62-.38-2 .2-3.59 1.7.52.59 1.03 1.23 1.51 1.9.82.08 1.63.2 2.4.36.51-2.14.32-3.61-.32-3.96m-.7 5.74l.29.51c.11-.29.22-.58.29-.86-.27-.06-.57-.11-.88-.16l.3.51m1.45-7.05c1.47.84 1.63 3.05 1.01 5.63 2.54.75 4.37 1.99 4.37 3.68 0 1.69-1.83 2.93-4.37 3.68.62 2.58.46 4.79-1.01 5.63-1.46.84-3.45-.12-5.37-1.95-1.92 1.83-3.91 2.79-5.38 1.95-1.46-.84-1.62-3.05-1-5.63-2.54-.75-4.37-1.99-4.37-3.68 0-1.69 1.83-2.93 4.37-3.68-.62-2.58-.46-4.79 1-5.63 1.47-.84 3.46.12 5.38 1.95 1.92-1.83 3.91-2.79 5.37-1.95M17.08 12c.34.75.64 1.5.89 2.26 2.1-.63 3.28-1.53 3.28-2.26 0-.73-1.18-1.63-3.28-2.26-.25.76-.55 1.51-.89 2.26M6.92 12c-.34-.75-.64-1.5-.89-2.26-2.1.63-3.28 1.53-3.28 2.26 0 .73 1.18 1.63 3.28 2.26.25-.76.55-1.51.89-2.26m9 2.26l-.3.51c.31-.05.61-.1.88-.16-.07-.28-.18-.57-.29-.86l-.29.51m-2.89 4.04c1.59 1.5 2.97 2.08 3.59 1.7.64-.35.83-1.82.32-3.96-.77.16-1.58.28-2.4.36-.48.67-.99 1.31-1.51 1.9M8.08 9.74l.3-.51c-.31.05-.61.1-.88.16.07.28.18.57.29.86l.29-.51m2.89-4.04C9.38 4.2 8 3.62 7.37 4c-.63.36-.82 1.82-.31 3.96a22.7 22.7 0 002.4-.36c.48-.67.99-1.31 1.51-1.9z" />
                  </svg>
                }
                name="React"
              />
              <TechBadge
                icon={
                  <svg
                    className="w-3.5 h-3.5 text-gray-200"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M11.5725 0c-.1763 0-.3098.0013-.3584.0067-.0516.0053-.2159.021-.3636.0328-3.4088.3073-6.6017 2.1463-8.624 4.9728C1.1004 6.584.3802 8.3666.1082 10.255c-.0962.659-.108.8537-.108 1.7474s.012 1.0884.108 1.7476c.652 4.506 3.8591 8.2919 8.2087 9.6945.7789.2511 1.6.4223 2.5337.5255.3636.04 1.9354.04 2.299 0 1.6117-.1783 2.9772-.577 4.3237-1.2643.2065-.1056.2464-.1337.2183-.1573-.0188-.0139-.8987-1.1938-1.9543-2.62l-1.919-2.592-2.4047-3.5583c-1.3231-1.9564-2.4117-3.556-2.4211-3.556-.0094-.0026-.0187 1.5787-.0187 3.509 0 3.3802.0093 3.5162.0933 3.6051.0759.0937.1338.1313.2331.1787.0985.0473.1338.0519.5477.0519h.4364l.1171-.0626c.0759-.0366.1731-.1159.2159-.1787l.0759-.1134.0067-4.7378.0067-4.7378.0932-.0568c.0518-.0366.1832-.0715.2913-.0806.1832-.0139.2258.0053 3.3077 1.4724a890.8577 890.8577 0 012.895 1.4964l.3189.1666.1537-.0933c.5896-.3666 1.4871-1.0497 2.0765-1.5836.9254-.8409 1.8508-1.9631 2.3542-2.8666l.1996-.3666-.1171-.1544c-1.3429-1.7729-3.2648-3.2594-5.4857-4.2061C18.6017.8909 17.407.5623 16.1423.3516 15.7557.3023 15.5929.2932 15.0071.2866c-.3636-.0053-.7654-.0013-.8915.0067zm4.0885 7.217c.3257.0626.6049.2918.7789.6376.0759.1544.0933.2426.0933.4773 0 .2932-.0871.5118-.2797.7093-.1996.2052-.3996.2851-.7654.2851-.3676 0-.5658-.08-.7654-.2851-.1996-.2052-.2797-.4223-.2797-.7093 0-.2932.08-.5118.2797-.7093.1809-.1856.3297-.2585.5997-.2918.1259-.0133.2651-.0067.3383.0133z" />
                  </svg>
                }
                name="Next.js"
              />
              <TechBadge
                icon={
                  <svg
                    className="w-3.5 h-3.5 text-blue-500"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089" />
                  </svg>
                }
                name="TypeScript"
              />
              <TechBadge
                icon={
                  <svg
                    className="w-3.5 h-3.5 text-green-500"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 21.985c-.275 0-.532-.074-.772-.202l-2.439-1.448c-.365-.203-.182-.277-.072-.314.496-.165.588-.201 1.101-.493.056-.037.129-.02.185.017l1.87 1.12c.074.036.166.036.221 0l7.319-4.237c.074-.036.11-.11.11-.202V7.768c0-.091-.036-.165-.11-.201l-7.319-4.219c-.073-.037-.165-.037-.221 0L4.552 7.566c-.073.036-.11.129-.11.201v8.457c0 .073.037.166.11.202l2 1.157c1.082.548 1.762-.095 1.762-.735V8.502c0-.11.091-.221.22-.221h.936c.108 0 .22.092.22.221v8.347c0 1.449-.788 2.294-2.164 2.294-.422 0-.752 0-1.688-.46l-1.925-1.099a1.55 1.55 0 01-.771-1.34V7.786c0-.55.293-1.064.771-1.339l7.316-4.237a1.637 1.637 0 011.544 0l7.317 4.237c.479.274.771.789.771 1.339v8.458c0 .549-.293 1.063-.771 1.34l-7.317 4.236c-.241.11-.516.165-.773.165zm2.256-5.816c-3.21 0-3.87-1.468-3.87-2.714 0-.11.092-.221.22-.221h.954c.11 0 .201.073.201.184.147.971.568 1.449 2.514 1.449 1.54 0 2.202-.35 2.202-1.175 0-.477-.185-.825-2.587-1.063-1.999-.2-3.246-.643-3.246-2.238 0-1.485 1.247-2.366 3.339-2.366 2.347 0 3.503.809 3.649 2.568a.297.297 0 01-.056.165c-.037.036-.091.073-.146.073h-.953a.212.212 0 01-.202-.164c-.221-1.012-.789-1.34-2.292-1.34-1.689 0-1.891.587-1.891 1.027 0 .531.237.696 2.514.99 2.256.293 3.32.715 3.32 2.294-.02 1.615-1.339 2.531-3.67 2.531z" />
                  </svg>
                }
                name="Node.js"
              />
              <TechBadge
                icon={
                  <svg
                    className="w-3.5 h-3.5 text-green-600"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M17.193 9.555c-1.264-5.58-4.252-7.414-4.573-8.115-.28-.394-.53-.954-.735-1.44-.036.495-.055.685-.523 1.184-.723.566-4.438 3.682-4.74 10.02-.282 5.912 4.27 9.435 4.888 9.884l.07.05A73.49 73.49 0 0111.91 24h.481c.114-1.032.284-2.056.51-3.07.417-.296.604-.463.85-.693a11.342 11.342 0 003.639-8.464c.01-.814-.103-1.662-.197-2.218zm-5.336 8.195s0-8.291.275-8.29c.213 0 .49 10.695.49 10.695-.381-.045-.765-1.76-.765-2.405z" />
                  </svg>
                }
                name="MongoDB"
              />
              <TechBadge
                icon={
                  <svg
                    className="w-3.5 h-3.5 text-sky-400"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" />
                  </svg>
                }
                name="Tailwind"
              />
            </motion.div>

            <motion.div className={`flex flex-col sm:flex-row gap-4 justify-center`} variants={itemVariants}>
              <GlowingButton primary onClick={handleCVDownload}>
                Download CV
              </GlowingButton>

              <GlowingButton>
                <Link href="/contact" className="no-underline text-inherit">
                  Contact
                </Link>
              </GlowingButton>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </>
  )
}

export default Hero
