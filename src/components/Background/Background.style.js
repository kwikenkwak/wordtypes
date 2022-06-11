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
