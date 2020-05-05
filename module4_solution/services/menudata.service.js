(function () {
  "use strict";

  angular.module("data")
  .service("MenuDataService", MenuDataService)
  .constant("ApiBasePath", "https://davids-restaurant.herokuapp.com");

  MenuDataService.$inject = ["$http", "ApiBasePath"];
  function MenuDataService($http, ApiBasePath) {
    var service = this;
    service.getAllCategories = function () {
      return $http({
        method: "GET",
        url: (ApiBasePath + "/categories.json")
      })
      .then(function (result) {
        return result.data;
      });
    };

    service.getItemsForCategory = function (shortName) {
      return $http({
        method: "GET",
        url: (ApiBasePath + "/menu_items.json"),
        params: {
          category: shortName
        }
      })
      .then(function (result) {
        return result.data.menu_items;
      });
    };
  }
})();
