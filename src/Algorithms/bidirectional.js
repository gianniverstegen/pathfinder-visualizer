function bidirectional(noNeigbourGrid, startNode, endNode, noAnimation) {
  if (noAnimation) {
    // A very primitive solution that turns off the animations
    var isVisitedState = "node-isVisitedNoAn";
  } else isVisitedState = "node-isVisited";

  if (!startNode || !endNode || (!startNode && !endNode)) {
    return "error2";
  }

  let grid = updateNeighbours(noNeigbourGrid);
  let openListStart = [];
  let openListEnd = [];
  let visitedNodes = [];
  let check = {};

  startNode.gscore = 0;
  startNode.state = "node-isStart";
  endNode.gscore2 = 0;
  endNode.state = "node-isEnd";

  // Insert both the start and end node so that both will be evaluated
  openListStart.push(startNode);
  openListEnd.push(endNode);

  while (openListStart.length > 0 && openListEnd.length > 0) {
    openListStart = sortUnvisitedNodes(openListStart);
    openListEnd = sortUnvisitedNodes2(openListEnd);
    let currentStart = openListStart.shift();
    let currentEnd = openListEnd.shift();

    for (let i in currentStart.neighbours) {
      // The usual A* algorithm for evaluating neighbours.
      let temp_gscore =
        currentStart.gscore + currentStart.neighbours[i].weight + 1;
      if (temp_gscore < currentStart.neighbours[i].gscore) {
        currentStart.neighbours[i].previousNode = currentStart;
        currentStart.neighbours[i].gscore = temp_gscore;
        currentStart.neighbours[i].fscore =
          temp_gscore +
          getManhattenDistance(
            currentStart.neighbours[i].row,
            endNode.row,
            currentStart.neighbours[i].col,
            endNode.col
          );
        if (!visitedNodes.includes(currentStart.neighbours[i])) {
          visitedNodes.push(currentStart.neighbours[i]);
          currentStart.neighbours[i].state = isVisitedState;
        }
        if (!openListStart.includes(currentStart.neighbours[i])) {
          openListStart.push(currentStart.neighbours[i]);
        }
      }
    }

    for (let i in currentEnd.neighbours) {
      // The usual A* algorithm for evaluating neighbours.
      let temp_gscore =
        currentEnd.gscore2 + currentEnd.neighbours[i].weight + 1;
      if (temp_gscore < currentEnd.neighbours[i].gscore2) {
        currentEnd.neighbours[i].previousNode2 = currentEnd;
        currentEnd.neighbours[i].gscore2 = temp_gscore;
        currentEnd.neighbours[i].fscore2 =
          temp_gscore +
          getManhattenDistance(
            currentEnd.neighbours[i].row,
            startNode.row,
            currentEnd.neighbours[i].col,
            startNode.col
          );
        if (!visitedNodes.includes(currentEnd.neighbours[i])) {
          visitedNodes.push(currentEnd.neighbours[i]);
          currentEnd.neighbours[i].state = isVisitedState;
        }
        if (!openListEnd.includes(currentEnd.neighbours[i])) {
          openListEnd.push(currentEnd.neighbours[i]);
        }
      }
    }
    if (check[currentStart.id]) {
      currentStart.state = "node-isPath";
      let bidirectionalPath = constructPath(currentStart);
      constructPath2(currentStart, bidirectionalPath);
      return [visitedNodes, grid, bidirectionalPath];
    } else if (check[currentEnd.id]) {
      currentEnd.state = "node-isPath";
      let bidirectionalPath = constructPath(currentEnd);
      constructPath2(currentEnd, bidirectionalPath);
      return [visitedNodes, grid, bidirectionalPath];
    }
    check[currentStart.id] = true;
    check[currentEnd.id] = true;
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
  // this function should be changed to accomodate the two currents
  let bidirectionalPath = [];
  bidirectionalPath.push(current);
  while (current.previousNode.previousNode !== undefined) {
    current = current.previousNode;
    current.state = "node-isPath";
    bidirectionalPath.push(current);
  }
  return bidirectionalPath.reverse();
}

function constructPath2(current, bidirectionalPath) {
  // this function should be changed to accomodate the two currents
  while (current.previousNode2.previousNode2 !== undefined) {
    current = current.previousNode2;
    current.state = "node-isPath";
    bidirectionalPath.push(current);
  }
}

function sortUnvisitedNodes(unvisitedNodes) {
  // Sorting the unvisited nodes based on their distance
  unvisitedNodes.sort((nodeA, nodeB) =>
    nodeA.fscore >= nodeB.fscore ? 1 : -1
  );
  return unvisitedNodes;
}

function sortUnvisitedNodes2(unvisitedNodes) {
  // Sorting the unvisited nodes based on their distance
  unvisitedNodes.sort((nodeA, nodeB) =>
    nodeA.fscore2 >= nodeB.fscore2 ? 1 : -1
  );
  return unvisitedNodes;
}

export default bidirectional;
