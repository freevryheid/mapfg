define(["require"], function (require) {
  var app = {};
  require([
    "dojo/ready",
    "app/map",
    "app/base",
    "app/gauge",
    "dijit/layout/ContentPane",
    "dijit/layout/BorderContainer"
  ], function (
    ready,
    Map,
    Base,
    Gauge
  ) {
    ready(function () {
      Number.prototype.mod = function(n) {
        return ((this%n)+n)%n;
      };
      Map.init(app);
      Base.init(app);
      Gauge.init(app);
    });
  });
});
