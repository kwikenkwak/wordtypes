import React from 'react'
import PropTypes from 'prop-types'
import { mRound } from 'utils/statutils'
import * as S from './VocWord.style.js'
import urls from 'utils/asseturls'

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
            src={urls.accuracy}
          />
        </S.AccuracyInfo>
        <S.SpeedInfo>
          <S.AccuracyValue>{mRound(stat.wpm)}</S.AccuracyValue>
          <S.SpeedIcon
            alt=""
            src={urls.wpm}
          />
        </S.SpeedInfo>
        <S.AgainIcon
          alt=""
          src={urls.retry}
        />
        <S.AddQueueIcon
          alt=""
          src={urls.addQueue}
        />
      </S.Buttons>
    </S.VocabularyWord>
  )
}

VocWord.propTypes = {
  stat: PropTypes.object.isRequired
}
