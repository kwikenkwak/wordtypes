import styled, { keyframes } from 'styled-components'

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
