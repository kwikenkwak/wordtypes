import styled from 'styled-components'
import { base, transparentize } from 'utils/themeutils'

export const Meaning = styled.div`
  border-bottom: solid 3px ${base};
  &:last-child {
    border-bottom: none;
  }
`

export const MeaningDefinition = styled.div`
  display: flex;
  align-items: flex-start;
`
export const MeaningExamples = MeaningDefinition

export const MeaningDefinitionHeader = styled.span`
    font-style: italic;
`

export const MeaningExamplesHeader = styled(MeaningDefinitionHeader)`
  padding-top: .5em;
`

export const MeaningDefinitionContent = styled.div`
  flex-grow: 1;
  border-left: solid 1px ${transparentize(0.8, 'base')};
  margin-left: .3em;
  padding-left: .3em;
`

export const MeaningExamplesContent = styled(MeaningDefinitionContent)`
  padding-top: .5em;
`

export const MeaningType = styled.div`
  text-transform: capitalize;
  border-bottom: solid 1px ${base};
  line-height: .8;
  margin-top: .6em;
`

export const MeaningTypeText = styled.span`
  font-style: italic;
`
