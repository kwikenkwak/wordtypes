import React from 'react'
import PropTypes from 'prop-types'
import { Icon } from './icon.js'
import { urls } from './resourceurls.js'

import './styles/semitypedstring.scss'

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
      <span className="text-done">
      {done}
      </span>
      <span className="current-word">
      {current}
      </span>
      <span className="text-todo">
      {todo}
      </span>
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
