import React, { useState, useEffect } from 'react'
import Cookies from 'js-cookie'

import './styles/buttons.scss'
import './styles/typer.scss'

import { WordMeaning } from './wordmeaning.js'
import { LoadingAnimation } from './animations.js'
import { PropTypes } from 'prop-types'
import { StatTracker } from './stats/stattracker.js'
import { SessionStatViewer } from './stats/sessionstatviewer.js'
import { ProgressBar } from './progressbar.js'
import { Icon } from './icon.js'

import { StatsButton, SkipButton, HomeButton } from './buttons.js'

function getMeaningLength (meaning) {
  return meaning.definition.length +
         meaning.examples.reduce((p, c) => p + c.length, 0) +
         meaning.examples.length
}

function TyperTypeWindow ({ meanings, running, word, onMeaningComplete, onType, currentMeaning, tracker, progress }) {
  return (
    <>
    <div className='typer-window'>
    { running
      ? <div>
        <h1>{word}</h1>
        { meanings.map((meaning, idx) => {
          return <WordMeaning key={idx} meaning={meaning}
          active={idx === currentMeaning}
          first={idx === 0}
          onType={onType} onComplete={onMeaningComplete}
          last={idx === meanings.length - 1}
            />
        })}
        </div>
      : <SessionStatViewer stats={tracker.getData()} /> }
    </div>
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

function Typer ({ background, jumpPage }) {
  const [isLoadingWord, setIsLoadingWord] = useState(true)
  const [wordInfo, setWordInfo] = useState('')
  const [tracker, setTracker] = useState(new StatTracker(''))
  const meanings = wordInfo.definitions || []
  const [currentMeaning, setCurrentMeaning] = useState(0)
  const [progress, setProgress] = useState(0)
  const [running, setRunning] = useState(true)

  const onWordLoaded = (wordInfo) => {
    console.log(wordInfo)
    const newTracker = new StatTracker(wordInfo.word)
    setTracker(newTracker)
    setWordInfo(wordInfo)
    setIsLoadingWord(false)
  }

  const loadWord = (min = 10000, max = 15000) => {
    console.log('starting word loading...')
    setIsLoadingWord(true)
    fetch('/loadwords', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'X-CSRFToken': Cookies.get('csrftoken')
      },
      body: JSON.stringify({ min: min, max: max })
    })
      .then(res => res.json())
      .then(onWordLoaded)
      .catch(
        (error) => {
          console.log(error)
        }
      )
  }

  function onWordComplete () {
    tracker.dumpData()
    setRunning(false)
    // jumpPage('typer')
  }

  const onType = (args) => {
    if (tracker.totalTypeCount === 0) { tracker.startTimer() }
    background.addParticle(args)
    tracker.registerKey(args.charTyped, args.correct)
    updateProgress()
  }

  useEffect(() => {
    loadWord()
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
    <div className='typer-page'>
    {!isLoadingWord &&
      <TyperTypeWindow meanings={meanings} running={running} word={wordInfo.word}
          onMeaningComplete={onMeaningComplete} onType={onType} currentMeaning={currentMeaning}
          tracker={tracker} progress={progress} />
    }

    {isLoadingWord && <LoadingAnimation />}
    <div className='typer-buttons'>
    <StatsButton jumpPage={jumpPage}/>
    <HomeButton jumpPage={jumpPage}/>
    <SkipButton jumpPage={jumpPage}/>
    </div>
    </div>
  )
}

Typer.propTypes = {
  background: PropTypes.object.isRequired,
  jumpPage: PropTypes.func.isRequired
}

export { Typer }
