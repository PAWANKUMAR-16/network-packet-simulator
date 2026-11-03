import { useState, useCallback, useRef } from 'react';
import { 
  ReactFlow, 
  Controls, 
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  MarkerType,
  Panel
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import axios from 'axios';
import SimulationPanel from './SimulationPanel';
import StatisticsPanel from './StatisticsPanel';
import TutorialModal from './TutorialModal';
import NodeProperties from './NodeProperties';
import { PCNode, RouterNode } from './CustomNodes';
import { Monitor, Router as RouterIcon, Trash2, Network, HelpCircle } from 'lucide-react';

const nodeTypes = {
  pc: PCNode,
  router: RouterNode,
};

const initialNodes = [
  { id: 'PC-1', position: { x: 100, y: 150 }, data: { label: 'PC 1', ip: '192.168.1.10' }, type: 'pc' },
  { id: 'Router-1', position: { x: 300, y: 150 }, data: { label: 'Router 1', ip: '192.168.1.1' }, type: 'router' },
  { id: 'Router-2', position: { x: 500, y: 150 }, data: { label: 'Router 2', ip: '10.0.0.1' }, type: 'router' },
  { id: 'PC-2', position: { x: 700, y: 150 }, data: { label: 'PC 2', ip: '10.0.0.10' }, type: 'pc' },
];

const initialEdges = [
  { id: 'e-PC-1-Router-1', source: 'PC-1', target: 'Router-1', animated: false, data: { weight: 1 } },
  { id: 'e-Router-1-Router-2', source: 'Router-1', target: 'Router-2', animated: false, data: { weight: 1 } },
  { id: 'e-Router-2-PC-2', source: 'Router-2', target: 'PC-2', animated: false, data: { weight: 1 } },
];

let nodeIdCounter = 3; // Start after initial nodes

export default function NetworkBuilder() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  
  const [source, setSource] = useState('PC-1');
  const [destination, setDestination] = useState('PC-2');
  const [algorithm, setAlgorithm] = useState('dijkstra');
  const [packetCount, setPacketCount] = useState(10);
  
  const [simulationResult, setSimulationResult] = useState(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [error, setError] = useState(null);
  const [isTutorialOpen, setIsTutorialOpen] = useState(false);
  const [selectedNode, setSelectedNode] = useState(null);

  // Use a ref to always have current edges available for animatePath
  const edgesRef = useRef(edges);
  edgesRef.current = edges;

  const onConnect = useCallback((params) => setEdges((eds) => addEdge({ 
    ...params,
    id: `e-${params.source}-${params.target}`,
    animated: false,
    className: '',
    data: { weight: 1 },
    style: { stroke: '#52525b', strokeWidth: 2 }
  }, eds)), [setEdges]);

  const addNode = (type) => {
    nodeIdCounter++;
    const id = `${type}-${nodeIdCounter}`;
    const newNode = {
      id,
      position: { x: Math.random() * 400 + 100, y: Math.random() * 300 + 50 },
      data: { label: `${type} ${nodeIdCounter}`, ip: '' },
      type: type === 'PC' ? 'pc' : 'router'
    };
    setNodes((nds) => nds.concat(newNode));
  };

  const clearNetwork = () => {
    setSelectedNode(null);
    setNodes(() => []);
    setEdges(() => []);
    setSimulationResult(null);
    setSource('');
    setDestination('');
    setError(null);
  };

  const handleSimulate = async () => {
    // Validate source and destination exist
    const sourceExists = nodes.find(n => n.id === source);
    const destExists = nodes.find(n => n.id === destination);
    
    if (!sourceExists || !destExists) {
      setError('Please select valid source and destination nodes.');
      return;
    }
    
    if (edges.length === 0) {
      setError('No connections found. Connect your nodes first by dragging between handles.');
      return;
    }

    setIsSimulating(true);
    setError(null);
    setSimulationResult(null);
    
    // Reset edges to default style before new simulation
    setEdges(eds => eds.map(e => ({
      ...e, 
      animated: false, 
      className: '',
      style: { stroke: '#52525b', strokeWidth: 2 },
      markerEnd: undefined
    })));
    
    try {
      // Send edges with weight from data
      const edgesPayload = edges.map(e => ({
        id: e.id,
        source: e.source,
        target: e.target,
        weight: e.data?.weight || 1
      }));

      const response = await axios.post('http://localhost:5000/api/simulation/run', {
        nodes,
        edges: edgesPayload,
        source,
        destination,
        algorithm,
        packetCount
      });
      
      setSimulationResult(response.data);
      
      if (response.data.path && response.data.path.length > 0) {
        animatePath(response.data.path);
      }
      
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || 'Simulation failed. Ensure backend is running.');
    } finally {
      setIsSimulating(false);
    }
  };

  const animatePath = (path) => {
    // Use edgesRef.current so we always have the latest edges
    const currentEdges = edgesRef.current;
    const pathEdgeIds = [];
    
    for (let i = 0; i < path.length - 1; i++) {
      const u = path[i];
      const v = path[i + 1];
      
      const edge = currentEdges.find(e => 
        (e.source === u && e.target === v) || 
        (e.source === v && e.target === u)
      );
      
      if (edge) {
        pathEdgeIds.push(edge.id);
      }
    }
    
    setEdges(eds => eds.map(e => {
      if (pathEdgeIds.includes(e.id)) {
        return { 
          ...e, 
          animated: true,
          style: { stroke: '#eab308', strokeWidth: 3 },
          className: 'edge-flow',
          markerEnd: { type: MarkerType.ArrowClosed, color: '#eab308' }
        };
      }
      return {
        ...e,
        animated: false,
        className: '',
        style: { stroke: '#3f3f46', strokeWidth: 1.5, strokeDasharray: '5 5' }
      };
    }));
  };

  const onSelectionChange = useCallback(({ nodes: selectedNodes }) => {
    const selected = selectedNodes.find(n => n.selected);
    setSelectedNode(selected || null);
  }, []);

  const handleUpdateNode = (id, newData) => {
    setNodes(nds => nds.map(node => {
      if (node.id === id) {
        return { ...node, data: { ...node.data, ...newData } };
      }
      return node;
    }));
    setSelectedNode(prev => prev ? { ...prev, data: { ...prev.data, ...newData } } : null);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-8rem)]">
      {/* Left Sidebar - Controls */}
      <div className="w-full lg:w-80 flex flex-col gap-4 overflow-y-auto pr-2 pb-4">
        
        {selectedNode ? (
          <NodeProperties selectedNode={selectedNode} onUpdateNode={handleUpdateNode} />
        ) : (
          <div className="bg-zinc-900 p-5 rounded-xl shadow-sm border border-zinc-800">
            <h2 className="text-lg font-bold text-zinc-100 mb-4 flex items-center gap-2">
              <Network className="h-5 w-5 text-yellow-500" />
              Network Tools
            </h2>
            <div className="grid grid-cols-2 gap-3 mb-4">
              <button 
                onClick={() => addNode('PC')} 
                className="flex flex-col items-center justify-center py-3 px-2 bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 hover:border-yellow-500/50 rounded-lg text-zinc-400 hover:text-yellow-500 transition-all"
              >
                <Monitor className="h-6 w-6 mb-1" />
                <span className="text-xs font-semibold">Add PC</span>
              </button>
              <button 
                onClick={() => addNode('Router')} 
                className="flex flex-col items-center justify-center py-3 px-2 bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 hover:border-yellow-500/50 rounded-lg text-zinc-400 hover:text-yellow-500 transition-all"
              >
                <RouterIcon className="h-6 w-6 mb-1" />
                <span className="text-xs font-semibold">Add Router</span>
              </button>
            </div>
          </div>
        )}

        {/* Always visible action buttons */}
        <div className="flex gap-2">
          <button 
            onClick={clearNetwork} 
            className="flex-1 flex items-center justify-center gap-2 py-2 text-sm bg-zinc-900 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors border border-zinc-800 hover:border-red-500/30"
          >
            <Trash2 className="h-4 w-4" /> Clear All
          </button>
          <button 
            onClick={() => setIsTutorialOpen(true)} 
            className="flex-1 flex items-center justify-center gap-2 py-2 text-sm bg-zinc-900 text-yellow-500 hover:bg-yellow-500/10 rounded-lg transition-colors border border-zinc-800 hover:border-yellow-500/30"
          >
            <HelpCircle className="h-4 w-4" /> Guide
          </button>
        </div>

        <TutorialModal isOpen={isTutorialOpen} onClose={() => setIsTutorialOpen(false)} />

        <SimulationPanel 
          nodes={nodes}
          source={source}
          setSource={setSource}
          destination={destination}
          setDestination={setDestination}
          algorithm={algorithm}
          setAlgorithm={setAlgorithm}
          packetCount={packetCount}
          setPacketCount={setPacketCount}
          onSimulate={handleSimulate}
          isSimulating={isSimulating}
          error={error}
        />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col gap-6 h-full min-h-[500px]">
        {/* Canvas */}
        <div className="flex-1 bg-zinc-900 rounded-xl shadow-[0_0_15px_rgba(0,0,0,0.5)] border border-zinc-800 overflow-hidden relative">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onSelectionChange={onSelectionChange}
            nodeTypes={nodeTypes}
            fitView
            colorMode="dark"
            className="bg-zinc-900"
          >
            <Background color="#52525b" gap={16} size={2} />
            <Controls className="bg-zinc-800 shadow-md border border-zinc-700 fill-zinc-300" />
            <Panel position="top-left" className="bg-zinc-950/90 backdrop-blur-sm p-2 rounded-lg shadow-sm border border-zinc-800 text-xs text-zinc-400 font-medium">
              Drag from handles to connect nodes
            </Panel>
          </ReactFlow>
        </div>

        {/* Results Panel */}
        {simulationResult && (
          <div className="h-auto shrink-0 transition-all duration-300 ease-in-out animate-in slide-in-from-bottom-4">
            <StatisticsPanel 
              stats={simulationResult.stats} 
              path={simulationResult.path} 
              packets={simulationResult.packets}
            />
          </div>
        )}
      </div>
    </div>
  );
}
