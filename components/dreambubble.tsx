"use client"

import React, { useEffect, useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Bubble {
  id: number
  x: number
  y: number
  size: number
  duration: number
  delay: number
  opacity: number
  color: string
}

interface DreamBubblesProps {
  count?: number
  colors?: string[]
}

export const DreamBubbles: React.FC<DreamBubblesProps> = ({ 
  count = 15,
  colors = ['#8a5cf5', '#ec4899', '#3b82f6', '#10b981']
}) => {
  const [bubbles, setBubbles] = useState<Bubble[]>([])
  
  // Memoize the colors array to prevent it from changing on every render
  const memoizedColors = useMemo(() => colors, []);
  
  // Use a ref to track if we've already created bubbles
  const initialized = React.useRef(false);
  
  useEffect(() => {
    // Only create bubbles once
    if (initialized.current) return;
    initialized.current = true;
    
    const newBubbles: Bubble[] = [];
    
    for (let i = 0; i < count; i++) {
      newBubbles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 60 + 20,
        duration: Math.random() * 20 + 10,
        delay: Math.random() * 5,
        opacity: Math.random() * 0.5 + 0.1,
        color: memoizedColors[Math.floor(Math.random() * memoizedColors.length)]
      });
    }
    
    setBubbles(newBubbles);
  }, [count, memoizedColors]); // Use memoizedColors instead of colors
  
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <AnimatePresence>
        {bubbles.map((bubble) => (
          <motion.div
            key={bubble.id}
            className="absolute rounded-full blur-xl"
            initial={{ 
              left: `${bubble.x}%`, 
              bottom: '-10%',
              width: bubble.size,
              height: bubble.size,
              opacity: 0
            }}
            animate={{ 
                transform: `translateY(-${window.innerHeight * 1.1}px)`,
                opacity: bubble.opacity,
                transition: { 
                  duration: bubble.duration,
                  delay: bubble.delay,
                  repeat: Infinity,
                  repeatDelay: 1
                }
              }}
              style={{
                backgroundColor: bubble.color,
                filter: 'blur(8px)',
                transform: 'translateZ(0)',
                willChange: 'transform, opacity'
              }}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}
