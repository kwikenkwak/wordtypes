import React from 'react'
import PropTypes from 'prop-types'
import { TabWindow } from '../tabwindow.js'
import { SpeedViewer } from './speedviewer.js'
import { AccuracyViewer } from './accuracyviewer.js'
import { VocabularyViewer } from './vocabularyviewer/vocabularyviewer.js'
import { FloatingNavButton } from '../buttons.js'
import { urls } from '../resourceurls.js'
import '../styles/stats.scss'

function StatsViewer ({ jumpPage }) {
  const buttons = ['Accuracy', 'Speed', 'Vocabulary']
  return (
    <div className="stats-viewer">
    <div className="stats-viewer-content">
    <TabWindow buttons={buttons}>
      <AccuracyViewer />
      <SpeedViewer />
      <VocabularyViewer />
    </TabWindow>
    <FloatingNavButton onClick={() => jumpPage('welcome')}
      text={'Back to home'} url={urls.homeIcon} />
    </div>
    </div>)
}

StatsViewer.propTypes = {
  jumpPage: PropTypes.func.isRequired
}

export { StatsViewer }
