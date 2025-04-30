"use client"

import React, { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'

interface Star {
  id: number
  x: number
  y: number
  size: number
  duration: number
  delay: number
  opacity: number
}

interface FloatingStarsProps {
  count?: number
}

export const FloatingStars: React.FC<FloatingStarsProps> = ({ count = 50 }) => {
  const [stars, setStars] = useState<Star[]>([])
  const initialized = useRef(false)
  
  useEffect(() => {
    // Only create stars once
    if (initialized.current) return
    initialized.current = true
    
    const newStars: Star[] = []
    
    for (let i = 0; i < count; i++) {
      newStars.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        duration: Math.random() * 10 + 5,
        delay: Math.random() * 5,
        opacity: Math.random() * 0.7 + 0.3
      })
    }
    
    setStars(newStars)
  }, [count])
  
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute bg-white rounded-full"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
            opacity: 0
          }}
          animate={{
            opacity: [0, star.opacity, 0],
            scale: [0.5, 1.2, 0.5]
          }}
          transition={{
            duration: star.duration,
            delay: star.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  )
}
