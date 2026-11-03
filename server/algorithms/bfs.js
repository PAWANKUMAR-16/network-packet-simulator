const bfs = (graph, source, destination) => {
  const queue = [source];
  const visited = new Set();
  const previous = {};
  
  visited.add(source);
  previous[source] = null;
  
  let found = false;
  
  while (queue.length > 0) {
    const current = queue.shift();
    
    if (current === destination) {
      found = true;
      break;
    }
    
    for (let neighbor of graph[current]) {
      if (!visited.has(neighbor.node)) {
        visited.add(neighbor.node);
        previous[neighbor.node] = current;
        queue.push(neighbor.node);
      }
    }
  }
  
  // Reconstruct path
  const path = [];
  if (found) {
    let current = destination;
    while (current !== null) {
      path.unshift(current);
      current = previous[current];
    }
  }
  
  return {
    path,
    distance: found ? path.length - 1 : -1 // Distance is number of hops (edges)
  };
};

module.exports = { bfs };
