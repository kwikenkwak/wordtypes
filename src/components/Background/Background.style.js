import styled from 'styled-components'
import { lighten, bg } from 'utils/themeutils'

export const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -10;
  overflow: hidden;
  background: ${bg};
  background: linear-gradient(70deg, 
                ${lighten(0.1, 'bg')} 0%,
                ${bg} 100%);
`

// We make sure the image keeps its aspect ratio
export const BackgroundImage = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -10;
`
