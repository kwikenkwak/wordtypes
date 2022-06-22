import styled from 'styled-components'
import { base, bg, acc } from 'utils/themeutils'

export const NavButton = styled.div`
  display: flex;
  flex-flow: column;

  background-color: ${bg};
  border: ${bg} solid 3px;
  transition: background-color ease .5s;
  border-radius: 5px;
  padding: 0 1em;
  padding-bottom: .3em;
  flex-grow: 0;
  align-items: center;
  justify-content: space-around;
  cursor: pointer;

  &:hover {
    background-color: ${acc};
  }
`

export const FloatingNavButton = styled.div`
  position: absolute;
  width: 4em;
  height: 4em;
  right: 1em;
  bottom: 1em;
  opacity: .6;
  font-size: .7em;

  display: flex;
  flex-flow: column;
  border: solid 1px ${base};
  border-radius: 5px;
  padding: .5em;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  background-color: ${bg};
  transition: background-color .2s ease;
  &:hover {
    background-color: ${acc};
  }
`
