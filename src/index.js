import { NotifyProvider } from 'utils/notifications'
import React, { useMemo } from 'react'
import GlobalStyle from './GlobalStyle.style.js'
import ReactDOM from 'react-dom/client'
import Settings from 'components/Settings'

import { CSSTransition, TransitionGroup } from 'react-transition-group'
import styled, { ThemeProvider } from 'styled-components'
import { useSearchParams, Route, Routes, BrowserRouter, useLocation } from 'react-router-dom'

import { baseTheme } from 'themes'
import { BackgroundProvider } from 'utils/background'

import TyperPage from 'pages/TyperPage'
import StatsPage from 'pages/StatsPage'
import WelcomePage from 'pages/WelcomePage'
import QueuePage from 'pages/QueuePage'
import * as S from './index.style.js'
import { v4 as uuid } from 'uuid'

const AppDiv = styled.div`
  width: 100%;
  height: 100%;
`

function removeTrailing (path) {
  return path[path.length - 1] !== '/' ? path : path.substr(0, path.length - 1)
}

function Pages () {
  const location = useLocation()
  const [searchParams] = useSearchParams()
  const unique = useMemo(uuid, [removeTrailing(location.pathname) + searchParams.get('word')])
  return (
  <TransitionGroup>
      <CSSTransition key={unique} unmountOnExit classNames="page" timeout={2000}>
      <Routes location={location}>
      <Route exact path="/" element={
        <S.Page>
        <WelcomePage />
        </S.Page>
      }
      />
      <Route path="typer/*" element={
        <S.Page>
        <TyperPage />
        </S.Page>}
      />
      <Route path='stats/*' element={
        <S.Page>
        <StatsPage />
        </S.Page>}
      />
      <Route path='queue/*' element={
        <S.Page>
        <QueuePage />
        </S.Page>}
      />

      </Routes>
      </CSSTransition>
      </TransitionGroup>
  )
}

function App () {
  return (
    <AppDiv>
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
    </AppDiv>
  )
}

const container = document.getElementById('root')
const root = ReactDOM.createRoot(container)

root.render(
  <App />
)
