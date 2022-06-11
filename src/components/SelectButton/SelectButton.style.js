import styled from 'styled-components'
import { base, bg, transDark } from 'utils/themeutils'

export const SelectButton = styled.div`
  position: relative;
  background-color: ${base};
  color: ${bg};
  border-radius: 5px;
  padding: 0 .2em;
  cursor: pointer;
`

export const Floater = styled.div`
  position: absolute;
  display: block;
  z-index: 9999;
  overflow: hidden;
`

export const SelectOptions = styled.div`
  background-color: ${transDark(0.10, 0.30, 'bg')};
  padding: .3em .1em;
  border-radius: 7px;
  overflow: hidden;
`

export const SelectOption = styled.div`
  border-radius: 4px;
  padding: 0 .1em;
  background-color: transparent;
  color: ${base};
  transition: background-color .2s ease, color .2s ease;
  cursor: pointer;

  &:hover {
    background-color: ${base};
    color: ${transDark(0.10, 0.10, 'bg')};
  }

`
