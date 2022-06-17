import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import HoverTooltip from 'components/HoverTooltip'
import HoverDefinition from 'components/HoverDefinition'
import useQueue from 'hooks/useQueue'
import * as S from './InteractiveWord.style.js'

function InteractiveWord ({ word, active }) {
  console.log('interactive word updated!')
  const { addWord } = useQueue()
  const content = useMemo(() =>
    (<HoverTooltip hint={
      <HoverDefinition word={word} />
    }>
    <S.Word onClick={() => addWord(word)} active={active}>{word}</S.Word>
    </HoverTooltip>)
  , [word, active])
  return content
}

InteractiveWord.propTypes = {
  word: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired
}

export { InteractiveWord }
