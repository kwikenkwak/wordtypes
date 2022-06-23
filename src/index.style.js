import styled from 'styled-components'

export const AppDiv = styled.div`
  width: 100%;
  height: 100%;
`

// Show github link icon in the top left corner
export const Github = styled.a`
  position: absolute;
  top: .5em;
  left: .5em;
  transition: transform .2s ease-in-out;
  &:hover {
    transform: scale(1.2);
  }
`
