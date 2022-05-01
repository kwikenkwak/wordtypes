import React from 'react'
import PropTypes from 'prop-types'
import { loadVoc, loadTypeStats } from './statstore.js'
import { LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts'

function StatsViewer ({ jumpPage }) {
  const words = loadVoc()
  const typeStats = loadTypeStats()
  const data = typeStats.map(({ total, correct }, idx) => {
    return { name: idx, uv: Math.round(correct / total * 10000) / 100, pv: 2400, amt: 2400 }
  })
  return (
    <>
    <p>Stats</p>
    <LineChart width={600} height={300} data={data}>
    <Line type="monotone" dataKey="uv" stroke="#8884d8" dot={false}/>
    <XAxis dataKey="name" type="number" domain={['dataMin', 'dataMax']} />
    <YAxis type="number" domain={[dataMin => Math.round(dataMin * 0.9), 100]} allowDecimals={false} unit={'%'}/>
    <Tooltip />
    </LineChart>
    <button onClick={() => jumpPage('welcome')}>HOME</button>
    </>)
}

StatsViewer.propTypes = {
  jumpPage: PropTypes.func.isRequired
}

export { StatsViewer }
