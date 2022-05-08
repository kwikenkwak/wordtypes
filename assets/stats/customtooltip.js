import React from 'react'
import PropTypes from 'prop-types'

import '../styles/customtooltip.scss'

function CustomTooltip ({ active, payload, label, createText = null }) {
  if (active && payload && payload.length) {
    const value = payload[0].value
    const [title, description] = createText ? createText(value, label) : [value, value]
    return (
      <div className="custom-tooltip">
        <span className="tooltip-title">{title}</span>
        <span className="tooltip-description">{description}</span>
      </div>
    )
  }
  return null
};

CustomTooltip.propTypes = {
  active: PropTypes.bool,
  payload: PropTypes.array,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  createText: PropTypes.func
}

export { CustomTooltip }
