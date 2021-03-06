import styled from 'styled-components'
import { acc } from 'utils/themeutils'

export const Handle = styled.div`
  width: 1em;
  height: 1em;
  border-radius: 20em;
  background-color: ${acc};
  transition: transform ease 200ms;
  position: absolute;
  margin-left: -.5em;
  cursor: pointer;

  &:hover {
    transform: scale(1.2);
  }

  transform: ${({ active }) => active
  ? 'scale(1.2)'
: 'none'};
`
