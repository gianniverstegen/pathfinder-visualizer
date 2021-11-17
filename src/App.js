import Header from "./components/Header";
import Legend from "./components/Legend";
import Node_container from "./components/Node_container";
import dijkstra from "./Algorithms/Dijkstra";
import astar from "./Algorithms/astar";
import lightastar from "./Algorithms/lightastar";
import bidirectional from "./Algorithms/bidirectional";
import greedy from "./Algorithms/greedy";
import dfs from "./Algorithms/dfs";
import recursiveDivision from "./Mazes/horRecurseDivision";
import verRecursiveDivision from "./Mazes/verRecurseDivision";
import randomMaze from "./Mazes/randomMaze";
import legendPopup from "./legendPopup";
import React, { useState } from "react";

class Node {
  // A node class
  constructor(row, col) {
    this.row = row;
    this.col = col;
    this.id = `${row}-${col}`;
    this.state = "node"; // the default "unvisited" node
    this.neighbours = [];
    this.gscore = Infinity;
    this.gscore2 = Infinity;
    this.fscore = Infinity;
    this.fscore2 = Infinity;
    this.weight = 0;
    this.tree = undefined;
    this.previousNode = undefined;
    this.previousNode2 = undefined;
  }
}

function App() {
  // The main function
  // State
  const [phState, setState] = useState({
    grid: initialGrid(),
    startNode: undefined,
    endNode: undefined,
    stopoverNode: undefined,
    currentSelected: "startSelector",
    selectedAlgorithm: "",
    // Flags
    mouseIsPressed: false,
    isStarted: false,
    inProgress: false,
    mazeDone: false,
  });

  const startPathfinder = () => {
    // Program start
    if (phState.selectedAlgorithm === "") {
      legendPopup("error1");
      return;
    }
    let newGrid = phState.grid.slice();
    let resultAlgorithm = _algorithmExecuter(
      phState.selectedAlgorithm,
      newGrid,
      phState.startNode,
      phState.endNode
    );
    if (resultAlgorithm === "error2") {
      // Checking to see if a start and end node are present
      legendPopup("error2");
      return;
    }
    if (resultAlgorithm === "error3") {
      // Checking to see if a result was found
      legendPopup("error3");
      return;
    }
    _deselectAllLegendItemsCSS();
    phState.isStarted = true;
    phState.inProgress = true;
    const resultVisitedNodes = resultAlgorithm[0]; // Array of the visited nodes in order
    const resultPostAlgoGrid = resultAlgorithm[1]; // The new grid with all the node-state changes
    const resultPath = resultAlgorithm[2]; // The best path from start to finish
    animateNodesAndSetState(
      resultVisitedNodes,
      resultPostAlgoGrid,
      resultPath,
      phState.selectedAlgorithm
    );
  };

  function _algorithmExecuter(
    selectedAlgorithm,
    grid,
    startNode,
    endNode,
    animation
  ) {
    // animation is whether or not the node should be animated
    if (selectedAlgorithm === "Dijkstra") {
      return dijkstra(grid, startNode, endNode, animation);
    } else if (selectedAlgorithm === "A*") {
      return astar(grid, startNode, endNode, animation);
    } else if (selectedAlgorithm === "Bidirectional A*") {
      return bidirectional(grid, startNode, endNode, animation);
    } else if (selectedAlgorithm === "Greedy BFS") {
      return greedy(grid, startNode, endNode, animation);
    } else if (selectedAlgorithm === "DFS") {
      return dfs(grid, startNode, endNode, animation);
    } else if (selectedAlgorithm === "Light A*") {
      return lightastar(grid, startNode, endNode, animation);
    } else return false;
  }

  // Animation functions
  function animateWalls(wallsToAnimate, grid) {
    phState.mazeDone = true;
    for (let i = 0; i <= wallsToAnimate.length; i++) {
      if (i === wallsToAnimate.length) {
        setTimeout(() => {
          setState({ ...phState, grid: grid, mazeDone: true });
        }, 12 * i);
        return;
      }
      setTimeout(() => {
        let node = document.getElementById(wallsToAnimate[i].id);
        if (node.className !== "node-isEnd") node.className = "node-isWall";
      }, 12 * i);
    }
  }

  function animateNodesAndSetState(
    visitedNodes,
    postAlgoGrid,
    path,
    algorithm
  ) {
    // Takes in the visited nodes and path in order, animates it and sets the state at the end
    for (let i = 0; i <= visitedNodes.length; i++) {
      if (i === visitedNodes.length) {
        setTimeout(() => {
          _animatePathAndSetState(path, postAlgoGrid, visitedNodes, algorithm); // Helper to draw path and set state
        }, 12 * i);
        return;
      }
      setTimeout(() => {
        let node = document.getElementById(visitedNodes[i].id);
        if (node.className !== "node-isEnd") node.className = "node-isVisited";
      }, 12 * i);
    }
  }

  function _animatePathAndSetState(
    path,
    postAlgoGrid,
    visitedNodes,
    algorithm
  ) {
    // Helper function to animate the path and set the state
    for (let j = 0; j <= path.length; j++) {
      if (j === path.length) {
        setTimeout(() => {
          setState({
            ...phState,
            grid: postAlgoGrid,
            isStarted: true,
            inProgress: false,
          });
          legendPopup(
            "displayResults",
            visitedNodes.length,
            path.length,
            algorithm
          );
        }, 11 * j);
        return;
      }
      setTimeout(() => {
        let node = document.getElementById(path[j].id);
        if (node.className !== "node-isEnd") node.className = "node-isPath";
      }, 11 * j);
    }
  }

  // Grid modication functions
  function getGridWithNoVisitedNodes(grid) {
    let newGrid = grid.slice();
    for (let i = 0; i < 19; i++) {
      for (let j = 0; j < 41; j++) {
        if (newGrid[i][j].state === "node-isWall") {
          continue;
        } else if (newGrid[i][j].weight === 10) {
          newGrid[i][j] = new Node(i, j);
          newGrid[i][j].weight = 10;
        } else {
          newGrid[i][j] = new Node(i, j);
        }
      }
    }
    return newGrid;
  }

  function getGridWithStartAndEndAndStopoverNode(row, col) {
    // Returns the grid with the new start and end nodes
    let newGrid = phState.grid.slice();
    if (phState.currentSelected === "startSelector") {
      if (newGrid[row][col].state === "node-isEnd") return;
      if (phState.startNode !== undefined) phState.startNode.state = "node";
      newGrid[row][col].state = "node-isStart";
      setState({
        ...phState,
        startNode: newGrid[row][col],
        grid: newGrid,
      });
    } else if (phState.currentSelected === "stopoverSelector") {
      if (phState.stopoverNode !== undefined)
        phState.stopoverNode.state = "node";
      newGrid[row][col].state = "node-isStopover";
      setState({
        ...phState,
        stopoverNode: newGrid[row][col],
        grid: newGrid,
      });
    } else {
      if (phState.endNode !== undefined) phState.endNode.state = "node";
      if (newGrid[row][col].state === "node-isStart") return;
      newGrid[row][col].state = "node-isEnd";
      setState({
        ...phState,
        endNode: newGrid[row][col],
        grid: newGrid,
      });
    }
  }

  function getGridWithWeights(row, col) {
    let newGrid = phState.grid.slice();
    if (
      newGrid[row][col].state !== "node-isStart" &&
      newGrid[row][col].state !== "node-isEnd" &&
      newGrid[row][col].state !== "node-isWall"
    ) {
      newGrid[row][col].weight = 10;
      return newGrid;
    } else return newGrid;
  }

  const getGridWithWalls = (row, col) => {
    // Function which returns drawn walls
    let newGrid = phState.grid.slice();
    if (
      newGrid[row][col].state !== "node-isStart" &&
      newGrid[row][col].state !== "node-isEnd"
    ) {
      newGrid[row][col].state = "node-isWall";
      return newGrid;
    } else return newGrid;
  };

  function getGridWithMaze(maze) {
    if (phState.mazeDone === true) return;
    if (phState.isStarted === true) return;
    // Maybe add a log using the legendpopup
    let newGrid = initialGrid();
    if (maze === "recursiveDivision") {
      legendPopup("horRecursiveMaze");
      let newGridWithMaze = recursiveDivision(newGrid);
      animateWalls(newGridWithMaze[0], newGridWithMaze[1]);
    } else if (maze === "verRecursiveDivision") {
      legendPopup("verRecursiveMaze");
      let newGridWithMaze = verRecursiveDivision(newGrid);
      animateWalls(newGridWithMaze[0], newGridWithMaze[1]);
    } else if (maze === "randomMaze") {
      let newGridWithMaze = randomMaze(newGrid);
      animateWalls(newGridWithMaze[0], newGridWithMaze[1]);
    }
  }

  function getGridWithClear(row, col) {
    let newGrid = phState.grid.slice();
    if (newGrid[row][col].state === "node-isWall") {
      newGrid[row][col].state = "node";
      return newGrid;
    } else if (newGrid[row][col].weight === 10) {
      newGrid[row][col].weight = 0;
      return newGrid;
    } else return newGrid;
  }

  function dragAndSeeResult(row, col) {
    let newGrid = getGridWithNoVisitedNodes(phState.grid);
    if (newGrid[row][col].state === "node-isWall") return;
    if (newGrid[row][col].weight > 0) return;
    let newGridendNode = newGrid[row][col];
    let newGridstartNode =
      newGrid[phState.startNode.row][phState.startNode.col];
    if (newGridendNode === newGridstartNode) return;
    let dragAndSeeGrid = _algorithmExecuter(
      phState.selectedAlgorithm,
      newGrid,
      newGridstartNode,
      newGridendNode,
      "noanimation"
    );
    if (dragAndSeeGrid === "error3") {
      return;
    }
    legendPopup(
      "displayResults",
      dragAndSeeGrid[0].length,
      dragAndSeeGrid[2].length,
      phState.selectedAlgorithm
    );
    setState({
      ...phState,
      startNode: newGridstartNode,
      endNode: newGridendNode,
      grid: dragAndSeeGrid[1],
    });
  }
  // }

  // Helper functions for finding out where to draw on
  const onHoverPaint = (row, col) => {
    if (phState.inProgress === true) return;
    if (phState.mouseIsPressed === false) return;
    if (phState.isStarted === true) {
      dragAndSeeResult(row, col);
    } else {
      if (phState.currentSelected === "weightSelector") {
        let newGrid = getGridWithWeights(row, col);
        setState({
          ...phState,
          grid: newGrid,
        });
      } else if (phState.currentSelected === "clearSelector") {
        let newGrid = getGridWithClear(row, col);
        setState({
          ...phState,
          grid: newGrid,
        });
      } else if (phState.currentSelected === "wallSelector") {
        let newGrid = getGridWithWalls(row, col);
        setState({
          ...phState,
          grid: newGrid,
        });
      } else return;
    }
  };

  const _mouseDown = (row, col) => {
    if (phState.inProgress === true) return;
    phState.mouseIsPressed = true;
    if (phState.isStarted === true) return;
    if (_isCurrentSelectedStartOrEndOrStopover()) {
      getGridWithStartAndEndAndStopoverNode(row, col);
    } else if (phState.currentSelected === "weightSelector") {
      let newGrid = getGridWithWeights(row, col); // add the same as below here
      setState({
        ...phState,
        grid: newGrid,
        mouseIsPressed: true,
      });
    } else if (phState.currentSelected === "clearSelector") {
      let newGrid = getGridWithClear(row, col);
      setState({
        ...phState,
        grid: newGrid,
        mouseIsPressed: true,
      });
    } else {
      let newGrid = getGridWithWalls(row, col);
      setState({
        ...phState,
        grid: newGrid,
        mouseIsPressed: true,
      });
    }
  };

  const _mouseUp = () => {
    if (phState.inProgress === true) return;
    setState({
      ...phState,
      mouseIsPressed: false,
    });
  };

  function _isCurrentSelectedStartOrEndOrStopover() {
    // Function that checks whether or not the current selector is start or end
    if (
      phState.currentSelected === "startSelector" ||
      phState.currentSelected === "endSelector" ||
      phState.currentSelected === "stopoverSelector"
    ) {
      return true;
    } else return false;
  }

  // Legend and header handlers
  function legendHandler(selected) {
    // Handler for legend selection
    if (phState.isStarted === true) return;
    setState({ ...phState, currentSelected: selected });
  }

  function algorithmSelectorHandler(selected) {
    // Handler for algorithm selector
    legendPopup(selected);
    setState({ ...phState, selectedAlgorithm: selected });
  }

  function _deselectAllLegendItemsCSS() {
    document.getElementById("startSelector").className = "notSelected";
    document.getElementById("endSelector").className = "notSelected";
    document.getElementById("wallSelector").className = "notSelected";
    document.getElementById("weightSelector").className = "notSelected";
    document.getElementById("clearSelector").className = "notSelected";
  }

  function resetHandler() {
    // Handler for resetting
    let legendPopup = document.getElementById("legendPopups");
    legendPopup.classList.remove("longAnimation");
    legendPopup.classList.remove("shortAnimation");
    legendPopup.classList.remove("noFadeOut");
    document.getElementById("startSelector").className = "selected";
    setState({
      grid: initialGrid(),
      startNode: undefined,
      endNode: undefined,
      stopoverNode: undefined,
      currentSelected: "startSelector",
      selectedAlgorithm: "",
      mouseIsPressed: false,
      isStarted: false,
    });
  }

  function resetAlgorithmPath() {
    if (phState.isStarted === false) {
      legendPopup("error4");
      return;
    }
    let legendPopupHTML = document.getElementById("legendPopups");
    legendPopupHTML.classList.remove("longAnimation");
    legendPopupHTML.classList.remove("shortAnimation");
    legendPopupHTML.classList.remove("noFadeOut");
    let newGrid = getGridWithNoVisitedNodes(phState.grid);
    newGrid[phState.startNode.row][phState.startNode.col].state =
      "node-isStart";
    newGrid[phState.endNode.row][phState.endNode.col].state = "node-isEnd";
    let newGridendNode = newGrid[phState.endNode.row][phState.endNode.col];
    let newGridstartNode =
      newGrid[phState.startNode.row][phState.startNode.col];
    setState({
      ...phState,
      grid: newGrid,
      startNode: newGridstartNode,
      endNode: newGridendNode,
      currentSelected: "",
      isStarted: false,
    });
  }

  function initialGrid() {
    // Creating the initial grid
    let initialGrid = [];
    for (let i = 0; i < 19; i++) {
      initialGrid.push([]);
      for (let j = 0; j < 41; j++) {
        initialGrid[i].push(new Node(i, j));
      }
    }
    return initialGrid;
  }

  return (
    <div className="App">
      {/* <Popup /> */}
      <Header
        startPathfinder={startPathfinder}
        selectedAlgorithm={phState.selectedAlgorithm}
        algorithmSelectorHandler={algorithmSelectorHandler}
        getGridWithMaze={getGridWithMaze}
        resetHandler={resetHandler}
        resetAlgorithmPath={resetAlgorithmPath}
      />
      <Legend legendHandler={legendHandler} />
      <Node_container
        grid={phState.grid}
        onHoverPaint={onHoverPaint}
        mouseDown={_mouseDown}
        mouseUp={_mouseUp}
      />
    </div>
  );
}
export default App;
