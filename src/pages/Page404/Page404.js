import React from 'react'
import { HomeButton } from 'components/Buttons'
import * as S from './Page404.style.js'

export const Page404 = () => {
  return (
    <S.Page404>
    <S.Message>
      404! Page not found 😢
    </S.Message>
    <HomeButton />
    </S.Page404>
  )
}
