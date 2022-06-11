import React, { useRef } from 'react'
import { Route, Routes, useSearchParams } from 'react-router-dom'
import PropTypes from 'prop-types'
import * as S from './TabWindow.style.js'

function TabWindowButton ({ children, active, onClick }) {
  return active
    ? <S.TabWindowButtonActive onClick={onClick}>
          {children}
      </S.TabWindowButtonActive>
    : <S.TabWindowButton onClick={onClick}>
          {children}
      </S.TabWindowButton>
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
    if (paramTab !== null) currentTab.current = Number(paramTab)
  } else {
    currentTab.current = current
  }

  return (<S.TabWindowTabs>
      {children.map((child, idx) =>
        (<S.TabWindowTab key={idx}
          style={idx === 0 ? { marginLeft: '-' + (currentTab.current * 100) + '%' } : {}}>
          {child}
        </S.TabWindowTab>))
      }
    </S.TabWindowTabs>)
}

TabWindowTabs.propTypes = {
  children: PropTypes.array,
  start: PropTypes.number,
  current: PropTypes.number
}

function TabWindowButtons ({ buttons = [], useUrls }) {
  const [searchParams, setSearchParams] = useSearchParams()
  const current = searchParams.get('tab')
  return (
    <S.TabWindowButtons>
    {buttons.map((button, index) =>
      <TabWindowButton key={index}
      onClick={() => {
        searchParams.set('tab', String(index))
        setSearchParams(searchParams)
      }}
        active={current === String(index)} >
      {button}
      </TabWindowButton>
    )}
    </S.TabWindowButtons>)
}

TabWindowButtons.propTypes = {
  buttons: PropTypes.array,
  useUrls: PropTypes.bool.isRequired
}

function TabWindow ({ children, buttons = [], start = 0, current = -1, useUrls = true }) {
  return (
    <S.TabWindow>
    <Routes>
    <Route path="*" element={
      <>
      { buttons.length > 0 && <TabWindowButtons buttons={buttons} useUrls={useUrls}/> }
      <TabWindowTabs start={start} current={current}>
        {children}
      </TabWindowTabs>
      </>
    }
    />
    </Routes>
    </S.TabWindow>
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
