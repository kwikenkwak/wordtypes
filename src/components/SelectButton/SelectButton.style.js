import styled from 'styled-components'
import { base, bg, darken, transDark } from 'utils/themeutils'

export const SelectButton = styled.div`
  position: relative;
  background-color: ${base};
  color: ${bg};
  border-radius: 5px;
  padding: 0 .2em;
  cursor: pointer;
`

export const SelectOptions = styled.div`
  background-color: ${transDark(0.10, 0.30, 'bg')};
  position: absolute;
  z-index: 9999;
  overflow: hidden;
  display: inline-block;
  padding: .3em .1em;
  border-radius: 7px;
`

export const SelectOption = styled.div`
  border-radius: 4px;
  padding: 0 .1em;
  background-color: transparent;
  color: ${base};
  transition: background-color .2s ease, color .2s ease, margin-top .1s ease;
  cursor: pointer;

  &:hover {
    background-color: ${base};
    color: ${transDark(0.10, 0.10, 'bg')};
  }

  &:first-child {
    margin-top: ${props => {
          const margins = {
                  exited: '-150%',
                  entering: '0px',
                  entered: '0px',
                  exiting: '-150%'
                  }
        return margins[props.animState]
      }}
    }
`
