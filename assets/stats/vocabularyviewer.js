import React, { useState } from 'react'
import { PropTypes } from 'prop-types'
import { mRound, calcWPM, calcAccuracy } from './statutils.js'
import { StatsManager } from './statsmanager.js'
import { SortableList } from '../sortablelist.js'
import uuid from 'uuid'

function VocabularyViewer () {
  return (
    <SortableList items={
      [<div key={uuid()}>Hoi</div>,
       <div key={uuid()} >Doei</div>,
       <div key={uuid()} >pip</div>,
       <div key={uuid()} >sfsf</div>,
       <div key={uuid()} >blba</div>,
       <div key={uuid()} >Kaka</div>]
    }
        onChange={(l) => console.log(l)}
    />
  )
}

export { VocabularyViewer }
