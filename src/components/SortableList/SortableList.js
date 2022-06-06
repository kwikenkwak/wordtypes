import React from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import { useSortableList } from './useSortableList.js'
import * as S from './SortableList.style.js'

function RenderRoot ({ children, pos, ghostRect }) {
  return ReactDOM.createPortal(
    <S.FloatingItem
    style={{
      left: pos.x,
      top: pos.y,
      width: ghostRect.width,
      height: ghostRect.height
    }}>
    {children} </S.FloatingItem>,
    document.querySelector('#root')
  )
}

function SortableList ({ items, onChange, dragClass }) {
  const {
    listeners, list, dragged, draggedPos, ids,
    animDrag, ghost, ghostRect, isDragging, isFirst
  } = useSortableList(items, onChange, dragClass)
  return (
    <>
    <S.SortableList className="sortable-list">
    { list.map((ele, idx) =>
      (
        <S.SortableListItem
          anim={isDragging && !isFirst}
          className="sortable-list-item"
          key={ids[idx]}
          onMouseDown={listeners[idx]}
          style={{ marginTop: ghost === idx ? ghostRect.height + 'px' : '0' }}
        >
        {ele}
      </S.SortableListItem>
      ))
    }
    </S.SortableList>

    <RenderRoot pos={draggedPos} ghostRect={ghostRect} animate={animDrag}>
    <div className="sortable-list-item">
      { dragged }
    </div>
    </RenderRoot>
    </>
  )
}

SortableList.propTypes = {
  items: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  dragClass: PropTypes.string
}

export { SortableList }
