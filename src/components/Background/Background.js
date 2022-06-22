import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import useTheme from 'hooks/useTheme'
import BackgroundParticle from 'components/BackgroundParticle'
import * as S from './Background.style.js'

const Background = ({ particles }) => {
  const theme = useTheme()
  return ReactDOM.createPortal(
    <S.Background>
          <div>
          { particles.map(({ args, particleId }) =>
             <BackgroundParticle key={particleId} {...args} />
          )}
          </div>
    <S.BackgroundImage src={theme.background.image} />
    </S.Background>,
    document.querySelector('#root'))
}

Background.propTypes = {
  particles: PropTypes.array.isRequired
}

export { Background }
