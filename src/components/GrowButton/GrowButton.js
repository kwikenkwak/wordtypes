import React from 'react'
import PropTypes from 'prop-types'
import * as S from './GrowButton.style.js'

function GrowButton ({ onClick, children }) {
  return <S.GrowButton onClick={onClick}>{children}</S.GrowButton>
}

GrowButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
}

export { GrowButton }
