(function () {
  "use strict";
  angular.module("NarrowItDownApp", [])
  .controller("NarrowItDownController", NarrowItDownController)
  .service("MenuSearchService", MenuSearchService)
  .directive("foundItems", FoundItems);

  function FoundItems() {
    var ddo = {
      templateUrl: "shoppinglist.html",
      scope: {
        items: "<",
        onRemove: "&",
        onEmpty: "<"
      },
      controller: NarrowItDownController,
      controllerAs: "menu",
      bindToController: true
    };
    return ddo;
  }

  NarrowItDownController.$inject = ["MenuSearchService"];
  function NarrowItDownController(MenuSearchService) {
    var menu = this;
    menu.name = "";
    menu.found = "";
    menu.searchItems = function (name) {
      var promise = MenuSearchService.getMatchedMenuItems(name);
      promise.then(function (response) {
        if (response.length > 0) {
          menu.message = "";
          menu.found = response;
        } else {
          menu.message = "Nothing Found";
          menu.found = [];
        }
      });
    };

    menu.removeItem = function (index) {
      menu.found.splice(index, 1);
    };
  }

  MenuSearchService.$inject = ["$http"];
  function MenuSearchService($http) {
    var service = this;
    service.getMatchedMenuItems = function (name) {
      return $http({
        method: "GET",
        url: "https://davids-restaurant.herokuapp.com/menu_items.json"
      })
      .then(function (result) {
      var foundItems = [];
      // process result and only keep items that match
      for (var i = 0; i < result.data.menu_items.length; i++) {
        var description = result.data.menu_items[i].description;
        if (name.length > 0 && description.toLowerCase().indexOf(name) != -1) {
          foundItems.push(result.data.menu_items[i]);
        }
      }
      // return processed items
      return foundItems;
    });
    };
  }
})();
