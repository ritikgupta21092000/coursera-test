(function () {
  "use strict";

  angular.module("public")
  .controller("InfoController", InfoController);

    InfoController.$inject = ["MenuService", "ApiPath"];
  function InfoController(MenuService, ApiPath) {
    var infoCtrl = this;
    infoCtrl.apiPath = ApiPath;
    infoCtrl.user = MenuService.getUser();
    if (infoCtrl.user.first_name === undefined) {
      infoCtrl.signedUp = false;
    } else {
      infoCtrl.signedUp = true;
    }
  }
})();
