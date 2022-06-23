import React from 'react'
import useSetting, { settings } from 'hooks/useSetting'
import NumberSlider from 'components/NumberSlider'
import InfoButton from 'components/InfoButton'
import * as S from '../SelectWordRange/SelectWordRange.style.js'

const HINT_TEXT = `
  The maximum number of definitions to show
  when typing a word.
`

// Show a NumberSlider with one symbol and
// underneath it a label that show the user
// the current value. The limits of the
// NumberSlider are between 1 and 100.
export const SelectLimit = () => {
  const [limit, setLimit] = useSetting(settings.defLimit)
  return (
    <S.SelectWordRange>
    <S.Header>
    <S.Title>
      Definition limit
    </S.Title>
    <InfoButton pos={'left'} text={HINT_TEXT} />
    </S.Header>
    <S.IntervalSelector>
    <NumberSlider
    handles={1}
    defaults={[limit]}
    onChange={(value) => setLimit(Math.floor(value[0]))}
    min={1}
    max={100}
    />
    </S.IntervalSelector>
    <S.IntervalInfo>
    <S.IntervalLabel>
    {limit}
    </S.IntervalLabel>
    </S.IntervalInfo>
    </S.SelectWordRange>
  )
}
