import React from 'react'
import PropTypes from 'prop-types'
import { urls } from './resourceurls.js'
import { Icon } from './icon.js'
import { useNavigate } from 'react-router-dom'

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

function BaseNavButton ({ targetPage, iconUrl, text }) {
  const navigate = useNavigate()
  return (
    <div className="nav-button" onClick={() => navigate(targetPage)}>
      {text}<Icon className="home-button-icon" size={'1.5em'} src={iconUrl} />
    </div>
  )
}

BaseNavButton.propTypes = {
  targetPage: PropTypes.string.isRequired,
  iconUrl: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
}

function StatsButton () {
  return <BaseNavButton targetPage={'/stats'} iconUrl={urls.statsIcon}
          text={'Stats'}/>
}

function TyperButton () {
  return <BaseNavButton targetPage={'/typer'} iconUrl={urls.typerIcon}
          text={'Start'}/>
}

function SkipButton () {
  return <BaseNavButton targetPage={'/typer'} iconUrl={urls.skipIcon}
          text={'Skip'}/>
}

function HomeButton () {
  return <BaseNavButton targetPage={'/'} iconUrl={urls.homeIcon}
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

export { StatsButton, TyperButton, SkipButton, HomeButton, BaseButton, FloatingNavButton, BaseNavButton }
