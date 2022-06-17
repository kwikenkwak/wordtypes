import React from 'react'
import PropTypes from 'prop-types'
import HoverTooltip from 'components/HoverTooltip'
import Icon from 'components/Icon'
import urls from 'utils/asseturls'
import * as S from './InfoButton.style.js'

function InfoButton ({ text, pos = 'bottom' }) {
  return (<>
      <HoverTooltip hint={text} pos={pos}>
        <S.IconWrapper>
          <Icon src={urls.infoIcon} />
        </S.IconWrapper>
      </HoverTooltip>
    </>)
}

InfoButton.propTypes = {
  text: PropTypes.string.isRequired,
  pos: PropTypes.string
}

export { InfoButton }
