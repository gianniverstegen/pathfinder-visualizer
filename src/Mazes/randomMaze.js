function randomMaze(initialGrid) {
  let grid = initialGrid.slice();
  let wallsToPlace = [];
  let wallsToAnimate = [];
  for (let i = 0; i < 240; i++) {
    let rowIDX = Math.round(Math.random() * 18);
    let colIDX = Math.round(Math.random() * 40);
    wallsToPlace.push([rowIDX, colIDX]);
  }

  for (let i = 0; i < wallsToPlace.length; i++) {
    grid[wallsToPlace[i][0]][wallsToPlace[i][1]].state = "node-isWall";
    wallsToAnimate.push(grid[wallsToPlace[i][0]][wallsToPlace[i][1]]);
  }
  return [wallsToAnimate, grid];
}

export default randomMaze;
