function dijkstra(noNeighbourGrid, startNode, endNode, noAnimation) {
  if (noAnimation) {
    // A very primitive solution that turns off the animations
    var isVisitedState = "node-isVisitedNoAn";
  } else isVisitedState = "node-isVisited";

  if (!startNode || !endNode || (!startNode && !endNode)) {
    return "error2";
  }

  // Helper arrays
  let visitedNodes = [];
  let grid = updateNeighbours(noNeighbourGrid);
  let openList = [];
  let dijkstraPath = [];
  startNode.state = "node-isStart";

  // Giving astar a startpoint
  startNode.gscore = 0;
  openList.push(startNode);

  // The while loop for the algorithm
  while (openList.length > 0) {
    openList = sortUnvisitedNodes(openList);
    let current = openList.shift();
    if (current === endNode) {
      // If endNode is reached
      current.state = "node-isEnd";
      dijkstraPath = constructPath(current, dijkstraPath);
      return [visitedNodes, grid, dijkstraPath];
    }

    for (let i = 0; i < current.neighbours.length; i++) {
      let temp_gscore = current.gscore + current.neighbours[i].weight + 1;
      if (temp_gscore < current.neighbours[i].gscore) {
        current.neighbours[i].previousNode = current;
        current.neighbours[i].gscore = temp_gscore;
        if (!visitedNodes.includes(current.neighbours[i])) {
          visitedNodes.push(current.neighbours[i]);
          current.neighbours[i].state = isVisitedState;
        }
        if (!openList.includes(current.neighbours[i])) {
          openList.push(current.neighbours[i]);
        }
      }
    }
  }
  return "error3";
}

function updateNeighbours(grid) {
  // updates the Neighbours of the nodes
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      if (row > 0 && grid[row - 1][col].state !== "node-isWall") {
        grid[row][col].neighbours.push(grid[row - 1][col]);
      } // UP
      if (
        col < grid[row].length - 1 &&
        grid[row][col + 1].state !== "node-isWall"
      ) {
        grid[row][col].neighbours.push(grid[row][col + 1]);
      } // RIGHT
      if (row < grid.length - 1 && grid[row + 1][col].state !== "node-isWall") {
        grid[row][col].neighbours.push(grid[row + 1][col]);
      } // DOWN
      if (col > 0 && grid[row][col - 1].state !== "node-isWall") {
        grid[row][col].neighbours.push(grid[row][col - 1]);
      } // LEFT
    }
  }
  return grid;
}

function constructPath(current) {
  let dijkstraPath = [];
  while (current.previousNode.previousNode !== undefined) {
    current = current.previousNode;
    current.state = "node-isPath";
    dijkstraPath.push(current);
  }
  return dijkstraPath.reverse(); // reversed leads away from the startnode instead of to.
}

function sortUnvisitedNodes(unvisitedNodes) {
  // Sorting the unvisited nodes based on their distance
  unvisitedNodes.sort((nodeA, nodeB) =>
    nodeA.gscore >= nodeB.gscore ? 1 : -1
  );
  return unvisitedNodes;
}

export default dijkstra;
