'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

export default function Cursor() {
  const mouse = useRef({ x: 0, y: 0 })
  const circle = useRef(null)
  const size = 30

  const moveCircle = (x: number, y: number) => {
    gsap.set(circle.current, { x, y, xPercent: -50, yPercent: -50 })
  }

  const handleMouseMove = (e: MouseEvent) => {
    const { clientX, clientY } = e
    mouse.current = {
      x: clientX,
      y: clientY,
    }
    moveCircle(mouse.current.x, mouse.current.y)
  }

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="h-screen fixed">
      <div
        style={{
          backgroundColor: '#bce4f2',
          width: size,
          height: size,
        }}
        className="top-0 left-0 fixed rounded-full mix-blend-difference pointer-events-none"
        ref={circle}
      />
    </div>
  )
}
