import React from 'react'
import TabWindow from 'components/TabWindow'
import SpeedViewer from 'components/SpeedViewer'
import AccuracyViewer from 'components/AccuracyViewer'
import VocViewer from 'components/VocViewer'
import { FloatingNavButton } from 'components/Buttons'
import urls from 'utils/asseturls'
import { useNavigate } from 'react-router-dom'
import * as S from './StatsPage.style.js'

function StatsPage () {
  const buttons = ['Accuracy', 'Speed', 'Vocabulary']
  const navigate = useNavigate()
  return (
    <S.StatsPage>
    <S.StatsPageContent>
    <TabWindow buttons={buttons}>
      <AccuracyViewer />
      <SpeedViewer />
      <VocViewer />
    </TabWindow>
    <FloatingNavButton onClick={() => navigate('/')}
      text={'Back to home'} url={urls.homeIcon} />
    </S.StatsPageContent>
    </S.StatsPage>)
}

export { StatsPage }
