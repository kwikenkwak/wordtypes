import React, { useState } from 'react'
import { PropTypes } from 'prop-types'
import { mRound, calcWPM, calcAccuracy } from './statutils.js'
import { StatsManager } from './statsmanager.js'
import { SelectButton } from '../selectbutton.js'
import { Histogram } from './histogram.js'

import '../styles/activityhistogram.scss'

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

function title (name) {
  return name[0].toUpperCase() + name.substr(1, name.length - 1)
}

function ActivityHistogram ({ calculator, dataName }) {
  const [groupType, setGroupType] = useState(groupTypes[0])
  const [periodType, setPeriodType] = useState(periodTypes[0])
  const grouper = new DataGrouper(groupType, periodType)
  grouper.calcValues(calculator, dataName)
  return (
    <div className="activity-viewer">
        <div className="activity-histogram-wrapper">
    <div className="activity-select-buttons">
    <SelectButton current={groupType} choices={groupTypes}
                  onChange={(type) => setGroupType(type)}/>
    <div>{title(dataName)}</div>
    <SelectButton current={periodType} choices={periodTypes}
                  onChange={(type) => setPeriodType(type)}/>
    </div>

    <div className="activity-histogram">
    <Histogram data={grouper.groups} xKey={'name'} yKey={dataName}
      createTooltipText={tooltipText} />
    </div>
    </div>
        </div>
  )
}

ActivityHistogram.propTypes = {
  calculator: PropTypes.func.isRequired,
  dataName: PropTypes.string.isRequired
}

export { ActivityHistogram }
