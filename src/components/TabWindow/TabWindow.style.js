import styled from 'styled-components'

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
