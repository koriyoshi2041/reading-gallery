'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Float } from '@react-three/drei';
import { Suspense } from 'react';
import * as THREE from 'three';

const ThreeDBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 bg-black">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <Suspense fallback={null}>
          {/* Environment for realistic lighting and reflections */}
          <Environment preset="night" background={false} />

          {/* Subtle ambient light */}
          <ambientLight intensity={0.5} />

          {/* Directional light to cast some shadows and highlight forms */}
          <directionalLight position={[10, 10, 5]} intensity={1} color="hsl(210 100% 70%)" />
          <directionalLight position={[-10, -10, -5]} intensity={0.5} color="hsl(270 70% 60%)" />


          {/* Abstract geometric shapes */}
          <Float floatIntensity={0.5} rotationIntensity={0.5} speed={1.5}>
            <mesh position={[2, 1, -3]} scale={0.8}>
              <boxGeometry args={[1, 1, 1]} />
              <meshStandardMaterial color="hsl(220 8% 30%)" metalness={0.8} roughness={0.2} transparent opacity={0.6} />
            </mesh>
          </Float>

          <Float floatIntensity={0.7} rotationIntensity={0.7} speed={1}>
            <mesh position={[-2, -1, -2]} scale={0.6} rotation={[Math.PI / 4, Math.PI / 4, 0]}>
              <octahedronGeometry args={[1, 0]} />
              <meshStandardMaterial color="hsl(210 100% 70%)" metalness={0.9} roughness={0.1} transparent opacity={0.7} />
            </mesh>
          </Float>

          <Float floatIntensity={0.6} rotationIntensity={0.6} speed={1.2}>
            <mesh position={[0, 2, -5]} scale={0.4}>
              <icosahedronGeometry args={[1, 0]} />
              <meshStandardMaterial color="hsl(270 70% 60%)" metalness={0.7} roughness={0.3} transparent opacity={0.5} />
            </mesh>
          </Float>

          {/* Optional: OrbitControls for debugging, remove for production */}
          {/* <OrbitControls /> */}
        </Suspense>
      </Canvas>
    </div>
  );
};

export default ThreeDBackground;
