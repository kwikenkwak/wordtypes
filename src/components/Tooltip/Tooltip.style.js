import styled from 'styled-components'
import { base, transDark } from 'utils/themeutils'

export const Tooltip = styled.div`
  position: fixed;
  z-index: 999;
  background-color: ${transDark(0.2, 0.1, 'bg')};
  color: ${base};
  border: solid 1px ${base};
  padding: 1em;
  font-size: .5em;
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
