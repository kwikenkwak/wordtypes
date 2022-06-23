import React from 'react'
import PropTypes from 'prop-types'
import * as S from './Definitions.style.js'

const MAXDEFINITIONS = 3
const MAXLENGTH = 150

function getDefinitions (wordInfo, limit) {
  const res = []
  for (let idx = 0; idx < wordInfo.definitions.length && idx < limit; idx++) {
    const def = wordInfo.definitions[idx]
    // limit the length of the def to the MAXLENGTH
    const defText = def.definition.length > MAXLENGTH
      ? def.definition.slice(0, MAXLENGTH) + '...'
      : def.definition
    res.push({ type: def.type, def: defText })
  }
  return res
}

function Definitions ({ wordInfo }) {
  const defs = getDefinitions(wordInfo, MAXDEFINITIONS)
  return <S.Definitions>
    {defs.length
      ? defs.map(({ type, def }, idx) =>
      <S.Definition key={idx}>
        <S.DefType>{type}</S.DefType>
        <S.DefText>{def}</S.DefText>
      </S.Definition>)
      : <S.Definition>Could not find any definitions of this word</S.Definition>
    }
      <S.AddInfo>Click to add to your Queue</S.AddInfo>
      </S.Definitions>
}

Definitions.propTypes = {
  wordInfo: PropTypes.object.isRequired
}

export { Definitions as default }
