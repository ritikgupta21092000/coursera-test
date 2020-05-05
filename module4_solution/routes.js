(function () {
  "use strict";

  angular.module("MenuApp")
  .config(RoutesConfig);

  RoutesConfig.$inject = ["$stateProvider", "$urlRouterProvider"];
  function RoutesConfig($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/");

    $stateProvider
    .state("home", {
      url: "/",
      templateUrl: "templates/home.menuapp.html"
    })

    .state("categories", {
      url: "/categories",
      templateUrl: "templates/categories.template.html",
      controller: "CategoriesController as categoriesCtrl",
      resolve: {
        category: ["MenuDataService", function (MenuDataService) {
          return MenuDataService.getAllCategories();
        }]
      }
    })

    .state("items", {
      url: "/categories/{categoryShortName}",
      templateUrl: "templates/items.template.html",
      controller: "ItemController as itemCtrl",
      params: {
        categoryName: null
      },
      resolve: {
        items: ["$stateParams", "MenuDataService", function ($stateParams, MenuDataService) {
          return MenuDataService.getItemsForCategory($stateParams.categoryShortName);
        }]
      }
    });
  }
})();
