import React, { useState, useRef } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { Transition } from 'react-transition-group'
import * as S from './SelectButton.style.js'

function toTitle (str) {
  return str[0].toUpperCase() + str.substr(1, str.length - 1)
}

function Choices ({ parentRef, choices, current, onSelect, title, animState }) {
  const rect = parentRef.current.getBoundingClientRect()
  return ReactDOM.createPortal(
      <S.SelectOptions
            style={{ top: rect.bottom, left: rect.left }}>
      <div>
      { choices.map((choice, idx) =>
        <S.SelectOption className='select-option'
          animState={animState} key={idx} onClick={() => onSelect(choice) }>
               {title ? toTitle(choice) : choice}
          </S.SelectOption>
      )}
      </div>
      </S.SelectOptions>,
      document.querySelector('#root'))
}

Choices.propTypes = {
  parentRef: PropTypes.object,
  choices: PropTypes.array.isRequired,
  current: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
  title: PropTypes.bool.isRequired,
  animState: PropTypes.string.isRequired
}

// TODO with styled components?
function SelectButton ({ onChange, choices, current, title = true }) {
  const [isOpen, setIsOpen] = useState(false)
  const parentRef = useRef(null)

  function closeListener (e) {
    if (e.target.closest('.select-option') === null &&
        e.target.closest('.select-button') === null) {
      closeChoices()
    }
  }
  function openChoices () {
    if (!isOpen) {
      setIsOpen(true)
      document.addEventListener('click', closeListener)
    } else { closeChoices() }
  }

  function closeChoices () {
    setIsOpen(false)
    document.removeEventListener('click', closeListener)
  }

  function chooseChoice (choice) {
    onChange(choice)
    setIsOpen(false)
  }

  return (
    <>
    <S.SelectButton ref={parentRef} onClick={openChoices}
     className="select-button">
    {title ? toTitle(current) : current}
    </S.SelectButton>
      <Transition in={isOpen}
                      timeout={100} unmountOnExit>
        { state =>
            <Choices parentRef={parentRef} choices={choices}
                     onSelect={chooseChoice} current={current}
                     title={title} animState={state}/>
        }
            </Transition>
    </>
  )
}

SelectButton.propTypes = {
  onChange: PropTypes.func.isRequired,
  choices: PropTypes.array.isRequired,
  current: PropTypes.string.isRequired,
  title: PropTypes.bool
}

export { SelectButton }
