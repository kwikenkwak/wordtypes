import './styles/background.scss'
import React, { useState, useRef } from 'react'
import ReactDOM from 'react-dom/client'
import PropTypes from 'prop-types'

import { CSSTransition } from 'react-transition-group'
import styled, { ThemeProvider } from 'styled-components'

import { baseTheme } from './themes.js'

import { Typer } from './typer.js'
import { StatsViewer } from './stats/statsviewer.js'
import { Background } from './background.js'
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

function App () {
  const [page, setPage] = useState('welcome')
  const background = useRef(null)

  return (
    <AppDiv>
    <ThemeProvider theme={baseTheme}>
    <Background ref={background}/>
    <Page setPage={setPage} isIn={page === 'welcome'}>
      <WelcomePage jumpPage={setPage}/>
    </Page>
    <Page setPage={setPage} isIn={page === 'typer'}>
      { page === 'typer' && <Typer jumpPage={setPage} background={background.current}/> }
    </Page>
    <Page setPage={setPage} isIn={page === 'stats'}>
      <StatsViewer jumpPage={setPage} />
    </Page>
    </ThemeProvider>
    </AppDiv>
  )
}

const container = document.getElementById('root')
const root = ReactDOM.createRoot(container)

root.render(
  <App />
)
