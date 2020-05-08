(function () {
  "use strict";
  angular.module("public")
  .controller("SignUpController", SignUpController);

  SignUpController.$inject = ["MenuService"];
  function SignUpController(MenuService) {
    var signupCtrl = this;
    signupCtrl.user = {};
    signupCtrl.submitForm = function () {
      var promise = MenuService.getFavouriteDish(signupCtrl.user.favourite_dish);
      promise.then(function (response) {
        signupCtrl.completed = true;
        signupCtrl.errorMessage = false;
        signupCtrl.user.favouriteDishDetail = response.data;
        MenuService.saveUser(signupCtrl.user);
      })
      .catch(function (error) {
        signupCtrl.completed = false;
        signupCtrl.errorMessage = true;
        console.log(error);
      });
    };
  }
})();
