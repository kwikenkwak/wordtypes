import styled from 'styled-components'
import { base, bg } from 'utils/themeutils'

export const Notifications = styled.div`
  position: absolute;
  bottom: 0;
  display: flex;
  justify-content: center;
  width: 100%;
`

export const Messages = styled.div`
  z-index: 900;
  width: 40%;
`

export const Message = styled.div`
  display: flex;
  justify-content: center;
  transition: transform ease 200ms;
  margin: 3px;

  &.message-enter {
    transform: scale(0);
  }
  &.message-enter-active {
    transform: scale(1);
  }
  &.message-exit {
    transform: scale(1);
  }
  &.message-exit-active {
    transform: scale(0)
  }
`

export const TextMessage = styled.div`
  flex-grow: 0;
  background-color: ${base};
  text-align: center;
  color: ${bg};
  border-radius: 100px;
  font-size: .6em;
  padding: 5px 20px;
`
