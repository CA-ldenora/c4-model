import { useCallback } from 'react';
import { ReactFlow, Background, Controls, MiniMap, Node, Edge, addEdge, useNodesState, useEdgesState, NodeTypes, Connection, EdgeTypes, MarkerType } from '@xyflow/react';
import C4Toolbar from './components/C4Toolbar';
import UMLToolbar from './components/UMLToolbar';
import { ActorNode, SistemaNode, ExSistemaNode, DatabaseNode, MobileNode, WebNode } from './Nodes/Nodes';
import { ClassNode, InterfaceNode, EnumNode, AbstractNode, PackageNode, ComponentNode } from './Nodes/UMLNodes';
import UMLEdge from './components/UMLEdge';

import '@xyflow/react/dist/style.css';

const nodeTypes: NodeTypes = {
  // C4 Model nodes
  actor: ActorNode,
  sistema: SistemaNode,
  exSistema: ExSistemaNode,
  database: DatabaseNode,
  mobile: MobileNode,
  web: WebNode,
  // UML nodes
  class: ClassNode,
  interface: InterfaceNode,
  enum: EnumNode,
  abstract: AbstractNode,
  package: PackageNode,
  component: ComponentNode,
};

const edgeTypes: EdgeTypes = {
  uml: UMLEdge,
};

const initialNodes: Node[] = [
  // C4 Model nodes - Positioned on the left side
  {
    id: 'actor-1',
    type: 'actor',
    position: { x: 100, y: 50 },
    data: { 
      title: 'Utente',
      type: 'Persona',
      description: 'Utente del sistema'
    }
  },
  {
    id: 'web-1',
    type: 'web',
    position: { x: 100, y: 200 },
    data: {
      title: 'Applicazione Web',
      type: 'Container',
      description: 'Frontend dell\'applicazione'
    }
  },
  {
    id: 'sistema-1',
    type: 'sistema',
    position: { x: 100, y: 350 },
    data: {
      title: 'API Backend',
      type: 'Container',
      description: 'REST API'
    }
  },
  {
    id: 'database-1',
    type: 'database',
    position: { x: 100, y: 500 },
    data: {
      title: 'Database',
      type: 'Container',
      description: 'Memorizza i dati dell\'applicazione'
    }
  },
  // UML Class Diagram nodes - Positioned on the right side
  {
    id: 'bank',
    type: 'class',
    position: { x: 600, y: 50 },
    data: {
      title: 'Bank',
      type: 'class',
      attributes: [
        '+BankId: int',
        '+Name: string',
        '+Location: string'
      ],
      methods: []
    }
  },
  {
    id: 'teller',
    type: 'class',
    position: { x: 1000, y: 50 },
    data: {
      title: 'Teller',
      type: 'class',
      attributes: [
        '+Id: int',
        '+Name: string'
      ],
      methods: [
        '+CollectMoney()',
        '+OpenAccount()',
        '+CloseAccount()',
        '+LoanRequest()',
        '+ProvideInfo()',
        '+IssueCard()'
      ]
    }
  },
  {
    id: 'customer',
    type: 'class',
    position: { x: 600, y: 250 },
    data: {
      title: 'Customer',
      type: 'class',
      attributes: [
        '+Id: int',
        '+Name: string',
        '+Address: string',
        '+PhoneNo: int',
        '+AcctNo: int'
      ],
      methods: [
        '+GeneralInquiry()',
        '+DepositMoney()',
        '+WithdrawMoney()',
        '+OpenAccount()',
        '+CloseAccount()',
        '+ApplyForLoan()',
        '+RequestCard()'
      ]
    }
  },
  {
    id: 'account',
    type: 'class',
    position: { x: 1000, y: 250 },
    data: {
      title: 'Account',
      type: 'class',
      attributes: [
        '+Id: int',
        '+CustomerId: int'
      ],
      methods: []
    }
  },
  {
    id: 'checking',
    type: 'class',
    position: { x: 800, y: 400 },
    data: {
      title: 'Checking',
      type: 'class',
      attributes: [
        '+Id: int',
        '+CustomerId: int'
      ],
      methods: []
    }
  },
  {
    id: 'savings',
    type: 'class',
    position: { x: 1200, y: 400 },
    data: {
      title: 'Savings',
      type: 'class',
      attributes: [
        '+Id: int',
        '+CustomerId: int'
      ],
      methods: []
    }
  },
  {
    id: 'loan',
    type: 'class',
    position: { x: 600, y: 450 },
    data: {
      title: 'Loan',
      type: 'class',
      attributes: [
        '+Id: int',
        '+Type: string',
        '+AccountId: int',
        '+CustomerId: int'
      ],
      methods: []
    }
  },
  {
    id: 'interface-payment',
    type: 'interface',
    position: { x: 1200, y: 150 },
    data: {
      title: 'IPayment',
      type: 'interface',
      description: 'Interfaccia pagamento',
      methods: [
        '+ processPayment()',
        '+ refund()',
        '+ validate()'
      ]
    }
  },
  {
    id: 'enum-status',
    type: 'enum',
    position: { x: 1200, y: 250 },
    data: {
      title: 'OrderStatus',
      type: 'enum',
      description: 'Stati dell\'ordine',
      attributes: [
        'PENDING',
        'PROCESSING',
        'SHIPPED',
        'DELIVERED',
        'CANCELLED'
      ]
    }
  }
];

const initialEdges: Edge[] = [
  // C4 Model edges
  { 
    id: 'e1-2', 
    source: 'actor-1', 
    target: 'web-1',
    type: 'smoothstep',
    data: { 
      sourceLabel: '1',
      targetLabel: 'n'
    },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: '#333',
      width: 20,
      height: 20,
    },
    style: { stroke: '#333' },
    animated: true
  },
  { 
    id: 'e2-3', 
    source: 'web-1', 
    target: 'sistema-1',
    type: 'smoothstep',
    data: { 
      sourceLabel: '1',
      targetLabel: '1'
    },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: '#333',
      width: 20,
      height: 20,
    },
    style: { stroke: '#333' },
    animated: true
  },
  { 
    id: 'e3-4', 
    source: 'sistema-1', 
    target: 'database-1',
    type: 'smoothstep',
    data: { 
      sourceLabel: '1',
      targetLabel: '1'
    },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: '#333',
      width: 20,
      height: 20,
    },
    style: { stroke: '#333' },
    animated: true
  },
  // UML Class Diagram edges
  {
    id: 'bank-teller',
    source: 'bank',
    target: 'teller',
    type: 'smoothstep',
    data: { 
      sourceLabel: '+1',
      targetLabel: '+1..*'
    },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: '#333',
      width: 20,
      height: 20,
    },
    style: { stroke: '#333' }
  },
  {
    id: 'bank-customer',
    source: 'bank',
    target: 'customer',
    type: 'smoothstep',
    data: { 
      sourceLabel: '+1',
      targetLabel: '+1..*'
    },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: '#333',
      width: 20,
      height: 20,
    },
    style: { stroke: '#333' }
  },
  {
    id: 'customer-teller',
    source: 'customer',
    target: 'teller',
    type: 'smoothstep',
    data: { 
      sourceLabel: '+1..*',
      targetLabel: '+1..*'
    },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: '#333',
      width: 20,
      height: 20,
    },
    style: { stroke: '#333' }
  },
  {
    id: 'customer-account',
    source: 'customer',
    target: 'account',
    type: 'smoothstep',
    data: { 
      sourceLabel: '+1',
      targetLabel: '+1..*'
    },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: '#333',
      width: 20,
      height: 20,
    },
    style: { stroke: '#333' }
  },
  {
    id: 'account-checking',
    source: 'account',
    target: 'checking',
    type: 'smoothstep',
    data: { 
      sourceLabel: '+1',
      targetLabel: '+1'
    },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: '#333',
      width: 20,
      height: 20,
    },
    style: { stroke: '#333' }
  },
  {
    id: 'account-savings',
    source: 'account',
    target: 'savings',
    type: 'smoothstep',
    data: { 
      sourceLabel: '+1',
      targetLabel: '+1'
    },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: '#333',
      width: 20,
      height: 20,
    },
    style: { stroke: '#333' }
  },
  {
    id: 'customer-loan',
    source: 'customer',
    target: 'loan',
    type: 'smoothstep',
    data: { 
      sourceLabel: '+1',
      targetLabel: '+0..*'
    },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: '#333',
      width: 20,
      height: 20,
    },
    style: { stroke: '#333' }
  },
  {
    id: 'e-order-payment',
    source: 'customer',
    target: 'interface-payment',
    type: 'smoothstep',
    data: { 
      sourceLabel: '1',
      targetLabel: '1'
    },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: '#333',
      width: 20,
      height: 20,
    }
  }
];

function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: Connection) => {
      const newEdge: Edge = {
        id: `edge-${edges.length + 1}`,
        ...params,
        type: 'uml',
        data: { 
          sourceLabel: '+1',
          targetLabel: '+1'
        },
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: '#333',
          width: 20,
          height: 20,
        }
      };
      setEdges((eds: Edge[]) => addEdge(newEdge, eds));
    },
    [setEdges, edges.length]
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

  const onAddUMLElement = useCallback(
    (type: string) => {
      const newNode: Node = {
        id: `${type}-${nodes.length + 1}`,
        type,
        position: { x: 500, y: 100 },
        data: {
          title: `Nuovo ${type}`,
          type: type,
          description: 'Aggiungi una descrizione',
          attributes: type !== 'interface' ? ['+ attributo1: string', '- attributo2: number'] : undefined,
          methods: ['+ metodo1()', '- metodo2(param: string)'],
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
        edgeTypes={edgeTypes}
        fitView
      >
        <Background />
        <Controls />
        <MiniMap />
        <C4Toolbar onAddContainer={onAddContainer} />
        <UMLToolbar onAddElement={onAddUMLElement} />
      </ReactFlow>
    </div>
  );
}

export default App;
