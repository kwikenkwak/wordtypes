import React, { useState } from 'react'
import { useRive, Layout, Fit, Alignment } from 'rive-react'
import PropTypes from 'prop-types'
import { bufferManager } from './buffermanager.js'
import { Icon } from './icon.js'
import './styles/homepage.scss'
import './styles/scrollbar.scss'

function WelcomePage ({ jumpPage }) {
  const [, forceUpdate] = useState(0)
  const layout = new Layout({ fit: Fit.FitHeight, alignment: Alignment.TopCenter })

  const { rive, RiveComponent } = useRive(
    {
      autoplay: true,
      animations: ['Idle'],
      layout: layout,
      src: bufferManager.isLoaded(treesUrl) ? undefined : treesUrl,
      buffer: bufferManager.load(treesUrl, forceUpdate)
    })

  return (<>
    <RiveComponent className="trees-bg" />
    <div className="welcome-content">
    <h1>Welcome to DictionaryTyper</h1>
    <p className="welcome-text" >Dolor consectetur odio aliquam dignissimos?
Consectetur velit dignissimos beatae ducimus fuga labore? Sunt provident excepturi et dolore alias sequi Aut illo repellendus vel velit quis Autem porro similique error eum ut Sed itaque et maiores harum possimus quo Culpa laborum nostrum eligendi rem odio! Praesentium voluptatem nulla ducimus tempore ullam itaque, laborum, beatae laudantium. Sunt.
    </p>
    <div className="nav-buttons">
    <a className="nav-button" onClick={() => jumpPage('stats')}>
        Stats<Icon className="home-button-icon" size={'1.5em'} src={statsIconUrl} />
    </a>
    <a className="nav-button" onClick={() => jumpPage('typer')}>
        Start<Icon className="home-button-icon" size={'1.5em'} src={typerIconUrl} />
    </a>
    </div>
    </div>
    </>)
}

WelcomePage.propTypes = {
  jumpPage: PropTypes.func.isRequired
}

export { WelcomePage }
