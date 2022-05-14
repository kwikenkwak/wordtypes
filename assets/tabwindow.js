import React, { useState } from 'react'
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

function TabWindow ({ children, buttons = [], start = 0, current = -1 }) {
  const [slideCurrent, setSlideCurrent] = useState(start)
  if (current >= 0 && slideCurrent !== current) setSlideCurrent(current)
  return (
    <div className="tab-window">
    { buttons.length > 0 &&
    <div className="tab-window-buttons">
    {buttons.map((button, index) =>
      <TabWindowButton key={index}
        onClick={() => setSlideCurrent(index)}
        active={slideCurrent === index} >
      {button}
      </TabWindowButton>
    )}
    </div>}

    <div className="tab-window-tabs">
      {children.map((child, idx) =>
        (<div key={idx} className="tab-window-tab"
          style={idx === 0 ? { marginLeft: '-' + (slideCurrent * 100) + '%' } : {}}>
          {child}
        </div>))
      }
    </div>
    </div>
  )
}

TabWindow.propTypes = {
  children: PropTypes.array.isRequired,
  buttons: PropTypes.array,
  start: PropTypes.number,
  current: PropTypes.number
}

export { TabWindow, TabWindowButton }
