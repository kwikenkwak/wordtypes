import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import HoverTooltip from 'components/HoverTooltip'
import HoverDefinition from 'components/HoverDefinition'
import useQueue from 'hooks/useQueue'
import * as S from './InteractiveWord.style.js'

function InteractiveWord ({ word, active, pureWord }) {
  const { addWord } = useQueue()
  const content = useMemo(() =>
    (<HoverTooltip hint={
      <HoverDefinition word={pureWord} />
    }>
    <S.Word onClick={() => addWord(pureWord)} active={active}>{word}</S.Word>
    </HoverTooltip>)
  , [word, active])
  return content
}

InteractiveWord.propTypes = {
  word: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  pureWord: PropTypes.string.isRequired
}

export { InteractiveWord }
