import React, { useState, useRef } from 'react'
import useVocViewer from './useVocViewer'
import VocabularyWord from 'components/VocWord'
import SelectButton from 'components/SelectButton'
import GrowButton from 'components/GrowButton'
import urls from 'utils/asseturls'
import * as S from './VocViewer.style.js'
import StyledInput from 'components/StyledInput'
import SessionStatViewer from 'components/SessionStatViewer'
import { CSSTransition } from 'react-transition-group'

function VocViewer () {
  const [showSessionStat, setShowSessionStat] = useState(false)
  console.log(showSessionStat)
  const sessionStat = useRef(null)

  const openSessionStatViewer = (stats) => {
    sessionStat.current = stats
    setShowSessionStat(true)
  }
  const {
    words,
    sortDirChoices,
    onSortDirChange,
    sortMethodChoices,
    onSortMethodChange,
    sortDir,
    sortMethod,
    onSearchChange,
    search,
    expandTriggerRef,
    rootScrollRef,
    openViewers
  } = useVocViewer('vocviewer', openSessionStatViewer)

  return (
    <S.VocContainer>

    <CSSTransition in={showSessionStat} timeout={300}
      classNames="grow" unmountOnExit>
      {() =>
      <S.SessionViewerWrapper>
      <S.CloseWrapper>
        <GrowButton onClick={() => setShowSessionStat(false)}>
          <S.CloseButton src={urls.close} />
        </GrowButton>
      </S.CloseWrapper>
      <S.SessionViewer>
        <SessionStatViewer stats={sessionStat.current}/>
      </S.SessionViewer>
      </S.SessionViewerWrapper>
      }
    </CSSTransition>

    <S.Header>The vocabulary you have learnt so far</S.Header>
    <S.SortOpts>
    <StyledInput type="text" value={search} onChange={onSearchChange} placeholder={'Search for a word...'} />
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
      <VocabularyWord key={idx} stat={word} openViewer={openViewers[idx]} />
    )}
    <S.ExpandTrigger ref={expandTriggerRef} />
    </S.VocWordList>
    </S.VocContainer>
  )
}

export { VocViewer }
