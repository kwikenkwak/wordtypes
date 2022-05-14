import React from 'react'
import { ActivityHistogram } from './activityhistogram.js'
import { mRound, calcAccuracy } from './statutils.js'

function calcAverageAccuracy (stats) {
  return mRound(stats.reduce((p, c) => p + calcAccuracy(c), 0) / stats.length, 2)
}

function AccuracyViewer () {
  return (
    <>
    <ActivityHistogram calculator={calcAverageAccuracy} dataName={'accuracy'}/>
    </>
  )
}

export { AccuracyViewer }
