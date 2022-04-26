import PropTypes from 'prop-types'
import './styles/background.scss'
import React, { useRef } from 'react'

function randInt (start, end) {
  return Math.floor(Math.random() * (end - start) + start)
}

function createBackgroundBlockStyle ({ speed = 1, isError = false, sizeBounds = [50, 100] }) {
  const size = randInt(sizeBounds[0], sizeBounds[1])
  return {
    animationName: 'rotating , moving',
    animationDuration: `${1 / speed * randInt(7000, 17000)}ms, 10s`,
    animationIterationCount: 'infinite, 1',
    animationFillMode: 'forwards',
    animationTimingFunction: 'linear',
    fontSize: (size / 30) + 'em',
    left: -30 + randInt(0, 160) + '%',
    borderRadius: Math.floor(size / 5) + 'px'
  }
}

function BackgroundParticle ({ str, isErr }) {
  if (str === ' ') str = 'space'
  const style = useRef(createBackgroundBlockStyle({ isError: isErr }))
  return (
    <div className={'particle ' + (isErr && 'particle-error')} style={style.current}>{str.toUpperCase()}</div>
  )
}

BackgroundParticle.propTypes = {
  str: PropTypes.string.isRequired,
  isErr: PropTypes.bool.isRequired
}

class Background extends React.Component {
  constructor () {
    super()
    this.particles = []
  }

  addParticle (args) {
    this.particles.push(args)
    console.log(this.particles)
    this.setState({})
  }

  render () {
    return (
    <div className="background">
    <div className="particles">
    {this.particles.map((value, idx) => <BackgroundParticle key={idx} str={value.str} isErr={value.isErr}/>)}
    </div>
    </div>
    )
  }
}

export { Background }
