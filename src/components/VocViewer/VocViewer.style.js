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

// Position the sessionviewer absolute
// in the center of the tab with
// a margin of 2em from the sides
export const SessionViewer = styled.div`
  flex-grow: 1;
  padding: 2em;
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

// Wrapper that makes sure the SessionViewer can
// properly render is also animated to
// grow when opened
export const SessionViewerWrapper = styled.div`
  position: absolute;
  overflow: hidden;
  font-size: 0.7em;
  width: 70%;
  height: 70%;
  top: 15%;
  left: 15%;
  background-color: ${bg};
  z-index: 5;
  border-radius: .5em;
  transition: transform .3s ease-in-out;
  display: flex;
  flex-direction: column;
  border: 1px solid ${base};

  &.grow-enter {
    transform: scale(0);
  }

  &.grow-enter-active {
    transform: scale(1);
  }

  &.grow-exit {
    transform: scale(1);
  }

  &.grow-exit-active {
    transform: scale(0);
  }
`

export const CloseWrapper = styled.div`
  position: absolute;
  left: .3em;
  top: .3em;
  z-index: 5;
`
