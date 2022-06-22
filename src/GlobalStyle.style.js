import { createGlobalStyle } from 'styled-components'
import { base, bg, acc } from 'utils/themeutils'

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
    background: ${bg};
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: ${acc};
    transition: background ease .2s;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: ${acc};
  }

  * {
    scrollbar-color:  ${acc} ${acc};
  }
`

export default GlobalStyle
