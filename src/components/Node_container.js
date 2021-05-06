import React from "react";
import Node from "./Node";

const Node_container = ({ grid, onHoverPaint, mouseDown, mouseUp }) => {
  return (
    <div className="node_section">
      <div className="node_container">
        {grid.map((row, rowIDX) => {
          return (
            <div className="node_row" key={rowIDX}>
              {row.map((node, colIDX) => (
                <Node
                  weight={node.weight}
                  state={node.state}
                  row={rowIDX}
                  col={colIDX}
                  id={`${rowIDX}-${colIDX}`} //Maybe not needed, replace the key with the id
                  mouseDown={mouseDown}
                  onHoverPaint={onHoverPaint}
                  mouseUp={mouseUp}
                  key={colIDX}
                />
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Node_container;
