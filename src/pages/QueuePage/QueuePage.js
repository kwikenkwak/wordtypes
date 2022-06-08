import React from 'react'
import QueueItem from 'components/QueueItem'
import { BackToHomeButton } from 'components/Buttons'
import * as S from './QueuePage.style.js'
import useQueue from 'hooks/useQueue'
import EnterInput from 'components/EnterInput'
import SortableList from 'components/SortableList'

function QueuePage () {
  const { queue, addWord, removeWord, moveWord } = useQueue()
  return (
    <S.QueuePage>
      <BackToHomeButton />
      <S.Wrapper>
        <S.ContentWindow>
          <S.Title>WORD QUEUE</S.Title>
          <S.Queuecontent>
            <S.InfoTab>
              <S.SubTitle>Your word queue</S.SubTitle>
              <S.NormalText>The word queue shows you which words are waiting to be learned. The next time you start the typer the top word of the queue will be chosen instead of a random word. Here you can add a word you would like to learn. You can also add a word from another definition when you are typing by just clicking on it.</S.NormalText>
            </S.InfoTab>
            <S.QueueItemList>
              <SortableList items=
                {queue.map((word, idx) =>
                  <QueueItem key={idx} word={word} onRemove={() => removeWord(word)}/>
                )}
                dragClass={'draghandle'}
                onChange={moveWord}
              />
            </S.QueueItemList>
            <S.AddTab>
            <EnterInput placeholder="Add a word..."
                        style={{ width: '100%' }}
                        onEnter={addWord}
              />
              <S.NormalText>Is there a word you don’t know but you don’t have the time to type it right now? We got you covered! Just add it to this queue and it will be automatically selected the next time you type!</S.NormalText>
            </S.AddTab>
          </S.Queuecontent>
        </S.ContentWindow>
      </S.Wrapper>
    </S.QueuePage>
  )
}

export { QueuePage }
