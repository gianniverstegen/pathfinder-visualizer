const Popup9 = ({ goNext, goBack }) => {
  return (
    <div id="pop-up9" className="pop-up">
      <h2 id="pop-upHeader">The Visualize and Reset button</h2>
      <div id="popupText">
        <div>
          Finally, press the <div id="visualizeButton">VISUALIZE</div> button to
          visualize!
        </div>
        <div>
          Additionally, you can use the{" "}
          <div className="headerButtonPopup">RESET</div> button to reset
          everything when needed.
        </div>
      </div>
      <button id="firstButton" onClick={() => goBack("pop-up5")}>
        Previous
      </button>
      <button id="secondButton" onClick={() => goNext("pop-up9")}>
        Next
      </button>
    </div>
  );
};

export default Popup9;
