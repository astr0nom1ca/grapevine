'use client'

import { NextStudio } from 'next-sanity/studio'
import config from '../../../sanity.config'
import { useEffect, useState } from 'react'

// REMOVED: export { metadata, viewport }- Next js cannot read Sanity's metadata hence build error

export default function StudioPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return <NextStudio config={config} />
}