import React from 'react'
import ActivityHistogram from 'components/ActivityHistogram'
import { mRound, calcAccuracy } from 'utils/statutils'

function calcAverageAccuracy (stats) {
  return mRound(stats.reduce((p, c) => p + calcAccuracy(c), 0) / stats.length, 2)
}

function AccuracyViewer () {
  return (
    <>
    <ActivityHistogram calculator={calcAverageAccuracy} dataName={'accuracy'}
      memoryId={'accuracyviewer'}
    infoText={`Accuracy is the most important metric if you want to improve your typing skills.
      It is better to slow down a bit to make sure you have an accuray of at least 99% every time.
      Your speed will automatically increase as you do more typing practice.`}
    />
    </>
  )
}

export { AccuracyViewer }
