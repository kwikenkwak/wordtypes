import React from 'react'
import PropTypes from 'prop-types'

function VocabularyWord ({ stat }) {
  return <p>{stat.word}</p>
}

VocabularyWord.propTypes = {
  stat: PropTypes.object.isRequired
}

export { VocabularyWord }
