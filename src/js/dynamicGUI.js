"use strict";

function writeSliderValue() { //Schreibt die aktuellen BPM in das DIV, wenn der Slider bewegt wird
  application.value = parseInt(application.sliderElement.value);
  application.numberFieldElement.innerHTML = application.value.toString();
  changeSpeedname();
  calculateBallSpeed();
}

function handleCalc(buttonNumber) { //regelt, was passiert, wenn die blauen Buttons gedrückt werden
  let currentValue = parseInt(application.value);

  switch (buttonNumber) {

    case 1:
      currentValue--;
      break;

    case 2:
      currentValue -= 5;
      break;

    case 3:
      currentValue++;
      break;

    case 4:
      currentValue += 5;
  }

  if (currentValue > 300) {
    currentValue = 300;
  } else if (currentValue < 1) {
    currentValue = 1;
  }

  application.value = currentValue;
  application.numberFieldElement.innerHTML = currentValue.toString();
  changeSpeedname();
  calculateBallSpeed();
}

function changeSpeedname() { // ordnet jedem BPM-Wert einem Namen zu und gibt ihn in einem DIV aus.

  switch (true) {

    case (application.value < 20):
      application.speedNameElement.innerHTML = "Larghissimo";
      break;

    case (application.value > 19 && application.value < 40):
      application.speedNameElement.innerHTML = "Grave";
      break;

    case (application.value > 39 && application.value < 60):
      application.speedNameElement.innerHTML = "Lento/Largo";
      break;

    case (application.value > 59 && application.value < 66):
      application.speedNameElement.innerHTML = "Larghetto";
      break;

    case (application.value > 65 && application.value < 76):
      application.speedNameElement.innerHTML = "Adagio";
      break;

    case (application.value > 75 && application.value < 108):
      application.speedNameElement.innerHTML = "Andante";
      break;

    case (application.value > 107 && application.value < 120):
      application.speedNameElement.innerHTML = "Moderato";
      break;

    case (application.value > 119 && application.value < 140):
      application.speedNameElement.innerHTML = "Allegro";
      break;

    case (application.value > 139 && application.value < 168):
      application.speedNameElement.innerHTML = "Vivace";
      break;

    case (application.value > 167 && application.value < 200):
      application.speedNameElement.innerHTML = "Presto";
      break;

    case (application.value > 199):
      application.speedNameElement.innerHTML = "Prestissimo";
  }
}