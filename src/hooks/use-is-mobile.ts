import { useState, useLayoutEffect } from 'react'

const useIsMobile = (): boolean => {
  const [isMobile, setIsMobile] = useState(false)

  useLayoutEffect(() => {
    const updateSize = (): void => {
      setIsMobile(window.innerWidth < 768)
    }

    updateSize()
    window.addEventListener('resize', updateSize)
    return (): void => window.removeEventListener('resize', updateSize)
  }, [])

  return isMobile
}

export default useIsMobile
