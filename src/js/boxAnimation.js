"use strict";

function moveBoxes() {
  const end = -600;
  const begin = 0;
  const startButton = document.getElementById("playimage");
  const moveContainer = document.getElementById("movecontainer");

  application.counter++;

  if (application.counter % 2 == 0) {
    moveContainer.style.left = end.toString() + "px";
    startButton.className = startButton.className.replace(/\bfas fa-play\b/g, "fas fa-stop"); //Wechsel des Icons
  } else {
    moveContainer.style.left = begin.toString() + "px";
    startButton.className = startButton.className.replace(/\bfas fa-stop\b/g, "fas fa-play"); //Wechsel des Icons
  }

}