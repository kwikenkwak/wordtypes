import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import * as S from './NumberSlider.style.js'
import Handle from 'components/NumberSlider/Handle'

function NumberSlider ({ handles, min, max, onChange, defaults }) {
  const vals = useRef(defaults)
  const updateValue = (idx, value) => {
    vals.current[idx] = value
    onChange([...vals.current])
  }
  return (
    <S.NumberSlider>
      <S.Handles>
    {[...Array(handles)].map((value, idx) =>
      <Handle key={idx} min={min} max={max}
      onChange={updateValue.bind(null, idx)} defaultValue={defaults[idx]} />
    )}
      </S.Handles>
    </S.NumberSlider>
  )
}

NumberSlider.propTypes = {
  handles: PropTypes.number.isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  defaults: PropTypes.array.isRequired
}

export { NumberSlider }
