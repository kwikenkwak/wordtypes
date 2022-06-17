import React, { useState, useRef, useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'
import LoadingAnimation from 'components/LoadingAnimation'
import { loadDefinition } from 'utils/wordloading'
import useIntersectionObserver from 'hooks/useIntersectionObserver'
import Definitions from './Definitions.js'
import * as S from './HoverDefinition.style.js'

function HoverDefinition ({ word }) {
  const [isLoading, setIsLoading] = useState(true)
  const [wordInfo, setWordInfo] = useState(null)
  const [target, setTarget] = useState(null)
  const ref = useRef()

  const onLoadComplete = (data) => {
    console.log(data)
    setWordInfo(data)
    setIsLoading(false)
  }

  const startLoading = useCallback(() => {
    if (!wordInfo) { loadDefinition(onLoadComplete, word) }
  }, [])

  useEffect(() => {
    setTarget(ref.current)
  }, [])

  useIntersectionObserver(null, target, startLoading, 0.5)

  return <S.HoverDefinition ref={ref}>
    {isLoading
      ? <LoadingAnimation />
      : <Definitions wordInfo={wordInfo} />
    }
    </S.HoverDefinition>
}

HoverDefinition.propTypes = {
  word: PropTypes.string.isRequired
}

export { HoverDefinition }
