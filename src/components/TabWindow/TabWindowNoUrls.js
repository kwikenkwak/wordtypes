import React, { useState } from 'react'
import PropTypes from 'prop-types'
import * as S from './TabWindow.style.js'
import TabWindowButton from './TabWindowButton'
import TabWindowTabs from './TabWindowTabs'

const TabWindowNoUrls = ({ children, buttons, start, current }) => {
  const [currentTab, setCurrentTab] = useState(start)
  if (current !== -1 && currentTab !== current) {
    setCurrentTab(current)
  }
  return (
    <S.TabWindow >
    {buttons.length > 0 && (
    <S.TabWindowButtons>
    {buttons.map((button, index) =>
      <TabWindowButton key={index}
      onClick={() => {
        setCurrentTab(index)
      }}
        active={currentTab === index} >
      {button}
      </TabWindowButton>
    )}
      </S.TabWindowButtons>
    )}
    <TabWindowTabs start={start} current={currentTab}>
    {children}
    </TabWindowTabs>
    </S.TabWindow>
  )
}

TabWindowNoUrls.propTypes = {
  children: PropTypes.array.isRequired,
  buttons: PropTypes.array,
  start: PropTypes.number,
  current: PropTypes.number
}

export { TabWindowNoUrls as default }
