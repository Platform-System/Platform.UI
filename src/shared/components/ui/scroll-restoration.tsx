"use client"

import { usePathname } from "next/navigation"
import { useLayoutEffect } from "react"

/**
 * ScrollRestoration: A utility component that resets the scroll position 
 * of the custom store container whenever the route changes.
 */
export function ScrollRestoration() {
  const pathname = usePathname()

  useLayoutEffect(() => {
    const container = document.getElementById("store-scroll-container")
    if (container) {
      container.scrollTo({ top: 0, behavior: "instant" })
    }
  }, [pathname])

  return null
}
