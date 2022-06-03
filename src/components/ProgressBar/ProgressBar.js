import React from 'react'
import PropTypes from 'prop-types'
import * as S from './ProgressBar.style.js'

function ProgressBar ({ progress, width = '100%' }) {
  return (
    <S.ProgressBar>
      <S.ProgressBarLine style={{ width: width }}>
        <S.ProgressBarLineCompleted
          style={{ width: Math.min(progress, 100) + '%' }}/>
      </S.ProgressBarLine>
      <S.ProgressBarText>
        {progress + '%'}
      </S.ProgressBarText>
    </S.ProgressBar>)
}

ProgressBar.propTypes = {
  progress: PropTypes.number.isRequired,
  width: PropTypes.string
}

export { ProgressBar }
