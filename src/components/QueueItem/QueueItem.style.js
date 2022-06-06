import styled from 'styled-components'

// For styling any nested component, Overlay use the styled method.
// This method works perfectly on all of your any third-party component, as long as they attach the passed className prop to a DOM element.
// Here an example: https://gist.github.com/Miniplop/80b042d1b44293329ef7332fd47b770c

// Nested component imports

export const QueueItem = styled.div`
  padding: 0 11.95px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 2px solid ${props => props.theme.colors.base};
`
export const WordPart = styled.div`
  display: flex;
  align-items: center;
`
export const Word = styled.p`
  font-family: "Teko";
  font-size: 38px;
  font-weight: 400;
  line-height: 1;
  color: ${props => props.theme.colors.base};
  margin: 0px;
  margin-right: 8px;
  margin-top: 4px;
`

export const IconWrapper = styled.div`
  cursor: pointer;
`
