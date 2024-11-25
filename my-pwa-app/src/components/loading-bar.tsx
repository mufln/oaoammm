'use client'

import { useState, useEffect } from 'react'

interface LoadingBarProps {
  isLoading: boolean;
  duration: number;
}

export default function LoadingBar({ isLoading = true, duration = 2000 }: LoadingBarProps) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let animationFrame: number

    const animate = (startTime: number) => {
      const runtime = Date.now() - startTime
      const relativeProgress = runtime / duration

      setProgress(relativeProgress < 1 ? relativeProgress * 100 : 100)

      if (relativeProgress < 1) {
        animationFrame = requestAnimationFrame(() => animate(startTime))
      }
    }

    if (isLoading) {
      const startTime = Date.now()
      animate(startTime)
    } else {
      setProgress(100)
    }

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [isLoading, duration])

  return (
    <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
      <div 
        className="h-full bg-blue-600 transition-all duration-300 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}