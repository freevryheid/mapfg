define([], function() {
  return {
    init: function (app) {
      app.map = new OpenLayers.Map({
        div: "map",
        projection: "EPSG:900913",
        displayProjection: "EPSG:4326",
        numZoomLevels: 18
      });
      var gphy = new OpenLayers.Layer.Google(
        "Google Physical",
        {type: google.maps.MapTypeId.TERRAIN}
      );
      var gmap = new OpenLayers.Layer.Google(
        "Google Streets",
        {numZoomLevels: 20}
      );
      var ghyb = new OpenLayers.Layer.Google(
        "Google Hybrid",
        {type: google.maps.MapTypeId.HYBRID, numZoomLevels: 20}
      );
      var gsat = new OpenLayers.Layer.Google(
        "Google Satellite",
        {type: google.maps.MapTypeId.SATELLITE, numZoomLevels: 22}
      );
      app.map.addLayers([gphy, gmap, gsat, ghyb]);
      app.map.addControl(new OpenLayers.Control.LayerSwitcher());
      app.map.zoomToMaxExtent();
      var vectorStyleMap = new OpenLayers.StyleMap({
        "default": {
          externalGraphic: "/icon",
          rotation: "${head}",
          graphicWidth: 32,
          graphicHeight: 32,
        }
      });
      var lineStyleMap = new OpenLayers.StyleMap({
        "default": {
          strokeColor: '#0000ff',
          strokeOpacity: 0.5,
          strokeWidth: 3
        }
      });
      app.vectorLayer = new OpenLayers.Layer.Vector("Plane", {styleMap: vectorStyleMap});
      app.plane = new OpenLayers.Feature.Vector(new OpenLayers.Geometry.Point(0, 0).transform(app.map.displayProjection, app.map.projection), {head: 0});
      app.vectorLayer.addFeatures([app.plane]);
      app.lineLayer = new OpenLayers.Layer.Vector("Heading", {styleMap: lineStyleMap});
      var points = new Array(
        new OpenLayers.Geometry.Point(0, 0).transform(app.map.displayProjection, app.map.projection),
        new OpenLayers.Geometry.Point(0, 0).transform(app.map.displayProjection, app.map.projection)
      );
      app.heading = new OpenLayers.Feature.Vector(new OpenLayers.Geometry.LineString(points));
      app.lineLayer.addFeatures([app.heading]);
      app.map.addLayers([app.vectorLayer, app.lineLayer]);
      app.map.addControl(new OpenLayers.Control.MousePosition());
      app.d = 0.1;
      app.d2r = Math.PI/180;
      app.r2d = 180/Math.PI;
      app.zero = true;
    }
  };
});
