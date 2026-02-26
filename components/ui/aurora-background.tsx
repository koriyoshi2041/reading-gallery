'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const fragmentShader = `
  varying vec2 vUv;
  uniform float u_time;
  uniform vec3 u_color_a;
  uniform vec3 u_color_b;

  // 2D Random
  float random (in vec2 st) {
      return fract(sin(dot(st.xy,
                           vec2(12.9898,78.233)))
                   * 43758.5453123);
  }

  // 2D Noise
  float noise (in vec2 st) {
      vec2 i = floor(st);
      vec2 f = fract(st);

      float a = random(i);
      float b = random(i + vec2(1.0, 0.0));
      float c = random(i + vec2(0.0, 1.0));
      float d = random(i + vec2(1.0, 1.0));

      vec2 u = f*f*(3.0-2.0*f);
      return mix(a, b, u.x) +
              (c - a)* u.y * (1.0 - u.x) +
              (d - b) * u.x * u.y;
  }
  
  // Fractional Brownian Motion
  float fbm (in vec2 st) {
      float value = 0.0;
      float amplitude = .5;
      float frequency = 0.;
      for (int i = 0; i < 6; i++) {
          value += amplitude * noise(st);
          st *= 2.;
          amplitude *= .5;
      }
      return value;
  }

  void main() {
    vec2 st = vUv * 3.0;
    st.x += u_time * 0.03;
    float n = fbm(st + u_time * 0.05);
    
    vec3 color = mix(u_color_a, u_color_b, n);

    gl_FragColor = vec4(color, 1.0);
  }
`

const Aurora = () => {
  const meshRef = useRef<THREE.Mesh>(null!)
  const uniforms = useMemo(
    () => ({
      u_time: { value: 0 },
      // Use colors from the new fintech palette for a subtle, professional aurora effect
      u_color_a: { value: new THREE.Color('hsl(210 100% 70%)') }, // Bright blue (--color-primary)
      u_color_b: { value: new THREE.Color('hsl(270 70% 60%)') }, // Purple accent (--color-accent)
    }),
    []
  )

  useFrame((state) => {
    const { clock } = state
    if(meshRef.current) {
      // @ts-ignore
      meshRef.current.material.uniforms.u_time.value = clock.getElapsedTime()
    }
  })

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[10, 10, 1, 1]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  )
}


export const AuroraBackground = () => {
  return (
    <div className="absolute top-0 left-0 w-full h-full -z-10">
      <Canvas camera={{ position: [0, 0, 1.5] }}>
        <Aurora />
      </Canvas>
    </div>
  )
}
