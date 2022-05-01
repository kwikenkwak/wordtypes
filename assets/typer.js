import React, { useState, useEffect } from 'react'
import Cookies from 'js-cookie'

import { addTypeStat, addWordToVoc } from './statstore.js'
import { WordTyper } from './wordtyper.js'
import { LoadingAnimation } from './animations.js'
import { PropTypes } from 'prop-types'

function Typer ({ background, jumpPage }) {
  const [isLoadingWord, setIsLoadingWord] = useState(true)
  const [currentWordInfo, setCurrentWordInfo] = useState('')

  const loadWord = (min = 10000, max = 15000) => {
    console.log('starting word loading...')
    const onSucces = (wordInfo) => {
      console.log(wordInfo)
      setCurrentWordInfo(wordInfo)
      setIsLoadingWord(false)
    }

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
      .then(onSucces)
      .catch(
        (error) => {
          console.log(error)
        }
      )
  }

  const onWordComplete = (stats) => {
    addWordToVoc(currentWordInfo.word)
    addTypeStat(stats)
    jumpPage('typer')
  }

  const onType = (args) => background.addParticle(args)

  useEffect(() => {
    loadWord()
  }, [])

  return (
    <>
    {!isLoadingWord &&
        <WordTyper wordInfo={currentWordInfo}
                   onComplete={onWordComplete}
                   onType={onType}/>}
    {isLoadingWord && <LoadingAnimation />}
    <a onClick={() => jumpPage('stats')}>Stats</a>
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
