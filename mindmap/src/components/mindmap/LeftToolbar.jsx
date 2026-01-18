import React from 'react';
import './LeftToolbar.css'; // Import the new CSS

export default function LeftToolbar({
  onAdd, onDeleteNode, onDeleteEdge, onUndo, onRedo, 
  onClearBoard, onBgConfigChange, bgConfig,
  canDeleteNode, canDeleteEdge, canUndo, canRedo,
}) {
  const handleClear = () => {
    onClearBoard();
  };

  return (
    <div className="left-toolbar">
      <div className="toolbar-section-title">Edit</div>
      <button className="toolbar-btn" onClick={onAdd}>Add Node</button>
      <button className="toolbar-btn" onClick={onDeleteNode} disabled={!canDeleteNode}>Delete Node</button>
      <button className="toolbar-btn" onClick={onDeleteEdge} disabled={!canDeleteEdge}>Delete Edge</button>
    
      <div style={{ display: 'flex', gap: '4px' }}>
        <button className="toolbar-btn" style={{flex: 1}} onClick={onUndo} disabled={!canUndo}>⮜</button>
        <button className="toolbar-btn" style={{flex: 1}} onClick={onRedo} disabled={!canRedo}>⮞</button>
      </div>

      <div className="toolbar-section-title">Canvas</div>
      <select 
        className="toolbar-select"
        value={bgConfig.variant} 
        onChange={(e) => onBgConfigChange({ ...bgConfig, variant: e.target.value })}
      >
        <option value="dots">Dotted</option>
        <option value="lines">Lines</option>
        <option value="none">Empty</option>
      </select>

      <input 
        type="color" 
        className="color-picker-input"
        value={bgConfig.color} 
        onChange={(e) => onBgConfigChange({ ...bgConfig, color: e.target.value })}
      />

      <button className="toolbar-btn danger" onClick={handleClear}>💥 Clear Board</button>
    </div>
  );
}