// using only the heuristic distance

function greedy(noNeighbourGrid, startNode, endNode, noAnimation) {
  if (noAnimation) {
    // A very primitive solution that turns off the animations
    var isVisitedState = "node-isVisitedNoAn";
  } else isVisitedState = "node-isVisited";

  if (!startNode || !endNode || (!startNode && !endNode)) {
    return "error2";
  }

  // Helper arrays
  let grid = updateNeighbours(noNeighbourGrid);
  let openList = [];
  let visitedNodes = [];
  startNode.state = "node-isStart";

  // Giving greedy a startpoint
  startNode.fscore = getManhattenDistance(
    startNode.row,
    endNode.row,
    startNode.col,
    endNode.col
  );
  openList.push(startNode);

  // The while loop for the algorithm
  while (openList.length > 0) {
    openList = sortUnvisitedNodes(openList);
    let current = openList.shift();
    if (current === endNode) {
      // If endNode is reached
      current.state = "node-isEnd";
      let greedypath = constructPath(current);
      return [visitedNodes, grid, greedypath];
    }
    for (let i = 0; i < current.neighbours.length; i++) {
      let temp_fscore =
        current.neighbours[i].weight +
        getManhattenDistance(
          current.neighbours[i].row,
          endNode.row,
          current.neighbours[i].col,
          endNode.col
        );
      if (temp_fscore < current.neighbours[i].fscore) {
        current.neighbours[i].previousNode = current;
        current.neighbours[i].fscore = temp_fscore;
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

function getManhattenDistance(rowx, rowy, colx, coly) {
  return Math.abs(rowx - rowy) + Math.abs(colx - coly);
}

function constructPath(current) {
  let greedyPath = [];
  while (current.previousNode.previousNode !== undefined) {
    current = current.previousNode;
    current.state = "node-isPath";
    greedyPath.push(current);
  }
  return greedyPath.reverse(); // reversed leads away from the startnode instead of to.
}

function sortUnvisitedNodes(unvisitedNodes) {
  // Sorting the unvisited nodes based on their distance
  unvisitedNodes.sort((nodeA, nodeB) =>
    nodeA.fscore >= nodeB.fscore ? 1 : -1
  );
  return unvisitedNodes;
}

export default greedy;
