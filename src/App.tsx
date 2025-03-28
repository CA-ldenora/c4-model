import { useCallback } from 'react';
import { ReactFlow, Background, Controls, MiniMap, Node, Edge, addEdge, useNodesState, useEdgesState, NodeTypes, Connection, EdgeTypes, MarkerType } from '@xyflow/react';
import dagre from 'dagre';
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
  c4: UMLEdge,
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
    type: 'c4',
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
    type: 'c4',
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
    type: 'c4',
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
    type: 'uml',
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
    type: 'uml',
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
    type: 'uml',
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
    type: 'uml',
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
    },
    style: { stroke: '#333' }
  },
  {
    id: 'account-savings',
    source: 'account',
    target: 'savings',
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
    },
    style: { stroke: '#333' }
  },
  {
    id: 'customer-loan',
    source: 'customer',
    target: 'loan',
    type: 'uml',
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
    },
    style: { stroke: '#333' }
  }
];

// Layout configuration
const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

// Settings for the layout
const getLayoutedElements = (nodes: Node[], edges: Edge[], direction = 'TB') => {
  const isHorizontal = direction === 'LR';
  dagreGraph.setGraph({ rankdir: direction });

  // Clear the graph before adding new nodes
  const existingNodes = dagreGraph.nodes();
  for (const node of existingNodes) {
    dagreGraph.removeNode(node);
  }

  // Separate C4 and UML nodes
  const c4Nodes = nodes.filter(node => 
    ['actor', 'sistema', 'exSistema', 'database', 'mobile', 'web'].includes(node.type || '')
  );
  const umlNodes = nodes.filter(node => 
    ['class', 'interface', 'enum', 'abstract', 'package', 'component'].includes(node.type || '')
  );

  // Add C4 nodes to their graph
  for (const node of c4Nodes) {
    dagreGraph.setNode(node.id, { width: 180, height: 120 });
  }

  // Add UML nodes to their graph
  for (const node of umlNodes) {
    dagreGraph.setNode(node.id, { width: 200, height: 150 });
  }

  // Add edges
  for (const edge of edges) {
    dagreGraph.setEdge(edge.source, edge.target);
  }

  // Calculate the layout
  dagre.layout(dagreGraph);

  // Fixed starting positions
  const c4StartX = 100;
  const umlStartX = 800;
  
  // Get the layouted nodes
  const layoutedNodes = nodes.map((node) => {
    const isC4Node = c4Nodes.some(n => n.id === node.id);
    const nodeWithPosition = dagreGraph.node(node.id);
    
    if (!nodeWithPosition) {
      return node;
    }

    return {
      ...node,
      position: {
        x: isC4Node ? c4StartX : umlStartX + nodeWithPosition.x,
        y: nodeWithPosition.y,
      },
    };
  });

  return { nodes: layoutedNodes, edges };
};

const getNewNodePosition = (type: string, nodes: Node[]): { x: number; y: number } => {
  const isC4Node = ['actor', 'sistema', 'exSistema', 'database', 'mobile', 'web'].includes(type);
  const similarNodes = nodes.filter(node => 
    isC4Node ? 
      ['actor', 'sistema', 'exSistema', 'database', 'mobile', 'web'].includes(node.type || '') :
      ['class', 'interface', 'enum', 'abstract', 'package', 'component'].includes(node.type || '')
  );

  if (similarNodes.length === 0) {
    return isC4Node ? { x: 100, y: 100 } : { x: 600, y: 100 };
  }

  // Find the lowest y position among similar nodes
  const maxY = Math.max(...similarNodes.map(node => node.position.y));
  const baseX = isC4Node ? 100 : 600;

  return {
    x: baseX,
    y: maxY + 150 // Add some vertical spacing
  };
};

// Add stress test function
const generateStressTestData = (count: number) => {
  const newNodes: Node[] = [];
  const newEdges: Edge[] = [];
  const nodeTypes = ['class', 'interface', 'component', 'container', 'database', 'person'];
  
  // Generate nodes in a grid layout
  for (let i = 0; i < count; i++) {
    const type = nodeTypes[i % nodeTypes.length];
    const isUML = ['class', 'interface'].includes(type);
    const row = Math.floor(i / 30); // 30 nodes per row
    const col = i % 30;
    
    const baseX = isUML ? 800 : 100; // UML nodes start from x=800, C4 from x=100
    const nodeWidth = isUML ? 200 : 180;
    const nodeHeight = isUML ? 150 : 120;
    
    const node: Node = {
      id: `stress-${i}`,
      type,
      position: { 
        x: baseX + (col * (nodeWidth + 50)), 
        y: 50 + (row * (nodeHeight + 50))
      },
      data: {
        title: `${type} ${i}`,
        type,
        description: `Stress test node ${i}`,
        attributes: isUML ? ['+ attribute1: string', '+ attribute2: number'] : undefined,
        methods: isUML ? ['+ method1()', '+ method2()'] : undefined,
      },
    };
    newNodes.push(node);
    
    // Create edges between nodes (connecting to previous node)
    if (i > 0) {
      const edge: Edge = {
        id: `stress-edge-${i}`,
        source: `stress-${i-1}`,
        target: `stress-${i}`,
        type: isUML ? 'uml' : 'default',
        data: isUML ? {
          sourceLabel: '1',
          targetLabel: '*'
        } : undefined,
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: '#333',
          width: 20,
          height: 20,
        },
        style: { stroke: '#333' }
      };
      newEdges.push(edge);
    }
  }
  
  return { nodes: newNodes, edges: newEdges };
};

function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  
  // Add stress test handler
  const handleStressTest = useCallback(() => {
    const { nodes: stressNodes, edges: stressEdges } = generateStressTestData(1500);
    setNodes((nds) => [...nds, ...stressNodes]);
    setEdges((eds) => [...eds, ...stressEdges]);
  }, [setNodes, setEdges]);

  const onConnect = useCallback(
    (params: Connection) => {
      const sourceNode = nodes.find(node => node.id === params.source);
      const targetNode = nodes.find(node => node.id === params.target);
      const isUMLConnection = sourceNode && targetNode && 
        ['class', 'interface', 'enum', 'abstract', 'package', 'component'].includes(sourceNode.type || '') &&
        ['class', 'interface', 'enum', 'abstract', 'package', 'component'].includes(targetNode.type || '');

      const newEdge: Edge = {
        id: `edge-${edges.length + 1}`,
        ...params,
        type: isUMLConnection ? 'uml' : 'c4',
        ...(isUMLConnection && {
          data: { 
            sourceLabel: '+1',
            targetLabel: '+1'
          }
        }),
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: '#333',
          width: 20,
          height: 20,
        },
        style: { stroke: '#333' },
        ...(isUMLConnection ? {} : { animated: true })
      };
      
      setEdges((eds: Edge[]) => addEdge(newEdge, eds));
    },
    [setEdges, edges.length, nodes]
  );

  const onAddContainer = useCallback(
    (type: string) => {
      const position = getNewNodePosition(type, nodes);
      const newNode: Node = {
        id: `${type}-${nodes.length + 1}`,
        type,
        position,
        data: {
          title: `Nuovo ${type}`,
          type: type === 'actor' ? 'Persona' : 'Container',
          description: 'Aggiungi una descrizione',
        },
      };
      
      setNodes((nds: Node[]) => [...nds, newNode]);
    },
    [nodes, setNodes]
  );

  const onAddUMLElement = useCallback(
    (type: string) => {
      const position = getNewNodePosition(type, nodes);
      const newNode: Node = {
        id: `${type}-${nodes.length + 1}`,
        type,
        position,
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
    [nodes, setNodes]
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
        <div style={{
          position: 'absolute',
          left: 10,
          top: 413,
          zIndex: 4,
          background: 'white',
          padding: '8px',
          borderRadius: '4px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px'
        }}>
          <button
            onClick={handleStressTest}
            style={{
              padding: '8px 16px',
              background: '#ff4444',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: 'bold',
              width: '100%'
            }}
          >
            Stress Test (1500 Nodi)
          </button>
        </div>
      </ReactFlow>
    </div>
  );
}

export default App;
