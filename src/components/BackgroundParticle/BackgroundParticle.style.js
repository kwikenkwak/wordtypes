import styled, { keyframes } from 'styled-components'
import { lighten, bg } from 'utils/themeutils'

export const moving = keyframes`
  100% {
    top: 150%;
  }

  0% {
    top: -10%;
  }
`

export const rotating = keyframes`
  0% {
  }
  100% {
    transform: rotate(360deg);
  }
`

export const BackgroundDiv = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -10;
  overflow: hidden;
  background: ${props => props.theme.colors.bg};
  background: linear-gradient(70deg, 
                ${lighten(0.1, 'bg')} 0%,
                ${bg} 100%);
`

export const ParticleDiv = styled.div`
  position: absolute;
  background-color: ${
    props => props.correct
      ? props.theme.colors.particleCorrect
      : props.theme.colors.particleError};
  line-height: 1;
  padding: 1rem;
  text-stroke: black;
  padding-bottom: .2rem;
  color: ${props => props.theme.colors.particleText};
  animation-name: ${rotating}, ${moving};
  animation-iteration-count: infinite, 1;
  animation-fill-mode: forwards;
  animation-timing-function: linear;

`
