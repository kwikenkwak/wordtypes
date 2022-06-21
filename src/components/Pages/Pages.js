import React, { useMemo } from 'react'

import TyperPage from 'pages/TyperPage'
import StatsPage from 'pages/StatsPage'
import WelcomePage from 'pages/WelcomePage'
import QueuePage from 'pages/QueuePage'
import Page404 from 'pages/Page404'

import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { useSearchParams, Route, Routes, useLocation } from 'react-router-dom'
import { v4 as uuid } from 'uuid'
import * as S from './Pages.style.js'

function removeTrailing (path) {
  return path[path.length - 1] !== '/' ? path : path.substr(0, path.length - 1)
}

export const Pages = () => {
  const location = useLocation()
  const [searchParams] = useSearchParams()
  const unique = useMemo(uuid, [removeTrailing(location.pathname) + searchParams.get('word')])
  return (
  <TransitionGroup>
      <CSSTransition key={unique} unmountOnExit classNames="page" timeout={2000}>
      <Routes location={location}>
      <Route exact path="/" element={
        <S.Page>
        <WelcomePage />
        </S.Page>
      }
      />
      <Route path="typer/*" element={
        <S.Page>
        <TyperPage />
        </S.Page>}
      />
      <Route path='stats/*' element={
        <S.Page>
        <StatsPage />
        </S.Page>}
      />
      <Route path='queue/*' element={
        <S.Page>
        <QueuePage />
        </S.Page>}
      />

      <Route path='*' element={
        <S.Page>
        <Page404 />
        </S.Page>}
      />

      </Routes>
      </CSSTransition>
      </TransitionGroup>
  )
}
