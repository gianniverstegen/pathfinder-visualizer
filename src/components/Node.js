import React from "react";

const Node = ({
  weight,
  state,
  row,
  col,
  id,
  onHoverPaint,
  mouseDown,
  mouseUp,
}) => {
  return (
    <div
      className={state}
      weight={weight}
      row={row}
      col={col}
      id={id}
      onMouseDown={() => mouseDown(row, col)}
      onMouseEnter={() => onHoverPaint(row, col)}
      onMouseUp={mouseUp}
    ></div>
  );
};

export default Node;
