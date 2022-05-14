import React from 'react'
import { ActivityHistogram } from './activityhistogram.js'
import { mRound, calcWPM } from './statutils.js'

function calcAverageWPM (stats) {
  return mRound(stats.reduce((p, c) => p + calcWPM(c), 0) / stats.length, 2)
}

function SpeedViewer () {
  return (
    <>
    <ActivityHistogram calculator={calcAverageWPM} dataName={'WPM'}/>
    </>
  )
}

export { SpeedViewer }
