import React from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import { useSortableList } from './sortablelistlogic.js'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import './styles/sortablelist.scss'

function cNames (names) {
  const classes = []
  for (const name of names) {
    if (name[1]) {
      classes.push(name[0])
    }
  }
  return classes.join(' ')
}

function RenderRoot ({ children, pos, animate = false }) {
  return ReactDOM.createPortal(
    <div className={animate
      ? 'root-floater root-floater-animate'
      : 'root-floater'}
         style={{ left: pos.x, top: pos.y }}>
    {children} </div>,
    document.querySelector('#root')
  )
}

function SortableList ({ items, onChange, dragClass }) {
  const {
    listeners, list, dragged, draggedPos, ids,
    animDrag, ghost, ghostHeight, animDisabled, inserted,
    hidden
  } = useSortableList(items, onChange, dragClass)
  return (
    <>
    <TransitionGroup className="sortable-list">
    { list.map((ele, idx) =>
      (<CSSTransition timeout={200} classNames="sortable-list-item" key={ids[idx]}>
        <div
          className={cNames([['sortable-list-item', true],
            ['sortable-list-item-animated', animDisabled !== idx && inserted !== idx],
            ['sortable-list-item-hidden', hidden === idx]])}
          onMouseDown={listeners[idx]}
          style={{ marginTop: ghost === idx ? ghostHeight + 'px' : '0' }}
        >
        <div className="sortable-list-item-inner">
        {ele}
        </div>
      </div>
        </CSSTransition>
      ))
    }
    </TransitionGroup>

    <RenderRoot pos={draggedPos} animate={animDrag}>
    <div className="sortable-list-item">
      { dragged }
    </div>
    </RenderRoot>
    </>
  )
}

SortableList.propTypes = {
  items: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired
}

export { SortableList }
