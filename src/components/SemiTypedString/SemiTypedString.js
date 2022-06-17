import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import Icon from 'components/Icon'
import urls from 'utils/asseturls'
import InteractiveWord from 'components/InteractiveWord'

function getParts (string, progress, cursor) {
  const words = string.split(' ')
  const res = []
  let activeIdx = -1
  let foundCurrent = false
  let idx = 0
  for (const word of words) {
    idx += word.length + 1

    let active = false
    if (idx > progress && !foundCurrent && cursor) {
      activeIdx = words.indexOf(word)
      foundCurrent = true
      active = true
    }
    res.push({ word, active })
  }
  return [res, activeIdx]
}

function SemiTypedString ({ string, progress, cursor, isEnter = false }) {
  const [words, activeIdx] = useMemo(() => getParts(string, progress, cursor),
    [string, progress, cursor])
  const content = useMemo(() => (<>
    {words.map((args, idx) =>
      <span key={idx}>
      <InteractiveWord key={idx} {...args} />
      {idx !== words.length - 1 && <span key={idx + '0.5'}> </span>}
      </span>
    )}
      { isEnter && cursor && <Icon size='1em' src={urls.enterIcon} /> }
    </>), [string, activeIdx, isEnter])
  return content
}

SemiTypedString.propTypes = {
  string: PropTypes.string.isRequired,
  progress: PropTypes.number.isRequired,
  cursor: PropTypes.bool.isRequired,
  isEnter: PropTypes.bool
}

export { SemiTypedString }
