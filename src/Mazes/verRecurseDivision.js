function verRecursiveDivision(initialGrid) {
  let grid = initialGrid.slice();
  let wallsToAnimate = [];
  // getOutsideWalls(grid);
  // sliceSection(grid[1][1], grid[1][39], grid[17][1], grid[17][39], grid);
  sliceSection(2, 16, 2, 38, "ver", grid, wallsToAnimate);
  getOutsideWalls(grid, wallsToAnimate);
  getRidOfHoles(wallsToAnimate);
  return [wallsToAnimate, grid];
}

function connectVectors(point1, point2, grid, wallsToAnimate) {
  if (point1.row === point2.row) {
    for (let i = -1; i <= point2.col - point1.col + 1; i++) {
      grid[point1.row][point1.col + i].state = "node-isWall";
      wallsToAnimate.push(grid[point1.row][point1.col + i]);
    }
  } else {
    for (let i = -1; i <= point2.row - point1.row + 1; i++) {
      grid[point1.row + i][point1.col].state = "node-isWall";
      wallsToAnimate.push(grid[point1.row + i][point1.col]);
    }
  }
}

function sliceSection(
  rowStart,
  rowEnd,
  colStart,
  colEnd,
  orientation,
  grid,
  wallsToAnimate
) {
  if (rowEnd < rowStart || colEnd < colStart) {
    return;
  }
  if (orientation === "hor") {
    let possibleRows = [];
    for (let i = rowStart; i <= rowEnd; i += 2) {
      possibleRows.push(i);
    }
    let randomRowIdx = Math.floor(Math.random() * possibleRows.length);
    let currentRow = possibleRows[randomRowIdx];
    connectVectors(
      grid[currentRow][colStart],
      grid[currentRow][colEnd],
      grid,
      wallsToAnimate
    );
    makeHole(grid[currentRow][colStart], grid[currentRow][colEnd], grid);

    if (currentRow - 2 - rowStart > colEnd - colStart) {
      sliceSection(
        rowStart,
        currentRow - 2,
        colStart,
        colEnd,
        orientation,
        grid,
        wallsToAnimate
      );
    } else {
      sliceSection(
        rowStart,
        currentRow - 2,
        colStart,
        colEnd,
        "ver",
        grid,
        wallsToAnimate
      );
    }

    if (rowEnd - 2 - currentRow > colEnd - colStart) {
      sliceSection(
        currentRow + 2,
        rowEnd,
        colStart,
        colEnd,
        orientation,
        grid,
        wallsToAnimate
      );
    } else {
      sliceSection(
        currentRow + 2,
        rowEnd,
        colStart,
        colEnd,
        "ver",
        grid,
        wallsToAnimate
      );
    }
  } else {
    let possibleCols = [];
    for (let i = colStart; i <= colEnd; i += 2) {
      possibleCols.push(i);
    }
    let randomColIdx = Math.floor(Math.random() * possibleCols.length);
    let currentCol = possibleCols[randomColIdx];
    connectVectors(
      grid[rowStart][currentCol],
      grid[rowEnd][currentCol],
      grid,
      wallsToAnimate
    );
    makeHole(grid[rowStart][currentCol], grid[rowEnd][currentCol], grid);

    if (currentCol - 2 - colStart > rowEnd - rowStart) {
      sliceSection(
        rowStart,
        rowEnd,
        colStart,
        currentCol - 2,
        orientation,
        grid,
        wallsToAnimate
      );
    } else {
      sliceSection(
        rowStart,
        rowEnd,
        colStart,
        currentCol - 2,
        "hor",
        grid,
        wallsToAnimate
      );
    }

    if (colEnd - 2 - currentCol > rowEnd - rowStart) {
      sliceSection(
        rowStart,
        rowEnd,
        currentCol + 2,
        colEnd,
        orientation,
        grid,
        wallsToAnimate
      );
    } else {
      sliceSection(
        rowStart,
        rowEnd,
        currentCol + 2,
        colEnd,
        "hor",
        grid,
        wallsToAnimate
      );
    }
  }
}

function makeHole(point1, point2, grid) {
  if (point1.row === point2.row) {
    // horizontal
    let position = Math.floor(
      Math.random() * (point2.col - point1.col) + point1.col
    );
    if (position % 2 === 0) {
      let change = 1;
      position = position + change;
    }
    if (position === 0) position += 1;
    grid[point1.row][position].state = "node-isHole";
  } else {
    // vertical
    let position = Math.floor(
      Math.random() * (point2.row - point1.row) + point1.row
    );
    if (position % 2 === 0) {
      position += 1;
    }
    if (position === point1.row) position += 1;
    grid[position][point1.col].state = "node-isHole";
  }
}

function getOutsideWalls(grid, wallsToAnimate) {
  _connectWalls(grid[0][0], grid[0][40], grid, wallsToAnimate);
  _connectWalls(grid[0][0], grid[18][0], grid, wallsToAnimate);
  _connectWalls(grid[0][40], grid[18][40], grid, wallsToAnimate);
  _connectWalls(grid[18][0], grid[18][40], grid, wallsToAnimate);
}

function _connectWalls(point1, point2, grid, wallsToAnimate) {
  let connectWallsToAnimate = [];
  if (point1.row === point2.row) {
    for (let i = 0; i <= point2.col - point1.col; i++) {
      grid[point1.row][point1.col + i].state = "node-isWall";
      connectWallsToAnimate.push(grid[point1.row][point1.col + i]);
    }
  } else {
    for (let i = 0; i <= point2.row - point1.row; i++) {
      grid[point1.row + i][point1.col].state = "node-isWall";
      connectWallsToAnimate.push(grid[point1.row + i][point1.col]);
    }
  }
  wallsToAnimate.unshift(...connectWallsToAnimate);
}

function getRidOfHoles(wallsToAnimate) {
  for (let i = 0; i < wallsToAnimate.length; i++) {
    if (wallsToAnimate[i].state === "node-isHole") {
      wallsToAnimate.splice(i, 1);
    }
  }
}

export default verRecursiveDivision;
