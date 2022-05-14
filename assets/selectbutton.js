import React, { useState, useRef } from 'react'
import ReactDOM from 'react-dom'
import { PropTypes } from 'prop-types'
import { CSSTransition } from 'react-transition-group'

import './styles/selectbutton.scss'

function Choices ({ parentRef, choices, current, onSelect }) {
  const rect = parentRef.current.getBoundingClientRect()
  return ReactDOM.createPortal(
      <div className="select-options"
            style={{ top: rect.bottom, left: rect.left }}>
      <div className="slide-wrapper">
      { choices.map((choice, idx) =>
          <div key={idx} onClick={() => onSelect(choice) }
               className="select-option">{choice}</div>
      )}
      </div>
      </div>,
      document.querySelector('#root'))
}

Choices.propTypes = {
  parentRef: PropTypes.object,
  choices: PropTypes.array.isRequired,
  current: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired
}

function SelectButton ({ onChange, choices, current }) {
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
      <div className="select-button" ref={parentRef} onClick={openChoices}>{current}</div>
      <CSSTransition in={isOpen} classNames="select-options"
                      timeout={100} unmountOnExit >
            <Choices parentRef={parentRef} choices={choices}
                     onSelect={chooseChoice} current={current} />
            </CSSTransition>
    </>
  )
}

SelectButton.propTypes = {
  onChange: PropTypes.func.isRequired,
  choices: PropTypes.array.isRequired,
  current: PropTypes.string.isRequired
}

export { SelectButton }
