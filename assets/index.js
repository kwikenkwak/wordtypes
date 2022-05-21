import './styles/background.scss'
import React from 'react'
import ReactDOM from 'react-dom/client'
import PropTypes from 'prop-types'

import { CSSTransition, TransitionGroup } from 'react-transition-group'
import styled, { ThemeProvider } from 'styled-components'
import { Route, Routes, BrowserRouter, useLocation } from 'react-router-dom'

import { baseTheme } from './themes.js'
import { BackgroundParticle, useBackground } from './background'

import { Typer } from './typer.js'
import { StatsViewer } from './stats/statsviewer.js'
import { WelcomePage } from './welcomepage.js'

const AppDiv = styled.div`
  width: 100%;
  height: 100%;
`

function Page ({ children, setPage, isIn }) {
  return (<CSSTransition in={isIn} unmountOnExit classNames="page" timeout={2000}>
    <div className="page">
    { children }
    </div>
    </CSSTransition>)
}

Page.propTypes = {
  children: PropTypes.array.isRequired,
  setPage: PropTypes.func.isRequired,
  isIn: PropTypes.bool.isRequired
}

function Pages ({ addParticle }) {
  const location = useLocation()
  return (
  <TransitionGroup>
      <CSSTransition key={location.key} unmountOnExit classNames="page" timeout={2000}>

      <Routes location={location}>
      <Route exactPath path="/" element={
        <div className="page">
        <WelcomePage />
        </div>
      }
      />
      <Route path="/typer" element={
        <div className="page">
        <Typer addParticle={addParticle} />
        </div>}
      />
      <Route path="/stats" element={
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
