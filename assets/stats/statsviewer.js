import React from 'react'
import PropTypes from 'prop-types'
// import { loadVoc, loadTypeStats } from './statsmanager.js'
import { LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts'
import { StandardGraph } from './standardgraph.js'
import '../styles/stats.scss'

function StatsViewer ({ jumpPage }) {
  const testData = [{ wpm: 60, idx: 0 }, { wpm: 60, idx: 1 }, { wpm: 40, idx: 2 }, { wpm: 80, idx: 3 }, { wpm: 65, idx: 4 }]
  return (
    <>
    <div style={{ width: '100%', height: '500px' }}>
      <StandardGraph data={testData} xKey='idx'
       yKey='wpm' unit='wpm'/>
    </div>
    </>)
}

/*
<p>Stats</p>
    <LineChart width={600} height={300} data={data}>
    <Line className='stats-line' type="monotone" dataKey="accuracy" color="black" dot={false}/>
    <XAxis dataKey="name" type="number" domain={['dataMin', 'dataMax']} />
    <YAxis type="number" domain={[dataMin => Math.round(dataMin * 0.9), 100]} allowDecimals={false} unit={'%'}/>
    <Tooltip />
    </LineChart>
    <button onClick={() => jumpPage('welcome')}>HOME</button>
    */

StatsViewer.propTypes = {
  jumpPage: PropTypes.func.isRequired
}

export { StatsViewer }
