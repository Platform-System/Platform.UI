"use client"

import React, { useEffect, useState } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

export function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  // Track mouse position directly
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  // Spring physics for smooth trailing effect (aura)
  const springConfig = { damping: 28, stiffness: 200, mass: 0.5 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  useEffect(() => {
    // Only run on desktop/non-touch devices
    if (window.matchMedia("(hover: none)").matches) {
      return
    }

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsVisible(true)

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      // Detect interactive elements to expand the aura
      const isClickable = target.closest("button, a, input, select, textarea, [role='button'], .cursor-pointer")
      setIsHovering(!!isClickable)
    }

    window.addEventListener("mousemove", moveCursor)
    window.addEventListener("mouseover", handleMouseOver)

    return () => {
      window.removeEventListener("mousemove", moveCursor)
      window.removeEventListener("mouseover", handleMouseOver)
    }
  }, [cursorX, cursorY])

  if (!isVisible) return null

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[9999] flex items-center justify-center rounded-full"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        width: 40,
        height: 40,
        translateX: "-50%",
        translateY: "-50%",
      }}
      animate={{
        scale: isHovering ? 1.6 : 1,
        backgroundColor: isHovering 
          ? "rgba(var(--store-accent-rgb) / 0.1)" 
          : "rgba(var(--store-accent-rgb) / 0.03)",
        border: isHovering 
          ? "1px solid rgba(var(--store-accent-rgb) / 0.3)" 
          : "1px solid rgba(var(--store-accent-rgb) / 0.15)",
        backdropFilter: isHovering ? "blur(2px)" : "blur(0px)",
      }}
      transition={{ 
        scale: { type: "spring", stiffness: 300, damping: 25 },
        backgroundColor: { duration: 0.2 },
      }}
    >
      <motion.div 
        className="h-1.5 w-1.5 rounded-full"
        style={{ backgroundColor: "rgb(var(--store-accent-rgb))" }}
        animate={{
          scale: isHovering ? 0 : 1,
          opacity: isHovering ? 0 : 0.8
        }}
        transition={{ duration: 0.2 }}
      />
    </motion.div>
  )
}
