import React from 'react'
import PropTypes from 'prop-types'

function SemiTypedString ({ string, progress, cursor }) {
  return (<>
      <span className="text-typed">
      {string.substr(0, progress)}
      </span>
      {cursor && <span className="fake-cursor"></span>}
      <span className="text-not-typed">
      {string.substr(progress)}
      </span>
    </>)
}

SemiTypedString.propTypes = {
  string: PropTypes.string.isRequired,
  progress: PropTypes.number.isRequired,
  cursor: PropTypes.bool.isRequired
}

export { SemiTypedString }
