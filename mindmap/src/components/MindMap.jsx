import { useState } from 'react'
import MindMapNode from './MindMapNode'
import './MindMap.css'

export default function MindMap() {
  const [nodes, setNodes] = useState([
    {
      id: 'root',
      text: 'Main Idea',
      x: 400,
      y: 300,
      sector: 'general',
    }
  ])

  const [edges, setEdges] = useState([])

  return (
    <div className="canvas">
      <svg className="edges">
        {edges.map(edge => {
          const from = nodes.find(n => n.id === edge.from)
          const to = nodes.find(n => n.id === edge.to)
          if (!from || !to) return null

          return (
            <line
              key={edge.id}
              x1={from.x + 60}
              y1={from.y + 30}
              x2={to.x + 60}
              y2={to.y + 30}
              stroke="#666"
              strokeWidth="2"
            />
          )
        })}
      </svg>

      {nodes.map(node => (
        <MindMapNode
          key={node.id}
          node={node}
          onMove={(x, y) => {
            setNodes(prev =>
              prev.map(n =>
                n.id === node.id ? { ...n, x, y } : n
              )
            )
          }}
        />
      ))}
    </div>
  )
}
