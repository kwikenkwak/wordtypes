import PropTypes from 'prop-types'
import {
  BackgroundDiv, ParticleDiv,
  moving, rotating
}
  from './BackgroundParticle.style.js'
import React, { useState, useCallback, useRef } from 'react'

const MINROTDURATION = 7000
const MAXROTDURATION = 17000

const FALLDURATION = 10000

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
    <ParticleDiv style={style.current} correct={correct}>
      {charTyped.toUpperCase()}
    </ParticleDiv>
  )
}

BackgroundParticle.propTypes = {
  charTyped: PropTypes.string.isRequired,
  correct: PropTypes.bool.isRequired
}

const useBackground = () => {
  const [particles, setParticles] = useState([])

  const removeParticle = (particle) => {
    console.log('removing particle')
    setParticles(ps => {
      ps.splice(ps.indexOf(particle), 1)
      return ps
    })
  }

  const addParticle = useCallback((particle) => {
    setParticles((ps) => [...ps, particle])
    setTimeout(() => removeParticle(particle), FALLDURATION)
  }, [])

  return { addParticle, particles }
}

export { BackgroundDiv, useBackground, BackgroundParticle }
