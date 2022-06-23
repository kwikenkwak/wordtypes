import React from 'react'
import { StatsButton, TyperButton, QueueButton } from 'components/Buttons'
import * as S from './WelcomePage.style.js'

function WelcomePage () {
  return (<>
    <S.WelcomeContent>
    <S.Title>WORDTYPES</S.Title>
    <S.WelcomeText>
    Wordtypes is a tool that allows you to enlarge your vocabulary
    and at the same time practice your typing skills. Just click on
    the Start button and start typing!
    </S.WelcomeText>
    <S.NavButtons>
      <StatsButton />
      <TyperButton />
      <QueueButton />
    </S.NavButtons>
    </S.WelcomeContent>
    </>)
}

export { WelcomePage }
