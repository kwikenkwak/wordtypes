import PropTypes from 'prop-types'
import * as S from './BackgroundParticle.style.js'
import React, { useRef } from 'react'
import { FALLDURATION } from 'utils/background'

const MINROTDURATION = 7000
const MAXROTDURATION = 17000

function randInt (start, end) {
  return Math.floor(Math.random() * (end - start) + start)
}

function createBackgroundBlockStyle ({ speed = 1, isError = false, sizeBounds = [50, 100] }) {
  const size = randInt(sizeBounds[0], sizeBounds[1])
  return {
    animationDuration: `${1 / speed * randInt(MINROTDURATION, MAXROTDURATION)}ms, 
                        ${FALLDURATION}ms`,
    fontSize: (size / 30) + 'em',
    left: -30 + randInt(0, 160) + '%',
    borderRadius: Math.floor(size / 5) + 'px'
  }
}

function BackgroundParticle ({ charTyped, correct }) {
  if (charTyped === ' ') charTyped = 'space'
  const style = useRef(createBackgroundBlockStyle({ isError: !correct }))
  return (
    <S.ParticleDiv style={style.current} correct={correct}>
      {charTyped.toUpperCase()}
    </S.ParticleDiv>
  )
}

BackgroundParticle.propTypes = {
  charTyped: PropTypes.string.isRequired,
  correct: PropTypes.bool.isRequired
}

export { BackgroundParticle }
