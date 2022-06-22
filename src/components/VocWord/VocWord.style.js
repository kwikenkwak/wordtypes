import Icon from 'components/Icon'
import styled from 'styled-components'
import { base } from 'utils/themeutils'

export const VocabularyWord = styled.div`
  border-radius: 12px;
  padding: 3.09px 10.29px 3.08px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: background-color .2s ease;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: 100%;
    transition: height .2s ease;
    height: 0;
    width: .1em;
    background-color: ${base};
  }
  &:hover::after {
    height: 100%;
  }
`
export const WordTitle = styled.span`
  font-family: "Teko";
  font-size: 48px;
  font-weight: 400;
  line-height: normal;
  color: ${base};
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
  color: ${base};
  margin-right: 5px;
`
export const AccuracyIcon = styled.img`
          />
  width: 50px;
  height: 50px;
`
export const SpeedInfo = styled.div`
  margin-right: 22.63px;
  display: flex;
  align-items: center;
`
export const AgainIcon = styled(Icon)`
  margin-right: 22.63px;
`
