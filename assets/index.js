import './styles/background.scss'
import Cookies from 'js-cookie'
import React, { useState, useEffect, useRef } from 'react'
import ReactDOM from 'react-dom/client'

import { Background } from './background.js'
import { addTypeStat, addWordToVoc } from './statstore.js'
import { StatsViewer } from './statsviewer.js'
import { WordTyper } from './wordtyper.js'
import { LoadingAnimation } from './animations.js'

function HomePage () {
  return (<>
          <h1>Welcome to DictionaryTyper</h1>
          <p>Dolor consectetur odio aliquam dignissimos?</p>
          </>)
}

function DictionaryTyper () {
  const [isRunning, setIsRunning] = useState(false)
  const [showStats, setShowStats] = useState(false)
  const [isLoadingWord, setIsLoadingWord] = useState(false)
  const [currentWordInfo, setCurrentWordInfo] = useState('')
  const background = useRef(null)

  const toggleRunning = () => {
    setIsRunning(!isRunning)
  }

  const toggleStats = () => setShowStats(!showStats)

  const loadWord = (min = 10000, max = 30000) => {
    console.log('starting word loading...')
    const onSucces = (wordInfo) => {
      console.log(wordInfo)
      setCurrentWordInfo(wordInfo)
      setIsLoadingWord(false)
    }

    fetch('/loadwords', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'X-CSRFToken': Cookies.get('csrftoken')
      },
      body: JSON.stringify({ min: min, max: max })
    })
      .then(res => res.json())
      .then(onSucces)
      .catch(
        (error) => {
          console.log(error)
        }
      )

    setIsLoadingWord(true)
  }

  const onWordComplete = (stats, skipped = false) => {
    console.log(skipped ? 'skipped word' : 'word done')
    if (!skipped) {
      addWordToVoc(currentWordInfo.word)
      addTypeStat(stats)
    }
    loadWord()
  }

  const skipWord = () => {
    onWordComplete(null, true)
  }

  const onType = (args) => background.current.addParticle(args)

  useEffect(() => {
    loadWord()
  }, [])

  return (
    <>
    <HomePage/>
    <button onClick={toggleRunning} >Start!</button>
    {isRunning && <button onClick={skipWord}>Skip</button>}

    {isRunning && !isLoadingWord &&
        <WordTyper wordInfo={currentWordInfo}
                   onComplete={onWordComplete}
                   onType={onType}/>}

    {showStats && <StatsViewer visible={showStats}/>}
    <button onClick={toggleStats}>Stats</button>
    {isLoadingWord && <LoadingAnimation />}
    <Background amount={100} ref={background}/>
    </>
  )
}

const container = document.getElementById('root')
const root = ReactDOM.createRoot(container)

root.render(
  <DictionaryTyper />
)
