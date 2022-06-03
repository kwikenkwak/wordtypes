import React from 'react'
import useVocViewer from './useVocViewer'
import VocabularyWord from 'components/VocWord'
import SelectButton from 'components/SelectButton'
import * as S from './VocViewer.style.js'

function VocViewer () {
  const {
    words,
    sortDirChoices,
    onSortDirChange,
    sortMethodChoices,
    onSortMethodChange,
    sortDir,
    sortMethod,
    onSearchChange,
    expandTriggerRef,
    rootScrollRef
  } = useVocViewer()

  return (
    <S.VocContainer>
    <S.Header>The vocabulary you have learnt so far</S.Header>
    <S.SortOpts>
    <S.Input type="text" onChange={onSearchChange} placeholder={'Search for a word...'} />
    <S.OptButton><SelectButton style={{ marginRight: '.3em' }}
                  onChange={onSortMethodChange}
                  choices={sortMethodChoices}
                  current={sortMethod} /></S.OptButton>
    <S.OptButton>
    <SelectButton onChange={onSortDirChange}
                  choices={sortDirChoices}
                  current={sortDir} />
    </S.OptButton>
    </S.SortOpts>
    <S.VocWordList ref={rootScrollRef}>
    { words.map((word, idx) =>
      <VocabularyWord key={idx} stat={word} />
    )}
    <S.ExpandTrigger ref={expandTriggerRef} />
    </S.VocWordList>
    </S.VocContainer>
  )
}

export { VocViewer }
