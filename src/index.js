import { NotifyProvider } from 'utils/notifications'
import React from 'react'
import GlobalStyle from './GlobalStyle.style.js'
import ReactDOM from 'react-dom/client'
import Settings from 'components/Settings'

import Pages from 'components/Pages'
import Icon from 'components/Icon'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import useTheme from 'hooks/useTheme'
import { BackgroundProvider } from 'utils/background'
import urls from 'utils/asseturls'

import * as S from './index.style.js'

const GithubLink = 'http://www.github.com/kwikenkwak/wordtypes'

function App () {
  const theme = useTheme()
  return (
    <S.AppDiv>
      <ThemeProvider theme={theme}>
      <NotifyProvider>
      <BackgroundProvider>
        <GlobalStyle />
        <BrowserRouter>
          <Pages />
        </BrowserRouter>
        <Settings />
        <S.Github href={GithubLink}>
          <Icon src={urls.github} />
        </S.Github>
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
