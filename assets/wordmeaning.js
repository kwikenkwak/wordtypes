import { SemiTypedString } from './semitypedstring.js'
import React, { useRef, useEffect } from 'react'
import PropTypes from 'prop-types'

class WordMeaningProgress {
  constructor (meaning) {
    this.definition = meaning.definition
    this.examples = meaning.examples
    this.definitionProgress = 0
    this.exampleIndex = 0
    this.exampleProgress = 0
    this.typingWhat = 'definition'
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
      } else {
        this.definitionProgress += 1
      }
    } else if (this.typingWhat === 'examples') {
      if (this.examples[this.exampleIndex] === undefined) return false
      if (this.exampleProgress === this.examples[this.exampleIndex].length) {
        this.exampleIndex += 1
        if (this.exampleIndex === this.examples.length) { return true }

        this.exampleProgress = 0
      } else {
        this.exampleProgress += 1
      }
    }
    return false
  }
}

function WordMeaning ({ progress, meaning, active }) {
  const div = useRef()

  useEffect(() => {
    if (active) div.current.scrollIntoView({ behavior: 'smooth' })
  }, [active])

  return (<>
    <div className="meaning-wrapper" ref={div}>
      <p>{meaning.type}</p>
      <p>
      <SemiTypedString string={meaning.definition} progress={progress.definitionProgress}
      cursor={progress.typingWhat === 'definition' && active} isEnter={progress.isEnter()}/>
      </p>
      { meaning.examples.map((example, idx) =>
        <p key={idx}><SemiTypedString string={example} progress={progress.getExampleProgress(idx)}
           cursor={progress.typingWhat === 'examples' && progress.exampleIndex === idx && active} isEnter={progress.isEnter()}/></p>)
      }
    </div>
    </>)
}

WordMeaning.propTypes = {
  progress: PropTypes.object.isRequired,
  meaning: PropTypes.object.isRequired,
  active: PropTypes.bool.isRequired
}

export { WordMeaning, WordMeaningProgress }
