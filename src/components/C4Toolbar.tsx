import { memo } from 'react';

interface C4ToolbarProps {
  onAddContainer: (type: string) => void;
}

const C4Toolbar = ({ onAddContainer }: C4ToolbarProps) => {
  const containerTypes = [
    { type: 'actor', label: 'Attore' },
    { type: 'web', label: 'Applicazione Web' },
    { type: 'mobile', label: 'Applicazione Mobile' },
    { type: 'sistema', label: 'Sistema' },
    { type: 'exSistema', label: 'Sistema Esterno' },
    { type: 'database', label: 'Database' },
  ];

  return (
    <div
      style={{
        position: 'absolute',
        top: '10px',
        left: '10px',
        background: 'white',
        padding: '10px',
        borderRadius: '5px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        zIndex: 1000,
      }}
    >
      <h3 style={{ margin: '0 0 10px 0', fontSize: '14px' }}>Modello C4</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
        {containerTypes.map((container) => (
          <button
            key={container.type}
            onClick={() => onAddContainer(container.type)}
            style={{
              padding: '8px 12px',
              border: 'none',
              borderRadius: '4px',
              background: '#f0f0f0',
              cursor: 'pointer',
              textAlign: 'left',
              fontSize: '12px',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = '#e0e0e0';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = '#f0f0f0';
            }}
          >
            {container.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default memo(C4Toolbar); 