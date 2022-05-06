import React from 'react'
import { PropTypes } from 'prop-types'

import './styles/tabwindow.scss'

function TabWindow ({ children, current }) {
  return (
    <div className="tab-window">
      {children.map((child, idx) =>
        (<div key={idx} className="tab-window-tab"
          style={idx === 0 ? { marginLeft: '-' + (current * 100) + '%' } : {}}>
          {child}
        </div>))
      }
    </div>)
}

TabWindow.propTypes = {
  children: PropTypes.array.isRequired,
  current: PropTypes.number.isRequired
}

export { TabWindow }
