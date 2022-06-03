import styled from 'styled-components'
import { transLighten, transparentize, lighten, base, bg } from 'utils/themeutils'

export const TabWindow = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column;
  align-items: start;
  overflow-y: auto;
`

export const TabWindowTabs = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  flex-grow: 1;
  display: flex;
`

export const TabWindowTab = styled.div`
  min-width: 100%;
  height: 100%;
  margin-left: 0;
  transition: margin-left ease 1s;
  display: flex;
`

export const TabWindowButtons = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: .5em;
`

export const TabWindowButton = styled.div`
  flex-grow: 1;
  background-color: ${transparentize(0.9, 'bg')};
  border: solid 1px ${base};
  text-align: center;
  transition: background-color ease .2s;
  cursor: pointer;

  &:first-child {
    border-bottom-left-radius: .5em;
    border-top-left-radius: .5em;
  }
  &:last-child {
    border-bottom-right-radius: .5em;
    border-top-right-radius: .5em;
  }
  &:hover {
    background-color: ${transLighten(0.3, 0.8, 'bg')};
  }
`

export const TabWindowButtonActive = styled(TabWindowButton)`
  background-color: ${transLighten(0.3, 0.6, 'bg')};
  &:hover {
    background-color: ${transLighten(0.3, 0.6, 'bg')};
  }
`
