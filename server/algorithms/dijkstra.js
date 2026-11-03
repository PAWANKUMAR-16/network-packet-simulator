const dijkstra = (graph, source, destination) => {
  const distances = {};
  const previous = {};
  const unvisited = new Set();
  
  // Initialize distances
  for (let node in graph) {
    distances[node] = Infinity;
    previous[node] = null;
    unvisited.add(node);
  }
  
  distances[source] = 0;
  
  while (unvisited.size > 0) {
    // Find the unvisited node with the smallest distance
    let currentNode = null;
    let minDistance = Infinity;
    
    for (let node of unvisited) {
      if (distances[node] < minDistance) {
        minDistance = distances[node];
        currentNode = node;
      }
    }
    
    // If we can't reach any more nodes, or we reached destination
    if (currentNode === null || currentNode === destination) {
      break;
    }
    
    unvisited.delete(currentNode);
    
    // Update distances to neighbors
    for (let neighbor of graph[currentNode]) {
      if (unvisited.has(neighbor.node)) {
        let alt = distances[currentNode] + neighbor.weight;
        if (alt < distances[neighbor.node]) {
          distances[neighbor.node] = alt;
          previous[neighbor.node] = currentNode;
        }
      }
    }
  }
  
  // Reconstruct path
  const path = [];
  let current = destination;
  
  if (previous[current] !== null || current === source) {
    while (current !== null) {
      path.unshift(current);
      current = previous[current];
    }
  }
  
  return {
    path: path.length > 0 && path[0] === source ? path : [],
    distance: distances[destination] !== Infinity ? distances[destination] : -1
  };
};

module.exports = { dijkstra };
