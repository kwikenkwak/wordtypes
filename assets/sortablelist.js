import React from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import { useSortableList } from './sortablelistlogic.js'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import './styles/sortablelist.scss'

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
  const { listeners, list, dragged, draggedPos, ids, animDrag } = useSortableList(items, onChange, dragClass)
  return (
    <>
    <TransitionGroup className="sortable-list">
    { list.map((ele, idx) =>
      (<CSSTransition timeout={200} classNames="sortable-list-item" key={ids[idx]}>
        <div className={ele.props.ghost === 'true' ? 'sortable-list-item sortable-list-item-ghost' : 'sortable-list-item'}
             onMouseDown={listeners[idx]}>
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
