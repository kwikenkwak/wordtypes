import React from 'react'
import IntervalSelector from 'components/IntervalSelector'
import InfoButton from 'components/InfoButton'
import useSetting, { settings } from 'hooks/useSetting'
import { spaceNumber } from 'utils/generic'
import * as S from './SelectWordRange.style.js'

const HINT_TEXT = `
  The word range controls which words will be randomly chosen
  when your queue is empty. An interval from 0 to 100 000
  will result in only getting words that are in the top
  100 000 words that are the most frequently used. With this interval
  you can thus control the difficulty of the words.
`
export const SelectWordRange = () => {
  const [range, setRange] = useSetting(settings.wordRange)
  return (
    <S.SelectWordRange>
    <S.Header>
    <S.Title>
      Word range
    </S.Title>
    <InfoButton text={HINT_TEXT} pos={'left'}/>
    </S.Header>
      <S.IntervalSelector>
      <IntervalSelector defaults={range} onChange={setRange} min={0} max={236_736}/>
      </S.IntervalSelector>
      <S.IntervalInfo>
        <S.IntervalLabel>{spaceNumber(Math.floor(range[0], 0))}</S.IntervalLabel>
        <S.IntervalLabel>{spaceNumber(Math.floor(range[1], 0))}</S.IntervalLabel>
      </S.IntervalInfo>
    </S.SelectWordRange>
  )
}
