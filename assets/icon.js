import React from 'react'
import PropTypes from 'prop-types'

function Icon ({ size = '1em', src }) {
  return <img src={src} style={{ width: size, height: 'auto' }}/>
}

Icon.propTypes = {
  size: PropTypes.string,
  src: PropTypes.string
}

export { Icon }
