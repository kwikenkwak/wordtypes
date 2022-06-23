import React from 'react'
import PropTypes from 'prop-types'
import { mRound } from 'utils/statutils'
import * as S from './VocWord.style.js'
import urls from 'utils/asseturls'
import useLaunchTyper from 'hooks/useLaunchTyper'
import useQueue from 'hooks/useQueue'
import GrowButton from 'components/GrowButton'
import Icon from 'components/Icon'

// TODO implement button functionality
export const VocWord = ({
  stat, openViewer
}) => {
  const { addWord } = useQueue()
  const launchTyper = useLaunchTyper(stat.word)
  return (
    <S.VocabularyWord>
      <S.WordTitle>{stat.word}</S.WordTitle>
      <S.Buttons>
        <S.AccuracyInfo>
          <S.AccuracyValue>{mRound(stat.accuracy)}</S.AccuracyValue>
            <Icon src={urls.accuracy} size={'50px'} />
        </S.AccuracyInfo>
        <S.SpeedInfo>
          <S.AccuracyValue>{mRound(stat.wpm)}</S.AccuracyValue>
          <Icon src={urls.wpm} size={'45px'} />
        </S.SpeedInfo>

        <GrowButton onClick={openViewer}>
          <S.AgainIcon src={urls.stats} size={'55px'} />
        </GrowButton>

        <GrowButton onClick={launchTyper}>
        <S.AgainIcon
          src={urls.retry}
          size={'55px'}
        />
        </GrowButton>
        <GrowButton onClick={() => addWord(stat.word)}>
        <Icon
          alt=""
          src={urls.addQueue}
          size={'50px'}
        />
        </GrowButton>
      </S.Buttons>
    </S.VocabularyWord>
  )
}

VocWord.propTypes = {
  stat: PropTypes.object.isRequired,
  openViewer: PropTypes.func.isRequired
}
