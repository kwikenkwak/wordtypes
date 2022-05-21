import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { darken } from 'polished'

const Container = styled.div`
  display: flex;
  align-items: center;
  background-color: ${props => darken(0.3, props.theme.bg)};
  transition: filter ease .2s;
  border-radius: 5px;
  
  &:hover {
    filter: brightness(150%);
  }
`

const Name = styled.div`
  text-transform: uppercase;
  margin-right: auto;
  margin-left: .3em;
`

function VocabularyWord ({ stat }) {
  return (
    <Container>
      <Name>{stat.word}</Name>
    </Container>
  )
}

VocabularyWord.propTypes = {
  stat: PropTypes.object.isRequired
}

export { VocabularyWord }
