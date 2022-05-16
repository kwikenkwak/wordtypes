import React, { useState, useRef } from 'react'
import uuid from 'uuid'

function useSortableList (items, onChange, dragClass) {
  const [state, setState] = useState({
    dragged: null,
    draggedPos: {},
    ghost: -1,
    animDrag: false,
    list: items.slice()
  })

  const frozen = useRef(false)
  const inserted = useRef(-1)
  const animDisabled = useRef(-1)
  const ghost = useRef(-1)
  const draggedObj = useRef(null)
  const draggedRef = useRef(null)
  const mousePos = useRef({})
  const draggedPos = useRef({})
  const parentDiv = useRef({})
  const draggedOldIndex = useRef(0)
  const prevInsert = useRef({ index: -1 })
  const listRef = useRef(items.slice())

  function updateState (state) {
    const newState = { ...state }
    setState(newState)
  }

  function finishDrag (e) {
    console.log('finished drag')
    let { index, x, y } = findInsertIndex(e)
    console.log(findInsertIndex(e))

    document.removeEventListener('mousemove', moveDrag)
    document.removeEventListener('mouseup', finishDrag)

    if (index === -1) {
      index = draggedOldIndex.current
      ghost.current = index
      state.ghost = ghost.current

      draggedPos.current = {
        x: parentDiv.current.getBoundingClientRect().left,
        y: index === 0
          ? parentDiv.current.getBoundingClientRect().top
          : parentDiv.current.children[index - 1].getBoundingClientRect().bottom
      }
    } else {
      draggedPos.current = { x, y }
    }

    state.draggedPos = draggedPos.current
    state.animDrag = true
    updateState(state)
    frozen.current = true

    setTimeout(() => {
      window.requestAnimationFrame(() => {
        inserted.current = -1
        animDisabled.current = -1
        updateState(state)
        frozen.current = false
      })
      animDisabled.current = index + 1
      removeGhosts()
      draggedObj.current = null
      state.dragged = null
      inserted.current = index
      listRef.current.splice(
        index,
        0,
        draggedRef.current)
      state.list = listRef.current
      updateState(state)
    }, 200)
  }

  function findInsertIndex (e) {
    const obj = findDraggedObject(e)
    if (obj === null && draggedObj.current === null) return prevInsert.current

    if (obj !== null) { draggedObj.current = obj }
    const rect = draggedObj.current.getBoundingClientRect()
    const y = (rect.top + rect.bottom) / 2
    const itemObjects = parentDiv.current.children

    let data = { index: -1, dragRect: rect }

    const firstRect = itemObjects[0].getBoundingClientRect()
    // Make sure the item is between the list borders
    if (rect.left < firstRect.right && firstRect.left < rect.right) {
      for (let idx = 0; idx < itemObjects.length; idx++) {
        const itemRect = itemObjects[idx].getBoundingClientRect()
        if (y > itemRect.bottom) continue

        // Now we now this is for which the dragged item
        // is lower than the list item

        const middle = (itemRect.top + itemRect.bottom) / 2

        const yTop = y < middle
          ? (idx !== 0
              ? itemObjects[idx - 1].getBoundingClientRect().bottom
              : parentDiv.current.getBoundingClientRect().top)
          : itemRect.bottom

        data = {
          index: y > middle ? idx + 1 : idx,
          x: itemRect.left,
          y: yTop,
          rect: itemRect,
          pos: y > middle ? 'below' : 'above',
          dragRect: rect
        }
        break
      }
    }

    prevInsert.current = data
    return data
  }

  function findDraggedObject (e) {
    return e.target.closest('.sortable-list-item')
  }

  function removeGhosts () {
    ghost.current = -1
    state.ghost = ghost.current
  }

  function moveDrag (e) {
    // console.log('moved')
    draggedPos.current = {
      x: draggedPos.current.x + e.clientX - mousePos.current.x,
      y: draggedPos.current.y + e.clientY - mousePos.current.y
    }

    state.draggedPos = draggedPos.current
    mousePos.current = { x: e.clientX, y: e.clientY }

    const { index } = findInsertIndex(e)
    ghost.current = index
    state.ghost = ghost.current
    updateState(state)
  }

  function startDrag (e, idx) {
    if (frozen.current) {
      console.warn('Neglected drag click as the list was frozen')
      return
    }
    e.preventDefault()
    const rect = findDraggedObject(e).getBoundingClientRect()
    draggedPos.current = ({
      x: rect.x,
      y: rect.top
    })
    draggedOldIndex.current = idx
    parentDiv.current = e.target.closest('.sortable-list')

    state.dragged = listRef.current[idx]

    draggedRef.current = listRef.current[idx]
    mousePos.current = { x: e.clientX, y: e.clientY }

    state.draggedPos = draggedPos.current
    state.animDrag = false

    // ghost.current = idx
    // state.ghost = ghost.current
    inserted.current = -1
    animDisabled.current = -1

    listRef.current.splice(idx, 1)
    prevInsert.current = { index: -1 }
    state.list = listRef.current

    // moveDrag(e)

    updateState(state)

    document.addEventListener('mousemove', moveDrag)
    document.addEventListener('mouseup', finishDrag)
  }

  function getDragListener (idx) {
    return (e) => startDrag(e, idx)
  }

  const list = []
  const listeners = []
  const ids = []
  for (let idx = 0; idx < state.list.length; idx++) {
    if (state.list[idx] === undefined) continue
    ids.push(state.list[idx].key)
    listeners.push(getDragListener(idx))
    list.push(state.list[idx])
  }

  return {
    dragged: state.dragged,
    draggedPos: state.draggedPos,
    list,
    ghost: state.ghost,
    listeners,
    ids,
    animDrag: state.animDrag,
    ghostHeight: draggedObj.current ? draggedObj.current.getBoundingClientRect().height : 0,
    inserted: inserted.current,
    animDisabled: animDisabled.current
  }
}

export { useSortableList }
