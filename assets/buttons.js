import React from 'react'
import PropTypes from 'prop-types'
import { urls } from './resourceurls'
import { Icon } from './icon'
import { useNavigate } from 'react-router-dom'
import { launchTyper } from './navutils'

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

function CustomNavButton ({ iconUrl, text, onclick }) {
  return (
    <div className="nav-button" onClick={onclick} >
      {text}<Icon className="home-button-icon" size={'1.5em'} src={iconUrl} />
    </div>
  )
}

CustomNavButton.propTypes = {
  iconUrl: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  onclick: PropTypes.func.isRequired
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
  return <BaseNavButton targetPage={'/stats/?tab=0'} iconUrl={urls.statsIcon}
          text={'Stats'}/>
}

function TyperButton () {
  const navigate = useNavigate()
  return <CustomNavButton onclick={() => launchTyper(navigate)} iconUrl={urls.typerIcon}
          text={'Start'}/>
}

function SkipWordButton () {
  const navigate = useNavigate()
  return <CustomNavButton onclick={() => launchTyper(navigate)} iconUrl={urls.skipIcon}
          text={'Skip'}/>
}

function NextWordButton () {
  const navigate = useNavigate()
  return <CustomNavButton onclick={() => launchTyper(navigate)} iconUrl={urls.skipIcon}
          text={'Next'}/>
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

export {
  StatsButton,
  TyperButton,
  SkipWordButton,
  NextWordButton,
  HomeButton,
  BaseButton,
  FloatingNavButton,
  BaseNavButton
}
