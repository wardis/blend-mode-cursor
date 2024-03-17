'use client'

import Cursor from '@/components/cursor'
import { useState } from 'react'

export default function Scene() {
  const [isActive, setisActive] = useState(false)

  return (
    <div className="h-screen flex items-center justify-center">
      <h1
        className="text-[4.5vw] max-w-[90vw] text-center p-20 font-bold"
        onMouseOver={() => setisActive(true)}
        onMouseLeave={() => setisActive(false)}
      >
        The quick brown fox jumps over the lazy dog
      </h1>
      <Cursor isActive={isActive} />
    </div>
  )
}
