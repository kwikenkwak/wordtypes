import styled from 'styled-components'

export const FloatingItem = styled.div`
  position: absolute;
  z-index: 1000;
`

export const SortableListItem = styled.div`
  transition: ${props => props.anim ? 'margin .1s ease' : 'none'};
`

export const SortableList = styled.div`
  width: 100%;
`
