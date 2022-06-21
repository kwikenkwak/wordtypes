import styled, { keyframes } from 'styled-components'

export const Page = styled.div`
  min-width: 100%;
  max-width: 100%;
  height: 100%;
  transition: left ease 2s;
  position: absolute;
  left: 0px;

  &.page-enter {
    left: 110%;
  }

  &.page-enter-active {
    left: 0px;
  }

  &.page-exit {
    left: 0px;
  }

  &.page-exit-active {
    left: -110%;
  }
`

export const PageFrames = keyframes`
  0% {
    left: 110%;
  }
  100% {
    left: 0px;
  }
`
