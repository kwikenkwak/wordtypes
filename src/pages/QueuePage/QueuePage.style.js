import styled from 'styled-components'
import { base } from 'utils/themeutils'

export const QueuePage = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-flow: column;
`

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  flex-grow: 1;
  padding: 59px 130px;
  max-height: calc(100% - 130px);
`
export const ContentWindow = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 10px;
  border: 3px solid ${base};
  border-bottom: none;
  border-top: none;
  flex-grow: 1;
  overflow: hidden;
`
export const Title = styled.div`
  font-size: 139px;
  font-family: Teko;
  line-height: 1;
  baseline: 0;
  color: ${base};
`
export const Queuecontent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  padding: 10px;
  overflow: hidden;
`
export const InfoTab = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 21px 8px;
  gap: 10px;
  width: 33%;
`

export const AddTab = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 20px;
  gap: 1px;
  width: 33%;
`

export const QueueWrapper = styled.div`
  width: 33%;
  max-height: 100%;
  overflow-y: auto;
`

export const QueueItemList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`
export const SubTitle = styled.div`
  text-align: left;
  vertical-align: top;
  font-size: 56px;
  font-family: Teko;
  line-height: 1;
  color: ${base};
`
export const NormalText = styled.div`
  text-align: left;
  vertical-align: top;
  font-size: 26px;
  font-family: Teko;
  line-height: auto;
  color: ${base};
`

export const Addaword = styled.div`
  border-bottom: 1px solid ${base};
  width: 100%;
`
