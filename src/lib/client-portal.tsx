'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

interface ClientPortalProps {
  children: React.ReactNode
}

export const ClientPortal = ({ children }: ClientPortalProps) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return mounted ? createPortal(children, document.body) : null
}