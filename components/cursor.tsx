'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

const colors = ['#c32d27', '#f5c63f', '#457ec4', '#356fdb']

export default function Cursor({ isActive = false }) {
  const mouse = useRef({ x: 0, y: 0 })
  const delayedMouse = useRef({ x: 0, y: 0 })
  const animationFrame = useRef(0)
  const circles = useRef<(HTMLDivElement | null)[]>([])
  const size = isActive ? 400 : 30
  const delay = isActive ? 0.015 : 0.005

  const moveCircles = (x: number, y: number) => {
    if (circles.current.length < 1) return
    circles.current.forEach((circle, i) => {
      gsap.set(circle, { x, y, xPercent: -50, yPercent: -50 })
    })
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
      x: lerp(x, mouse.current.x, 0.75),
      y: lerp(y, mouse.current.y, 0.75),
    }
    moveCircles(delayedMouse.current.x, delayedMouse.current.y)
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
    <div>
      {[...Array(4)].map((_, i) => (
        <div
          style={{
            backgroundColor: colors[i],
            width: size,
            height: size,
            filter: `blur(${isActive ? 20 : 0}px)`,
            transition: `transform ${
              (4 - i) * delay
            }s linear, height 0.3s ease-out, width 0.3s ease-out, filter 0.3s ease-out`,
          }}
          className="top-0 left-0 fixed rounded-full mix-blend-difference pointer-events-none"
          key={i}
          ref={(ref) => (circles.current[i] = ref)}
        />
      ))}
    </div>
  )
}
