import { NotifyProvider } from 'utils/notifications'
import React from 'react'
import GlobalStyle from './GlobalStyle.style.js'
import ReactDOM from 'react-dom/client'
import Settings from 'components/Settings'

import Pages from 'components/Pages'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { baseTheme } from 'themes'
import { BackgroundProvider } from 'utils/background'

import * as S from './index.style.js'

function App () {
  return (
    <S.AppDiv>
      <ThemeProvider theme={baseTheme}>
      <NotifyProvider>
      <BackgroundProvider>
        <GlobalStyle />
        <BrowserRouter>
          <Pages />
        </BrowserRouter>
        <Settings />
      </BackgroundProvider>
      </NotifyProvider>
      </ThemeProvider>
    </S.AppDiv>
  )
}

const container = document.getElementById('root')
const root = ReactDOM.createRoot(container)

root.render(
  <App />
)
