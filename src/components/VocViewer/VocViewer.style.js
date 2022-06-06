import styled from 'styled-components'
import { base, bg } from 'utils/themeutils'

export const VocContainer = styled.div`
  display: flex;
  flex-flow: column;
  overflow: auto;
  flex-grow: 1;
`

export const VocWordList = styled.div`
  flex-grow: 1;
  border: 1px solid ${base};
  display: flex;
  flex-flow: column;
  overflow: auto;
  padding: 5px;
  background-color: ${bg};
  margin-top: .1em;
`

export const SortOpts = styled.div`
  display: flex;
  align-items: center;
`

export const OptButton = styled.div`
  margin-right: .3em;
`

export const Header = styled.div`
  font-size: 1.5em;
  margin-right: auto;
  text-transform: uppercase;
  width: 100%;
  text-align: center;
`

export const ExpandTrigger = styled.div`
  width: 100%;
  min-height: 10px;
`
