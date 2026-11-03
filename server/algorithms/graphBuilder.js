// Helper function to build an adjacency list graph from edges
const buildGraph = (nodes, edges) => {
  const graph = {};
  
  // Initialize graph with all nodes
  nodes.forEach(node => {
    graph[node.id] = [];
  });
  
  // Populate edges (undirected graph for typical network, unless specified otherwise)
  edges.forEach(edge => {
    // Add forward edge
    if (graph[edge.source]) {
      graph[edge.source].push({ node: edge.target, weight: edge.weight || 1 });
    }
    // Add reverse edge (assuming bidirectional links)
    if (graph[edge.target]) {
      graph[edge.target].push({ node: edge.source, weight: edge.weight || 1 });
    }
  });
  
  return graph;
};

module.exports = { buildGraph };
