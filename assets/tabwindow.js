import React, { useState, useRef } from 'react'
import { useParams, useNavigate, Route, Routes, useSearchParams } from 'react-router-dom'
import PropTypes from 'prop-types'

import './styles/tabwindow.scss'

function TabWindowButton ({ children, active, onClick }) {
  return <div onClick={onClick} className={ active ? 'tab-window-button tab-window-button-active' : 'tab-window-button'}>
          {children}
         </div>
}

TabWindowButton.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  active: PropTypes.bool.isRequired,
  onClick: PropTypes.func
}

function TabWindowTabs ({ children, start = 0, current = -1 }) {
  const [searchParams] = useSearchParams()
  const currentTab = useRef(start)

  if (current === -1) {
    const paramTab = searchParams.get('tab')
    if (paramTab !== null) currentTab.current = paramTab
  } else {
    currentTab.current = current
  }

  return (<div className="tab-window-tabs">
      {children.map((child, idx) =>
        (<div key={idx} className="tab-window-tab"
          style={idx === 0 ? { marginLeft: '-' + (currentTab.current * 100) + '%' } : {}}>
          {child}
        </div>))
      }
    </div>)
}

TabWindowTabs.propTypes = {
  children: PropTypes.array,
  start: PropTypes.number,
  current: PropTypes.number
}

function TabWindowButtons ({ buttons = [], useUrls }) {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const current = searchParams.get('tab')
  return (
    <div className="tab-window-buttons">
    {buttons.map((button, index) =>
      <TabWindowButton key={index}
      onClick={() => {
        navigate(`./?tab=${index}`)
      }}
        active={current === String(index)} >
      {button}
      </TabWindowButton>
    )}
    </div>)
}

TabWindowButtons.propTypes = {
  buttons: PropTypes.array,
  useUrls: PropTypes.bool.isRequired
}

function TabWindow ({ children, buttons = [], start = 0, current = -1, useUrls = true }) {
  return (
    <div className="tab-window">
    <Routes>
    <Route index element={
      <>
      { buttons.length > 0 && <TabWindowButtons buttons={buttons} useUrls={useUrls}/> }
      <TabWindowTabs start={start} current={current}>
        {children}
      </TabWindowTabs>
      </>
    }
    />
    </Routes>
    </div>
  )
}

TabWindow.propTypes = {
  children: PropTypes.array.isRequired,
  buttons: PropTypes.array,
  start: PropTypes.number,
  current: PropTypes.number,
  useUrls: PropTypes.bool
}

export { TabWindow, TabWindowButton }
