import React from 'react'
import PropTypes from 'prop-types'
import { mRound } from 'utils/statutils'
import * as S from './VocWord.style.js'

// TODO implement button functionality
export const VocWord = ({
  stat
}) => {
  return (
    <S.VocabularyWord>
      <S.WordTitle>{stat.word}</S.WordTitle>
      <S.Buttons>
        <S.AccuracyInfo>
          <S.AccuracyValue>{mRound(stat.accuracy)}</S.AccuracyValue>
          <S.AccuracyIcon
            alt=""
            src="https://static.overlay-tech.com/assets/6d15dfa8-8e93-494e-8e19-fbcf75595482.svg"
          />
        </S.AccuracyInfo>
        <S.SpeedInfo>
          <S.AccuracyValue>{mRound(stat.wpm)}</S.AccuracyValue>
          <S.SpeedIcon
            alt=""
            src="https://static.overlay-tech.com/assets/63aa3aec-cf10-47a9-8f9a-13d7c92cb6fb.svg"
          />
        </S.SpeedInfo>
        <S.AgainIcon
          alt=""
          src="https://static.overlay-tech.com/assets/9c25d7ce-e719-4208-afa3-d4f1e75fe3fd.svg"
        />
        <S.AddQueueIcon
          alt=""
          src="https://static.overlay-tech.com/assets/132d2052-3a67-4f3c-95e3-1eb88072c40b.svg"
        />
      </S.Buttons>
    </S.VocabularyWord>
  )
}

VocWord.propTypes = {
  stat: PropTypes.object.isRequired
}
