import React, { useState, useEffect } from 'react'
import progressBarStyles from './styles/progressbar.scss'
import PropTypes from 'prop-types'

function ProgressBar ({ progress, width = '100%' }) {
  return (
    <div className="progressbar-wrapper">
    <div className="progressbar" style={{ width: width }}>
         <div className="progressbar-completed" style={{ width: Math.min(progress, 100) + '%' }}/>
    </div>
    <span className="progressbar-text">{progress + '%'}</span>
    </div>)
}

ProgressBar.propTypes = {
  progress: PropTypes.number.isRequired,
  width: PropTypes.string
}

export { ProgressBar }
