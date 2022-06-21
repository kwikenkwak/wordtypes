import React from 'react'
import TabWindow from 'components/TabWindow'
import SpeedViewer from 'components/SpeedViewer'
import AccuracyViewer from 'components/AccuracyViewer'
import VocViewer from 'components/VocViewer'
import { BackToHomeButton } from 'components/Buttons'
import * as S from './StatsPage.style.js'

function StatsPage () {
  const buttons = ['Accuracy', 'Speed', 'Vocabulary']
  return (
    <S.StatsPage>
    <S.StatsPageContent>
    <TabWindow buttons={buttons} useUrls>
      <AccuracyViewer />
      <SpeedViewer />
      <VocViewer />
    </TabWindow>
    <BackToHomeButton />
    </S.StatsPageContent>
    </S.StatsPage>)
}

export { StatsPage }
