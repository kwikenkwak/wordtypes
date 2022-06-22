import styled from 'styled-components'
import { base, transparentize } from 'utils/themeutils'

export const CustomTooltip = styled.div`
  background-color: ${transparentize(0.2, 'acc')};
  border: solid 1px ${base};
  border-radius: .3em;
  display: flex;
  flex-flow: column;
  align-items: center;
  padding: .3em;
`

export const TooltipTitle = styled.span`
  font-size: 2em;
`

export const TooltipDescription = styled.span`
  font-size: .5em;
  color: ${base};
`
