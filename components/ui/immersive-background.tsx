'use client'

import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function Stars() {
  const ref = useRef<THREE.Points>(null!)
  
  const count = 3000
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 10
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10
    }
    return pos
  }, [])

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    ref.current.rotation.y = time * 0.05
    ref.current.rotation.x = time * 0.02
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.015}
        color="#ffffff"
        sizeAttenuation
        transparent
        opacity={0.4}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

function FluidGrid() {
  const ref = useRef<THREE.Points>(null!)
  const count = 40
  const sep = 0.25
  
  const { positions, step } = useMemo(() => {
    const pos = new Float32Array(count * count * 3)
    let i = 0
    for (let x = 0; x < count; x++) {
      for (let z = 0; z < count; z++) {
        pos[i * 3] = (x - count / 2) * sep
        pos[i * 3 + 1] = 0
        pos[i * 3 + 2] = (z - count / 2) * sep
        i++
      }
    }
    return { positions: pos, step: 0 }
  }, [])

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    const pos = ref.current.geometry.attributes.position.array as Float32Array
    let i = 0
    for (let x = 0; x < count; x++) {
      for (let z = 0; z < count; z++) {
        const xPos = (x - count / 2) * sep
        const zPos = (z - count / 2) * sep
        // Wave pattern
        const y = Math.sin(xPos * 0.5 + time) * Math.cos(zPos * 0.5 + time) * 0.2
        pos[i * 3 + 1] = y
        i++
      }
    }
    ref.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={ref} position={[0, -1, 0]}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count * count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#3b82f6"
        sizeAttenuation
        transparent
        opacity={0.3}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

export const ImmersiveBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 bg-[#020202]">
      <Canvas camera={{ position: [0, 2, 5], fov: 60 }}>
        <fog attach="fog" args={['#020202', 2, 10]} />
        <Stars />
        <FluidGrid />
        <ambientLight intensity={0.5} />
      </Canvas>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#020202]/50 to-[#020202]" />
    </div>
  )
}
