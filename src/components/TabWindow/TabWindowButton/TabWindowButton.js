import React from 'react'
import PropTypes from 'prop-types'
import * as S from './TabWindowButton.style.js'
export const TabWindowButton = ({ children, active, onClick }) => {
  return active
    ? <S.TabWindowButtonActive onClick={onClick}>
          {children}
      </S.TabWindowButtonActive>
    : <S.TabWindowButton onClick={onClick}>
          {children}
      </S.TabWindowButton>
}

TabWindowButton.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  active: PropTypes.bool.isRequired,
  onClick: PropTypes.func
}
