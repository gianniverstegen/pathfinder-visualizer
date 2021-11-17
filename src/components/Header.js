import React from "react";

const Header = ({
  startPathfinder,
  selectedAlgorithm,
  algorithmSelectorHandler,
  getGridWithMaze,
  resetHandler,
  resetAlgorithmPath,
}) => {
  return (
    <header>
      <ul className="algorithm_list">
        <button className="logo">Pathfinder Visualizer</button>
        <button className="visualize" onClick={startPathfinder}>
          VISUALIZE {selectedAlgorithm.toUpperCase()}
        </button>
        <button className="headerButton" id="header-selector">
          ALGORITHMS
          <div className="header-dropdown">
            <div>
              <div onClick={() => algorithmSelectorHandler("Dijkstra")}>
                Dijkstra's Algorithm
              </div>
              <div onClick={() => algorithmSelectorHandler("A*")}>
                A* Search
              </div>
              <div onClick={() => algorithmSelectorHandler("Light A*")}>
                Light A*
              </div>
              <div onClick={() => algorithmSelectorHandler("Bidirectional A*")}>
                Bidirectional A*
              </div>
              <div onClick={() => algorithmSelectorHandler("Greedy BFS")}>
                Greedy Search
              </div>
              <div onClick={() => algorithmSelectorHandler("DFS")}>DFS</div>
            </div>
          </div>
        </button>
        <button className="headerButton" id="header-selector">
          MAZES
          <div className="header-dropdown">
            <div>
              <div onClick={() => getGridWithMaze("recursiveDivision")}>
                Horizontally Skewed Recursive Division
              </div>
              <div onClick={() => getGridWithMaze("verRecursiveDivision")}>
                Vertically Skewed Recursive Division
              </div>
              <div onClick={() => getGridWithMaze("randomMaze")}>
                Randomly Placed Walls
              </div>
            </div>
          </div>
        </button>
        <button
          id="resetButton"
          className="headerButton"
          onClick={resetHandler}
        >
          RESET EVERYTHING
        </button>
        <button
          id="resetAlgorithmButton"
          className="headerButton"
          onClick={resetAlgorithmPath}
        >
          RESET ALGORITHM
        </button>
      </ul>
    </header>
  );
};

export default Header;
