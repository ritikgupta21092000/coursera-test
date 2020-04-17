(function() {
  "use strict";
  angular.module("Assignment1", [])
    .controller("LunchCheckController", ["$scope", function($scope) {
      $scope.messageInTextbox = "";
      $scope.buttonClicked = function() {
        $scope.message = "";
        $scope.listItemChar = $scope.messageInTextbox.split(",");
        if ($scope.messageInTextbox === "") {
          $scope.message = "Please enter data first";
        } else if ($scope.listItemChar.length <= 3) {
          $scope.messageInTextbox = "Enjoy!";
        } else {
          $scope.messageInTextbox = "Too much!";
        }
      };
    }]);
})();

//Minified version
// !function(){"use strict";angular.module("Assignment1",[]).controller("LunchCheckController",["$scope",function(e){e.name="",e.messageInTextbox="",e.buttonClicked=function(){e.message="",e.listItemChar=e.messageInTextbox.split(","),""===e.messageInTextbox?e.message="Please enter data first":e.listItemChar.length<=3?e.messageInTextbox="Enjoy!":e.messageInTextbox="Too much!"}}])}();
