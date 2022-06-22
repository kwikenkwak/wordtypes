import React from 'react'
import * as S from './NotFound.style.js'
import Icon from 'components/Icon'
import urls from 'utils/asseturls'

// Say to the user that with their current
// search options there are no results.
// Show a big thinking face too

export const NotFound = () => {
  return (
    <S.NotFound>
    <S.NotFoundText>
    No results found for this word
    </S.NotFoundText>
    <Icon src={urls.thinking} size={'6em'} />
    <S.NotFoundText>
    Maybe you should go learn some more?
    </S.NotFoundText>
    </S.NotFound>
  )
}
