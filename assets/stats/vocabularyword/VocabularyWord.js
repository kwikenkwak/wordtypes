import React from 'react'
import PropTypes from 'prop-types'
import { mRound } from '../statutils.js'
import {
  VocabularyWord,
  AddQueueIcon,
  WordTitle,
  Buttons,
  AccuracyInfo,
  AccuracyValue,
  AccuracyIcon,
  SpeedInfo,
  SpeedIcon,
  AgainIcon
} from './VocabularyWord.style'

// TODO implement button functionality
const VocabularyWordComponent = ({
  stat
}) => {
  return (
    <VocabularyWord>
      <WordTitle>{stat.word}</WordTitle>
      <Buttons>
        <AccuracyInfo>
          <AccuracyValue>{mRound(stat.accuracy)}</AccuracyValue>
          <AccuracyIcon
            alt=""
            src="https://static.overlay-tech.com/assets/6d15dfa8-8e93-494e-8e19-fbcf75595482.svg"
          />
        </AccuracyInfo>
        <SpeedInfo>
          <AccuracyValue>{mRound(stat.wpm)}</AccuracyValue>
          <SpeedIcon
            alt=""
            src="https://static.overlay-tech.com/assets/63aa3aec-cf10-47a9-8f9a-13d7c92cb6fb.svg"
          />
        </SpeedInfo>
        <AgainIcon
          alt=""
          src="https://static.overlay-tech.com/assets/9c25d7ce-e719-4208-afa3-d4f1e75fe3fd.svg"
        />
        <AddQueueIcon
          alt=""
          src="https://static.overlay-tech.com/assets/132d2052-3a67-4f3c-95e3-1eb88072c40b.svg"
        />
      </Buttons>
    </VocabularyWord>
  )
}

VocabularyWordComponent.propTypes = {
  stat: PropTypes.object.isRequired
}

export { VocabularyWordComponent as VocabularyWord }
