import React from 'react'
import PropTypes from 'prop-types'
import * as S from './Handle.style.js'
import useHandle from './useHandle.js'

function Handle ({ min, max, onChange, defaultValue }) {
  const { percent, onmousedown, active } = useHandle(min, max, onChange, defaultValue, 'horizontal')
  return <S.Handle active={active} style={{ left: `${percent * 100}%` }} onMouseDown={onmousedown}/>
}

Handle.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  defaultValue: PropTypes.number.isRequired
}

export { Handle }
