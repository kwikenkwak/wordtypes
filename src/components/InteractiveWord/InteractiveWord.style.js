import styled from 'styled-components'

export const Word = styled.span`
  text-decoration: ${props => props.active ? `underline 3px ${props.theme.colors.base}` : 'none'};
  cursor: pointer;
`
