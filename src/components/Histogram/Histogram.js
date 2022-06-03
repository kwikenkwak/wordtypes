import React from 'react'
import PropTypes from 'prop-types'
import { Bar, BarChart, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import CustomTooltip from 'components/CustomTooltip'
import * as S from './Histogram.style.js'

function Histogram ({ data, xKey, yKey, createTooltipText }) {
  return (

    <S.GridAxisWrapper style={{ height: '100%', width: '100%' }}>
    <ResponsiveContainer height='100%' width='100%' barCategoryGap='30%'>
      <BarChart data={data}>
        <XAxis stroke='' dataKey={xKey} />
        <YAxis stroke=''/>
        <Tooltip content={<CustomTooltip createText={createTooltipText}/>} cursor={{ fill: 'transparent' }}/>
        <Bar dataKey={yKey} fill="" stroke=""/>
      </BarChart>
    </ResponsiveContainer>
    </S.GridAxisWrapper>
  )
}

Histogram.propTypes = {
  data: PropTypes.array.isRequired,
  xKey: PropTypes.string.isRequired,
  yKey: PropTypes.string.isRequired,
  createTooltipText: PropTypes.func
}

export { Histogram }
