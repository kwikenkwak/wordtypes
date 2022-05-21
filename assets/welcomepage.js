import React, { useState } from 'react'
import { useRive, Layout, Fit, Alignment } from 'rive-react'
import { bufferManager } from './buffermanager.js'
import { StatsButton, TyperButton } from './buttons.js'
import { urls } from './resourceurls.js'
import './styles/homepage.scss'
import './styles/scrollbar.scss'

function WelcomePage () {
  const [, forceUpdate] = useState(0)
  const layout = new Layout({ fit: Fit.FitHeight, alignment: Alignment.TopCenter })

  const { RiveComponent } = useRive(
    {
      autoplay: true,
      animations: ['Idle'],
      layout: layout,
      src: bufferManager.isLoaded(urls.trees) ? undefined : urls.trees,
      buffer: bufferManager.load(urls.trees, forceUpdate)
    })

  return (<>
    <RiveComponent className="trees-bg" />
    <div className="welcome-content">
    <h1>Welcome to DictionaryTyper</h1>
    <p className="welcome-text" >Dolor consectetur odio aliquam dignissimos?
Consectetur velit dignissimos beatae ducimus fuga labore? Sunt provident excepturi et dolore alias sequi Aut illo repellendus vel velit quis Autem porro similique error eum ut Sed itaque et maiores harum possimus quo Culpa laborum nostrum eligendi rem odio! Praesentium voluptatem nulla ducimus tempore ullam itaque, laborum, beatae laudantium. Sunt.
    </p>
    <div className="nav-buttons">
      <StatsButton />
      <TyperButton />
    </div>
    </div>
    </>)
}

export { WelcomePage }
