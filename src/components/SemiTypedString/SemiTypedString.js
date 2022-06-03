import React from 'react'
import PropTypes from 'prop-types'
import Icon from 'components/Icon'
import urls from 'utils/asseturls'
import * as S from './SemiTypedString.style.js'

function getParts (string, progress, cursor) {
  const words = string.split(' ')
  let done = ''
  let current = ''
  let todo = ''
  let idx = 0
  for (let word of words) {
    if (words[words.length - 1] !== word) {
      word = word + ' '
    }
    idx += word.length
    if (idx <= progress) {
      done += word
    } else if (idx > progress && current === '' && cursor) {
      current = word
    } else {
      todo += word
    }
  }
  return [done, current, todo]
}

function SemiTypedString ({ string, progress, cursor, isEnter = false }) {
  const [done, current, todo] = getParts(string, progress, cursor)
  return (<>
      <S.TextDone>
      {done}
      </S.TextDone>
      <S.CurrentWord>
      {current}
      </S.CurrentWord>
      <S.TextTodo>
      {todo}
      </S.TextTodo>
      { isEnter && cursor && <Icon size='1em' src={urls.enterIcon} /> }
    </>)
}

SemiTypedString.propTypes = {
  string: PropTypes.string.isRequired,
  progress: PropTypes.number.isRequired,
  cursor: PropTypes.bool.isRequired,
  isEnter: PropTypes.bool
}

export { SemiTypedString }
