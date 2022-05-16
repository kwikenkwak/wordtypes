import React, { useState, useMemo } from 'react'
import { PropTypes } from 'prop-types'
import { mRound, calcWPM, calcAccuracy } from '../statutils'
import { StatsManager } from '../statsmanager'
import { VocabularyWord } from '../vocabularyword/vocabularyword'
import { SelectButton } from '../../selectbutton'
import styled from 'styled-components'

const VocContainer = styled.div`
  display: flex;
  flex-flow: column;
  overflow: auto;
  flex-grow: 1;
  max-height: 80vh;
`

const VocWordList = styled.div`
  flex-grow: 1;
  border: 1px solid white;
  display: flex;
  flex-flow: column;
  overflow: auto;
`

const SortOpts = styled.div`
  display: flex;
  align-items: stretch;
`

const OptButton = styled.div`
  margin-right: .3em;
`

const compareDate = (a, b) => new Date(a.date) - new Date(b.date)
const compareName = (a, b) => {
  if (a.word === b.word) {
    return 0
  }
  return a.word < b.word ? -1 : 1
}
const compareWpm = (a, b) => calcWPM(a) - calcWPM(b)
const compareAccuracy = (a, b) => calcAccuracy(a) - calcAccuracy(b)

function sortWords (words, method, dir) {
  words = words.slice()
  words.sort({
    date: compareDate,
    name: compareName,
    wpm: compareWpm,
    accuracy: compareAccuracy
  }[method])
  if (dir === 'descending') words.reverse()
  return words
}

function VocabularyViewer () {
  const stats = useMemo(() => StatsManager.loadStats(), [])
  const [sortMethod, setSortMethod] = useState('date')
  const [sortDir, setSortDir] = useState('descending')

  const words = sortWords(Object.values(stats), sortMethod, sortDir)
  return (
    <VocContainer>
    <SortOpts>
    <OptButton><SelectButton style={{ marginRight: '.3em' }}
                  onChange={(m) => setSortMethod(m)}
                  choices={['date', 'name', 'wpm', 'accuracy']}
                  current={sortMethod} /></OptButton>
    <OptButton>
    <SelectButton onChange={(d) => setSortDir(d)}
                  choices={['ascending', 'descending']}
                  current={sortDir} />
    </OptButton>
    </SortOpts>
    <VocWordList>
    { words.map((word, idx) =>
      <VocabularyWord key={idx} stat={word} />
    )}
    </VocWordList>
    </VocContainer>
  )
}

export { VocabularyViewer }
