const Popup4 = ({ goNext, goBack }) => {
  return (
    <div id="pop-up4" className="pop-up">
      <h2 id="pop-upHeader">Wall and weight placement</h2>
      <div id="popupText">
        <div>
          You can place walls and weights using the{" "}
          <div className="headerButtonPopup">WALL</div> and{" "}
          <div className="headerButtonPopup">WEIGHT</div> buttons.{" "}
        </div>
        <p>
          Walls are ignored by the algorithm. Weights apply a movement-penalty
          of 10. Meaning that any other route may be 10 squares longer, and
          it'll still use the 10 square longer route.
        </p>
      </div>
      <button id="firstButton" onClick={() => goBack("pop-up3")}>
        Previous
      </button>
      <button id="secondButton" onClick={() => goNext("pop-up4")}>
        Next
      </button>
    </div>
  );
};

export default Popup4;
