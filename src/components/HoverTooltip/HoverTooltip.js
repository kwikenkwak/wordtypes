import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import Tooltip from 'components/Tooltip'
import * as S from './HoverTooltip.style.js'

function HoverTooltip ({ children, hint }) {
  const [showTooltip, setTooltip] = useState(false)
  const ref = useRef(null)
  return <>
    <S.Wrapper onMouseEnter={() => setTooltip(true)}
            onMouseLeave={() => setTooltip(false)}
            ref={ref}>
    {children}
    </S.Wrapper>
    { hint &&
      <Tooltip pos={'bottom'} text={hint} show={showTooltip} parentRef={ref} />
    }
  </>
}

HoverTooltip.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  hint: PropTypes.string
}

export { HoverTooltip }
