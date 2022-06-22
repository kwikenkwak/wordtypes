import styled, { keyframes } from 'styled-components'
import { bgBrightness } from 'utils/themeutils'

const fade = (props) => keyframes`
  0% {
    filter: brightness(100%);
  }
  100% {
    filter: brightness(${bgBrightness(props)});
  }
`

export const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -10;
  overflow: hidden;
  animation: ${props => fade(props)} 1s ease-in-out 1;
  animation-delay: 0.5s;
  animation-fill-mode: forwards;
`

// We make sure the image keeps its aspect ratio
export const BackgroundImage = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -10;
`
