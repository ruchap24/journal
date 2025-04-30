"use client"

import React, { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface DreamscapeParticlesProps {
  count?: number
  color?: string
  size?: number
  speed?: number
  opacity?: number
}

export const Dreamthemed: React.FC<DreamscapeParticlesProps> = ({
  count = 200,
  color = '#8a5cf5',
  size = 0.5,
  speed = 0.2,
  opacity = 0.7
}) => {
  const mesh = useRef<THREE.Points>(null)
  const particlesGeometry = useRef<THREE.BufferGeometry>(null)
  
  useEffect(() => {
    if (!particlesGeometry.current) return
    
    const positions = new Float32Array(count * 3)
    const velocities = new Float32Array(count * 3)
    
    for (let i = 0; i < count; i++) {
      // Position
      const i3 = i * 3
      positions[i3] = (Math.random() - 0.5) * 20
      positions[i3 + 1] = (Math.random() - 0.5) * 20
      positions[i3 + 2] = (Math.random() - 0.5) * 20
      
      // Velocity
      velocities[i3] = (Math.random() - 0.5) * 0.05 * speed
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.05 * speed
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.05 * speed
    }
    
    particlesGeometry.current.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    particlesGeometry.current.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3))
  }, [count, speed])
  
  useFrame(() => {
    if (!mesh.current || !particlesGeometry.current) return
    
    const positions = particlesGeometry.current.attributes.position.array as Float32Array
    const velocities = particlesGeometry.current.attributes.velocity.array as Float32Array
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      
      // Update position based on velocity
      positions[i3] += velocities[i3]
      positions[i3 + 1] += velocities[i3 + 1]
      positions[i3 + 2] += velocities[i3 + 2]
      
      // Boundary check and wrap around
      if (Math.abs(positions[i3]) > 10) velocities[i3] *= -1
      if (Math.abs(positions[i3 + 1]) > 10) velocities[i3 + 1] *= -1
      if (Math.abs(positions[i3 + 2]) > 10) velocities[i3 + 2] *= -1
    }
    
    particlesGeometry.current.attributes.position.needsUpdate = true
    
    // Slowly rotate the entire particle system
    mesh.current.rotation.y += 0.001
    mesh.current.rotation.x += 0.0005
  })
  
  return (
    <points ref={mesh}>
      <bufferGeometry ref={particlesGeometry} />
      <pointsMaterial 
        size={size} 
        color={color} 
        transparent 
        opacity={opacity}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  )
}
