import { memo } from 'react';

interface UMLToolbarProps {
  onAddElement: (type: string) => void;
}

const UMLToolbar = ({ onAddElement }: UMLToolbarProps) => {
  const umlElements = [
    { type: 'class', label: 'Classe' },
    { type: 'interface', label: 'Interfaccia' },
    { type: 'enum', label: 'Enumerazione' },
    { type: 'abstract', label: 'Classe Astratta' },
    { type: 'package', label: 'Package' },
    { type: 'component', label: 'Componente' },
  ];

  return (
    <div
      style={{
        position: 'absolute',
        top: '10px',
        right: '10px',
        background: 'white',
        padding: '10px',
        borderRadius: '5px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        zIndex: 1000,
      }}
    >
      <h3 style={{ margin: '0 0 10px 0', fontSize: '14px' }}>Elementi UML</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
        {umlElements.map((element) => (
          <button
            key={element.type}
            onClick={() => onAddElement(element.type)}
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
            {element.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default memo(UMLToolbar); 