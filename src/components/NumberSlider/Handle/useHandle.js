import { useState, useRef } from 'react'
import { clamp } from 'utils/generic'

const useHandle = (min, max, onChange, defaultValue, direction) => {
  const width = max - min
  const [percent, setPercent] = useState((defaultValue - min) / width)
  const [, setUpdate] = useState(0)
  const getPos = (e) => direction === 'horizontal' ? e.clientX : e.clientY
  const getParentWidth = (parent) =>
    direction === 'horizontal'
      ? parent.getBoundingClientRect().width
      : parent.getBoundingClientRect().height
  const defaultRef = {
    percent: 0,
    prevPos: 0,
    parent: null
  }

  // Make sure to not set defaultRef directly
  // if we did we would be modifiying defaultRef which
  // is not a good idea since finishDrag depends on
  // it to reset stateRef
  const stateRef = useRef({ ...defaultRef })

  const r = () => stateRef.current

  const finishDrag = (e) => {
    window.removeEventListener('mouseup', finishDrag)
    window.removeEventListener('mousemove', moveDrag)
    stateRef.current = defaultRef
    setUpdate(l => l + 1)
  }

  const moveDrag = (e) => {
    const newPos = getPos(e)
    const diff = newPos - r().prevPos
    const percentDiff = diff / getParentWidth(r().parent)
    r().percent = clamp(r().percent + percentDiff, 0, 1)
    r().prevPos = newPos
    setPercent((percent) => clamp(percent + percentDiff, 0, 1))
    onChange(r().percent * width + min)
  }

  const startDrag = (e) => {
    e.preventDefault()
    window.addEventListener('mouseup', finishDrag)
    window.addEventListener('mousemove', moveDrag)
    r().parent = e.target.parentNode
    r().prevPos = getPos(e)
    r().percent = percent
  }
  return { percent, onmousedown: startDrag, active: Boolean(r().parent) }
}

export { useHandle as default }
