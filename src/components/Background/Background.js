import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import BackgroundParticle from 'components/BackgroundParticle'
import * as S from './Background.style.js'

const Background = ({ particles }) => {
  return ReactDOM.createPortal(
    <S.Background>
          <div>
          { particles.map(({ args, particleId }) =>
             <BackgroundParticle key={particleId} {...args} />
          )}
          </div>
    </S.Background>,
    document.querySelector('#root'))
}

Background.propTypes = {
  particles: PropTypes.array.isRequired
}

export { Background }