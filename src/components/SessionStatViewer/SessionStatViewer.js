import React from 'react'
import { mRound } from 'utils/statutils'
import PropTypes from 'prop-types'
import AccuracyBar from 'components/AccuracyBar'
import TabWindow from 'components/TabWindow'
import StandardGraph from 'components/StandardGraph'
import InfoButton from 'components/InfoButton'
import Histogram from 'components/Histogram'
import urls from 'utils/asseturls'
import * as S from './SessionStatViewer.style.js'

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

function createSpeedTooltipText (value, label) {
  return [value, `Your average speed between char ${label} and char ${label + 10} was ${value} `]
}

function SpeedTab ({ stats }) {
  return (
    <S.SpeedTab>
      <S.SpeedHeader>
        Your average wmp was {mRound(stats.wpm, 2)}
        <S.SpeedHeaderInfo>
          <InfoButton text='WPM stands for words per minute and indicates how fast you type' />
        </S.SpeedHeaderInfo>
      </S.SpeedHeader>
      <S.SpeedGraph>
        <S.GraphDescription>
          Your wmp over time
        </S.GraphDescription>
        <S.StatsFlexGraph>
          <StandardGraph data={toSpeedData(stats.keysData)} xKey='progress'
            yKey='wpm' unit='wpm' createTooltipText={createSpeedTooltipText}/>
        </S.StatsFlexGraph>
      </S.SpeedGraph>
    </S.SpeedTab>
  )
}

SpeedTab.propTypes = {
  stats: PropTypes.object.isRequired
}

function getKeyStats (chars) {
  const counts = {}
  for (let { key, correct } of chars) {
    if (key === ' ') key = 'Space'
    if (!correct) counts[key] = (counts[key] || 0) + 1
  }
  return Object.keys(counts).map((c) => { return { character: c, count: counts[c] } })
}

function createAccuracyTooltipText (value, label) {
  return [value, `You mistyped the character '${label}' ${value} times`]
}

function AccuracyTab ({ stats }) {
  return (
    <S.AccuracyTab>
      <S.AccuracyHeader>
        Your accuracy was {stats.accuracy}%
        <S.AccuracyHeaderInfo>
          <InfoButton text='Accuracy is the most important metric when learning to type, it is best to focus on accuracy instead of speed' />
        </S.AccuracyHeaderInfo>
      </S.AccuracyHeader>
      <S.AccuracyBarSection>
        <S.AccuracyBarSectionText>
          Errors over time
        </S.AccuracyBarSectionText>
        <S.AccuracyBar>
          <AccuracyBar keys={stats.keysData} />
        </S.AccuracyBar>
      </S.AccuracyBarSection>

      {stats.accuracy !== 100
        ? <S.AccuracyGraph>
            <S.GraphDescription>
              Errors by character
            </S.GraphDescription>
            <S.StatsFlexGraph>
              <Histogram data={getKeyStats(stats.keysData)} xKey='character' yKey='count' createTooltipText={createAccuracyTooltipText}/>
            </S.StatsFlexGraph>
          </S.AccuracyGraph>
        : <S.Master>
        <S.MasterMessage>
          Congratulations! You are a master of typing!
        </S.MasterMessage>
        <S.MasterSmiley>
        🚀
        </S.MasterSmiley>
        </S.Master>
      }
    </S.AccuracyTab>)
}

AccuracyTab.propTypes = {
  stats: PropTypes.object.isRequired
}

function SessionStatViewer ({ stats }) {
  const buttons = [<span key={0} >Accuracy</span>,
                   <span key={1} >Speed</span>]

  return (
    <>
    <TabWindow buttons={buttons} >
      <AccuracyTab stats={stats} />
      <SpeedTab stats={stats} />
    </TabWindow>
    </>
  )
}

SessionStatViewer.propTypes = {
  stats: PropTypes.object.isRequired
}

export { SessionStatViewer }
