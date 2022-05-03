import React, { useState, useEffect } from 'react'
import Cookies from 'js-cookie'

import './styles/buttons.scss'

import { WordMeaning } from './wordmeaning.js'
import { LoadingAnimation } from './animations.js'
import { PropTypes } from 'prop-types'
import { StatTracker } from './stattracker.js'
import { ProgressBar } from './progressbar.js'
import { Icon } from './icon.js'

function getMeaningLength (meaning) {
  return meaning.definition.length +
         meaning.examples.reduce((p, c) => p + c.length, 0) +
         meaning.examples.length
}

function Typer ({ background, jumpPage }) {
  const [isLoadingWord, setIsLoadingWord] = useState(true)
  const [wordInfo, setWordInfo] = useState('')
  const [tracker, setTracker] = useState(new StatTracker(''))
  const meanings = wordInfo.definitions || []
  const [currentMeaning, setCurrentMeaning] = useState(0)
  const [progress, setProgress] = useState(0)

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
    jumpPage('typer')
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
    <>
    {!isLoadingWord &&
      <div>
      <h1>{wordInfo.word}</h1>
    { meanings.map((meaning, idx) => {
      return <WordMeaning key={idx} meaning={meaning}
              active={idx === currentMeaning}
              first={idx === 0}
              onType={onType} onComplete={onMeaningComplete}
        />
    })}
    <ProgressBar progress={progress} width={'500px'}/>
    </div>
    }

    {isLoadingWord && <LoadingAnimation />}
    <a onClick={() => jumpPage('stats')}>Stats <span className="stats-icon" ><Icon src={statsIconUrl} /></span></a>
    <a onClick={() => jumpPage('welcome')}>Home</a>
    <a onClick={() => jumpPage('typer')}>Skip this word</a>
    </>
  )
}

Typer.propTypes = {
  background: PropTypes.object.isRequired,
  jumpPage: PropTypes.func.isRequired
}

export { Typer }
