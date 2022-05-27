import React from 'react'
import { useVocabularyViewer } from './usevocabularyviewer'
import { VocabularyWord } from '../vocabularyword/VocabularyWord'
import { SelectButton } from '../../selectbutton'
import styled from 'styled-components'

const VocContainer = styled.div`
  display: flex;
  flex-flow: column;
  overflow: auto;
  flex-grow: 1;
`

const VocWordList = styled.div`
  flex-grow: 1;
  border: 1px solid ${props => props.theme.colors.base};
  display: flex;
  flex-flow: column;
  overflow: auto;
  padding: 5px;
  background-color: ${props => props.theme.colors.bg};
  margin-top: .1em;
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
  width: 100%;
  text-align: center;
`

const Input = styled.input`
  flex-grow: 1;
  background: none;
  outline: none;
  border: none;
  color: inherit;
  font-size: 1.5rem;
  border-bottom: 1px solid currentColor;
  margin-right: 1em;
`

function VocabularyViewer () {
  const {
    words,
    sortDirChoices,
    onSortDirChange,
    sortMethodChoices,
    onSortMethodChange,
    sortDir,
    sortMethod,
    onSearchChange
  } = useVocabularyViewer()

  return (
    <VocContainer>
    <Header>The vocabulary you have learnt so far</Header>
    <SortOpts>
    <Input type="text" onChange={onSearchChange} placeholder={'Search for a word...'} />
    <OptButton><SelectButton style={{ marginRight: '.3em' }}
                  onChange={onSortMethodChange}
                  choices={sortMethodChoices}
                  current={sortMethod} /></OptButton>
    <OptButton>
    <SelectButton onChange={onSortDirChange}
                  choices={sortDirChoices}
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
