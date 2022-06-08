import { useEffect, useState, useRef } from 'react'

function useSortableList (items, onChange, dragClass) {
  const defaultState = {
    dragged: null,
    draggedPos: {},
    ghost: -1,
    list: items.slice()
  }
  const [state, setState] = useState(defaultState)

  const ghost = useRef(-1)
  const draggedObj = useRef(null)
  const draggedRef = useRef(null)
  const mousePos = useRef({})
  const draggedPos = useRef({})
  const parentDiv = useRef({})
  const draggedOldIndex = useRef(0)
  const prevInsert = useRef({ index: -1 })
  const listRef = useRef(items.slice())
  const isFirst = useRef(false)

  function reset () {
    if (draggedObj.current) {
      console.warn("Calling 'reset()' when dragging!!!")
    }
    ghost.current = -1
    draggedObj.current = null
    draggedRef.current = null
    mousePos.current = {}
    draggedPos.current = {}
    parentDiv.current = {}
    draggedOldIndex.current = 0
    prevInsert.current = { index: -1 }
    listRef.current = items.slice()
    isFirst.current = false
    setState(defaultState)
  }

  useEffect(reset, [items])

  function updateState (state) {
    const newState = { ...state }
    setState(newState)
  }

  function finishDrag (e) {
    console.log('finished drag')

    document.removeEventListener('mousemove', moveDrag)
    document.removeEventListener('mouseup', finishDrag)

    const { index } = findInsertIndex(e)

    removeGhosts()

    isFirst.current = false
    draggedObj.current = null
    state.dragged = null
    listRef.current.splice(
      index,
      0,
      draggedRef.current)

    state.list = listRef.current

    updateState(state)

    onChange(draggedOldIndex.current, index)
  }

  function findInsertIndex (e) {
    let data = { index: -1 }

    const obj = findDraggedObject(e)
    if (obj !== null) { draggedObj.current = obj }

    // If there is only the currently dragged item
    // in the list then whe should not be searching
    // for one
    if (listRef.current.length === 0) return data

    // If we couldn't find the dragged item and
    // the backup is empty then return
    if (obj === null && draggedObj.current === null) return prevInsert.current

    const rect = draggedObj.current.getBoundingClientRect()
    const y = (rect.top + rect.bottom) / 2
    const itemObjects = parentDiv.current.children

    const firstRect = itemObjects[0].getBoundingClientRect()
    // Make sure the item is between the horizontal list borders
    if (rect.left < firstRect.right && firstRect.left < rect.right) {
      for (let idx = 0; idx < itemObjects.length; idx++) {
        const itemRect = itemObjects[idx].getBoundingClientRect()
        if (y > itemRect.bottom && idx < itemObjects.length - 1) continue

        // Now we now this is for which the dragged item
        // is lower than the list item

        const middle = (itemRect.top + itemRect.bottom) / 2

        data = {
          index: y > middle ? idx + 1 : idx
        }
        break
      }
    }

    prevInsert.current = data
    return data
  }

  function findDraggedObject (e) {
    return e.target.closest ? e.target.closest('.sortable-list-item') : null
  }

  function removeGhosts () {
    ghost.current = -1
    state.ghost = ghost.current
  }

  function setGhost (e) {
    const { index } = findInsertIndex(e)
    ghost.current = index
    state.ghost = ghost.current
  }

  function moveDrag (e) {
    draggedPos.current = {
      x: draggedPos.current.x + e.clientX - mousePos.current.x,
      y: draggedPos.current.y + e.clientY - mousePos.current.y
    }

    isFirst.current = false
    state.draggedPos = draggedPos.current
    mousePos.current = { x: e.clientX, y: e.clientY }

    setGhost(e)
    updateState(state)
  }

  function startDrag (e, idx) {
    if (!e.target.closest(`.${dragClass}`)) return
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

    listRef.current.splice(idx, 1)
    prevInsert.current = { index: -1 }
    state.list = listRef.current
    isFirst.current = true

    setGhost(e)
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

  function getGhostRect () {
    return draggedObj.current
      ? draggedObj.current.getBoundingClientRect()
      : { height: 0 }
  }

  return {
    dragged: state.dragged,
    draggedPos: state.draggedPos,
    isDragging: Boolean(state.dragged),
    isFirst: isFirst.current,
    list,
    ghost: state.ghost,
    listeners,
    ids,
    ghostRect: getGhostRect()
  }
}

export { useSortableList }
