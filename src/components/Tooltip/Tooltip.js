import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { Transition } from 'react-transition-group'
import * as S from './Tooltip.style.js'

function getPosition (pos, target, arrowsize = 20) {
  if (!target) return {}
  const rect = target.getBoundingClientRect()
  const rootRect = document.querySelector('body').getBoundingClientRect()
  if (pos === 'left') {
    return { right: rootRect.width - rect.left, top: rect.top }
  } else if (pos === 'right') {
    return { left: rect.right, top: rect.top }
  } else if (pos === 'top') {
    return { bottom: rootRect.height - rect.top, left: rect.left }
  } else if (pos === 'bottom') {
    return { top: rect.bottom, left: rect.left + rect.width / 2 - arrowsize / 2 }
  }
}

function Tooltip ({ text, pos = 'left', parentRef, show }) {
  return ReactDOM.createPortal(
    <Transition timeout={200} in={show} unmountOnExit>
    {(state) =>
      <S.Tooltip state={state} style={getPosition(pos, parentRef.current)}>
      <S.Arrow />
        <S.TextTooltip>
          {text}
        </S.TextTooltip>
      </S.Tooltip>
    }
    </Transition>, document.querySelector('#root'))
}

Tooltip.propTypes = {
  text: PropTypes.string.isRequired,
  pos: PropTypes.string,
  parentRef: PropTypes.object.isRequired,
  show: PropTypes.bool.isRequired
}

export { Tooltip }
