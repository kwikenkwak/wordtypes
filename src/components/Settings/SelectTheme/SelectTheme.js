import React from 'react'
import SelectButton from 'components/SelectButton'
import useSetting, { settings } from 'hooks/useSetting'
import * as S from './SelectTheme.style.js'

const THEME_OPTIONS = [
  'normal',
  'dark'
]

export const SelectTheme = () => {
  const [theme, setTheme] = useSetting(settings.theme)
  // TODO add more themes and change theme on select
  return (
    <S.SelectTheme>
      <S.Title>Select theme</S.Title>
      <SelectButton onChange={setTheme} choices={THEME_OPTIONS} current={theme}/>
    </S.SelectTheme>
  )
}
