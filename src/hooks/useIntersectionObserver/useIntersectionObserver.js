import { useState, useEffect, useCallback } from 'react'

function useIntersectionObserver (root, target, listener, threshold) {
  const [observer, setObserver] = useState(null)
  if (typeof listener !== 'function') { throw new TypeError('listener must be a function') }

  const masterListener = useCallback((entries, observer) => {
    entries.forEach((entry, idx) => {
      if (entry.intersectionRatio >= threshold) listener()
    })
  }, [listener, threshold])

  useEffect(() => {
    if (!target) return
    if (observer) {
      observer.disconnect()
    }
    const newObs = new IntersectionObserver(masterListener, { root, threshold })
    newObs.observe(target)
    setObserver(newObs)
  }, [target, threshold, root, listener])
}

export { useIntersectionObserver }
