import React from 'react'
import useTheme from 'hooks/useTheme'
import PropTypes from 'prop-types'

function Icon ({ size = '1em', src, className = '' }) {
  const theme = useTheme()
  return <img className={className} src={src} style={{
    width: size,
    height: 'auto',
    filter: theme.icons.iconfilter,
    opacity: theme.icons.iconopacity
  }}/>
}

Icon.propTypes = {
  size: PropTypes.string,
  src: PropTypes.string.isRequired,
  className: PropTypes.string
}

export { Icon }
