import React from "react";

const Legend = ({ legendHandler }) => {
  const legendSelectorAnimation = (id) => {
    document.getElementById("startSelector").className = "notSelected";
    document.getElementById("endSelector").className = "notSelected";
    document.getElementById("wallSelector").className = "notSelected";
    document.getElementById("weightSelector").className = "notSelected";
    document.getElementById("clearSelector").className = "notSelected";
    // deselect all buttons
    // select the clicked button
    let selected = document.getElementById(id);
    selected.className = "selected";
  };

  const startBoth = (id) => {
    legendHandler(id);
    legendSelectorAnimation(id);
  };

  function removePopup() {
    let legendPopup = document.getElementById("legendPopups");
    legendPopup.classList.remove("longAnimation");
    legendPopup.classList.remove("shortAnimation");
    legendPopup.classList.remove("noFadeOut");
  }

  return (
    <div className="legend">
      <button
        id="startSelector"
        className="selected"
        onClick={() => startBoth("startSelector")}
      >
        START
      </button>

      <button
        id="endSelector"
        className="notSelected"
        onClick={() => startBoth("endSelector")}
      >
        END
      </button>

      <button
        id="wallSelector"
        className="notSelected"
        onClick={() => startBoth("wallSelector")}
      >
        WALL
      </button>
      <button
        id="clearSelector"
        className="notSelected"
        onClick={() => startBoth("clearSelector")}
      >
        CLEAR
      </button>
      <button
        id="weightSelector"
        className="notSelected"
        onClick={() => startBoth("weightSelector")}
      >
        WEIGHTS
      </button>
      <div className="legendPopups" id="legendPopups" onClick={removePopup}>
        I am all
      </div>
    </div>
  );
};

export default Legend;
