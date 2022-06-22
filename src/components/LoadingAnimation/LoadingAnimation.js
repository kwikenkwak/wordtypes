import React, { useState } from 'react'
import { useRive } from 'rive-react'
import BufferManager from 'utils/BufferManager'
import * as S from './LoadingAnimation.style.js'
import urls from 'utils/asseturls'

function LoadingAnimation () {
  const [, forceUpdate] = useState(0)
  const { RiveComponent } = useRive(
    {
      autoplay: true,
      animations: ['Loading', 'Loadingvertical'],
      src: BufferManager.isLoaded(urls.loadingBalls) ? undefined : urls.loadingBalls,
      buffer: BufferManager.load(urls.loadingBalls, forceUpdate)
    })
  return (
    <S.LoadingAnimation>
    <RiveComponent />
    </S.LoadingAnimation>
  )
}

export { LoadingAnimation }
