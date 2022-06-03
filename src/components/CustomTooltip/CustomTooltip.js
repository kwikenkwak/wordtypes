import React from 'react'
import PropTypes from 'prop-types'
import * as S from './CustomTooltip.style.js'

function CustomTooltip ({ active, payload, label, createText = null }) {
  if (active && payload && payload.length) {
    const value = payload[0].value
    const [title, description] = createText ? createText(value, label, payload) : [value, value]
    return (
      <S.CustomTooltip>
        <S.TooltipTitle>{title}</S.TooltipTitle>
        <S.TooltipDescription>{description}</S.TooltipDescription>
      </S.CustomTooltip>
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
