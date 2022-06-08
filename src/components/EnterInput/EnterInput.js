import React, { useState } from 'react'
import PropTypes from 'prop-types'
import StyledInput from 'components/StyledInput'

function EnterInput (props) {
  const [value, setValue] = useState('')
  const { onEnter, ...otherProps } = props
  const onKeyPress = (e) => {
    if (e.key === 'Enter') {
      onEnter(e.target.value)
      setValue('')
    }
  }
  return <StyledInput onKeyPress={onKeyPress} {...otherProps}
          value={value} onChange={(e) => setValue(e.target.value)}/>
}

EnterInput.propTypes = {
  onEnter: PropTypes.func.isRequired
}

export { EnterInput }
