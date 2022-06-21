import styled from 'styled-components'
import { base } from 'utils/themeutils'

export const SpeedTab = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column;
`
export const AccuracyTab = SpeedTab

export const SpeedHeader = styled.div`
  display: flex;
`
export const AccuracyHeader = SpeedHeader

export const SpeedHeaderInfo = styled.div`
  margin-left: auto;
`
export const AccuracyHeaderInfo = SpeedHeaderInfo

export const GraphDescription = styled.p`
  margin-top: .5em;
  text-align: center;
`
export const AccuracyBarSection = styled.div`
  display: flex;
  align-items: baseline;
`

export const AccuracyBarSectionText = styled.span`
  font-size: .5em;
`

export const AccuracyBar = styled.div`
  flex-grow: 1;
  margin-left: .3em;
`

export const SpeedGraph = styled.div`
  flex-grow: 1;
  border: solid 1px ${base};
  padding: 5px;
  display: flex;
  flex-flow: column;
`
export const AccuracyGraph = SpeedGraph

export const Master = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
`
export const MasterMessage = styled.div`
  font-size: 1.5em;
`

export const MasterSmiley = styled.div`
  font-size: 3em;
`

export const StatsFlexGraph = styled.div`
  flex-grow: 1;
  width: 100%;
  height: 10px;
`
