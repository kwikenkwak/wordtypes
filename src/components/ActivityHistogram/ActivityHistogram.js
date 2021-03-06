import React, { useMemo } from 'react'
import useStore from 'hooks/useStore'
import PropTypes from 'prop-types'
import StatsManager from 'utils/StatsManager'
import SelectButton from 'components/SelectButton'
import Histogram from 'components/Histogram'
import InfoButton from 'components/InfoButton'
import { title } from 'utils/generic'
import styled from 'styled-components'
import {
  ActivityViewerDiv,
  ActivityHistogramDiv,
  ActivityHistogramWrapper,
  ActivitySelectButtons
} from './ActivityHistogram.style.js'

function tooltipText (value, label, payload) {
  const { name, groupType } = payload[0].payload
  const dataName = payload[0].dataKey
  let description
  if (groupType === 'Per word') {
    description = `Your average ${dataName} for 
                   the word ${name} was ${value}`
  } else if (groupType === 'Per day') {
    description = `Your average ${dataName} on 
                   ${name} was ${value}`
  } else if (groupType === 'Per week') {
    description = `Your average ${dataName} in the week of 
                   ${name} was ${value}`
  } else if (groupType === 'Per month' ||
             groupType === 'Per year') {
    description = `Your average ${dataName} in 
                   ${name} was ${value}`
  }
  return [value, description]
}

// Helper function to delete all stat without a date
// not so usefull anymore
function cleanStats () {
  const stats = JSON.parse(localStorage.getItem(StatsManager.wordStatsName))
  for (const key of Object.keys(stats)) {
    if (stats[key].date === undefined) {
      delete stats[key]
    }
  }
  localStorage.setItem(StatsManager.wordStatsName, JSON.stringify(stats))
}

const groupTypes = [
  'Per word',
  'Per day',
  'Per week',
  'Per month',
  'Per year']

const periodTypes = [
  'All time',
  'Last week',
  'Last month',
  'Last year'
]

function clearDayData (date) {
  date.setHours(0)
  date.setMinutes(0)
  date.setSeconds(0)
  date.setMilliseconds(0)
}

function getGroupName (date, groupType) {
  date = new Date(date.getTime())
  if (groupType === 'Per time') return date
  clearDayData(date)
  let name
  if (groupType === 'Per day') {
    name = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
  } else if (groupType === 'Per week') {
    date.setDate(date.getDate() - date.getDay())
    name = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
  } else if (groupType === 'Per month') {
    date.setDate(1)
    const monthName = date.toLocaleString('default', { month: 'long' })
    name = `${monthName} ${date.getFullYear()}`
  } else if (groupType === 'Per year') {
    date.setMonth(0, 0)
    name = date.getFullYear()
  }
  return { groupName: name, groupDate: date }
}

function getMinDate (periodType) {
  return getGroupName(new Date(), {
    'All time': 'Per word',
    'Last week': 'Per week',
    'Last month': 'Per month',
    'Last year': 'Per year'
  }[periodType]).groupDate
}

const StatTitle = styled.div`
  display: flex;
  align-items: center;
`

const StatTitleText = styled.span`
  margin-right: .2em;
  padding-top: .1em;
  line-height: .5em;
`

class DataGrouper {
  constructor (groupType, periodType) {
    this.groupType = groupType
    this.periodType = periodType
    this.minDate = getMinDate(periodType)
    this.groups = []
    this.addStats(StatsManager.loadStats())
  }

  addStats (stats) {
    for (const stat of Object.values(stats)) {
      // Convert the date from a string to a
      // date object
      stat.date = new Date(stat.date)
      this.addStat(stat)
    }
  }

  addStat (stat) {
    if (stat.date < this.minDate && this.periodType !== 'All time') return

    const { groupName, groupDate } = getGroupName(stat.date, this.groupType)
    if (this.groupType !== 'Per word') {
      for (const group of this.groups) {
        if (group.name === groupName) {
          group.stats.push(stat)
          return
        }
      }
      const newGroup = {
        stats: [stat],
        name: groupName,
        date: groupDate,
        groupType: this.groupType
      }
      this.insertSorted(newGroup)
    } else {
      this.insertSorted({
        stats: [stat],
        name: stat.word,
        date: stat.date,
        groupType: this.groupType
      })
    }
  }

  insertSorted (group) {
    let m = 0
    let M = this.groups.length

    while (m < M) {
      const middle = Math.floor((m + M) / 2)
      if (this.groups[middle].date > group.date) {
        M = middle
      } else if (this.groups[middle].date === group.date) {
        break
      } else {
        m = middle + 1
      }
    }

    this.groups.splice(m, 0, group)
  }

  setNameKey (nameKey) {
    for (const group of this.groups) {
      group[nameKey] = group.name
    }
  }

  calcValues (calculater, valueKey) {
    for (const group of this.groups) {
      group[valueKey] = calculater(group.stats)
    }
  }
}

function ActivityHistogram ({ calculator, dataName, memoryId, infoText = '' }) {
  const [groupType, setGroupType] = useStore(memoryId + 'group', groupTypes[0])
  const [periodType, setPeriodType] = useStore(memoryId + 'period', periodTypes[0])

  const groups = useMemo(() => {
    const grouper = new DataGrouper(groupType, periodType)
    grouper.calcValues(calculator, dataName)
    return grouper.groups
  }, [groupType, periodType])

  const histogram = useMemo(() => <Histogram data={groups} xKey={'name'} yKey={dataName}
      createTooltipText={tooltipText} />, [groups])

  return (
    <ActivityViewerDiv>
      <ActivityHistogramWrapper>
        <ActivitySelectButtons>
          <SelectButton current={groupType} choices={groupTypes}
                  onChange={(type) => setGroupType(type)}/>
          <StatTitle>
            <StatTitleText>{title(dataName)}</StatTitleText>
            { infoText && <InfoButton text={infoText} />}
          </StatTitle>
          <SelectButton current={periodType} choices={periodTypes}
                  onChange={(type) => setPeriodType(type)}/>
        </ActivitySelectButtons>
        <ActivityHistogramDiv>
          {histogram}
        </ActivityHistogramDiv>
      </ActivityHistogramWrapper>
    </ActivityViewerDiv>
  )
}

ActivityHistogram.propTypes = {
  calculator: PropTypes.func.isRequired,
  dataName: PropTypes.string.isRequired,
  infoText: PropTypes.string,
  memoryId: PropTypes.string.isRequired
}

export { ActivityHistogram }
