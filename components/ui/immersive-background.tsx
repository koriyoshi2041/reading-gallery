'use client'

import React, { useRef, useMemo, useState, useEffect } from 'react'
import dynamic from 'next/dynamic'

// WebGL 检测
function isWebGLAvailable(): boolean {
  if (typeof window === 'undefined') return false
  try {
    const canvas = document.createElement('canvas')
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    )
  } catch (e) {
    return false
  }
}

// CSS Fallback 背景
const CSSFallbackBackground = () => (
  <div className="fixed inset-0 -z-10 bg-black overflow-hidden">
    {/* Animated gradient background */}
    <div 
      className="absolute inset-0 opacity-50"
      style={{
        background: 'radial-gradient(ellipse at 20% 50%, rgba(30, 40, 80, 0.4) 0%, transparent 50%), radial-gradient(ellipse at 80% 50%, rgba(20, 30, 60, 0.3) 0%, transparent 50%), radial-gradient(ellipse at 50% 100%, rgba(40, 50, 100, 0.2) 0%, transparent 50%)',
        animation: 'pulse 8s ease-in-out infinite alternate'
      }}
    />
    {/* Subtle grid pattern */}
    <div 
      className="absolute inset-0 opacity-[0.03]"
      style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
        backgroundSize: '50px 50px'
      }}
    />
    {/* Vignette */}
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]" />
    <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black" />
  </div>
)

// Three.js 组件动态导入
const ThreeBackground = dynamic(() => import('./three-background'), {
  ssr: false,
  loading: () => <CSSFallbackBackground />
})

export const ImmersiveBackground = () => {
  const [webglSupported, setWebglSupported] = useState<boolean | null>(null)

  useEffect(() => {
    setWebglSupported(isWebGLAvailable())
  }, [])

  // 服务端渲染或检测中
  if (webglSupported === null) {
    return <CSSFallbackBackground />
  }

  // WebGL 不支持
  if (!webglSupported) {
    return <CSSFallbackBackground />
  }

  // WebGL 支持，使用 Three.js
  return <ThreeBackground />
}
