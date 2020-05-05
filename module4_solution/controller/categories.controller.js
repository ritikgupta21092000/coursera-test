(function () {
  "use strict";

  angular.module("MenuApp")
  .controller("CategoriesController", CategoriesController);

  CategoriesController.$inject = ["category"];
  function CategoriesController(category) {
    var categoriesCtrl = this;
    categoriesCtrl.category = category;
  }
})();
