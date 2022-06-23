import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import GrowButton from 'components/GrowButton'
import SelectWordRange from './SelectWordRange'
import SelectTheme from './SelectTheme'
import SelectLimit from './SelectLimit'
import Icon from 'components/Icon'
import { CSSTransition } from 'react-transition-group'
import urls from 'utils/asseturls'
import * as S from './Settings.style.js'

// Creates a small button in the bottom right corner
// of the screen to open the settings
// This opens a tab where the user can change the
// current theme and word range
// settings could be added to this in the future
export const Settings = () => {
  const [isOpen, setIsOpen] = useState(false)
  return ReactDOM.createPortal(
    <>
    <CSSTransition in={isOpen} timeout={300} classNames="fade"
      unmountOnExit>
    <S.Settings>
      <S.SettingsContainer>
          <S.CloseButton >
            <GrowButton onClick={() => setIsOpen(false)}>
            <Icon src={urls.close} />
            </GrowButton>
          </S.CloseButton>
          <S.Setting>
            <SelectTheme />
          </S.Setting>
          <S.Setting>
            <SelectWordRange />
          </S.Setting>
          <S.Setting>
            <SelectLimit />
          </S.Setting>
      </S.SettingsContainer>
    </S.Settings>
    </CSSTransition>
    <CSSTransition in={!isOpen} timeout={300} classNames="fade"
      unmountOnExit>
      <S.Settings>
      <GrowButton onClick={() => setIsOpen(true)}>
      <Icon src={urls.settings} size={'1.5em'} />
      </GrowButton>
      </S.Settings>
    </CSSTransition>
    </>,
    document.querySelector('#root')
  )
}
