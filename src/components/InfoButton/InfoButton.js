import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import Tooltip from 'components/Tooltip'
import Icon from 'components/Icon'
import urls from 'utils/asseturls'
import * as S from './InfoButton.style.js'

function InfoButton ({ text }) {
  const [showTooltip, setShowTooltip] = useState(false)
  const pRef = useRef()
  return (<>
      <S.IconWrapper ref={pRef}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}>

      <Icon src={urls.infoIcon} />
    </S.IconWrapper>
      <Tooltip show={showTooltip} pos={'left'} text={text} parentRef={pRef} />
    </>)
}

InfoButton.propTypes = {
  text: PropTypes.string.isRequired
}

export { InfoButton }
