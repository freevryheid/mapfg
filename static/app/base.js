define([
  "dojo/dom",
  "dojo/dom-style",
  "dojo/_base/fx",
  "dojo/request/xhr",
  "dojox/timing"
], function (
  dom,
  domStyle,
  baseFx,
  xhr,
  timing
) {
  var endLoading = function() {
    baseFx.fadeOut({
      node: dom.byId("overlay"),
      onEnd: function(node) {
        domStyle.set(node, "display", "none");
      }
    }).play();
  };

  var fgqry = function(app) {
    xhr("/info", {
      handleAs: "text"
    }).then(function(data) {
      var info = data.split(",");
      var lat = parseFloat(info[0]);
      var lon = parseFloat(info[1]);
      var head = parseFloat(info[2]);
      //var origin = new OpenLayers.LonLat(lon, lat).transform(app.projfg, app.projweb);
      var origin = new OpenLayers.Geometry.Point(lon, lat).transform(app.projfg, app.projweb);
      app.vectorLayer.removeFeatures(app.plane);
      app.plane = new OpenLayers.Feature.Vector(origin, {head: head});
      app.vectorLayer.addFeatures([app.plane]);
      // Do something with the handled data
    }, function(err) {
      // Handle the error condition
    }, function(evt) {
      // Handle a progress event from the request if the
      // browser supports XHR2
    });
  };

  return {
    init: function(app) {
      endLoading();
      t = new timing.Timer(1000);
        t.onTick = function() {
          fgqry(app);
        }
      t.start();
    }
  };
});
