import React, { useState } from 'react'
import { PropTypes } from 'prop-types'
import { AccuracyBar } from './accuracybar.js'
import { TabWindow } from '../tabwindow.js'
import { StandardGraph } from './standardgraph.js'
import { InfoButton } from '../infobutton.js'
import { Histogram } from './histogram.js'
import { urls } from '../resourceurls.js'
import '../styles/stats.scss'
import '../styles/sessionstats.scss'

function mRound (a, n) {
  return Math.round(Math.pow(10, n) * a) / Math.pow(10, n)
}

function toSpeedData (keys) {
  const data = []
  let totalCorrect = 0
  for (let idx = 10; idx < keys.length; idx++) {
    const { time, correct } = keys[idx]
    if (!correct) continue
    data.push({ wpm: mRound((10 * 60 * 1000) / 5 / (time - keys[idx - 10].time), 2), progress: totalCorrect })
    totalCorrect += 1
  }
  return data
}

function calcWPM (stats) {
  const time = stats.keysData[stats.keysData.length - 1].time
  return ((60000 * stats.correct) / (time * 5))
}

function createSpeedTooltipText (value, label) {
  return [value, `Your average speed between char ${label} and char ${label + 10} was ${value} `]
}

function SpeedTab ({ stats }) {
  return (
    <div className="speed-tab">
    <div className="speed-header">
    Your average wmp is {mRound(calcWPM(stats), 2)}
    <div className="speed-header-info">
    <InfoButton text='WPM stands for words per minute and indicates how fast you type' />
    </div>
    </div>
    <div className="speed-graph-wrapper">
    <p className="graph-description"> Your wmp over time </p>
    <div className="stats-flex-graph">
    <StandardGraph data={toSpeedData(stats.keysData)} xKey='progress'
       yKey='wpm' unit='wpm' createTooltipText={createSpeedTooltipText}/>
    </div>
    </div>
    </div>
  )
}

SpeedTab.propTypes = {
  stats: PropTypes.object.isRequired
}

function getKeyStats (chars) {
  const counts = {}
  for (const { key, correct } of chars) {
    if (!correct) counts[key] = (counts[key] || 0) + 1
  }
  return Object.keys(counts).map((c) => { return { character: c, count: counts[c] } })
}

function createAccuracyTooltipText (value, label) {
  return [value, `You mistyped the character '${label}' ${value} times`]
}

function AccuracyTab ({ stats }) {
  const accuracy = Math.round(100 * 100 * (stats.correct / stats.total)) / 100
  return (
    <div className="accuracy-tab">
    <div className="accuracy-header">
    Your accuracy was {accuracy}%
    <div className="accuracy-header-info">
    <InfoButton text='Accuracy is the most important metric when learning to type, it is best to focus on accuracy instead of speed' />
    </div>
    </div>
    <div className="accuracy-bar-section-wrapper" >
    <span className="accuracy-bar-section-text">Errors over time</span>
    <div className="accuracy-bar-wrapper">
    <AccuracyBar keys={stats.keysData} />
    </div>
    </div>

    {accuracy !== 100
      ? <div className="speed-graph-wrapper">
    <p className="graph-description"> Errors by character </p>
    <div className="stats-flex-graph">
    <Histogram data={getKeyStats(stats.keysData)} xKey='character' yKey='count' createTooltipText={createAccuracyTooltipText}/>
    </div>
    </div>
      : <img className="img-default" style={{ margin: '0 1em' }} src={urls.perfectImage}/>
    }

    </div>)
}

AccuracyTab.propTypes = {
  stats: PropTypes.object.isRequired
}

function SessionStatViewer ({ stats }) {
  const buttons = [<span key={0} >Speed</span>,
                   <span key={1} >Accuracy</span>]

  return (
    <>
    <TabWindow buttons={buttons} >
      <SpeedTab stats={stats} />
      <AccuracyTab stats={stats} />
    </TabWindow>
    </>
  )
}

SessionStatViewer.propTypes = {
  stats: PropTypes.object.isRequired
}

export { SessionStatViewer }
