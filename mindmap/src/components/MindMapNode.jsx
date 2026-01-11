import { useState } from 'react'

export default function MindMapNode({ node, onMove }) {
  const [dragging, setDragging] = useState(false)

  function onMouseDown(e) {
    e.stopPropagation()
    setDragging(true)
  }

  function onMouseUp() {
    setDragging(false)
  }

  function onMouseMove(e) {
    if (!dragging) return
    onMove(e.clientX - 60, e.clientY - 30)
  }

  return (
    <div
      className="node"
      style={{
        left: node.x,
        top: node.y,
      }}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseMove={onMouseMove}
    >
      {node.text}
    </div>
  )
}
