import styled from 'styled-components'
import { transparentize, base } from 'utils/themeutils'

export const TabWindowButton = styled.div`
  flex-grow: 1;
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
    background-color: ${transparentize(0.5, 'acc')};
  }
`

export const TabWindowButtonActive = styled(TabWindowButton)`
  background-color: ${transparentize(0.2, 'acc')};
  &:hover {
    background-color: ${transparentize(0.2, 'acc')};
  }

`
