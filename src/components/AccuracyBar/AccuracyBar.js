import React from 'react'
import PropTypes from 'prop-types'
import {
  AccuracyBarDiv, AccuracyBarSectionCorrect,
  AccuracyBarSectionError
}
  from './AccuracyBar.style.js'

function getSections (keys) {
  const sections = []
  let prevCorrect = false
  let prevIdx = 0
  for (let idx = 0; idx < keys.length; idx++) {
    const { correct } = keys[idx]
    if (correct !== prevCorrect) {
      sections.push({ correct: prevCorrect, width: idx - prevIdx })
      prevCorrect = correct
      prevIdx = idx
    }
  }
  sections.push({
    correct: keys[keys.length - 1].correct,
    width: keys.length - prevIdx
  })
  return sections
}

function AccuracyBar ({ keys }) {
  const total = keys.length
  const sections = getSections(keys)

  return (<AccuracyBarDiv>
    {sections.map((section, idx) => {
      const widthStyle = { width: (100 * section.width / total) + '%' }
      return section.correct
        ? <AccuracyBarSectionCorrect key={idx} style={widthStyle} />
        : <AccuracyBarSectionError key={idx} style={widthStyle} />
    })}
    </AccuracyBarDiv>)
}

AccuracyBar.propTypes = {
  keys: PropTypes.array.isRequired
}

export { AccuracyBar }
