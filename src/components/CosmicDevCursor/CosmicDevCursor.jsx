import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const CosmicDevCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isPointer, setIsPointer] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [isLargeScreen, setIsLargeScreen] = useState(true)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 768px)')
    setIsLargeScreen(mediaQuery.matches)

    const handleMediaQueryChange = (event) => {
      setIsLargeScreen(event.matches)
    }

    mediaQuery.addListener(handleMediaQueryChange)

    return () => {
      mediaQuery.removeListener(handleMediaQueryChange)
    }
  }, [])

  useEffect(() => {
    if (!isLargeScreen) return

    const updateMousePosition = (ev) => {
      setMousePosition({ x: ev.clientX, y: ev.clientY })
    }

    const updateCursorType = () => {
      const element = document.elementFromPoint(mousePosition.x, mousePosition.y)
      setIsPointer(element && window.getComputedStyle(element).cursor === 'pointer')
    }

    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)

    window.addEventListener('mousemove', updateMousePosition)
    window.addEventListener('mouseover', updateCursorType)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)

    return () => {
      window.removeEventListener('mousemove', updateMousePosition)
      window.removeEventListener('mouseover', updateCursorType)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isLargeScreen, mousePosition.x, mousePosition.y])

  if (!isLargeScreen) return null

  return (
    <>
      {/* Main cosmic orb */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full bg-indigo-500 opacity-50 pointer-events-none z-50 mix-blend-screen"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          scale: isPointer ? 1.5 : isClicking ? 0.8 : 1,
        }}
        transition={{
          type: "spring",
          damping: 10,
          stiffness: 50,
          restDelta: 0.001
        }}
      />

      {/* Orbiting pixels */}
      {[...Array(5)].map((_, index) => (
        <motion.div
          key={index}
          className="fixed top-0 left-0 w-1 h-1 rounded-full bg-blue-300 pointer-events-none z-50"
          animate={{
            x: mousePosition.x,
            y: mousePosition.y,
            rotate: 360,
          }}
          transition={{
            type: "tween",
            duration: 2,
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear",
            delay: index * 0.1,
          }}
          style={{
            translateX: 20 * Math.cos(index * (Math.PI * 2) / 5),
            translateY: 20 * Math.sin(index * (Math.PI * 2) / 5),
          }}
        />
      ))}

      {/* Code brackets */}
      <motion.div
        className="fixed top-0 left-0 text-green-400 font-mono text-sm pointer-events-none z-50"
        animate={{
          x: mousePosition.x + 20,
          y: mousePosition.y - 10,
          opacity: isPointer ? 1 : 0.5,
          scale: isClicking ? 1.2 : 1,
        }}
        transition={{
          type: "spring",
          damping: 20,
          stiffness: 100,
        }}
      >
        {'{ }'}
      </motion.div>

      {/* Rocket on click */}
      <motion.div
        className="fixed top-0 left-0 text-xl pointer-events-none z-50"
        animate={{
          x: mousePosition.x + 25,
          y: mousePosition.y - 25,
          opacity: isClicking ? 1 : 0,
          rotate: isClicking ? 315 : 0,
        }}
        transition={{
          type: "spring",
          damping: 15,
          stiffness: 55,
        }}
      >
        🚀
      </motion.div>
    </>
  )
}

export default CosmicDevCursor

