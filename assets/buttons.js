import React from 'react'
import PropTypes from 'prop-types'
import { urls } from './resourceurls.js'
import { Icon } from './icon.js'

import './styles/buttons.scss'

function BaseButton ({ onClick, url, text }) {
  return (
  <a className="nav-button" onClick={onClick}>
      {text}<Icon className="home-button-icon" size={'1.5em'} src={url} />
  </a>)
}

BaseButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
}

function BaseNavButton ({ jumpPage, targetPage, iconUrl, text }) {
  return (
    <a className="nav-button" onClick={() => jumpPage(targetPage)}>
      {text}<Icon className="home-button-icon" size={'1.5em'} src={iconUrl} />
    </a>
  )
}

BaseNavButton.propTypes = {
  jumpPage: PropTypes.func.isRequired,
  targetPage: PropTypes.string.isRequired,
  iconUrl: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
}

function StatsButton ({ jumpPage }) {
  return <BaseNavButton jumpPage={jumpPage} targetPage={'stats'} iconUrl={urls.statsIcon}
          text={'Stats'}/>
}

function TyperButton ({ jumpPage }) {
  return <BaseNavButton jumpPage={jumpPage} targetPage={'typer'} iconUrl={urls.typerIcon}
          text={'Start'}/>
}

function SkipButton ({ jumpPage }) {
  return <BaseNavButton jumpPage={jumpPage} targetPage={'typer'} iconUrl={urls.skipIcon}
          text={'Skip'}/>
}

function HomeButton ({ jumpPage }) {
  return <BaseNavButton jumpPage={jumpPage} targetPage={'welcome'} iconUrl={urls.homeIcon}
          text={'Home'}/>
}

function FloatingNavButton ({ onClick, url, text }) {
  return (
  <a className="floating-nav-button" onClick={onClick}>
      {text}<Icon className="home-button-icon" size={'1.5em'} src={url} />
  </a>)
}

FloatingNavButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
}

TyperButton.propTypes = StatsButton.propTypes = SkipButton.propTypes =
  HomeButton.propTypes = {
    jumpPage: PropTypes.func.isRequired
  }

export { StatsButton, TyperButton, SkipButton, HomeButton, BaseButton, FloatingNavButton }
