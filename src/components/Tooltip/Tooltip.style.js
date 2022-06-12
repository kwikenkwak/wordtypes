import styled from 'styled-components'
import { base, transDark } from 'utils/themeutils'

export const Tooltip = styled.div`
  position: fixed;
  z-index: 999;
  max-width: 20vw;
  transition: opacity 200ms;

  opacity: ${({ state }) => {
    switch (state) {
      case 'entering':
      case 'entered':
        return 1
      case 'exiting':
      case 'exited':
        return 0
    }
    }
  }
`

export const TextTooltip = styled.div`
  background-color: ${transDark(0.2, 0.1, 'bg')};
  color: ${base};
  border: solid 1px ${base};
  padding: .4em;
  font-size: .5em;

`

export const Arrow = styled.div`
  border-left: solid 10px transparent;
  border-right: solid 10px transparent;
  border-bottom: solid 10px ${base};
  display: block;
  width: 0;
  height: 0;
`
