import React from 'react'
import { PropTypes } from 'prop-types'
import '../styles/stats.scss'

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

  return (<div className="accuracy-bar">
    {sections.map((section, idx) => {
      return <div
      className={'accuracy-bar-section ' +
        (section.correct
          ? 'section-correct'
          : 'section-error')}
      style={{ width: (100 * section.width / total) + '%' }}
      key={idx}
        />
    })}
    </div>)
}

AccuracyBar.propTypes = {
  keys: PropTypes.array.isRequired
}

export { AccuracyBar }
