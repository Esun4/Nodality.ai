import { useEffect, useState } from 'react';

export default function NodeInspector({ node, updateNode }) {
  if (!node) return null;

  const [local, setLocal] = useState(node.data);

  // sync when selecting a new node
  useEffect(() => {
    setLocal(node.data);
  }, [node.id]);

  const commit = (updates) => {
    updateNode(updates);
  };

return (
    <div
      style={{
        position: 'absolute',
        // This places it to the left of the 300px AI panel
        right: 310, 
        bottom: 20,
        background: '#fff',
        padding: '15px',
        borderRadius: '12px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
        zIndex: 1000, // Ensure it stays above the flow
        width: 240,
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        fontFamily: "'Quicksand', sans-serif",
        border: '1px solid #e2e8f0'
      }}
    >
      <h4 style={{ margin: '0 0 5px 0', fontSize: '1rem', color: '#2d3748' }}>Node Settings</h4>
      
      {/* ... keep all your existing inputs ... */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <label style={{ fontSize: '12px', fontWeight: 600, color: '#718096' }}>Label</label>
          <input
            style={{ padding: '6px', borderRadius: '4px', border: '1px solid #cbd5e0' }}
            value={local.label ?? ''}
            onChange={(e) => setLocal({ ...local, label: e.target.value })}
            onBlur={() => commit({ label: local.label })}
          />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <label style={{ fontSize: '11px' }}>Background</label>
                  <input
                    type="color"
                    style={{ width: '100%', height: '30px', border: 'none', background: 'none' }}
                    value={local.color ?? '#ffffff'}
                    onChange={(e) => {
                      setLocal({ ...local, color: e.target.value });
                      commit({ color: e.target.value });
                    }}
                  />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <label style={{ fontSize: '11px' }}>Border</label>
                  <input
                    type="color"
                    style={{ width: '100%', height: '30px', border: 'none', background: 'none' }}
                    value={local.borderColor ?? '#555555'}
                    onChange={(e) => {
                      setLocal({ ...local, borderColor: e.target.value });
                      commit({ borderColor: e.target.value });
                    }}
                  />
              </div>
          </div>

          <label style={{ fontSize: '11px' }}>Border Width</label>
          <input
            type="number"
            min={1} max={10}
            value={node.data.borderWidth ?? 1}
            onChange={(e) => updateNode({ borderWidth: Number(e.target.value) })}
          />

          <label style={{ fontSize: '11px' }}>Text Color</label>
          <input
            type="color"
            style={{ width: '100%', height: '20px', border: 'none', background: 'none' }}
            value={local.textColor ?? '#000000'}
            onChange={(e) => {
              setLocal({ ...local, textColor: e.target.value });
              commit({ textColor: e.target.value });
            }}
          />
      </div>
    </div>
  );
}
