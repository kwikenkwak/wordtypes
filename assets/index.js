import './styles/background.scss'
// import './styles/reset.css'
import React, { useMemo } from 'react'
import ReactDOM from 'react-dom/client'
import PropTypes from 'prop-types'

import { CSSTransition, TransitionGroup } from 'react-transition-group'
import styled, { ThemeProvider } from 'styled-components'
import { useSearchParams, Route, Routes, BrowserRouter, useLocation } from 'react-router-dom'

import { baseTheme } from './themes.js'
import { BackgroundParticle, useBackground } from './background'

import { Typer } from './typer.js'
import { StatsViewer } from './stats/statsviewer.js'
import { WelcomePage } from './welcomepage.js'
import uuid from 'uuid'

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
        <div className="page">
        <WelcomePage />
        </div>
      }
      />
      <Route path="typer/*" element={
        <div className="page">
        <Typer addParticle={addParticle} />
        </div>}
      />
      <Route path='stats/*' element={
        <div className="page">
        <StatsViewer />
        </div>}
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
        <BrowserRouter>
          <Pages addParticle={addParticle}/>
        </BrowserRouter>
        <div className="background">
          <div className="particles">
          { particles.map((args, idx) =>
             <BackgroundParticle key={idx} {...args} />
          )}
          </div>
        </div>
      </ThemeProvider>
    </AppDiv>
  )
}

const container = document.getElementById('root')
const root = ReactDOM.createRoot(container)

root.render(
  <App />
)
