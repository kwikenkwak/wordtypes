import { createGlobalStyle } from 'styled-components'
import { base, darken, lighten } from 'utils/themeutils'

const GlobalStyle = createGlobalStyle`
  html, body { 
    margin: 0;
    height: 100%;
    color: ${base};
    overflow: hidden;
  }

  body {
    display: flex;
    align-items: stretch;
    font-family: 'Teko', sans-serif;
    font-size: 2em;
  }

  ::-webkit-scrollbar {
    width: 10px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: ${darken(0.10, 'bg')};
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: ${lighten(0.10, 'bg')};
    transition: background ease .2s;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: ${lighten(0.15, 'bg')};
  }

  * {
    scrollbar-color:  ${lighten(0.10, 'bg')} ${lighten(0.50, 'bg')};
  }
`

export default GlobalStyle
