const { buildGraph } = require('../algorithms/graphBuilder');
const { dijkstra } = require('../algorithms/dijkstra');
const { bfs } = require('../algorithms/bfs');
const { dfs } = require('../algorithms/dfs');

// Simulate Network
const runSimulation = (req, res) => {
  try {
    const { nodes, edges, source, destination, algorithm, packetCount } = req.body;
    
    if (!nodes || !edges || !source || !destination || !algorithm) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }
    
    // Build Graph
    const graph = buildGraph(nodes, edges);
    
    // Find Path
    let routingResult;
    switch (algorithm.toLowerCase()) {
      case 'dijkstra':
        routingResult = dijkstra(graph, source, destination);
        break;
      case 'bfs':
        routingResult = bfs(graph, source, destination);
        break;
      case 'dfs':
        routingResult = dfs(graph, source, destination);
        break;
      default:
        return res.status(400).json({ error: 'Unsupported algorithm' });
    }
    
    if (routingResult.path.length === 0) {
      return res.status(404).json({ error: 'No path found between source and destination' });
    }
    
    // Simulate Packets (Simple model for MVP)
    // Delay based on distance (weight sum or hops)
    // Random packet loss for realism (e.g. 5% chance per hop)
    
    const packets = [];
    let deliveredCount = 0;
    let droppedCount = 0;
    let totalDelay = 0;
    
    const pathLength = routingResult.path.length - 1; // Number of hops
    const baseDelayPerHop = 10; // ms
    
    for (let i = 0; i < (packetCount || 1); i++) {
      let isDropped = false;
      let dropNodeIndex = -1;
      
      // Simulate each hop
      for (let hop = 1; hop <= pathLength; hop++) {
        // 5% chance to drop at each router
        if (Math.random() < 0.05) {
          isDropped = true;
          dropNodeIndex = hop;
          break;
        }
      }
      
      if (isDropped) {
        droppedCount++;
        packets.push({
          id: i,
          status: 'dropped',
          dropLocation: routingResult.path[dropNodeIndex]
        });
      } else {
        deliveredCount++;
        const delay = routingResult.distance * baseDelayPerHop + Math.floor(Math.random() * 5); 
        totalDelay += delay;
        packets.push({
          id: i,
          status: 'delivered',
          delay: delay
        });
      }
    }
    
    const stats = {
      sent: packetCount || 1,
      delivered: deliveredCount,
      dropped: droppedCount,
      averageDelay: deliveredCount > 0 ? (totalDelay / deliveredCount).toFixed(2) : 0,
      hops: pathLength,
      deliveryRate: (((deliveredCount) / (packetCount || 1)) * 100).toFixed(2)
    };
    
    res.json({
      path: routingResult.path,
      distance: routingResult.distance,
      stats,
      packets
    });
    
  } catch (error) {
    console.error('Simulation Error:', error);
    res.status(500).json({ error: 'Internal server error during simulation' });
  }
};

module.exports = {
  runSimulation
};
