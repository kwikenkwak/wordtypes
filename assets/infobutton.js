import React, { useState, useRef } from 'react'
import styled from 'styled-components'
import { PropTypes } from 'prop-types'
import { Tooltip } from './tooltip.js'
import { Icon } from './icon.js'
import { urls } from './resourceurls.js'

const IconWrapper = styled.div`
  filter: invert(100%);
  opacity: 80%;
  display: flex;
`

function InfoButton ({ text }) {
  const [showTooltip, setShowTooltip] = useState(false)
  const pRef = useRef()
  return (<>
      <IconWrapper ref={pRef}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}>

      <Icon src={urls.infoIcon} />
    </IconWrapper>
      <Tooltip show={showTooltip} pos={'left'} text={text} parentRef={pRef} />
    </>)
}

InfoButton.propTypes = {
  text: PropTypes.string.isRequired
}

export { InfoButton }
