import React, { useState, useMemo } from 'react'
import { StatsManager } from '../statsmanager'
import { VocabularyWord } from '../vocabularyword/vocword.js'
import { SelectButton } from '../../selectbutton'
import { darken } from 'polished'
import styled from 'styled-components'

const VocContainer = styled.div`
  display: flex;
  flex-flow: column;
  overflow: auto;
  flex-grow: 1;
`

const VocWordList = styled.div`
  flex-grow: 1;
  border: 1px solid white;
  display: flex;
  flex-flow: column;
  overflow: auto;
  padding: 5px;
  background-color: ${props => darken(0.3, props.theme.bg)};
`

const SortOpts = styled.div`
  display: flex;
  align-items: center;
`

const OptButton = styled.div`
  margin-right: .3em;
`

const Header = styled.div`
  font-size: 1.5em;
  margin-right: auto;
  text-transform: uppercase;
`

const compareDate = (a, b) => new Date(a.date) - new Date(b.date)
const compareName = (a, b) => {
  if (a.word === b.word) {
    return 0
  }
  return a.word < b.word ? -1 : 1
}
const compareWpm = (a, b) => a.wpm - b.wpm
const compareAccuracy = (a, b) => a.accuracy - b.accuracy

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
    <Header>The vocabulary you have learnt to far</Header>
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
