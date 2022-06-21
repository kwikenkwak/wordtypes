import styled from 'styled-components'
import { transLighten, transparentize, base } from 'utils/themeutils'

export const TabWindowButton = styled.div`
  flex-grow: 1;
  background-color: ${transparentize(0.9, 'bg')};
  border: solid 1px ${base};
  text-align: center;
  transition: background-color ease .2s;
  cursor: pointer;

  &:first-child {
    border-bottom-left-radius: .5em;
    border-top-left-radius: .5em;
  }
  &:last-child {
    border-bottom-right-radius: .5em;
    border-top-right-radius: .5em;
  }
  &:hover {
    background-color: ${transLighten(0.3, 0.8, 'bg')};
  }
`

export const TabWindowButtonActive = styled(TabWindowButton)`
  background-color: ${transLighten(0.3, 0.6, 'bg')};
  &:hover {
    background-color: ${transLighten(0.3, 0.6, 'bg')};
  }
`
