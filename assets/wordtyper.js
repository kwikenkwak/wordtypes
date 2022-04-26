import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { WordMeaning, WordMeaningProgress } from './wordmeaning.js'

function WordTyper ({ wordInfo, onComplete, onType }) {
  const [meanings, setMeanings] = useState([])
  const [currentMeaning, setCurrentMeaning] = useState('')
  const [totalTyped, setTotalTyped] = useState(0)
  const [correctTyped, setCorrectTyped] = useState(0)

  const onKeyPresss = (e) => {
    e.preventDefault()
    setTotalTyped(totalTyped + 1)
    const charTyped = e.keyCode === 13 ? 'Enter' : String.fromCharCode(e.keyCode)
    const correct = charTyped === currentMeaning.getExpectedChar()
    onType({ str: charTyped, isErr: !correct })
    if (correct) {
      setCorrectTyped(correctTyped + 1)
      const isCompleted = currentMeaning.advance()
      if (isCompleted) {
        if (currentMeaning === meanings[meanings.length - 1]) {
          onComplete({ total: totalTyped, correct: correctTyped })
        } else {
          setCurrentMeaning(meanings[meanings.indexOf(currentMeaning) + 1])
        }
      }
    }
  }

  const initialize = () => {
    const allMeanings = []
    for (const meaning of wordInfo.definitions) {
      allMeanings.push(new WordMeaningProgress(meaning))
    }
    setMeanings(allMeanings)
    setCurrentMeaning(allMeanings[0])
  }

  useEffect(initialize, [])

  useEffect(() => {
    // Do this to prevent button clicks made with spacebar
    // while typing
    document.activeElement.blur()

    window.addEventListener('keypress', onKeyPresss)

    return () => window.removeEventListener('keypress', onKeyPresss)
  })

  return (<>
    <h1>{wordInfo.word}</h1>
    { meanings.map((meaning, idx) => {
      return <WordMeaning key={idx} meaning={wordInfo.definitions[idx]} progress={meaning}
              active={currentMeaning === meaning}/>
    })}
    </>
  )
}

WordTyper.propTypes = {
  wordInfo: PropTypes.object.isRequired,
  onComplete: PropTypes.func.isRequired,
  onType: PropTypes.func.isRequired
}

export { WordTyper }
