import React, { useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import * as S from './Collapser.style.js'

const Collapser = ({ timeout, active, children }) => {
  const moveRef = useRef(null)

  const updateCollapse = () => {
    moveRef.current.style.marginBottom = (active ? 0 : -moveRef.current.offsetHeight) + 'px'
  }

  useEffect(updateCollapse
    , [active])

  // Very important to note that the transition is disabled on the
  // first render, that is because we don't want animation when we
  // set the marginBottom to -offsetHeight when we start
  return <div>
    <S.MoveDiv ref={moveRef} timeout={moveRef.current ? timeout : 0}>
      {children}
    </S.MoveDiv>
    </div>
}

Collapser.propTypes = {
  timeout: PropTypes.number.isRequired,
  active: PropTypes.bool.isRequired,
  children: PropTypes.any
}

export { Collapser }
