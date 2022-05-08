import React from 'react'
import PropTypes from 'prop-types'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { CustomTooltip } from './customtooltip.js'
import '../styles/stats.scss'

// Notice we set some props on the line and axes to ''
// this is to force them to take the colors from the sass file
function StandardGraph ({ data, xKey, yKey, unit, createTooltipText }) {
  return (
    <div className='grid-axis-wrapper' style={{ height: '100%', width: '100%' }}>
    <ResponsiveContainer height='100%' width='100%' >
    <LineChart data={data}>
    <Line className='stats-line' strokeWidth='' stroke='' type="monotone" dataKey={yKey} dot={false}/>
    <XAxis stroke='' dataKey={xKey} type="number" domain={['dataMin', 'dataMax']} />
    <YAxis stroke='' type="number" allowDecimals={false} />
    <Tooltip content={<CustomTooltip createText={createTooltipText}/>} cursor={{ fill: 'transparent' }}/>
    </LineChart>
    </ResponsiveContainer>
    </div>)
}

StandardGraph.propTypes = {
  data: PropTypes.array.isRequired,
  xKey: PropTypes.string.isRequired,
  yKey: PropTypes.string.isRequired,
  unit: PropTypes.string.isRequired,
  createTooltipText: PropTypes.func
}

export { StandardGraph }
