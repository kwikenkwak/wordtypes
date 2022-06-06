import React, { useState } from 'react'
import PropTypes from 'prop-types'
import StyledInput from 'components/StyledInput'

function EnterInput (props) {
  const [value, setValue] = useState('')
  const onKeyPress = (e) => {
    if (e.key === 'Enter') {
      props.onEnter(e.target.value)
      setValue('')
    }
  }
  return <StyledInput onKeyPress={onKeyPress} {...props}
          value={value} onChange={(e) => setValue(e.target.value)}/>
}

EnterInput.propTypes = {
  placeholder: PropTypes.string,
  onEnter: PropTypes.func.isRequired
}

export { EnterInput }
