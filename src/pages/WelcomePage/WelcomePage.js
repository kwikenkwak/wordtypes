import React, { useState } from 'react'
import { useRive, Layout, Fit, Alignment } from 'rive-react'
import BufferManager from 'utils/BufferManager'
import { StatsButton, TyperButton } from 'components/Buttons'
import urls from 'utils/asseturls'
import * as S from './WelcomePage.style.js'

function WelcomePage () {
  const [, forceUpdate] = useState(0)
  const layout = new Layout({ fit: Fit.FitHeight, alignment: Alignment.TopCenter })

  const { RiveComponent } = useRive(
    {
      autoplay: true,
      animations: ['Idle'],
      layout: layout,
      src: BufferManager.isLoaded(urls.trees) ? undefined : urls.trees,
      buffer: BufferManager.load(urls.trees, forceUpdate)
    })

  return (<>
    <RiveComponent style={S.TreesStyle}/>
    <S.WelcomeContent>
    <h1>Welcome to DictionaryTyper</h1>
    <S.WelcomeText>Dolor consectetur odio aliquam dignissimos?
Consectetur velit dignissimos beatae ducimus fuga labore? Sunt provident excepturi et dolore alias sequi Aut illo repellendus vel velit quis Autem porro similique error eum ut Sed itaque et maiores harum possimus quo Culpa laborum nostrum eligendi rem odio! Praesentium voluptatem nulla ducimus tempore ullam itaque, laborum, beatae laudantium. Sunt.
    </S.WelcomeText>
    <S.NavButtons>
      <StatsButton />
      <TyperButton />
    </S.NavButtons>
    </S.WelcomeContent>
    </>)
}

export { WelcomePage }
