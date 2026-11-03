const dfs = (graph, source, destination) => {
  const visited = new Set();
  const path = [];
  let found = false;
  
  const dfsRecursive = (current) => {
    visited.add(current);
    path.push(current);
    
    if (current === destination) {
      found = true;
      return true;
    }
    
    for (let neighbor of graph[current]) {
      if (!visited.has(neighbor.node)) {
        if (dfsRecursive(neighbor.node)) {
          return true;
        }
      }
    }
    
    // Backtrack
    path.pop();
    return false;
  };
  
  dfsRecursive(source);
  
  return {
    path: found ? [...path] : [],
    distance: found ? path.length - 1 : -1
  };
};

module.exports = { dfs };
