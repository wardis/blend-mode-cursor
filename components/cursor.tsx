'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

export default function Cursor({ isActive = false }) {
  const mouse = useRef({ x: 0, y: 0 })
  const delayedMouse = useRef({ x: 0, y: 0 })
  const animationFrame = useRef(0)
  const circle = useRef(null)
  const size = isActive ? 400 : 30

  const moveCircle = (x: number, y: number) => {
    gsap.set(circle.current, { x, y, xPercent: -50, yPercent: -50 })
  }

  const handleMouseMove = (e: MouseEvent) => {
    const { clientX, clientY } = e
    mouse.current = {
      x: clientX,
      y: clientY,
    }
  }

  const lerp = (x: number, y: number, a: number) => x * (1 - a) + y * a

  const animate = () => {
    const { x, y } = delayedMouse.current
    delayedMouse.current = {
      x: lerp(x, mouse.current.x, 0.1),
      y: lerp(y, mouse.current.y, 0.1),
    }
    moveCircle(delayedMouse.current.x, delayedMouse.current.y)
    animationFrame.current = window.requestAnimationFrame(animate)
  }

  useEffect(() => {
    animate()
    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.cancelAnimationFrame(animationFrame.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="relative h-screen">
      <div
        style={{
          backgroundColor: '#bce4f2',
          width: size,
          height: size,
          filter: `blur(${isActive ? 30 : 0}px)`,
          transition:
            'height 0.3s ease-out, width 0.3s ease-out, filter 0.3s ease-out',
        }}
        className="top-0 left-0 fixed rounded-full mix-blend-difference pointer-events-none"
        ref={circle}
      />
    </div>
  )
}
