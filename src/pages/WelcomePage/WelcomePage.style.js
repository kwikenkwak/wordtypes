import styled from 'styled-components'

export const WelcomeContent = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
`

export const WelcomeText = styled.p`
  max-width: 50%;
  text-align: center;
`

export const NavButtons = styled.div`
  display: flex;
  width: 50%;
  justify-content: space-between;
`

export const TreesStyle = {
  position: 'absolute',
  left: 100,
  top: 0,
  width: '100%',
  height: '100%',
  zIndex: -3
}
