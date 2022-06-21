import React, { useRef } from 'react'
import TabWindowButton from './TabWindowButton'
import TabWindowTabs from './TabWindowTabs'
import { Route, Routes, useSearchParams } from 'react-router-dom'
import PropTypes from 'prop-types'
import * as S from './TabWindow.style.js'

function TabWindowButtons ({ buttons = [] }) {
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
  buttons: PropTypes.array
}

function TabWindowUrls ({ children, buttons = [], start = 0 }) {
  const [searchParams] = useSearchParams()
  const currentTab = useRef(start)

  const paramTab = searchParams.get('tab')
  if (paramTab !== null) currentTab.current = Number(paramTab)

  return (
    <S.TabWindow>
    <Routes>
    <Route path="*" element={
      <>
      { buttons.length > 0 && <TabWindowButtons buttons={buttons}/> }
      <TabWindowTabs start={start} current={currentTab.current}>
        {children}
      </TabWindowTabs>
      </>
    }
    />
    </Routes>
    </S.TabWindow>
  )
}

TabWindowUrls.propTypes = {
  children: PropTypes.array.isRequired,
  buttons: PropTypes.array,
  start: PropTypes.number
}

export { TabWindowUrls as default }
