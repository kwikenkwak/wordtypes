import React, { useEffect, useState } from 'react'
import { useRive } from 'rive-react'
import { bufferManager } from './buffermanager.js'
import PropTypes from 'prop-types'

function LoadingAnimation () {
  const [, forceUpdate] = useState(0)
  const { rive, RiveComponent } = useRive(
    {
      autoplay: true,
      animations: ['Loading', 'Loadingvertical'],
      src: bufferManager.isLoaded(loadingBallsUrl) ? undefined : loadingBallsUrl,
      buffer: bufferManager.load(loadingBallsUrl, forceUpdate)
    })
  return <RiveComponent className="base-color-canvas"/>
}

export { LoadingAnimation }
