import styled from 'styled-components'
import { darken, base } from 'utils/themeutils'

export const ProgressBar = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`

export const ProgressBarLine = styled.div`
  height: 10px;
  background-color: ${darken(0.10, 'bg')};
  position: relative;
`

export const ProgressBarLineCompleted = styled.div`
  height: 10px;
  background-color: ${base};
`

export const ProgressBarText = styled.span`
  color: $base-color;
  font-size: .5em;
`
