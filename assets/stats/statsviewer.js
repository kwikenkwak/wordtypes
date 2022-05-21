import React from 'react'
import { TabWindow } from '../tabwindow.js'
import { SpeedViewer } from './speedviewer.js'
import { AccuracyViewer } from './accuracyviewer.js'
import { VocabularyViewer } from './vocabularyviewer/vocabularyviewer.js'
import { FloatingNavButton } from '../buttons.js'
import { urls } from '../resourceurls.js'
import { useNavigate } from 'react-router-dom'
import '../styles/stats.scss'

function StatsViewer () {
  const buttons = ['Accuracy', 'Speed', 'Vocabulary']
  const navigate = useNavigate()
  return (
    <div className="stats-viewer">
    <div className="stats-viewer-content">
    <TabWindow buttons={buttons}>
      <AccuracyViewer />
      <SpeedViewer />
      <VocabularyViewer />
    </TabWindow>
    <FloatingNavButton onClick={() => navigate('/')}
      text={'Back to home'} url={urls.homeIcon} />
    </div>
    </div>)
}

export { StatsViewer }
