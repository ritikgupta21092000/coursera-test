(function() {
  angular.module("ShoppingListApp", [])
    .controller("BuyController", BuyController)
    .controller("BoughtController", BoughtController)
    .service("ShoppingListService", ShoppingListService);

  BuyController.$inject = ["ShoppingListService"];

  function BuyController(ShoppingListService) {
    var list1 = this;
    ShoppingListService.addItems();
    list1.items = ShoppingListService.getItems();

    list1.bought = function($index) {
      try {
        ShoppingListService.transferItem($index);
      } catch (error) {
        list1.errormessage = error.message;
      }
    };
  }

  BoughtController.$inject = ["ShoppingListService"];

  function BoughtController(ShoppingListService) {
    var list2 = this;
      list2.boughtItems = ShoppingListService.boughtItems();
  }


  function ShoppingListService() {
    var service = this;
    var items = [];
    boughtItems = [];
    service.addItems = function() {
      items = [{
          name: "Cookie",
          quantity: "10"
        },
        {
          name: "Paneer",
          quantity: "250 g"
        },
        {
          name: "Pav Bhaji",
          quantity: "5"
        },
        {
          name: "Idli",
          quantity: "4"
        },
        {
          name: "Soft Drinks",
          quantity: "2"
        }
      ];
    };
    service.getItems = function() {
      return items;
    };

    service.transferItem = function($index) {
      var boughtItem = {
        name: items[$index].name,
        quantity: items[$index].quantity
      };
      items.splice($index, 1);
      boughtItems.push(boughtItem);
      if (items.length === 0) {
        throw new Error("Everything is bought");
      }
      BoughtController(this);
    };

    service.boughtItems = function() {
        return boughtItems;
    };
  }
})();
