const Popup3 = ({ goNext, goBack }) => {
  return (
    <div id="pop-up3" className="pop-up">
      <h2 id="pop-upHeader">Start and end placement</h2>
      <div id="popupText">
        <div>
          After choosing an algorithm, you can place a start- and end point
          using the <div className="headerButtonPopup">STARTPOINT</div> and the{" "}
          <div className="headerButtonPopup">ENDPOINT</div> button.
        </div>
        <p>
          Both of them should be placed, as only then will the algorithm
          execute.
        </p>
      </div>
      <button id="firstButton" onClick={() => goBack("pop-up2")}>
        Previous
      </button>
      <button id="secondButton" onClick={() => goNext("pop-up3")}>
        Next
      </button>
    </div>
  );
};

export default Popup3;
