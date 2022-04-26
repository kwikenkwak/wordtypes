import React from 'react'
import { useRive } from 'rive-react'

const animationBuffers = {}

function loadBuffer (keyName, url) {
  fetch(url).then((res) => res.arrayBuffer()).then((res) => { animationBuffers[keyName] = res })
}

loadBuffer('loadingBalls', loadingBallsUrl)

function LoadingAnimation () {
  const { rive, RiveComponent } = animationBuffers.loadingBalls
    ? useRive({
      buffer: animationBuffers.loadingBalls,
      autoplay: true,
      animations: ['Loading', 'Loadingvertical']
    })
    : { rive: null, RiveComponent: null }

  return (
    <>
    {animationBuffers.loadingBalls && <RiveComponent className="base-color-canvas"
      onMouseEnter={() => rive && rive.play()}
      onMouseLeave={() => rive && rive.pause()}
    />}
    </>
  )
}

export { LoadingAnimation }
