import styled, { keyframes } from 'styled-components'

export const fadeIn = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`

export const Fader = styled.div`
  animation: ${fadeIn} 0.5s ease-in-out;
  animation-delay: 0.5s;
  transition: opacity 0.5s ease-in-out, transform 1s ease-in-out;
  animation-fill-mode: forwards;

  opacity: 0;
`

export const WelcomeContent = styled(Fader)`
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  `

export const WelcomeText = styled.p`
  max-width: 50%;
  text-align: center;
`

export const NavButtons = styled(Fader)`
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
