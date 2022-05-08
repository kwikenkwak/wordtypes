import React, { useEffect, useState } from 'react'
import { PropTypes } from 'prop-types'
import { CSSTransition } from 'react-transition-group'

import './styles/tooltip.scss'

function getPosition (pos, target) {
  if (!target) return {}
  const rect = target.getBoundingClientRect()
  const rootRect = document.querySelector('html').getBoundingClientRect()
  if (pos === 'left') {
    return { right: rootRect.width - rect.left, top: rect.top }
  } else if (pos === 'right') {
    return { left: rect.right, top: rect.top }
  } else if (pos === 'top') {
    return { bottom: rootRect.height - rect.top, left: rect.left }
  } else if (pos === 'bottom') {
    return { top: rect.bottom, left: rect.left }
  }
}

function Tooltip ({ text, pos = 'left', parentRef, show }) {
  return (
    <CSSTransition timeout={200} in={show} classNames='tooltip' unmountOnExit>
      <div className="tooltip" style={getPosition(pos, parentRef.current)}>{text}</div>
    </CSSTransition>
  )
}

Tooltip.propTypes = {
  text: PropTypes.string.isRequired,
  pos: PropTypes.string,
  parentRef: PropTypes.object.isRequired,
  show: PropTypes.bool.isRequired
}

export { Tooltip }
