'use client'

import React, { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

/**
 * GlobalLoadingBar: Thanh tiến trình toàn cục cho toàn app shell.
 */
export const GlobalLoadingBar = ({ isPending }: { isPending?: boolean }) => {
  const pathname = usePathname()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (isPending) {
      setTimeout(() => setLoading(true), 0)
    } else {
      const timeout = setTimeout(() => setLoading(false), 500)
      return () => clearTimeout(timeout)
    }
  }, [isPending, pathname])

  if (!loading && !isPending) return null

  return (
    <div className="pointer-events-none fixed top-0 left-0 right-0 z-[9999]">
      <div
        className="h-[2px] animate-progress-fast bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 shadow-[0_0_10px_rgba(34,211,238,0.5)]"
        style={{ width: isPending ? '70%' : '100%', transition: 'width 0.4s ease-out' }}
      />
    </div>
  )
}

