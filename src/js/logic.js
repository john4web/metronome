"use strict";

let logicGlobalVariables = {
  startTime: undefined,
  directionIsRight: true,
  animationID: undefined,
  isRunning: false,
  lineLength: undefined, // die länge der Linie auf der sich der Ball bewegt
  activeBeatpoint: -1
};

function giveNextAnimationFrame(currentTime) {

  let positionPixel;

  if (logicGlobalVariables.startTime == null) {
    logicGlobalVariables.startTime = currentTime;
  }

  let positionPercent = calculateCurrentPositionPercent(currentTime, logicGlobalVariables.startTime);

  if (positionPercent >= 100) { //Wenn der Ball ganz rechts ist, sind 100% erreicht. Wenn der Ball ganz links ist, sind aber auch 100% erreicht
    logicGlobalVariables.directionIsRight = !logicGlobalVariables.directionIsRight;
    logicGlobalVariables.startTime = currentTime;
    positionPercent = calculateCurrentPositionPercent(currentTime, logicGlobalVariables.startTime); // Damit der Ball beim letzten Frame nicht auf 0px gesetzt wird
    application.click.play();
    progressLight();
    allowAllClackPointObjectsToClack();
  }



  for (let i = 0; i < application.clackPointObjectArray.length; i++) { // Diese Funktion spielt das Clack nur dann ab, wenn es erlaubt ist.

    if ((positionPercent >= application.clackPointObjectArray[i].clackPositionInPercent) && application.clackPointObjectArray[i].isAllowedToClack) {
      application.clack.play();
      application.clackPointObjectArray[i].isAllowedToClack = false;
    }
  }



  if (logicGlobalVariables.directionIsRight) {
    positionPixel = (logicGlobalVariables.lineLength * positionPercent) / 100;
    /* 
	Um die Prozent in Pixel umzurechnen verwende ich  folgende Schlussrechnung:
	lineLength px  ...  100%
  		 	 x px  ...  positionPercent px
  	*/
  } else {
    positionPixel = (logicGlobalVariables.lineLength * (100 - positionPercent)) / 100;
  }

  application.ball.style.left = positionPixel + "px";

  logicGlobalVariables.animationID = window.requestAnimationFrame(giveNextAnimationFrame);

}



function calculateBallSpeed() {
  let bpm = (application.value * application.percent) / 100; // Prozentwert berechnen und in die Hilfsvariable bpm speichern
  application.ballSpeed = 60000 / bpm; // die Ballgeschwindigkeit, mit der das Metronom arbeitet (1 Minute / BPM).   60 000 ms entspricht einer Minute
  //application.ballSpeed gibt den Wert in ms an, wie lange der Ball von links nach rechts braucht
}

function calculateCurrentPositionPercent(currentTime, startTime) {
  let currentTimeDifference = currentTime - startTime;
  return (currentTimeDifference * 100) / application.ballSpeed;
  /*
  Das ist folgende Schlussrechnung:
  100%  ...  application.ballSpeed
    x%  ...  currentTimeDifference
  */
}



function play() { //Diese Funktion wird ausgeführt, wenn der Play-Button gedrückt wurde

  moveBoxes();

  if (logicGlobalVariables.isRunning) {

    resetAnimation();
    logicGlobalVariables.isRunning = false;

  } else {
    calculateBallSpeed();
    logicGlobalVariables.animationID = window.requestAnimationFrame(giveNextAnimationFrame); // Hier wird das erste Frame abgespielt
    // RequestAnimationFrame schaut, ob der Browser bereit ist, das nächste Frame abzuspielen. Wenn ja, dann wird giveNextAnimationFrame() aufgerufen.
    logicGlobalVariables.isRunning = true;
    application.click.play();
    progressLight();
  }
}




function resetAnimation() {

  window.cancelAnimationFrame(logicGlobalVariables.animationID);
  application.ball.style.left = "0";
  logicGlobalVariables.startTime = null;
  logicGlobalVariables.directionIsRight = true;

  logicGlobalVariables.activeBeatpoint = -1;
  for (let i = 0; i < application.beatpoints.length; i++) { //Alle Beatpoints auf gelb setzen
    application.beatpoints[i].style.backgroundColor = "yellow";
  }


  for (let i = 0; i < application.clackPointObjectArray.length; i++) { // Allen Clickpoints wieder erlauben zu klicken
    application.clackPointObjectArray[i].isAllowedToClack = true;
  }

}



function progressLight() {

  for (let i = 0; i < application.beatpoints.length; i++) {
    application.beatpoints[i].style.backgroundColor = "yellow";
  }

  logicGlobalVariables.activeBeatpoint++;

  if (logicGlobalVariables.activeBeatpoint > (application.beatsPerMeasure - 1)) {
    logicGlobalVariables.activeBeatpoint = 0;
  }

  application.beatpoints[logicGlobalVariables.activeBeatpoint].style.backgroundColor = "#FF9800";
}




function allowAllClackPointObjectsToClack() {
  for (let i = 0; i < application.clackPointObjectArray.length; i++) {
    application.clackPointObjectArray[i].isAllowedToClack = true;
  }
}



function setLineLength() { //lest die länge der Linie aus und speichert den Wert in lineLength 

  let line = document.getElementById("line");
  let lineWidthValue = window.getComputedStyle(line).width;
  lineWidthValue = Number(lineWidthValue.substr(0, lineWidthValue.length - 2));

  let ballWidthValue = window.getComputedStyle(application.ball).width;
  ballWidthValue = Number(ballWidthValue.substr(0, ballWidthValue.length - 2));

  logicGlobalVariables.lineLength = lineWidthValue - ballWidthValue;
}