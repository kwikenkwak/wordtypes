import React, { useState } from 'react'
import { PropTypes } from 'prop-types'
import { AccuracyBar } from './accuracybar.js'
import { TabWindow } from '../tabwindow.js'
import { StandardGraph } from './standardgraph.js'
import '../styles/stats.scss'

function toSpeedData (keys) {
  const data = []
  let totalCorrect = 0
  for (let idx = 10; idx < keys.length; idx++) {
    const { time, correct } = keys[idx]
    if (!correct) continue
    data.push({ wpm: (10 * 60 * 1000) / 5 / (time - keys[idx - 10].time), progress: totalCorrect })
    totalCorrect += 1
  }
  console.log(data)
  return data
}

function SessionStatViewer ({ stats }) {
  const [slideCurrent, setSlideCurrent] = useState(0)
  return (
    <>
    <AccuracyBar keys={stats.keysData} />
    <button onClick={() => setSlideCurrent(0)}>First</button>
    <button onClick={() => setSlideCurrent(1)}>Second</button>
    <div style={{ width: '100%', height: '500px' }}>
    <TabWindow current={slideCurrent} >
      <StandardGraph data={toSpeedData(stats.keysData)} xKey='progress'
       yKey='wpm' unit='wpm'/>
      <h1>Shit</h1>
    </TabWindow>
    </div>
    </>
  )
}

SessionStatViewer.propTypes = {
  stats: PropTypes.object.isRequired
}

export { SessionStatViewer }
