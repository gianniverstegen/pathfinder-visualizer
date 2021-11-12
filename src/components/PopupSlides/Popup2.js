const Popup2 = ({ goNext, goBack }) => {
  return (
    <div id="pop-up2" className="pop-up">
      <h2 id="pop-upHeader">Algorithms</h2>
      <div id="popupText">
        <div>
          First, pick one of the algorithms using the{" "}
          <div className="headerButtonPopup">ALGORITHMS</div> dropdown menu.
        </div>
        <p>
          There are six algoritms available: Dijkstra, A*, Light A*,
          Bidirectional A*, Greedy BFS and DFS.
        </p>
      </div>
      <button id="firstButton" onClick={() => goBack("pop-up1")}>
        Previous
      </button>
      <button id="secondButton" onClick={() => goNext("pop-up2")}>
        Next
      </button>
    </div>
  );
};

export default Popup2;
