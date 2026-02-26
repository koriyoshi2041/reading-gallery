'use client'

import React, { useRef, useMemo, useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const fragmentShader = `
  uniform float time;
  varying vec2 vUv;
  
  vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
  float snoise(vec2 v){
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
             -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy) );
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod(i, 289.0);
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
    + i.x + vec3(0.0, i1.x, 1.0 ));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
      dot(x12.zw,x12.zw)), 0.0);
    m = m*m ;
    m = m*m ;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 a0 = x - floor(x + 0.5);
    vec3 g = a0.x  * vec3(x0.x,x12.xz) + h * vec3(x0.y,x12.yw);
    vec3 l = 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
    vec3 r = g * l;
    return 130.0 * dot(m, r);
  }

  void main() {
    vec2 uv = vUv;
    float n = snoise(uv * 1.5 + time * 0.1);
    float n2 = snoise(uv * 2.0 - time * 0.05);
    
    vec3 color1 = vec3(0.0, 0.0, 0.0);
    vec3 color2 = vec3(0.05, 0.08, 0.15);
    vec3 color3 = vec3(0.02, 0.02, 0.05);
    
    vec3 finalColor = mix(color1, color2, n * 0.5 + 0.5);
    finalColor = mix(finalColor, color3, n2 * 0.3 + 0.3);
    
    float glow = smoothstep(0.4, 0.6, n) * 0.1;
    finalColor += vec3(0.4, 0.5, 1.0) * glow;
    
    gl_FragColor = vec4(finalColor, 1.0);
  }
`

function BackgroundPlane() {
  const meshRef = useRef<THREE.Mesh>(null!)
  const uniforms = useMemo(
    () => ({
      time: { value: 0 },
    }),
    []
  )

  useFrame((state) => {
    uniforms.time.value = state.clock.getElapsedTime()
  })

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[20, 20]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  )
}

function FloatingParticles() {
  const count = 1000
  const points = useRef<THREE.Points>(null!)
  
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 10
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10
      pos[i * 3 + 2] = (Math.random() - 0.5) * 5
    }
    return pos
  }, [])

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    points.current.rotation.y = time * 0.02
    points.current.rotation.x = time * 0.01
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.012}
        color="#ffffff"
        transparent
        opacity={0.3}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

// Error boundary for Three.js
class ThreeErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode; fallback: React.ReactNode }) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: Error) {
    console.warn('Three.js error, falling back to CSS:', error.message)
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback
    }
    return this.props.children
  }
}

const CSSFallback = () => (
  <div className="fixed inset-0 -z-10 bg-black overflow-hidden">
    <div 
      className="absolute inset-0 opacity-50"
      style={{
        background: 'radial-gradient(ellipse at 20% 50%, rgba(30, 40, 80, 0.4) 0%, transparent 50%), radial-gradient(ellipse at 80% 50%, rgba(20, 30, 60, 0.3) 0%, transparent 50%)',
      }}
    />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]" />
    <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black" />
  </div>
)

export default function ThreeBackground() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <CSSFallback />
  }

  return (
    <ThreeErrorBoundary fallback={<CSSFallback />}>
      <div className="fixed inset-0 -z-10 bg-black overflow-hidden">
        <Canvas 
          camera={{ position: [0, 0, 5], fov: 75 }}
          onCreated={({ gl }) => {
            // Additional WebGL context check
            if (!gl.getContext()) {
              throw new Error('WebGL context not available')
            }
          }}
        >
          <BackgroundPlane />
          <FloatingParticles />
        </Canvas>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black" />
      </div>
    </ThreeErrorBoundary>
  )
}
