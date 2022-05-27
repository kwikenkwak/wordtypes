import styled from 'styled-components'
import { lighten } from 'polished'

const IconButton = styled.img`
  cursor: pointer;
  transition: filter .2s ease, transform .2s ease;

  &:hover {
    transform: scale(105%);
    filter: opacity(80%);
  }
`

export const VocabularyWord = styled.div`
  background-color: ${props => props.theme.colors.bg};
  border-radius: 12px;
  padding: 3.09px 10.29px 3.08px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: background-color .2s ease;

  &:hover {
    background-color: ${props => lighten(0.1, props.theme.colors.bg)};
  }
`
export const WordTitle = styled.span`
  font-family: "Teko";
  font-size: 48px;
  font-weight: 400;
  line-height: normal;
  color: ${props => props.theme.colors.base};
`
export const Buttons = styled.div`
  display: flex;
  align-items: center;
  align-self: stretch;
`
export const AccuracyInfo = styled.div`
  margin-right: 22.63px;
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: stretch;
`
export const AccuracyValue = styled.span`
  font-family: "Teko";
  font-size: 40px;
  font-weight: 400;
  line-height: normal;
  color: ${props => props.theme.colors.base};
  margin-right: 5px;
`
export const AccuracyIcon = styled.img`
  width: 50px;
  height: 50px;
`
export const AddQueueIcon = styled(IconButton)`
  width: 50px;
  height: 50px;
`
export const SpeedInfo = styled.div`
  margin-right: 22.63px;
  display: flex;
  align-items: center;
`
export const SpeedIcon = styled.img`
  width: 45.21px;
  height: 50px;
`
export const AgainIcon = styled(IconButton)`
  width: 55.6px;
  height: 50px;
  margin-right: 22.63px;
`
