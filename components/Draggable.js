import { useRef, useEffect, useState } from 'react'
/**
 * Draggable components
 */

export const Draggable = props => {
  const { children } = props
  const draggableRef = useRef(null)
  const rafRef = useRef(null)
  const [moving, setMoving] = useState(false)
  let currentObj, offsetX, offsetY

  useEffect(() => {
    const draggableElements = document.getElementsByClassName('draggable')

    // Standardized mouse event object
    function e(event) {
      // Define event object normalization function
      if (!event) {
        // Compatible with IE browser
        event = window.event
        event.target = event.srcElement
        event.layerX = event.offsetX
        event.layerY = event.offsetY
      }
      // Mobile terminal
      if (event.type === 'touchstart' || event.type === 'touchmove') {
        event.clientX = event.touches[0].clientX
        event.clientY = event.touches[0].clientY
      }

      event.mx = event.pageX || event.clientX + document.body.scrollLeft
      // Calculate x-axis distance of mouse pointer
      event.my = event.pageY || event.clientY + document.body.scrollTop
      // Calculate the y-axis distance of the mouse pointer

      return event // Returns a standardized event object
    }

    // Define mouse event handler function
    // document.pointerdown = start
    document.onmousedown = start
    document.ontouchstart = start

    function start(event) {
      // When the mouse is pressed, initialization processing
      if (!draggableElements) return
      event = e(event) // Get standard event object

      for (const drag of draggableElements) {
        // Determine whether the area clicked by the mouse is within the drag box
        if (inDragBox(event, drag)) {
          currentObj = drag.firstElementChild
        }
      }
      if (currentObj) {
        if (event.type === 'touchstart') {
          event.preventDefault() // Prevent default scrolling behavior
          document.documentElement.style.overflow = 'hidden' // 防止页面一起滚动
        }

        setMoving(true)
        offsetX = event.mx - currentObj.offsetLeft
        offsetY = event.my - currentObj.offsetTop

        document.onmousemove = move // Register mouse movement event handler
        document.ontouchmove = move
        document.onmouseup = stop // Register the mouse release event handler
        document.ontouchend = stop
      }
    }

    function move(event) {
      // Mouse movement handler function
      event = e(event)
      rafRef.current = requestAnimationFrame(() => updatePosition(event))
    }

    const stop = event => {
      event = e(event)
      document.documentElement.style.overflow = 'auto' // Restore default scrolling behavior
      cancelAnimationFrame(rafRef.current)
      setMoving(false)
      currentObj =
        document.ontouchmove =
        document.ontouchend =
        document.onmousemove =
        document.onmouseup =
          null
    }

    const updatePosition = event => {
      if (currentObj) {
        const left = event.mx - offsetX
        const top = event.my - offsetY
        currentObj.style.left = left + 'px'
        currentObj.style.top = top + 'px'
        checkInWindow()
      }
    }

    /**
     * Whether the mouse is within the draggable area
     * @param {*} event
     * @returns
     */
    function inDragBox(event, drag) {
      const { clientX, clientY } = event // mouse position
      const { offsetHeight, offsetWidth, offsetTop, offsetLeft } =
        drag.firstElementChild // window position
      const horizontal =
        clientX > offsetLeft && clientX < offsetLeft + offsetWidth
      const vertical = clientY > offsetTop && clientY < offsetTop + offsetHeight

      if (horizontal && vertical) {
        return true
      }

      return false
    }

    /**
     * If it exceeds the window, it will be absorbed.
     */
    function checkInWindow() {
      // 检查是否悬浮在窗口内
      for (const drag of draggableElements) {
        // 判断鼠标点击的区域是否是拖拽框内
        const { offsetHeight, offsetWidth, offsetTop, offsetLeft } =
          drag.firstElementChild
        const { clientHeight, clientWidth } = document.documentElement
        if (offsetTop < 0) {
          drag.firstElementChild.style.top = 0
        }
        if (offsetTop > clientHeight - offsetHeight) {
          drag.firstElementChild.style.top = clientHeight - offsetHeight + 'px'
        }
        if (offsetLeft < 0) {
          drag.firstElementChild.style.left = 0
        }
        if (offsetLeft > clientWidth - offsetWidth) {
          drag.firstElementChild.style.left = clientWidth - offsetWidth + 'px'
        }
      }
    }

    window.addEventListener('resize', checkInWindow)

    return () => {
      return () => {
        window.removeEventListener('resize', checkInWindow)
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [])

  return (
    <div
      className={`draggable ${
        moving ? 'cursor-grabbing' : 'cursor-grab'
      } select-none`}
      ref={draggableRef}
    >
      {children}
    </div>
  )
}

Draggable.defaultProps = { left: 0, top: 0 }
