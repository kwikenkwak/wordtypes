import './styles/background.scss'
import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom/client'

import { CSSTransition, TransitionGroup } from 'react-transition-group'

import { Typer } from './typer.js'
import uuid from 'uuid'
import { StatsViewer } from './statsviewer.js'
import { Background } from './background.js'

function WelcomePage ({ jumpPage }) {
  return (<>
          <h1>Welcome to DictionaryTyper</h1>
          <p>Dolor consectetur odio aliquam dignissimos?</p>
    <button onClick={() => jumpPage('stats')}>Stats</button>
    <button onClick={() => jumpPage('typer')}>START</button>

    </>)
}

WelcomePage.propTypes = {
  jumpPage: PropTypes.func.isRequired
}

function HomePage () {
  const [items, setItems] = useState([{ id: uuid(), page: 'welcome' }])
  const background = useRef(null)

  const jumpPage = page => {
    setItems([{ id: uuid(), page: page }])
  }

  return (
    <>
    <Background amount={100} ref={background}/>
    <TransitionGroup className="page-wrapper">
      {items.map(({ id, page }) =>
    <CSSTransition key={id} unmountOnExit classNames="page" timeout={2000}>
        <div className="page">
        {page === 'welcome' && <WelcomePage jumpPage={jumpPage}/>}
        {page === 'typer' && <Typer jumpPage={jumpPage} background={background.current}/>}
        {page === 'stats' && <StatsViewer jumpPage={jumpPage} />}
        </div>
    </CSSTransition>
      )}
    </TransitionGroup>
    </>
  )
}

const container = document.getElementById('root')
const root = ReactDOM.createRoot(container)

root.render(
  <HomePage />
)
