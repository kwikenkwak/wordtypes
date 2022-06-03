import React from 'react'
import PropTypes from 'prop-types'
import { Line, LineChart, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import CustomTooltip from 'components/CustomTooltip'
import * as S from './StandardGraph.style.js'

// Notice we set some props on the line and axes to ''
// this is to force them to take the colors from the sass file
function StandardGraph ({ data, xKey, yKey, unit, createTooltipText }) {
  return (
    <S.GridAxis style={{ height: '100%', width: '100%' }}>
      <ResponsiveContainer height='100%' width='100%' >
        <LineChart data={data}>
          <Line strokeWidth='.2em' stroke='' type="monotone" dataKey={yKey} dot={false}/>
          <XAxis stroke='' dataKey={xKey} type="number" domain={['dataMin', 'dataMax']} />
          <YAxis stroke='' type="number" allowDecimals={false} />
          <Tooltip content={<CustomTooltip createText={createTooltipText}/>} cursor={{ fill: 'transparent' }}/>
        </LineChart>
      </ResponsiveContainer>
    </S.GridAxis>)
}

StandardGraph.propTypes = {
  data: PropTypes.array.isRequired,
  xKey: PropTypes.string.isRequired,
  yKey: PropTypes.string.isRequired,
  unit: PropTypes.string.isRequired,
  createTooltipText: PropTypes.func
}

export { StandardGraph }
