import React from 'react'
import styled from 'styled-components'
import { darken, transparentize } from 'polished'
import { PropTypes } from 'prop-types'
import { Transition } from 'react-transition-group'

const TooltipDiv = styled.div`
  position: fixed;
  z-index: 999;
  background-color: ${props => transparentize(0.1, darken(0.2, props.theme.colors.bg))};
  color: ${props => props.theme.colors.base};
  border: solid 1px ${props => props.theme.colors.base};
  padding: 1em;
  font-size: .5em;
  max-width: 20vw;
  transition: opacity 200ms;

  opacity: ${({ state }) => {
    switch (state) {
      case 'entering':
      case 'entered':
        return 1
      case 'exiting':
      case 'exited':
        return 0
    }
    }
  }
 `

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
    <Transition timeout={200} in={show} unmountOnExit>
    {(state) =>
      <TooltipDiv state={state} style={getPosition(pos, parentRef.current)}>
      {text}
      </TooltipDiv>
    }
    </Transition>
  )
}

Tooltip.propTypes = {
  text: PropTypes.string.isRequired,
  pos: PropTypes.string,
  parentRef: PropTypes.object.isRequired,
  show: PropTypes.bool.isRequired
}

export { Tooltip }
