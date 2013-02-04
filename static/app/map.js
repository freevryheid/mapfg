define([
  "dojox/geo/openlayers/Map"
], function(
  Map
) {
  return {
    init: function (app) {
      app.map = new Map("map", {
        baseLayerType: dojox.geo.openlayers.BaseLayerType.GOOGLE,
        baseLayerOptions : {
          type: google.maps.MapTypeId.TERRAIN
        }
      });
      app.map.fitTo([-160, 70, 160, -70]);
      app.projfg = new OpenLayers.Projection("EPSG:4326");
      app.projweb = new OpenLayers.Projection("EPSG:900913");
      var size = new OpenLayers.Size(32, 32);
      var offset = new OpenLayers.Pixel(-(size.w/2), -size.h);
      styleMap = new OpenLayers.StyleMap({
        "default": {
          externalGraphic: "/icon",
          rotation: "${head}",
          graphicWidth: 32,
          graphicHeight: 32,
          graphicXOffset: -(size.w/2),
          graphicYOffset: -size.h
        }
      });
      app.vectorLayer = new OpenLayers.Layer.Vector("Plane", {styleMap: styleMap});
      app.plane = new OpenLayers.Feature.Vector(new OpenLayers.Geometry.Point(0, 0).transform(app.projfg, app.projweb), {head: 0});
      app.vectorLayer.addFeatures([app.plane]);
      app.map.getOLMap().addLayers([app.vectorLayer]);
    }
  };
});
