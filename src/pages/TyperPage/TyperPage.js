import React, { useContext, useState, useEffect } from 'react'
import { loadDefinition } from 'utils/wordloading'
import { useSearchParams } from 'react-router-dom'
import { BackgroundContext } from 'utils/background'
import InfoButton from 'components/InfoButton'
import useSetting, { settings } from 'hooks/useSetting'

import WordMeaning from 'src/components/WordMeaning'
import LoadingAnimation from 'components/LoadingAnimation'
import PropTypes from 'prop-types'
import StatTracker from 'utils/StatTracker'
import SessionStatViewer from 'components/SessionStatViewer'
import ProgressBar from 'components/ProgressBar'
import TabWindow from 'components/TabWindow'
import {
  StatsButton, HomeButton, FloatingNavButton,
  SkipWordButton, NextWordButton
} from 'components/Buttons'
import NoDefinition from './NoDefinition'
import urls from 'utils/asseturls'
import * as S from './TyperPage.style.js'

function getMeaningLength (meaning) {
  return meaning.definition.length +
         meaning.examples.reduce((p, c) => p + c.length, 0) +
         meaning.examples.length
}

const INFOTEXT = 'Here you can train your typing skills and learn vocabulary at the same time.' +
                 'If you see a word in a definition you don\'t understand hover over it' +
                 ' to see a definition or click on it to add it to your queue'

const CREDITTEXT = <>Data from <S.CreditLink href="https://www.wiktionary.org/">Wiktionary</S.CreditLink>
  , adapted for this project and available under the
  <S.CreditLink href="https://creativecommons.org/licenses/by-sa/3.0/"> CC BY-SA 3.0</S.CreditLink> license.
</>

function TyperTypeWindow ({ meanings, running, word, onMeaningComplete, onType, currentMeaning, tracker, progress }) {
  const [currentWindow, setCurrentWindow] = useState(0)

  useEffect(() => { setCurrentWindow(running ? 0 : 1) }, [running])

  const jumpToWord = () => setCurrentWindow(0)
  const jumpToStats = () => setCurrentWindow(1)
  return (
    <>
    <S.TyperWindow>
    <TabWindow current={currentWindow}>
    <S.TyperWordWindow>
    <S.WordTitle>
    {word}
    <S.Credits>
      {CREDITTEXT}
    </S.Credits>
    </S.WordTitle>
        <S.WordMeanings>
        <S.InfoButton>
          <InfoButton pos={'left'} text={INFOTEXT} />
        </S.InfoButton>

    { meanings.length > 0
      ? meanings.map((meaning, idx) => {
        return <WordMeaning key={idx} meaning={meaning}
          active={idx === currentMeaning}
          first={idx === 0}
          onType={onType} onComplete={onMeaningComplete}
          last={idx === meanings.length - 1}
          index={idx}
            />
      })
      : <NoDefinition />
    }
        </S.WordMeanings>
    </S.TyperWordWindow>

    { !running &&
    <S.TyperStatsWindow>
    <SessionStatViewer stats={tracker.getData()} />
    </S.TyperStatsWindow>}

    </TabWindow>
    {!running && (currentWindow === 1
      ? <div> <FloatingNavButton onClick={jumpToWord} text='Back to word' url={urls.backToWord} /></div>
      : <div> <FloatingNavButton onClick={jumpToStats} text='View stats' url={urls.stats} /></div>)}

    </S.TyperWindow>
    <ProgressBar progress={progress} width={'100%'}/>
    </>
  )
}

TyperTypeWindow.propTypes = {
  meanings: PropTypes.array.isRequired,
  running: PropTypes.bool.isRequired,
  word: PropTypes.string.isRequired,
  onMeaningComplete: PropTypes.func.isRequired,
  onType: PropTypes.func.isRequired,
  currentMeaning: PropTypes.number.isRequired,
  tracker: PropTypes.object.isRequired,
  progress: PropTypes.number.isRequired
}

function TyperPage () {
  const [isLoadingWord, setIsLoadingWord] = useState(true)
  const [wordInfo, setWordInfo] = useState('')
  const [tracker, setTracker] = useState(new StatTracker(''))
  const meanings = wordInfo.definitions || []
  const [currentMeaning, setCurrentMeaning] = useState(0)
  const [progress, setProgress] = useState(0)
  const [running, setRunning] = useState(true)
  const [searchParam] = useSearchParams()
  const { addParticle } = useContext(BackgroundContext)
  const [defLimit] = useSetting(settings.defLimit)

  const onWordLoaded = (wordInfo) => {
    // Limit the number of definitions to the defLimit setting
    if (wordInfo.definitions.length > defLimit) {
      wordInfo.definitions = wordInfo.definitions.slice(0, defLimit)
    }

    const newTracker = new StatTracker(wordInfo.word)
    setTracker(newTracker)
    setWordInfo(wordInfo)
    setIsLoadingWord(false)
  }

  function onWordComplete () {
    tracker.dumpData()
    setRunning(false)
  }

  const onType = (args) => {
    if (tracker.totalTypeCount === 0) { tracker.startTimer() }
    addParticle(args)
    tracker.registerKey(args.charTyped, args.correct)
    updateProgress()
  }

  useEffect(() => {
    setIsLoadingWord(true)
    loadDefinition(onWordLoaded, searchParam.get('word'))
  }, [])

  function updateProgress () {
    const totalChars = meanings.reduce((p, c) => p + getMeaningLength(c), 0) + meanings.length - 1
    const newProgress = Math.round(100 * (tracker.correctTypeCount / totalChars))
    setProgress(newProgress)
  }

  function onMeaningComplete () {
    if (currentMeaning === meanings.length - 1) {
      onWordComplete()
    }
    setCurrentMeaning(currentMeaning + 1)
  }

  return (
    <S.TyperPage>
    {!isLoadingWord &&
      <TyperTypeWindow meanings={meanings} running={running} word={wordInfo.word}
          onMeaningComplete={onMeaningComplete} onType={onType} currentMeaning={currentMeaning}
          tracker={tracker} progress={progress} />
    }

    {isLoadingWord && <LoadingAnimation />}
    <S.TyperButtons>
    <StatsButton />
    <HomeButton />
    { running ? <SkipWordButton /> : <NextWordButton /> }
    </S.TyperButtons>
    </S.TyperPage>
  )
}

export { TyperPage }
