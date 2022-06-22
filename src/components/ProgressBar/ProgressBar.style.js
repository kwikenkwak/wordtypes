import styled from 'styled-components'
import { base, acc } from 'utils/themeutils'

export const ProgressBar = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`

export const ProgressBarLine = styled.div`
  height: 10px;
  background-color: ${acc};
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
