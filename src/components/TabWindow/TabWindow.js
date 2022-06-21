import React from 'react'
import PropTypes from 'prop-types'
import TabWindowUrls from './TabWindowUrls'
import TabWindowNoUrls from './TabWindowNoUrls'

const TabWindow = ({ children, buttons = [], start, current = -1, useUrls = false }) => {
  return useUrls
    ? <TabWindowUrls start={start} buttons={buttons} current={current}>{children}</TabWindowUrls>
    : <TabWindowNoUrls start={start} buttons={buttons} current={current}>{children}</TabWindowNoUrls>
}

TabWindow.propTypes = {
  children: PropTypes.array.isRequired,
  buttons: PropTypes.array,
  start: PropTypes.number,
  useUrls: PropTypes.bool,
  current: PropTypes.number
}

export { TabWindow }
