define(["require"], function (require) {
  var app = {};
  require([
    "dojo/ready",
    "app/map",
    "app/base"
  ], function (
    ready,
    Map,
    Base
  ) {
    ready(function () {
      Map.init(app);
      Base.init(app);
    });
  });
});
