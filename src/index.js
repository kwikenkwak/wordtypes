import { NotifyProvider } from 'utils/notifications'
import React, { useMemo } from 'react'
import GlobalStyle from './GlobalStyle.style.js'
import ReactDOM from 'react-dom/client'
import PropTypes from 'prop-types'

import { CSSTransition, TransitionGroup } from 'react-transition-group'
import styled, { ThemeProvider } from 'styled-components'
import { useSearchParams, Route, Routes, BrowserRouter, useLocation } from 'react-router-dom'

import { baseTheme } from 'themes'
import { BackgroundParticle, useBackground, BackgroundDiv } from 'components/BackgroundParticle'

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

function Pages ({ addParticle }) {
  const location = useLocation()
  const [searchParams] = useSearchParams()
  const unique = useMemo(uuid, [removeTrailing(location.pathname) + searchParams.get('word')])
  return (
  <TransitionGroup>
      <CSSTransition key={unique} unmountOnExit classNames="page" timeout={2000}>
      <Routes location={location}>
      <Route exactPath path="/" element={
        <S.Page>
        <WelcomePage />
        </S.Page>
      }
      />
      <Route path="typer/*" element={
        <S.Page>
        <TyperPage addParticle={addParticle} />
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

Pages.propTypes = {
  addParticle: PropTypes.func.isRequired
}

function App () {
  const { particles, addParticle } = useBackground()
  return (
    <AppDiv>
      <ThemeProvider theme={baseTheme}>
      <NotifyProvider>
        <GlobalStyle />
        <BrowserRouter>
          <Pages addParticle={addParticle}/>
        </BrowserRouter>
        <BackgroundDiv>
          <div>
          { particles.map((args, idx) =>
             <BackgroundParticle key={idx} {...args} />
          )}
          </div>
        </BackgroundDiv>
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
