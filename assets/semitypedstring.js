import React from 'react'
import PropTypes from 'prop-types'
import { Icon } from './icon.js'

function SemiTypedString ({ string, progress, cursor, isEnter = false }) {
  return (<>
      <span className="text-typed">
      {string.substr(0, progress)}
      </span>
      {cursor && <span className="fake-cursor"></span>}
      <span className="text-not-typed">
      {string.substr(progress)}
      </span>
      { isEnter && cursor && <Icon size='1em' src={enterIconUrl} /> }
    </>)
}

SemiTypedString.propTypes = {
  string: PropTypes.string.isRequired,
  progress: PropTypes.number.isRequired,
  cursor: PropTypes.bool.isRequired,
  isEnter: PropTypes.bool
}

export { SemiTypedString }
