import React from "react";
import Popup1 from "./PopupSlides/Popup1";
import Popup2 from "./PopupSlides/Popup2";
import Popup3 from "./PopupSlides/Popup3";
import Popup4 from "./PopupSlides/Popup4";
import Popup5 from "./PopupSlides/Popup5";
import Popup9 from "./PopupSlides/Popup9";

const Popup = () => {
  function goNext(id) {
    document.getElementById(id).style.display = "none";
  }

  function goBack(id) {
    document.getElementById(id).style.display = "inline-block";
  }

  function removeAll() {
    document.getElementById("pop-up1").style.display = "none";
    document.getElementById("pop-up2").style.display = "none";
    document.getElementById("pop-up3").style.display = "none";
    document.getElementById("pop-up4").style.display = "none";
    document.getElementById("pop-up5").style.display = "none";
    document.getElementById("pop-up9").style.display = "none";
  }

  return (
    <div>
      <Popup1 goNext={goNext} removeAll={removeAll} />
      <Popup2 goNext={goNext} goBack={goBack} />
      <Popup3 goNext={goNext} goBack={goBack} />
      <Popup4 goNext={goNext} goBack={goBack} />
      <Popup5 goNext={goNext} goBack={goBack} />
      <Popup9 goNext={goNext} goBack={goBack} />
    </div>
  );
};

export default Popup;
