import React from 'react'
import PropTypes from 'prop-types'

function Icon ({ size = '1em', src, className = '' }) {
  return <img className={className} src={src} style={{ width: size, height: 'auto' }}/>
}

Icon.propTypes = {
  size: PropTypes.string,
  src: PropTypes.string,
  className: PropTypes.string
}

export { Icon }
