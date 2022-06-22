import styled from 'styled-components'
import { base, transparentize } from 'utils/themeutils'

// Absolute display the settings tab in the
// bottom right corner of the screen
// with a margin of 5em from the border
// of the screen
export const Settings = styled.div`
  position: absolute;
  bottom: 1em;
  left: 1em;
  display: flex;
  z-index: 5;
  transition: opacity 300ms ease-in, transform 300ms ease-in;
  transform-origin: bottom left;

  &.fade-enter {
    transform: scale(0);
    opacity: 0;
  }
  &.fade-enter-active {
    transform: scale(1);
    opacity: 1;
  }
  &.fade-exit {
    transform: scale(1);
    opacity: 1;
  }
  &.fade-exit-active {
    transform: scale(0);
    opacity: 0;
  }
`

export const CloseButton = styled.div`
  position: absolute;
  top: .1em;
  left: .1em;
`

// Contain the settings in a nice background
// with a border with the base color
// and a darkened background color
export const SettingsContainer = styled.div`
  padding: 1em;
  border: 1px solid ${base};
  background-color: ${transparentize(0.5, 'bg')};

  display: flex;
  flex-direction: column;
  width: 30vw;
  height: 30vh;
  overflow-y: auto;
  overflow-x: hidden;
`

// Set a small border to separate
// the different settings
export const Setting = styled.div`
  border-bottom: 1px solid ${base};

  &:last-child {
    border-bottom: none;
  }
`
