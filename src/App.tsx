import { useCallback } from 'react';
import { ReactFlow, Background, Controls, MiniMap, Node, Edge, addEdge, useNodesState, useEdgesState, NodeTypes, Connection } from '@xyflow/react';
import C4Toolbar from './components/C4Toolbar';
import { ActorNode, SistemaNode, ExSistemaNode, DatabaseNode, MobileNode, WebNode } from './Nodes/Nodes';

import '@xyflow/react/dist/style.css';

const nodeTypes: NodeTypes = {
  actor: ActorNode,
  sistema: SistemaNode,
  exSistema: ExSistemaNode,
  database: DatabaseNode,
  mobile: MobileNode,
  web: WebNode,
};

const initialNodes: Node[] = [
  {
    id: 'actor-1',
    type: 'actor',
    position: { x: 250, y: 0 },
    data: { 
      title: 'Utente',
      type: 'Persona',
      description: 'Utente del sistema'
    }
  },
  {
    id: 'web-1',
    type: 'web',
    position: { x: 250, y: 150 },
    data: {
      title: 'Applicazione Web',
      type: 'Container',
      description: 'Frontend dell\'applicazione'
    }
  },
  {
    id: 'sistema-1',
    type: 'sistema',
    position: { x: 250, y: 300 },
    data: {
      title: 'API Backend',
      type: 'Container',
      description: 'REST API'
    }
  },
  {
    id: 'database-1',
    type: 'database',
    position: { x: 250, y: 450 },
    data: {
      title: 'Database',
      type: 'Container',
      description: 'Memorizza i dati dell\'applicazione'
    }
  }
];

const initialEdges: Edge[] = [
  { id: 'e1-2', source: 'actor-1', target: 'web-1' },
  { id: 'e2-3', source: 'web-1', target: 'sistema-1' },
  { id: 'e3-4', source: 'sistema-1', target: 'database-1' }
];

function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds: Edge[]) => addEdge(params, eds)),
    [setEdges]
  );

  const onAddContainer = useCallback(
    (type: string) => {
      const newNode: Node = {
        id: `${type}-${nodes.length + 1}`,
        type,
        position: { x: 100, y: 100 },
        data: {
          title: `Nuovo ${type}`,
          type: type === 'actor' ? 'Persona' : 'Container',
          description: 'Aggiungi una descrizione',
        },
      };
      setNodes((nds: Node[]) => [...nds, newNode]);
    },
    [nodes.length, setNodes]
  );

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background />
        <Controls />
        <MiniMap />
        <C4Toolbar onAddContainer={onAddContainer} />
      </ReactFlow>
    </div>
  );
}

export default App;
