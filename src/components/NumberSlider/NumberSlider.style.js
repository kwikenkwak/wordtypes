import styled from 'styled-components'
import { base } from 'utils/themeutils'

export const NumberSlider = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  width: 100%;
  height: .4em;
  margin: .3em 0;
  background-color: ${base};
  border-radius: 1em;
`

export const Handles = styled.div`
  position: relative;
  width: calc(100% - 1em);
  height: 100%;
  display: flex;
  align-items: center;
`
