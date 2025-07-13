// src/components/FlowDiagram.js
import React from 'react';
import ReactFlow, { Background, Controls } from 'reactflow';
import 'reactflow/dist/style.css';

const nodes = [
  {
    id: '1',
    type: 'input',
    data: { label: '📥 Upload File' },
    position: { x: 250, y: 0 },
  },
  {
    id: '2',
    data: { label: '🔍 Extract with OCR' },
    position: { x: 250, y: 100 },
  },
  {
    id: '3',
    data: { label: '🧠 Send to GPT' },
    position: { x: 250, y: 200 },
  },
  {
    id: '4',
    type: 'output',
    data: { label: '📄 Preview Result' },
    position: { x: 250, y: 300 },
  },
];

const edges = [
  { id: 'e1-2', source: '1', target: '2', animated: true },
  { id: 'e2-3', source: '2', target: '3', animated: true },
  { id: 'e3-4', source: '3', target: '4', animated: true },
];

const FlowDiagram = () => {
  return (
    <div style={{ height: 400, border: '2px solid #ccc', borderRadius: '8px', margin: '20px 0' }}>
      <ReactFlow nodes={nodes} edges={edges} fitView>
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default FlowDiagram;
