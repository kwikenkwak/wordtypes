import styled from 'styled-components'
import { base } from 'utils/themeutils'

export const Definition = styled.div`
  display: flex;
  border-bottom: 1px solid ${base};

  &:last-child {
    border-bottom: none;
  }
`

export const Definitions = styled.div`
  font-size: .5em;
  display: flex;
  flex-direction: column;
`

export const DefType = styled.span`
  font-style: italic;
  margin-right: 1em;
`

export const DefText = styled.span`
`

export const AddInfo = styled.span`
  text-align: center;
  border: 1px solid ${base};
  border-top: none;
`
