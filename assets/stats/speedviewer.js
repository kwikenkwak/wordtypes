import React from 'react'
import { ActivityHistogram } from './activityhistogram.js'
import { mRound } from './statutils.js'

function calcAverageWPM (stats) {
  return mRound(stats.reduce((p, c) => p + c.wpm, 0) / stats.length, 2)
}

function SpeedViewer () {
  console.log('rerendered speed viewer')
  return (
    <>
    <ActivityHistogram
      calculator={calcAverageWPM} dataName={'WPM'}
      infoText={`Your WPM stands for words per minute and indicates how fast
        you type. You should not worry too much about your typing speed but
        instead focus on your accuracy, your speed will then automatically
        improve too`}
      />
    </>
  )
}

export { SpeedViewer }
