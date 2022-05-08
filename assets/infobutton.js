import React, { useState, useRef } from 'react'
import { PropTypes } from 'prop-types'
import { Tooltip } from './tooltip.js'
import { Icon } from './icon.js'
import { urls } from './resourceurls.js'

function InfoButton ({ text }) {
  const [showTooltip, setShowTooltip] = useState(false)
  const pRef = useRef()
  return (<>
      <div ref={pRef} className="home-button-icon"
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}>

      <Icon src={urls.infoIcon} />
    </div>
      <Tooltip show={showTooltip} pos={'left'} text={text} parentRef={pRef} />
    </>)
}

InfoButton.propTypes = {
  text: PropTypes.string.isRequired
}

export { InfoButton }
