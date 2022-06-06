import PropTypes from 'prop-types'
import urls from 'utils/asseturls'
import React from 'react'
import * as S from './QueueItem.style.js'
import Icon from 'components/Icon'

function QueueItem ({ word }) {
  return (
    <S.QueueItem>
      <S.WordPart>
        <S.Word>{word}</S.Word>
        <Icon
          src={urls.queueItemGo}
          size={'1em'}
        />
      </S.WordPart>
      <Icon src={urls.drag} size={'1em'} />
    </S.QueueItem>
  )
}

QueueItem.propTypes = {
  word: PropTypes.string.isRequired
}

export { QueueItem }
