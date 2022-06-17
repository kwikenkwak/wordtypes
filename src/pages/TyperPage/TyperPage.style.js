import styled from 'styled-components'
import { bg, base, transDark } from 'utils/themeutils'

export const TyperPage = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: stretch;
  height: 100%;
  padding: 0 15%;
`

export const TyperWindow = styled.div`
  display: flex;
  margin-top: 1em;
  width: 100%;
  flex-grow: 1;
  background-color: ${transDark(0.20, 0.50, 'bg')};
  border-radius: 1em;
  border: solid 1px ${base};
  overflow-y: auto;
  position: relative;
`

export const TyperButtons = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-bottom: 1em;
`

export const TyperWindowTab = styled.div`
  width: 100%;
  overflow: auto;
  position: relative;
`

export const WordTitle = styled.h1`
  margin: 0;
  display: flex;
  background-color: ${base};
  color: ${bg};
  border-bottom: solid 1px ${base};
  justify-content: center;
`

export const WordMeanings = styled.div`
  padding: 1em;
  overflow: auto;
  flex-grow: 1;
  padding-top: .2em;
  position: relative;
`

export const TyperStatsWindow = styled(TyperWindowTab)`
  margin: 1em;
`

export const InfoButton = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 1em;
`

export const TyperWordWindow = styled(TyperWindowTab)`
  display: flex;
  flex-flow: column;
`
