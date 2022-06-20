import React from 'react'
import PropTypes from 'prop-types'
import NumberSlider from 'components/NumberSlider'

export const IntervalSelector = ({ min, max, onChange, defaults }) => {
  // Sort the array of the two new incoming
  // values to make sure the first one is
  // the smallest and the second one is the
  // biggest
  const onSliderChange = (newValues) => {
    const sortedValues = newValues.slice().sort((a, b) => a - b)
    onChange(sortedValues)
  }
  return (
    <NumberSlider min={min} max={max} onChange={onSliderChange} defaults={defaults} handles={2} />
  )
}

IntervalSelector.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  defaults: PropTypes.arrayOf(PropTypes.number).isRequired
}
