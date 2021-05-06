const Popup5 = ({ goNext, goBack }) => {
  return (
    <div id="pop-up5" className="pop-up">
      <h2 id="pop-upHeader">Mazes</h2>
      <div id="popupText">
        <div>
          Additionally, using the <div className="headerButtonPopup">MAZES</div>{" "}
          button, you can also generate a maze, instead of using the walls and
          weights options.
        </div>
        <p>
          There are 2 maze algorithms available: Horizontally Skewed Recursive
          Division, and Vertically Skewed Recursive Division. Additionally,
          there is also a random wall generator.
        </p>
      </div>
      <button id="firstButton" onClick={() => goBack("pop-up4")}>
        Previous
      </button>
      <button id="secondButton" onClick={() => goNext("pop-up5")}>
        Next
      </button>
    </div>
  );
};

export default Popup5;
