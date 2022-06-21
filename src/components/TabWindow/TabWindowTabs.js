import React from 'react'
import PropTypes from 'prop-types'
import * as S from './TabWindow.style.js'

const TabWindowTabs = ({ children, start = 0, current = -1 }) => {
  return (<S.TabWindowTabs>
      {children.map((child, idx) =>
        (<S.TabWindowTab key={idx}
          style={idx === 0 ? { marginLeft: '-' + (current * 100) + '%' } : {}}>
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

export default TabWindowTabs
