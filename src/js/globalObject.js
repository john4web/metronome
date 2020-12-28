"use strict";

let application = {

  ball: document.getElementById("ball"),
  sliderElement: document.getElementById("myrange"),
  numberFieldElement: document.getElementById("numberfield"),
  speedNameElement: document.getElementById("speedname"),
  beatpoints: document.getElementsByClassName("beatpoint"),

  value: 0, // das sind die aktuellen BPM, die für den User im Div sichtbar sind. (hier wird die Prozentanzahl nicht berücksichtigt)
  percent: 100, // das sind die ausgewählten Prozent
  ballSpeed: 0, // das ist die Ballgeschwindigkeit, mit der das Metronom arbeitet (hier wird die Prozentanzahl schon berücksichtigt)
  beatsPerMeasure: 4,
  beatsPerStroke: 1,
  counter: 1, // Counter für boxAnimation.js

  tapArray: [undefined, undefined],
  isFirstTap: true,

  clackPointObjectArray: [],

  click: new Audio('sounds/click.mp3'),
  clack: new Audio('sounds/clack.mp3')

};