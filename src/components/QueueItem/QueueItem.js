import PropTypes from 'prop-types'
import urls from 'utils/asseturls'
import React from 'react'
import * as S from './QueueItem.style.js'
import Icon from 'components/Icon'
import GrowButton from 'components/GrowButton'
import useLaunchTyper from 'hooks/useLaunchTyper'

function QueueItem ({ word, onRemove }) {
  const launchTyper = useLaunchTyper(word, true)
  return (
    <S.QueueItem>
      <S.WordPart>
        <S.Word>{word}</S.Word>
        <GrowButton onClick={launchTyper}>
        <Icon
          src={urls.queueItemGo}
          size={'1em'}
        />
        </GrowButton>
      </S.WordPart>
      <S.EndIcons>
      <GrowButton onClick={onRemove}>
        <Icon src={urls.trash} size={'1em'} />
      </GrowButton>
      <S.DragWrapper className="draghandle">
        <Icon src={urls.drag} size={'1em'}/>
      </S.DragWrapper>
      </S.EndIcons>
    </S.QueueItem>
  )
}

QueueItem.propTypes = {
  word: PropTypes.string.isRequired,
  onRemove: PropTypes.func.isRequired
}

export { QueueItem }
