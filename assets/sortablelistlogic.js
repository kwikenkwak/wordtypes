import React, { useState, useRef } from 'react'
import uuid from 'uuid'

function useSortableList (items, onChange, dragClass) {
  const [state, setState] = useState({
    dragged: null,
    draggedPos: {},
    ghosts: {},
    animDrag: false,
    list: items.slice()
  })

  const ghostsRef = useRef({})
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

  function findRect (index) {
  }

  function finishDrag (e) {
    console.log('finished drag')
    const { index, rect, pos, dragRect } = findInsertIndex(e)

    document.removeEventListener('mousemove', moveDrag)
    document.removeEventListener('mouseup', finishDrag)

    draggedPos.current = {
      x: rect.left,
      y: pos === 'above'
        ? rect.top
        : rect.top + dragRect.height
    }
    draggedObj.current = null
    state.draggedPos = draggedPos.current
    state.animDrag = true

    setTimeout(() => {
      removeGhosts()
      state.dragged = null
      listRef.current.splice(
        index === -1 ? draggedOldIndex.current : index,
        0,
        draggedRef.current)
      state.list = listRef.current
      updateState(state)
    }, 200)
    updateState(state)
  }

  function getEstimatedLength () {
    let res = listRef.current.length
    for (const key of Object.keys(ghostsRef.current)) {
      if (ghostsRef.current[key].active === true) res += 1
    }
    return res
  }

  function findInsertIndex (e) {
    const obj = findDraggedObject(e)
    if (obj === null && draggedObj.current === null) return prevInsert.current

    if (obj !== null) { draggedObj.current = obj }
    const rect = draggedObj.current.getBoundingClientRect()
    const y = (rect.top + rect.bottom) / 2
    const itemObjects = parentDiv.current.children
    let ghostOffset = 0

    let data = { index: -1, dragRect: rect }

    if (itemObjects.length !== getEstimatedLength()) { return prevInsert.current }

    for (let idx = 0; idx < itemObjects.length; idx++) {
      const isGhost = itemObjects[idx].classList.contains('sortable-list-item-ghost')
      const itemRect = itemObjects[idx].getBoundingClientRect()
      if (itemRect.top > y || itemRect.bottom < y) continue
      if (rect.left > itemRect.right || itemRect.left > rect.right) continue

      const middle = (itemRect.top + itemRect.bottom) / 2
      let index
      if (isGhost) {
        index = idx
      } else {
        index = y > middle ? idx + 1 : idx
      }

      index -= ghostOffset
      if (isGhost) ghostOffset += 1

      data = {
        index: index,
        rect: itemRect,
        pos: y > middle ? 'below' : 'above',
        dragRect: rect,
        isGhost: isGhost
      }
    }

    prevInsert.current = data
    return data
  }

  function findDraggedObject (e) {
    return e.target.closest('.sortable-list-item')
  }

  function removeGhosts () {
    ghostsRef.current = {}
    state.ghosts = ghostsRef.current
  }

  function disableGhosts (index) {
    for (const ghostIndex of Object.keys(ghostsRef.current)) {
      if (Number(ghostIndex) !== index) {
        if (ghostsRef.current[ghostIndex] !== undefined) {
          ghostsRef.current[ghostIndex].active = false
        }
      }
    }
  }

  function createGhost (component, index, key = null) {
    return {
      component: React.cloneElement(component, { key: key || uuid(), ghost: 'true', index: index }),
      active: true
    }
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
    disableGhosts(index)
    state.ghosts = ghostsRef.current

    if (ghostsRef.current[index] !== undefined && !ghostsRef.current[index].active) {
      ghostsRef.current[index].active = true
    }

    if (index === -1 || ghostsRef.current[index] !== undefined) {
      updateState(state)
      return
    }

    ghostsRef.current[index] = createGhost(draggedRef.current, index)
    state.ghosts = ghostsRef.current
    updateState(state)
  }

  function startDrag (e, idx) {
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

    const ghost = createGhost(listRef.current[idx], idx, listRef.current[idx].key)
    ghostsRef.current[idx] = ghost
    state.ghosts = ghostsRef.current

    listRef.current.splice(idx, 1)
    prevInsert.current = { index: -1 }
    state.list = listRef.current

    updateState(state)

    document.addEventListener('mousemove', moveDrag)
    document.addEventListener('mouseup', finishDrag)
  }

  function getDragListener (idx) {
    return (e) => startDrag(e, idx)
  }

  const totalList = []
  const listeners = []
  const ids = []
  for (let idx = 0; idx < state.list.length; idx++) {
    if (state.list[idx] === undefined) continue
    ids.push(state.list[idx].key)
    listeners.push(getDragListener(idx))
    totalList.push(state.list[idx])
  }

  let offset = 0
  for (let index of Object.keys(state.ghosts)) {
    if (!state.ghosts[index].active) continue

    index = Number(index)
    ids.splice(index + offset, 0, state.ghosts[index].component.key)
    listeners.splice(index + offset, 0, null)
    totalList.splice(index + offset, 0, state.ghosts[index].component)
    offset += 1
  }

  function getStringState (totalList) {
    const res = []
    for (const ele of totalList) {
      res.push(ele.props.ghost ? 'Ghost' : ele.props.children)
    }
    return res
  }

  // console.log(getStringState(totalList))

  return {
    dragged: state.dragged,
    draggedPos: state.draggedPos,
    list: totalList,
    listeners,
    ids,
    animDrag: state.animDrag
  }
}

export { useSortableList }
