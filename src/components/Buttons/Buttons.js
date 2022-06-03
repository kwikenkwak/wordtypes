import React from 'react'
import PropTypes from 'prop-types'
import urls from 'utils/asseturls'
import Icon from 'components/Icon'
import { useNavigate } from 'react-router-dom'
import { launchTyper } from 'utils/navutils'
import * as S from './Buttons.style.js'

function BaseButton ({ onClick, url, text }) {
  return (
  <S.NavButton onClick={onClick}>
    {text}
    <S.InvertIcon>
    <Icon size={'1.5em'} src={url} />
    </S.InvertIcon>
  </S.NavButton>)
}

BaseButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
}

function BaseNavButton ({ targetPage, iconUrl, text }) {
  const navigate = useNavigate()
  return (
    <BaseButton url={iconUrl} onClick={() => navigate(targetPage)} text={text}/>
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
  return <BaseButton onClick={() => launchTyper(navigate)} url={urls.typerIcon}
          text={'Start'}/>
}

function SkipWordButton () {
  const navigate = useNavigate()
  return <BaseButton onClick={() => launchTyper(navigate)} url={urls.skipIcon}
          text={'Skip'}/>
}

function NextWordButton () {
  const navigate = useNavigate()
  return <BaseButton onClick={() => launchTyper(navigate)} url={urls.skipIcon}
          text={'Next'}/>
}

function HomeButton () {
  return <BaseNavButton targetPage={'/'} iconUrl={urls.homeIcon}
          text={'Home'}/>
}

function FloatingNavButton ({ onClick, url, text }) {
  return (
  <S.FloatingNavButton onClick={onClick}>
    {text}
    <S.InvertIcon>
      <Icon size={'1.5em'} src={url} />
    </S.InvertIcon>
  </S.FloatingNavButton>
  )
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
  FloatingNavButton,
  BaseNavButton
}
