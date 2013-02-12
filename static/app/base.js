define(["dojo/dom", "dojo/dom-style", "dojo/_base/fx", "dojo/request/xhr", "dojox/timing"], function (dom, domStyle, baseFx, xhr, timing) {
  var endLoading = function() {
    baseFx.fadeOut({
      node: dom.byId("overlay"),
      onEnd: function(node) {
        domStyle.set(node, "display", "none");
      }
    }).play();
  };

  var doPlane = function(app, lat, lon, head) {
    var origin = new OpenLayers.Geometry.Point(lon, lat).transform(app.map.displayProjection, app.map.projection);
    app.vectorLayer.removeFeatures(app.plane);
    app.plane = new OpenLayers.Feature.Vector(origin, {head: head});
    app.vectorLayer.addFeatures([app.plane]);
  };

  var doLine = function(app, lat, lon, head) {
    lat *= app.d2r;
    lon *= app.d2r;
    head *= app.d2r;
    var hlat = Math.asin(Math.sin(lat) * Math.cos(app.d) + Math.cos(lat) * Math.sin(app.d) * Math.cos(head));
    var dlon = Math.atan2(Math.sin(head) * Math.sin(app.d) * Math.cos(lat), Math.cos(app.d) - Math.sin(lat) * Math.sin(hlat));
    var hlon = (lon + dlon + Math.PI.mod(2*Math.PI)) - Math.PI;
    lat *= app.r2d;
    lon *= app.r2d;
    hlat *= app.r2d;
    hlon *= app.r2d;
    var points = new Array(
      new OpenLayers.Geometry.Point(lon, lat).transform(app.map.displayProjection, app.map.projection),
      new OpenLayers.Geometry.Point(hlon, hlat).transform(app.map.displayProjection, app.map.projection)
    );
    app.lineLayer.removeFeatures(app.heading);
    app.heading = new OpenLayers.Feature.Vector(new OpenLayers.Geometry.LineString(points));
    app.lineLayer.addFeatures([app.heading]);
  };

  var fgqry = function(app) {
    xhr("/info", {
      handleAs: "text"
    }).then (function(data) {
      var info = data.split(",");
      var lat = parseFloat(info[0]);
      var lon = parseFloat(info[1]);
      var head = parseFloat(info[2]);
      var elev = parseFloat((info[3]/1000)).toFixed(3);
      var nm = parseFloat(info[4]);
      var fuel = parseFloat(info[5]);
      var spd = parseFloat(info[6]).toFixed(1);
      doPlane(app, lat, lon, head);
      doLine(app, lat, lon, head);
      app.altGauge.set({value: elev});
      app.spdGauge.set({value: spd});
      app.altGauge.refreshRendering();
      app.spdGauge.refreshRendering();
      if (app.zero) {
        app.fuel = fuel;
        app.nm = nm;
        app.zero = false;
      } else {
        var eco = ((nm - app.nm) / (app.fuel - fuel)).toFixed(1);
        app.fuel = fuel;
        app.nm = nm;
        if (!isNaN(eco)) {
          app.ecoGauge.set({value: eco});
          app.ecoGauge.refreshRendering();
        }
      }
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
