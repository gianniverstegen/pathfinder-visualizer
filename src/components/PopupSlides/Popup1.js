import React from "react";

const Popup1 = ({ goNext, removeAll }) => {
  return (
    <div id="pop-up1" className="pop-up">
      <h2 id="pop-upHeader">
        Welcome to the Pathfinder Visualizer! Would you like a tutorial?
      </h2>
      <p id="popupTextFirstSlide">
        The visualizer was made using JavaScript, React, HTML and CSS. Made by
        Gianni Verstegen.
      </p>
      <button id="firstButton" onClick={removeAll}>
        No
      </button>
      <button id="secondButton" onClick={() => goNext("pop-up1")}>
        Yes
      </button>
    </div>
  );
};

export default Popup1;
