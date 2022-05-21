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
import { TabWindow } from './tabwindow.js'
import { StatsButton, HomeButton, BaseNavButton, FloatingNavButton } from './buttons.js'
import { urls } from './resourceurls.js'

function getMeaningLength (meaning) {
  return meaning.definition.length +
         meaning.examples.reduce((p, c) => p + c.length, 0) +
         meaning.examples.length
}

function TyperTypeWindow ({ meanings, running, word, onMeaningComplete, onType, currentMeaning, tracker, progress }) {
  const [currentWindow, setCurrentWindow] = useState(0)

  useEffect(() => { setCurrentWindow(running ? 0 : 1) }, [running])

  const jumpToWord = () => setCurrentWindow(0)
  const jumpToStats = () => setCurrentWindow(1)
  return (
    <>
    <div className='typer-window'>
    <TabWindow current={currentWindow}>
    <div className='typer-window-tab typer-word-window'>
        <h1 className="word-title">{word}</h1>
        <div className="word-meanings">
        { meanings.map((meaning, idx) => {
          return <WordMeaning key={idx} meaning={meaning}
          active={idx === currentMeaning}
          first={idx === 0}
          onType={onType} onComplete={onMeaningComplete}
          last={idx === meanings.length - 1}
          index={idx}
            />
        })}
        </div>
            </div>

    { !running &&
    <div className='typer-window-tab typer-stats-window'>
    <SessionStatViewer stats={tracker.getData()} />
    </div>}

    </TabWindow>
    {!running && (currentWindow === 1
      ? <div className="back-to-word-button"> <FloatingNavButton onClick={jumpToWord} text='Back to word' url={urls.backToWord} /></div>
      : <div className="back-to-word-button"> <FloatingNavButton onClick={jumpToStats} text='View stats' url={urls.statsIcon} /></div>)}

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

function Typer ({ addParticle }) {
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
  }

  const onType = (args) => {
    if (tracker.totalTypeCount === 0) { tracker.startTimer() }
    addParticle(args)
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
    <StatsButton />
    <HomeButton />
    <BaseNavButton text={running ? 'Skip' : 'Next'} targetPage={'/typer'}
                iconUrl={running ? urls.skipIcon : urls.typerIcon }/>
    </div>
    </div>
  )
}

Typer.propTypes = {
  addParticle: PropTypes.func.isRequired
}

export { Typer }
