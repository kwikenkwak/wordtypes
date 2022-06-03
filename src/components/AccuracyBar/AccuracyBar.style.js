import styled from 'styled-components'
import { darken, base } from 'utils/themeutils'

export const AccuracyBarDiv = styled.div`
  width: 100%;
  height: 10px;
  display: flex;
`

export const AccuracyBarSection = styled.div`
  height: 10px;
`

export const AccuracyBarSectionCorrect = styled(AccuracyBarSection)`
  background-color: ${base};
`

export const AccuracyBarSectionError = styled(AccuracyBarSection)`
  background-color: ${darken(0.3, 'bg')};
`
