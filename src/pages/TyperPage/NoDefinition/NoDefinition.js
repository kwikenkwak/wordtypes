// Make clear to the user that a definition could not
// be found for the word. Say we are doing our best to
// improve the definition quality. Also suggest to go
// for a more simple form of the word.
// Also show a thinking smiley
import React from 'react'
import * as S from './NoDefinition.style.js'
import Icon from 'components/Icon'
import urls from 'utils/asseturls'

export const NoDefinition = () => {
  return (
    <S.NoDefinition>
      <S.NoDefinitionTitle>
    No definition found
    </S.NoDefinitionTitle>
    <Icon src={urls.thinking} size={'3em'} />
    <S.NoDefinitionText>
    We are working hard to improve the definition quality.
    Using a more simple form of the word may help.
    </S.NoDefinitionText>
    </S.NoDefinition>
  )
}
