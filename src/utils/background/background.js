import React, { useState, useCallback, useRef, createContext } from 'react'
import Background from 'components/Background'
import PropTypes from 'prop-types'
import { v4 as uuid } from 'uuid'

export const FALLDURATION = 10000

const defaultAddParticle = (args) => {
  console.warn('Tried to use addParticle but no BackgroundProvider was' +
              'found in the above node tree')
}

export const BackgroundContext = createContext({ addParticle: defaultAddParticle })

const BackgroundProvider = ({ children }) => {
  const particleMapper = useRef({})
  const [particles, setParticles] = useState([])

  const removeParticle = (particleId) => {
    setParticles(ps => {
      ps.splice(ps.indexOf(particleId), 1)
      return [...ps]
    })
    delete particleMapper.current[particleId]
  }

  const addParticle = useCallback((particle) => {
    const particleId = uuid()
    particleMapper.current[particleId] = particle
    setParticles((ps) => [...ps, particleId])
    setTimeout(() => removeParticle(particleId), FALLDURATION)
  }, [])

  const mapParticles = () => {
    const mappedParticles = []
    for (const particleId of particles) {
      mappedParticles.push({
        args: particleMapper.current[particleId],
        particleId
      })
    }
    return mappedParticles
  }

  return (<>
    <Background particles={mapParticles()} />
    <BackgroundContext.Provider value={{ addParticle }}>
        {children}
    </BackgroundContext.Provider>
    </>
  )
}

BackgroundProvider.propTypes = {
  children: PropTypes.any
}

export { BackgroundProvider }
