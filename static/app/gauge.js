define([
  "dojo/dom",
  "dojox/dgauges/components/default/CircularLinearGauge"
], function (
  dom,
  Gauge
) {

  // Altimeter
  var makeAlt = function(app) {
    app.altGauge = new Gauge({
      id: "altGauge",
      title: "Altimeter (ft, 10k)",
      minimum: 0,
      maximum: 10,
      majorTickInterval: 1,
      minorTickInterval: 0.1,
      interactionArea: "none",
      //width: 300,
      //height: 300
    }, dom.byId("altGauge"));
    app.altGauge.startup();
    app.altGauge.resize(300,300);
  };

  // Speedometer
  var makeSpd = function(app) {
    app.spdGauge = new Gauge({
      id: "spdGauge",
      title: "Speed (knots)",
      minimum: 0,
      maximum: 150,
      majorTickInterval: 10,
      minorTickInterval: 5,
      interactionArea: "none",
      //width: 300,
      //height: 300
    }, dom.byId("spdGauge"));
    app.spdGauge.startup();
    app.spdGauge.resize(300,300);
  };

  // Econ
  var makeEco = function(app) {
    app.ecoGauge = new Gauge({
      id: "ecoGauge",
      title: "Economy (nm/gal)",
      minimum: 0,
      maximum: 50,
      majorTickInterval: 10,
      minorTickInterval: 5,
      interactionArea: "none",
      //width: 300,
      //height: 300
    }, dom.byId("ecoGauge"));
    app.ecoGauge.startup();
    app.ecoGauge.resize(300,300);
  };

  return {
    init: function(app) {
      makeAlt(app);
      makeSpd(app);
      makeEco(app);
    }
  };
});


