function legendPopup(instruction, visitedNodesLength, pathLength, algorithm) {
  let legendPopup = document.getElementById("legendPopups");
  // All error events
  if (instruction === "error1") {
    legendPopup.innerHTML = "You forgot to select an algorithm";
    legendPopup.classList.add("shortAnimation");
    setTimeout(function () {
      legendPopup.classList.remove("shortAnimation");
    }, 3000);
  } else if (instruction === "error2") {
    legendPopup.innerHTML = "You forgot a startpoint, an endpoint, or both.";
    legendPopup.classList.add("shortAnimation");
    setTimeout(function () {
      legendPopup.classList.remove("shortAnimation");
    }, 3000);
  } else if (instruction === "error3") {
    legendPopup.innerHTML = "Make sure that the end node can be reached!";
    legendPopup.classList.add("shortAnimation");
    setTimeout(function () {
      legendPopup.classList.remove("shortAnimation");
    }, 3000);
  } else if (instruction === "error4") {
    legendPopup.innerHTML = "No algorithm has been executed";
    legendPopup.classList.add("shortAnimation");
    setTimeout(function () {
      legendPopup.classList.remove("shortAnimation");
    }, 3000);
  }
  // All algorithm responses
  else if (instruction === "Dijkstra") {
    legendPopup.innerHTML = "Dijkstra guarantees the best solution.";
    legendPopup.classList.add("shortAnimation");
    setTimeout(function () {
      legendPopup.classList.remove("shortAnimation");
    }, 3000);
  } else if (instruction === "A*") {
    legendPopup.innerHTML =
      "A* uses a heuristic to get to the end faster, this makes it faster than Dijkstra, but won't always guarantee the best solution.";
    legendPopup.classList.add("longAnimation");
    setTimeout(function () {
      legendPopup.classList.remove("longAnimation");
    }, 6000);
  } else if (instruction === "Bidirectional A*") {
    legendPopup.innerHTML =
      "Bidirectional A* is the same as A*, but approaches the problem from both the start and the end.";
    legendPopup.classList.add("longAnimation");
    setTimeout(function () {
      legendPopup.classList.remove("longAnimation");
    }, 6000);
  } else if (instruction === "Greedy BFS") {
    legendPopup.innerHTML =
      "Greedy Best First Search only uses a heuristic to find the shortest path. However, this does not guarantee the shortest path.";
    legendPopup.classList.add("longAnimation");
    setTimeout(function () {
      legendPopup.classList.remove("longAnimation");
    }, 6000);
  } else if (instruction === "DFS") {
    legendPopup.innerHTML =
      "Depth First Search visits the most recently added node. It is unweighted and does not guarantee the shortest path. It's used mostly for maze solving.";
    legendPopup.classList.add("longAnimation");
    setTimeout(function () {
      legendPopup.classList.remove("longAnimation");
    }, 6000);
  } else if (instruction === "Light A*") {
    legendPopup.innerHTML =
      "This variant of A* puts a lesser emphasis on the heuristic. It lies between A* and Dijkstra in how much it uses a heuristic.";
    legendPopup.classList.add("longAnimation");
    setTimeout(function () {
      legendPopup.classList.remove("longAnimation");
    }, 6000);
  } else if (instruction === "displayResults") {
    legendPopup.innerHTML = `Using ${algorithm}, ${visitedNodesLength} nodes were visited, and the path is ${pathLength} nodes long. Drag the end node to view other paths and their results.`;
    legendPopup.classList.add("noFadeOut");
  }

  // Maze generation
  else if (instruction === "horRecursiveMaze") {
    legendPopup.innerHTML =
      "Horizontally Skewed Recursive Division, as the name says, recursively divides the board to place walls. This variant first divides the board horizontally.";
    legendPopup.classList.add("longAnimation");
    setTimeout(function () {
      legendPopup.classList.remove("longAnimation");
    }, 6000);
  } else if (instruction === "verRecursiveMaze") {
    legendPopup.innerHTML =
      "Vertically Skewed Recursive Division, as the name says, recursively divides the board to place walls. This variant first divides the board vertically.";
    legendPopup.classList.add("longAnimation");
    setTimeout(function () {
      legendPopup.classList.remove("longAnimation");
    }, 6000);
  }
}

export default legendPopup;
