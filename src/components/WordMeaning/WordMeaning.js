import SemiTypedString from 'components/SemiTypedString'
import React, { useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import * as S from './WordMeaning.style.js'

class WordMeaningProgress {
  constructor (meaning, last = false) {
    this.definition = meaning.definition
    this.examples = meaning.examples
    this.definitionProgress = 0
    this.exampleIndex = 0
    this.exampleProgress = 0
    this.typingWhat = 'definition'
    this.last = last
  }

  getExampleProgress (idx) {
    if (idx > this.exampleIndex) {
      return 0
    } else if (idx < this.exampleIndex) {
      return this.examples[idx].length
    } else { return this.exampleProgress }
  }

  isEnter () {
    return this.getExpectedChar() === 'Enter'
  }

  getExpectedChar () {
    if (this.typingWhat === 'definition') {
      if (this.definitionProgress === this.definition.length) return 'Enter'
      else return this.definition[this.definitionProgress]
    } else if (this.typingWhat === 'examples') {
      if (this.exampleIndex >= this.examples.length) return 'Enter'
      if (this.exampleProgress === this.examples[this.exampleIndex].length) return 'Enter'
      else return this.examples[this.exampleIndex][this.exampleProgress]
    }
  }

  advance () {
    if (this.typingWhat === 'definition') {
      if (this.definitionProgress === this.definition.length) {
        this.typingWhat = 'examples'
        if (!this.examples.length) return true
      } else if (this.last && this.examples.length === 0 &&
              this.definitionProgress === this.definition.length - 1) {
        return true
      } else {
        this.definitionProgress += 1
      }
    } else if (this.typingWhat === 'examples') {
      if (this.examples[this.exampleIndex] === undefined) return false
      if (this.exampleProgress === this.examples[this.exampleIndex].length) {
        this.exampleIndex += 1
        if (this.exampleIndex === this.examples.length) { return true }

        this.exampleProgress = 0
      } else if (this.last && this.exampleIndex === this.examples.length - 1 &&
                this.exampleProgress === this.examples[this.exampleIndex].length - 1) {
        return true
      } else {
        this.exampleProgress += 1
      }
    }
    return false
  }
}

function WordMeaning ({ meaning, active, onType, onComplete, first, last, index }) {
  const progress = useState(new WordMeaningProgress(meaning, last))[0]
  const [force, forceUpdate] = useState(0)
  const div = useRef()

  useEffect(() => {
    if (active && !first) div.current.scrollIntoView({ behavior: 'smooth' })
  }, [active])

  const onKeyPress = (e) => {
    if (!active) return
    e.preventDefault()
    const charTyped = e.keyCode === 13 ? 'Enter' : String.fromCharCode(e.keyCode)
    const correct = charTyped === progress.getExpectedChar()

    // TODO DEBUG
    onType({ charTyped: charTyped, correct: correct })
    if (correct) {
      const isCompleted = progress.advance()
      if (isCompleted) {
        onComplete()
      }
    }
    forceUpdate(force + 1)
  }

  useEffect(() => {
    // Do this to prevent button clicks made with spacebar
    // while typing
    document.activeElement.blur()

    window.addEventListener('keypress', onKeyPress)

    // Prevent the backspace key from navigating back
    window.addEventListener('keydown', (e) => {
      if (e.which === 8) { e.preventDefault() }
    })

    return () => window.removeEventListener('keypress', onKeyPress)
  })

  return (
    <S.Meaning ref={div}>
      <S.MeaningType>
        {index + 1} <S.MeaningTypeText>{meaning.type}</S.MeaningTypeText>
      </S.MeaningType>

      <S.MeaningDefinition>
        <S.MeaningDefinitionHeader>Definition</S.MeaningDefinitionHeader>
        <S.MeaningDefinitionContent>
          <SemiTypedString string={meaning.definition} progress={progress.definitionProgress}
            cursor={progress.typingWhat === 'definition' && active} isEnter={progress.isEnter()}/>
        </S.MeaningDefinitionContent>
      </S.MeaningDefinition>

      { meaning.examples.length > 0 &&
      <S.MeaningExamples>
        <S.MeaningExamplesHeader>Examples</S.MeaningExamplesHeader>
        <S.MeaningExamplesContent>
          { meaning.examples.map((example, idx) =>
            <div key={idx}>
              <SemiTypedString string={example} progress={progress.getExampleProgress(idx)}
                cursor={progress.typingWhat === 'examples' && progress.exampleIndex === idx && active}
                isEnter={progress.isEnter()}/>
            </div>)
          }
        </S.MeaningExamplesContent>
      </S.MeaningExamples>
      }
    </S.Meaning>)
}

WordMeaning.propTypes = {
  meaning: PropTypes.object.isRequired,
  active: PropTypes.bool.isRequired,
  onType: PropTypes.func.isRequired,
  onComplete: PropTypes.func.isRequired,
  first: PropTypes.bool.isRequired,
  last: PropTypes.bool.isRequired,
  index: PropTypes.number.isRequired
}

export { WordMeaning, WordMeaningProgress }
