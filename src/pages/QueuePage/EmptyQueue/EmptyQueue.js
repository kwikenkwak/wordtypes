import React from 'react'
import Icon from 'components/Icon'
import urls from 'utils/asseturls'
import * as S from './EmptyQueue.style.js'
// Show a message to inform the
// user that their queue is empty
// also show a thinking face emoji

export const EmptyQueue = () => {
  return (
    <S.EmptyQueue>
    <S.EmptyQueueTitle>Your queue is empty
    </S.EmptyQueueTitle>
    <S.EmptyQueueSubTitle>
    Add words to your queue by typing them
    in the input box at your right.
    </S.EmptyQueueSubTitle>
    <Icon src={urls.thinking} size={'6em'} />

    </S.EmptyQueue>
  )
}
