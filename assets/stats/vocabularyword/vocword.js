import React from 'react'
import styled from 'styled-components'

export const Vocabularyitem = styled.div`
  background-color: ${props =>
    props.theme.colors.darkGoldenrod};
  border-radius: 12px;
  padding: 3px 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`
export const Textinput = styled.span`
  height: 29.05px;
  width: 113.13px;
  font-size: 21px;
  font-weight: 400;
  line-height: normal;
  color: ${props => props.theme.colors.white};
  display: flex;
  align-items: center;
`
export const Buttons = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 231px;
  position: relative;
`
export const Accuracy = styled.div`
  display: flex;
`
export const Accuracyvalue = styled.span`
  height: 23.32px;
  width: 41.68px;
  font-size: 20px;
  font-weight: 400;
  line-height: normal;
  color: ${props => props.theme.colors.white};
  display: flex;
`
export const Accuracyicon = styled.img`
  width: 25.43px;
  height: 25.43px;
  right: -0.01px;
  top: 0;
`
export const Speed = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`
export const Speedvalue = styled.span`
  height: 23.33px;
  width: 27.12px;
  font-size: 20px;
  font-weight: 400;
  line-height: normal;
  color: ${props => props.theme.colors.white};
  display: flex;
`
export const Speedicon = styled.img`
  width: 23.44px;
  height: 25.92px;
`
export const Againicon = styled.img`
  width: 24.52px;
  height: 22.05px;
`
export const Addtoqueueicon = styled.img`
  width: 22.23px;
  height: 22.05px;
  left: 209.18px;
  top: 1.93px;
`

const VocabularyWord = () => {
  return (
    <Vocabularyitem>
      <Textinput>Delicious</Textinput>
      <Buttons>
        <Accuracy>
          <Accuracyvalue>98%</Accuracyvalue>
          <Accuracyicon
            alt=""
            src="https://static.overlay-tech.com/assets/7348aa20-5145-4837-83f5-fe92901c6b50.svg"
          />
        </Accuracy>
        <Speed>
          <Speedvalue>76</Speedvalue>
          <Speedicon
            alt=""
            src="https://static.overlay-tech.com/assets/5e348d52-16a9-4710-88c5-32183035271e.svg"
          />
        </Speed>
        <Againicon
          alt=""
          src="https://static.overlay-tech.com/assets/aece3968-ccc1-4d1f-afe5-5066dd2f0e91.svg"
        />
        <Addtoqueueicon
          alt=""
          src="https://static.overlay-tech.com/assets/6ec1e71c-e23d-4612-b320-9b9eca342a61.png"
        />
      </Buttons>
    </Vocabularyitem>
  )
}

export { VocabularyWord }
