import { useEffect, useState, useRef } from 'react'
import VisibilityWatcher from './VisibilityWatcher.js'

export const useSortableList = (items, onChange, dragClass) => {
  const defaultState = {
    dragged: null,
    draggedPos: {},
    ghost: -1,
    list: items.slice()
  }
  const [state, setState] = useState(defaultState)

  const defaultRefState = {
    ghost: -1,
    draggedObj: null,
    dragged: null,
    mousePos: {},
    draggedPos: {},
    parentDiv: {},
    draggedOldIndex: 0,
    list: items.slice(),
    isFirst: false,
    watcher: null
  }
  const refState = useRef(defaultRefState)
  // Shorthand for the current refState
  const r = () => refState.current

  function reset () {
    if (r().draggedObj) {
      console.warn("Calling 'reset()' when dragging!!!")
    }
    refState.current = defaultRefState
    setState(defaultState)
  }
  // When there is a change in the items,
  // reset the whole hook
  useEffect(reset, [items])

  const updateState = (state) => setState({ ...state })

  function findInsertIndex (e) {
    const obj = findDraggedObject(e)
    if (obj !== null) { r().draggedObj = obj }

    // If there is only the currently dragged item
    // in the list then whe should not be searching
    // for one
    if (r().list.length === 0) return -1

    // If we haven't found the dragged object
    // for some reason (e.g. cursor is moved
    // out of the dragged object) then just
    // return -1
    if (r().draggedObj === null) return -1

    const rect = r().draggedObj.getBoundingClientRect()
    const y = (rect.top + rect.bottom) / 2
    const itemObjects = r().parentDiv.children

    if (!itemObjects) return 1

    // Make sure the item is between the horizontal list borders
    const firstRect = itemObjects[0].getBoundingClientRect()
    if (rect.left < firstRect.right && firstRect.left < rect.right) {
      for (let idx = 0; idx < itemObjects.length; idx++) {
        // If the dragged item is below this item and we
        // aren't the last item in the list, continue
        const itemRect = itemObjects[idx].getBoundingClientRect()
        if (y > itemRect.bottom && idx < itemObjects.length - 1) continue

        // Calculate the insertion index depending on the
        // position of the dragged item relative to the
        // center of this list item
        const middle = (itemRect.top + itemRect.bottom) / 2
        return y > middle ? idx + 1 : idx
      }
    } else {
      return -1
    }
  }

  function findDraggedObject (e) {
    // If closest is undefined the user has moved the cursor out of
    // the page
    return e.target.closest ? e.target.closest('.sortable-list-item') : null
  }

  function removeGhosts () {
    state.ghost = r().ghost = -1
  }

  function setGhost (e) {
    state.ghost = r().ghost = findInsertIndex(e)
  }

  function finishDrag (e) {
    document.removeEventListener('mousemove', moveDrag)
    document.removeEventListener('mouseup', finishDrag)

    let index = findInsertIndex(e)
    // If the dragged item is in an invalid
    // spot where we can't find an insertion
    // index, just place it back on its
    // original spot
    index = index !== -1 ? index : r().draggedOldIndex

    removeGhosts()

    r().isFirst = false
    state.dragged = r().draggedObj = null

    r().list.splice(
      index,
      0,
      r().dragged)
    state.list = r().list

    updateState(state)
    onChange(r().draggedOldIndex, index)
  }

  function autoScroll () {
    if (!r().watcher.ready()) return
    if (r().ghost !== r().list.length) {
      for (let i = r().ghost - 2; i < r().ghost + 2; i++) {
        if (i < 0 || i >= r().parentDiv.children.length) continue
        if (!r().watcher.isVisible(i)) {
          r().parentDiv.children[i].scrollIntoView({
            block: 'end', behavior: 'smooth'
          })
          break
        }
      }
    }
  }

  function moveDrag (e) {
    // Update the position of the dragged item
    // based on the change in position of the
    // cursor
    state.draggedPos = r().draggedPos = {
      x: r().draggedPos.x + e.clientX - r().mousePos.x,
      y: r().draggedPos.y + e.clientY - r().mousePos.y
    }

    if (!r().watcher) {
      r().watcher = new VisibilityWatcher()
      for (let idx = 0; idx < r().parentDiv.children.length; idx++) {
        r().watcher.observe(r().parentDiv.children[idx], idx)
      }
    }

    // Set this so that animate will be true
    r().isFirst = false

    r().mousePos = { x: e.clientX, y: e.clientY }

    setGhost(e)
    autoScroll()
    updateState(state)
  }

  function startDrag (idx, e) {
    // Check if this element is part of a
    // drag handle
    if (!e.target.closest(`.${dragClass}`)) return

    e.preventDefault()

    const rect = findDraggedObject(e).getBoundingClientRect()

    state.dragged = r().dragged = r().list[idx]
    state.draggedPos = r().draggedPos = ({
      x: rect.x,
      y: rect.top
    })

    // Grab the DOM element of the list for later use
    r().parentDiv = e.target.closest('.sortable-list')
    r().draggedOldIndex = idx
    r().mousePos = { x: e.clientX, y: e.clientY }

    r().list.splice(idx, 1)
    state.list = r().list

    // Set this so that we don't animate yet
    // we only want animate to be true
    // after the first movement of the cursor
    r().isFirst = true

    setGhost(e)
    updateState(state)

    document.addEventListener('mousemove', moveDrag)
    document.addEventListener('mouseup', finishDrag)
  }

  const list = []
  const listeners = []
  const ids = []
  for (let idx = 0; idx < state.list.length; idx++) {
    if (state.list[idx] === undefined) continue
    ids.push(state.list[idx].key)
    listeners.push(startDrag.bind(null, idx))
    list.push(state.list[idx])
  }

  const ghostRect = r().draggedObj
    ? r().draggedObj.getBoundingClientRect()
    : { height: 0 }

  return {
    dragged: state.dragged,
    draggedPos: state.draggedPos,
    animate: Boolean(state.dragged) && !r().isFirst,
    list,
    ghost: state.ghost,
    listeners,
    ids,
    ghostRect
  }
}
