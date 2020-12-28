"use strict";

function percentClick(percentValueIdentifier) { //regelt, was die Prozent-Buttons machen

  application.percent = Number(percentValueIdentifier);

  switch (application.percent) {

    case 50:
      activateButton(0);
      break;

    case 75:
      activateButton(1);
      break;

    case 85:
      activateButton(2);
      break;

    case 95:
      activateButton(3);
      break;

    case 100:
      activateButton(4);
  }
  calculateBallSpeed();
}


function activateButton(buttonArrayIndex) {

  for (let i = 0; i < 5; i++) {
    document.getElementsByClassName("percents")[i].style.backgroundColor = "transparent"; //alle Buttons durchsichtig machen	
  }

  document.getElementsByClassName("percents")[buttonArrayIndex].style.backgroundColor = "#276980"; // ausgewählten Button einfärben

}



function settingButton1() { //regelt den "Schläge pro Takt - Button"

  const settingButtonLeft = document.getElementsByTagName("span")[0];

  if (application.beatsPerMeasure <= 3) {
    application.beatsPerMeasure++;
  } else {
    application.beatsPerMeasure = 1;
  }

  settingButtonLeft.innerHTML = String(application.beatsPerMeasure);

  for (let i = 0; i < application.beatpoints.length; i++) { // alle Beatpoints anzeigen
    application.beatpoints[i].removeAttribute("hidden", "");
  }


  switch (application.beatsPerMeasure) { // jeweilige Beatoints ausblenden

    case 1:
      for (let i = 3; i > 0; i--) { // Beatpoints 3, 2 und 1 ausblenden
        application.beatpoints[i].setAttribute("hidden", "");
      }
      break;

    case 2:
      for (let i = 3; i > 1; i--) { // Beatpoints 3 und 2 ausblenden
        application.beatpoints[i].setAttribute("hidden", "");
      }
      break;

    case 3:
      application.beatpoints[application.beatpoints.length - 1].setAttribute("hidden", ""); // Beatpoint 3 ausblenden
  }

}


function settingButton2() { // regelt den "Klicks pro Schlag - Button"
  const settingButtonMiddle = document.getElementsByTagName("span")[1];

  if (application.beatsPerStroke <= 3) {
    application.beatsPerStroke++;
  } else {
    application.beatsPerStroke = 1;
  }
  settingButtonMiddle.innerHTML = String(application.beatsPerStroke);


  //alle Elemente aus dem clackPointObjectArray löschen
  while (application.clackPointObjectArray.length > 0) {
    application.clackPointObjectArray.pop();
  }

  //Objekte in das Array speichern. Diese Objekte wissen, an welcher Position sie "clacken" sollen und ob sie es dürfen.
  for (let i = 1; i < application.beatsPerStroke; i++) {
    application.clackPointObjectArray.push({

      clackPositionInPercent: (100 / application.beatsPerStroke) * i,
      isAllowedToClack: true

    });
  }

}


function settingButton3() { // regelt den "Tippen Sie das Tempo - Button"

  application.click.play();

  let currentTime = Date.now();

  if (application.isFirstTap) {
    application.tapArray[0] = currentTime;
    application.numberFieldElement.innerHTML = "...";
  } else {

    application.tapArray[1] = currentTime;

    let timeDifference = application.tapArray[1] - application.tapArray[0];
    let bpm = 60000 / timeDifference;

    if (bpm < 300) {
      application.value = Number(bpm.toFixed(1));
      application.numberFieldElement.innerHTML = application.value.toString();
    }

    application.tapArray[0] = undefined;
    application.tapArray[1] = undefined;

  }

  application.isFirstTap = !application.isFirstTap;

}